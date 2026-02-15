import mongoose from "mongoose";
import OrderModel from "../models/Order.model";
import { ICheckoutItem, ICheckoutRequest } from "../../types/Checkout.type";
import ProductModel from "../models/Product.model";
import ApiError from "../../utils/ApiError";
// import { redisClient } from "../../libs/RedisClient";
// import { InventoryReservation } from "../../libs/Redis_keys";

export const CheckoutService = {
  getOrders: async (userId: {}, limit: number) => {
    const order = await OrderModel.find({ user: userId })
      .populate({
        path: "items.product",
        select: "name price brand image",
      })
      .sort({ createdAt: -1 })
      .limit(limit || 10); // latest orders first
    return order;
  },
  initiateCheckout: async (
    userId: mongoose.Types.ObjectId,
    checkoutData: ICheckoutRequest,
  ) => {
    // 1. Validate and fetch products
    const validatedItems = await CheckoutService.validateAndFetchItems(
      checkoutData.items,
    );
    // 2. Check inventory availability
    for (const item of validatedItems) {
      const hasStock = await ProductModel.findById(item.product._id);
      if (!hasStock || hasStock.stock < item.quantity) {
        throw new ApiError(
          400,
          `Insufficient stock for ${item.product?.name}. Available: ${item.product.stock}`,
        );
      }
    }
    // 3. Calculate pricing
    const pricing = await PricingService.calculateOrderPricing(
      validatedItems,
      checkoutData.couponCode,
    );
    // 4. Generate order number
    const orderNumber = await GenerateOrderNumber();
    //  5. Create order
    const order = await OrderModel.create({
      orderNumber,
      user: userId,
      items: validatedItems,
      shippingAddress: checkoutData.shippingAddress,
      totalAmount: pricing.subTotal,
      discount: pricing.discout,
      coupon: pricing.coupon,
      paymentMethod: checkoutData.paymentMethod,
      shippingCharges: pricing.shippingCarges,
      status: "PLACED",
      isPaid: false,
    });
    // 6. Reserve inventory
    // Create inventory reservations with TTL (30 minutes)
    // for (const item of validatedItems) {
    //   await redisClient.setEx(
    //     InventoryReservation(userId),
    //     30 * 60 * 1000,
    //     JSON.stringify(item.quantity),
    //   );
    // }
    return order;
  },
  validateAndFetchItems: async (items: ICheckoutItem[]) => {
    const productIds = items.map((item) => item.productId);
    const products = await ProductModel.find({
      _id: { $in: productIds },
      // status: "publised",
    });
    if (products?.length !== items?.length) {
      throw new ApiError(400, "Some products are not available");
    }
    return items?.map((item) => {
      const product = products.find(
        (prod) => prod?._id?.toString() === item.productId,
      );
      if (!product) {
        throw new ApiError(400, `Product ${item.productId} not found`);
      }
      return {
        product,
        quantity: item.quantity,
        vendorId: item.vendorId,
        name: item.name,
        price: product?.price,
        sku: product?.sku,
        discount: product.discount,
        total: 0,
        tax: 0,
      };
    });
  },
};
const PricingService = {
  calculateOrderPricing: async (items: any[], couponCode?: string) => {
    let subTotal = 0;
    // calculate subTotal and item-level pricing
    for (const item of items) {
      let itemPrice = item.price * item.quantity;
      item.total = item.price;
      subTotal += itemPrice;
    }
    // Apply coupon if provided
    let discout = 0;
    let coupon = "";
    if (couponCode) {
      // validate and apply coupon TODO
      // const couponResult = await
    }
    const shippingCarges = PricingService.calculateShipping(subTotal);
    const total = shippingCarges + subTotal;
    return {
      subTotal,
      discout,
      shippingCarges,
      total,
      coupon,
    };
  },
  calculateShipping: (subtotal: number): number => {
    // free shipping above threshold
    if (subtotal >= 500) return 0;
    let shippingRate = 9;
    return shippingRate;
  },
};
const GenerateOrderNumber = async (): Promise<string> => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};
