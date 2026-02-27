import { Router } from "express";
import Authenticate from "../middlewares/Authtenticate.middleware";
import {
  GetOrderById,
  GetOrders,
  GetVendorOrders,
  InitiateCheckout,
  OrdersStatusUpdate,
} from "../controllers/Checkout.controller";
import { isVendor } from "../middlewares/IsVendor.middleware";
export const checkoutRouter = Router();
// customer route
checkoutRouter.route("/order").post(Authenticate, InitiateCheckout);
checkoutRouter.route("/order/:orderId").get(Authenticate, GetOrderById);
checkoutRouter.route("/orders").get(Authenticate, GetOrders);
// vendor route
checkoutRouter
  .route("/vendor-orders")
  .get(Authenticate, isVendor, GetVendorOrders);
checkoutRouter
  .route("/order-status/:orderNumber")
  .patch(Authenticate, isVendor, OrdersStatusUpdate);
