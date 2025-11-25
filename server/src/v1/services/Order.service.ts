import mongoose from "mongoose";
import OrderModel from "../models/Order.model";

export const OrderService = {
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
};
