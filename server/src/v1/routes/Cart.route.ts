import express from "express";
import {
  AddToCart,
  ClearCart,
  GetCart,
  RemoverItem,
} from "../controllers/Cart.controller";
import Authenticate from "../middlewares/Authtenticate.middleware";
const cartRouter = express.Router();

cartRouter.route("/cart").get(Authenticate, GetCart);
cartRouter.route("/cart/items/:productId").post(Authenticate, AddToCart);
cartRouter.route("/cart/items").delete(Authenticate, RemoverItem);
cartRouter.route("/cart/clear").delete(Authenticate, ClearCart);

export { cartRouter };
