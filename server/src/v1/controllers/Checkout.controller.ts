import AsyncHandler from "../../utils/AsyncHandler";
import {
  CheckoutValidatation,
  objectIdZod,
  orderNumberValidate,
} from "../../utils/zodValidation/checkoutValidation";
import { Request, Response } from "express";
import { CheckoutService } from "../services/Checkout.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { logger } from "../../config/Logger";
import { redisClient } from "../../libs/RedisClient";
import { getOrderkey, getOrderskey, vendorOrders } from "../../libs/Redis_keys";
import OrderModel from "../models/Order.model";
import ApiError from "../../utils/ApiError";
import { OrderStatus } from "../../types/Auth.type";
// InitiateCheckout
const InitiateCheckout = AsyncHandler(async (req: Request, res: Response) => {
  // validation
  const { data, success, error } = CheckoutValidatation.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, "validation error", false, error);
  }
  const userId = req.user._id;
  const order = await CheckoutService.initiateCheckout(userId, data as any);
  res.json(new ApiResponse(201, order, "Checkout initiated successfully"));
});
// fetch order by orderId for customer
const GetOrderById = AsyncHandler(async (req: Request, res: Response) => {
  const orderId = objectIdZod.safeParse(req.params?.orderId);
  logger.info("Get order request received", { orderId });
  if (!orderId?.success) {
    logger.warn("Invalid orderId in params", {
      errors: orderId.error,
      params: orderId?.data,
    });
  }
  // check in cache
  const cachedOrder = await redisClient.get(getOrderkey(orderId.data!));
  if (cachedOrder) {
    logger.info("Order cache hit", { orderId: orderId.data });
    res.json(new ApiResponse(200, cachedOrder, "Order fetched successfully"));
    return;
  }
  logger.info("Order cache miss, fetching from DB", { orderId: orderId.data });
  const orderDB = await OrderModel.findById(orderId.data)
    .populate("user", "name email")
    .populate("items.product", "name images");
  if (!orderDB) {
    logger.error("order not found", {
      orderId,
    });
    throw new ApiError(
      404,
      `Order not Found with this orderId ${orderId.data}`,
      false,
    );
  }
  // Verify order belongs to user
  if ((orderDB.user as any) !== req.user._id) {
    logger.error("Access Denied due to unauthorized user", {
      user: req.user,
    });
    throw new ApiError(400, "Access Denied");
  }
  logger.info("Order cached in Redis", { orderId: orderId.data });
  await redisClient.setEx(
    getOrderkey(orderId.data!),
    300,
    JSON.stringify(orderDB),
  );
  res.json(new ApiResponse(200, orderDB, "Order fetched successfully"));
});
// fetch all orders by customer
const GetOrders = AsyncHandler(async (req: Request, res: Response) => {
  const customer = req.user;
  const page = parseInt(req.params?.page as string) || 1;
  const limit = parseInt(req.params.limit) || 10;
  const skip = (page - 1) * limit;
  logger.info(`Get customer Orders request recieved ${customer._id}`);
  // check cache
  const cachedOrders = await redisClient.get(getOrderskey);
  if (cachedOrders) {
    logger.info("orders cache hit", { customerId: customer._id });
    res.json(
      new ApiResponse(
        200,
        JSON.parse(cachedOrders),
        "Orders Fetched successfully!",
      ),
    );
    return;
  }
  logger.info("Orders cache missed, fetching form DB", {
    customerId: customer._id,
  });
  const orders = await OrderModel.find({ _id: customer?._id })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .populate("items.product", "name images")
    .lean();
  logger.info("Orders cached in redis", { customerId: customer._id });
  // store in cache
  await redisClient.setEx(
    getOrderkey(customer._id),
    2 * 60 * 1000,
    JSON.stringify(orders),
  );
  res.json(
    new ApiResponse(
      200,
      { ...orders, page, totalPages: Math.ceil(orders?.length / limit) },
      "Fetched orders successfully",
    ),
  );
});
// vendor controllers
// Fetched orders by vendor which is comes from buy the order of customers
const GetVendorOrders = AsyncHandler(async (req: Request, res: Response) => {
  const vendor = req.user?._id;
  const limit = parseInt(req.params.limit as string) || 10;
  const page = parseInt(req.params.page as string) || 1;
  const skip = (page - 1) * limit;
  logger.info(`Vendor orders request recived ${vendor}`);
  // check in cache
  const cachedOrders = await redisClient.get(vendorOrders(vendor));
  if (cachedOrders) {
    logger.info(`vendor orders Cache hit `, { vendorId: vendor });
    res.json(
      new ApiResponse(
        200,
        JSON.parse(cachedOrders),
        "Vendor Orders Fetched successfully",
      ),
    );
  }
  logger.info("Cache vendors orders missed, fetching form DB", {
    vendorId: vendor,
  });
  const orders = await OrderModel.aggregate([
    { $unwind: "$items" },
    {
      $match: {
        "items.vendorId": vendor,
      },
    },
    {
      $group: {
        _id: "$_id",
        user: { $first: "$user" },
        createdAt: { $first: "$createdAt" },
        items: { $push: "$items" },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    { $skip: skip },
    { $limit: limit },
  ]);
  const response = {
    ...orders,
    page,
    total: orders.length,
    pages: Math.ceil(orders.length / limit),
  };
  logger.info("Vendor orders cached in redis", { vendorId: vendor });
  await redisClient.setEx(
    vendorOrders(vendor),
    2 * 60 * 1000,
    JSON.stringify(response),
  );
});
// update the status of order by vendor
const OrdersStatusUpdate = AsyncHandler(async (req: Request, res: Response) => {
  const vendor = req.user._id;
  logger.info("Orders status update request recieved", { vendorId: vendor });
  const orderNumber = req.params?.orderNumber;
  const { success, data, error } = orderNumberValidate.safeParse(orderNumber);
  if (!success) {
    throw new ApiError(400, error.message);
  }
  const status: OrderStatus = req.body?.status;
  if (
    !["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(
      status,
    )
  ) {
    logger.warn("Invalid Status", {
      vendorId: vendor,
      error: "Invalid Status",
    });
    throw new ApiError(400, "Invalid status!");
  }
  const updateStatus = await OrderModel.findOneAndUpdate(
    {
      orderNumber: data.orderNumber,
      "items?.vendorId": vendor,
    },
    {
      $set: {
        status: status,
      },
    },
    { new: true },
  );
  if (!updateStatus) {
    logger.error("You are not allowed to update this order item", {
      vendorId: vendor,
    });
    throw new ApiError(
      403,
      "You are not allowed to update this order item",
      false,
    );
  }
  // invalidate cache
  await redisClient.del(getOrderskey);
  await redisClient.del(getOrderkey(updateStatus?._id));

  res.json(
    new ApiResponse(201, updateStatus, "Order Status Updated successfully!"),
  );
});
export {
  InitiateCheckout,
  GetOrderById,
  GetOrders,
  GetVendorOrders,
  OrdersStatusUpdate,
};
