import express from "express";
import { GetCart } from "../controllers/Cart.controller";
import Authenticate from "../middlewares/Authtenticate.middleware";
const cartRouter = express.Router();

cartRouter.route("/cart").get(Authenticate, GetCart);

export { cartRouter };
