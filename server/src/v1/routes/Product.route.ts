import {
  CreateProduct,
  DeleteProduct,
  FetchVendorProductById,
  GetBrands,
  GetCategories,
  GetProductById,
  GetProductBySku,
  GetProducts,
  GetProductsByVendor,
  UpdateProduct,
  UpdateProductStatus,
  VendorProducts,
} from "../controllers/Product.controller";
import express from "express";
import Authenticate from "../middlewares/Authtenticate.middleware";
import { isVendor } from "../middlewares/IsVendor.middleware";
export const productroute = express.Router();
// vendor
productroute.route("/product").post(Authenticate, isVendor, CreateProduct);
productroute
  .route("/vendor-products")
  .get(Authenticate, isVendor, VendorProducts);
productroute
  .route("/product/:productId")
  .delete(Authenticate, isVendor, DeleteProduct);
productroute
  .route("/product/status/:productId")
  .patch(Authenticate, isVendor, UpdateProductStatus);
productroute.route("/product/:id").patch(Authenticate, isVendor, UpdateProduct);
productroute
  .route("/product/:productId")
  .get(Authenticate, isVendor, FetchVendorProductById);
// public
productroute.route("/products").get(GetProducts);
productroute.route("/productSKU/:sku").get(GetProductBySku);
productroute.route("/brands").get(GetBrands);
productroute.route("/product/:id").get(GetProductById);
productroute.route("/categories").get(GetCategories);
productroute.route("/vendor-products/:vendorId").get(GetProductsByVendor);
