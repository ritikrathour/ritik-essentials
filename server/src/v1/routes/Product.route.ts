import {
  CreateProduct,
  DeleteProduct,
  GetBrands,
  GetCategories,
  GetProductById,
  GetProductBySku,
  GetProducts,
  GetProductsByVendor,
  VendorProducts,
} from "../controllers/Product.controller";
import express from "express";
import Authenticate from "../middlewares/Authtenticate.middleware";
import { isVendor } from "../middlewares/IsVendor.middleware";
export const productroute = express.Router();
productroute.route("/product").post(Authenticate, isVendor, CreateProduct);
productroute
  .route("/vendor-products")
  .get(Authenticate, isVendor, VendorProducts);
productroute.route("/products").get(GetProducts);
productroute.route("/productSKU/:sku").get(GetProductBySku);
productroute.route("/brands").get(GetBrands);
productroute.route("/product/:id").get(GetProductById);
productroute.route("/categories").get(GetCategories);
productroute.route("/vendor-products/:vendorId").get(GetProductsByVendor);
productroute
  .route("/product/:id")
  .delete(Authenticate, isVendor, DeleteProduct);
