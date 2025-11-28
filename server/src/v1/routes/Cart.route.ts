import express from "express";
import { AddToCart, GetCart } from "../controllers/Cart.controller";
import Authenticate from "../middlewares/Authtenticate.middleware";
const cartRouter = express.Router();

cartRouter.route("/cart").get(Authenticate, GetCart);
cartRouter.route("/cart/items").post(Authenticate, AddToCart);

export { cartRouter };
