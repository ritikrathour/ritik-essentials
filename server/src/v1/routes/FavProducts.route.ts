import express from "express";
import Authenticate from "../middlewares/Authtenticate.middleware";
import {
  AddFavProducts,
  GetFavProducts,
  RemoveFavProduct,
} from "../controllers/FavouriteProducts.controller";
const favProductsRouter = express.Router();

favProductsRouter.route("/fav-product").post(Authenticate, AddFavProducts);
favProductsRouter
  .route("/fav-product/:productId")
  .delete(Authenticate, RemoveFavProduct);
favProductsRouter.route("fav-prodcut").get(Authenticate, GetFavProducts);

export { favProductsRouter };
