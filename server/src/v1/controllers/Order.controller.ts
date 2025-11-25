import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import ApiError from "../../utils/ApiError";
import { OrderService } from "../services/Order.service";
import { ApiResponse } from "../../utils/ApiResponse";

const GetOrders = AsyncHandler(async (req: Request, res: Response) => {
  const userID = req.user?._id;
  const { limit } = req.params;
  if (!userID) {
    throw new ApiError(401, "UnAthorised User!");
  }
  const orders = await OrderService?.getOrders(userID, Number(limit));
  if (!orders) {
    throw new ApiError(500, "order not fetched");
  }
  res.json(new ApiResponse(200, orders, "Order fetched successfully!"));
});
const CreateOrder = AsyncHandler(async (req: Request, res: Response) => {
  const order = req.body;
});
export { GetOrders, CreateOrder };
