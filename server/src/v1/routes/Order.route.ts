import express from "express";
import Authenticate from "../middlewares/Authtenticate.middleware";
import { GetOrders } from "../controllers/Order.controller";
const orderRouter = express.Router();
orderRouter.route("/my-orders").get(Authenticate, GetOrders);
export { orderRouter };
