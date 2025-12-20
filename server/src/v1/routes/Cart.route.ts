import express from "express";
import {
  AddToCart,
  ClearCart,
  GetCart,
  RemoveItem,
  UpdateItem,
} from "../controllers/Cart.controller";
import Authenticate from "../middlewares/Authtenticate.middleware";
const cartRouter = express.Router();

cartRouter.route("/cart").get(Authenticate, GetCart);
cartRouter.route("/cart/item").post(Authenticate, AddToCart);
cartRouter
  .route("/cart/item/update-quantity/:itemId")
  .patch(Authenticate, UpdateItem);
cartRouter.route("/cart/item/:itemId").delete(Authenticate, RemoveItem);
cartRouter.route("/cart/clear").delete(Authenticate, ClearCart);

export { cartRouter };
