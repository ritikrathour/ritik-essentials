import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import ApiError from "../../utils/ApiError";
import OrderModel from "../models/Order.model";
import ProductModel from "../models/Product.model";
import { ApiResponse } from "../../utils/ApiResponse";
import { redisClient } from "../../libs/RedisClient";
import { vendorDashboard } from "../../libs/Redis_keys";
import { logger } from "../../config/Logger";

export const GetVendorDashBoard = AsyncHandler(
  async (req: Request, res: Response) => {
    const vendorId = req.user._id;
    logger.info("Get dashboard request received", { vendorId });
    if (!vendorId) {
      logger.warn("Invalid vendorId");
      throw new ApiError(401, "Unauthorised User!");
    }
    // check cache
    // const cachedDashboard = await redisClient.get(vendorDashboard(vendorId));
    // if (cachedDashboard) {
    //   logger.info("Dashboard cache hit", vendorId);
    //   res.json(
    //     new ApiResponse(
    //       200,
    //       cachedDashboard,
    //       "Vendor dashboard fetched succefully!",
    //     ),
    //   );
    //   return;
    // }
    logger.info("Cache miss fetch from DB", vendorId);
    //  1️⃣ TOTAL REVENUE + TOTAL ORDERS + ACTIVE CUSTOMERS
    const orderStats = await OrderModel.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.vendorId": vendorId,
          isPaid: true,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ["$items.quantity", "$items.price"],
            },
          },
          totalOrders: { $addToSet: "$_id" },
          customers: { $addToSet: "$user" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalOrders: { $size: "$totalOrders" },
          activeCutomers: { $size: "$customers" },
        },
      },
    ]);
    // 2️⃣ ACTIVE PRODUCTS
    const activeProducts = await ProductModel.countDocuments({
      vendor: vendorId,
      status: "publised",
    });
    const dashboard = {
      totalRevenue: 0,
      totalOrders: 0,
      activeCustomer: 0,
      ...orderStats, // orderStats values override defaults if they exist
      activeProducts, // Shorthand for activeProducts: activeProducts
    };
    logger.info("Dashboard cached in redis", vendorId);
    // cache impliment
    // await redisClient.setEx(
    //   vendorDashboard(vendorId),
    //   300,
    //   JSON.stringify(dashboard),
    // );
    res.json(
      new ApiResponse(200, dashboard, "Vendor dashboard fetched succefully!"),
    );
  },
);
