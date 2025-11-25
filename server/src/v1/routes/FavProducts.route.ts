import express from "express";
import Authenticate from "../middlewares/Authtenticate.middleware";
import { AddFavProducts } from "../controllers/FavouriteProducts.controller";
const favProductsRouter = express.Router();
favProductsRouter.route("/fav-product").post(Authenticate, AddFavProducts);
export { favProductsRouter };
