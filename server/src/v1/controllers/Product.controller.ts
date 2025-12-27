import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import {
  parseProductFilters,
  validateCreateProduct,
  validatePaginationQuery,
  ValidateUpdateProduct,
} from "../../utils/Validation";
import ApiError from "../../utils/ApiError";
import { ProductServices } from "../services/Product.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { isValidObjectId } from "mongoose";
import UserModel from "../models/User.model";
import { VendorProduct } from "../services/VendorProduct.service";
import { IProdStatus } from "../../types/Product.type";
// ----------------------------------- Authenticated (Vendor/Admin)-----------------------------------

// create product
const CreateProduct = AsyncHandler(async (req: Request, res: Response) => {
  // validation
  const validation = validateCreateProduct(req.body);
  if (!validation.isvalid) {
    let { errors } = validation;
    throw new ApiError(400, "Validation failed", false, errors);
  }
  // Check if SKU already exists
  const existingProduct = await ProductServices.getProductBySku(req.body.sku);
  if (existingProduct) {
    throw new ApiError(409, "Product with this SKU already exists", false);
  }
  // create product
  const product = await ProductServices.createProduct(req.body);
  if (!product) {
    throw new ApiError(500, "Product Not created");
  }
  res.json(new ApiResponse(201, product, "Product created successfully"));
});
// delete product
const DeleteProduct = AsyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  if (!productId) {
    throw new ApiError(404, "product Id is required!");
  }
  if (!isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid product id!", false);
  }
  // delete product from DB
  const deleteProduct = await ProductServices.deleteProduct(productId);
  if (!deleteProduct) {
    throw new ApiError(500, "Product not deleted!", false);
  }
  res.json(new ApiResponse(200, {}, "Product deleted successfully!"));
});
// update product
const UpdateProduct = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(401, "Invalid product ID format", false);
  }
  // validate req body
  const validation = ValidateUpdateProduct(req.body);
  if (!validation.isValid) {
    throw new ApiError(400, "Validation failed", false);
  }
  // find the product in cache and db
  const product = await ProductServices.getProductById(id);
  if (!product) {
    throw new ApiError(404, "product not found with this id");
  }
  // UpdateProduct Service
  const updateProduct = await ProductServices.updateProduct(id, req.body);
  if (!updateProduct) {
    throw new ApiError(500, "Product not updated");
  }
  res.json(
    new ApiResponse(200, { updateProduct }, "Product updated successfully")
  );
});
// get vendor products
const VendorProducts = AsyncHandler(async (req: Request, res: Response) => {
  const vendorId = req.user?._id;
  // validation
  const query = validatePaginationQuery(req.query);
  const result = await VendorProduct.getProduct({
    ...query,
    vendorId: vendorId,
  });
  if (!result || result?.data.length === 0) {
    throw new ApiError(404, "Product not found!", false);
  }
  res.json(
    new ApiResponse(200, result, "Vendor Products retrieved successfully!")
  );
});
// updata product's status (published or draft)
const UpdateProductStatus = AsyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    if (!productId) {
      throw new ApiError(404, "Product id is required!");
    }
    // validate id
    if (!isValidObjectId(productId)) {
      throw new ApiError(400, "Invalid product id!");
    }
    const status: IProdStatus = req.body;
    if (!status) {
      throw new ApiError(400, "Status is required!");
    }
    // find the product from id
    const product = await ProductServices.getProductById(productId);
    if (!product) {
      throw new ApiError(404, `Product not found with this id ${productId}`);
    }
    // update status
    const updateStatus = await ProductServices.updateProductStatus(
      productId,
      status
    );
    if (!updateStatus) {
      throw new ApiError(500, "Product status not updated!");
    }
    res.json(
      new ApiResponse(200, updateStatus, "Product Status updated successfully!")
    );
  }
);
// ----------------------------------- Authenticated (Vendor/Admin)-----------------------------------
// ----------------------------------- Public Routes -----------------------------------
// get product
const GetProducts = AsyncHandler(async (req: Request, res: Response) => {
  const filters = parseProductFilters(req.query);
  const result = await ProductServices.getProducts(filters);
  if (!result || result.data.length === 0) {
    throw new ApiError(404, "No products found", false);
  }
  res.json(new ApiResponse(200, { result }, "Products retrieved successfully"));
});
// get products by vendor
const GetProductsByVendor = AsyncHandler(
  async (req: Request, res: Response) => {
    const { vendorId } = req.params;
    if (!isValidObjectId(vendorId)) {
      throw new ApiError(400, "Invalid vendor id!", false);
    }
    const vendor = await UserModel.find({ _id: vendorId, role: "vendor" });
    if (!vendor) {
      throw new ApiError(404, "Vendor not found", false);
    }
    // check vendor products in cache and db
    const products = await ProductServices.getProductsByVendor(vendorId);
    if (!products || products.length === 0) {
      throw new ApiError(404, "No products found for this vendor", false);
    }
    res.json(
      new ApiResponse(
        200,
        {
          ...products,
          productsCount: products.length,
          vendor: { vedorName: vendor[0].name, vendorEmail: vendor[0].email },
        },
        "Vendor's Products fetched successfully"
      )
    );
  }
);
// get product by id
const GetProductById = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(404, "please provide product id!", false);
  }
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid product id!", false);
  }
  // exist product
  const existProduct = await ProductServices.getProductById(id);
  if (!existProduct) {
    throw new ApiError(404, "Product not found with this id", false);
  }

  res.json(new ApiResponse(200, existProduct, "Product fetched successfully!"));
});
// get product sku
const GetProductBySku = AsyncHandler(async (req: Request, res: Response) => {
  const { sku } = req.params;
  if (!sku || sku.trim().length === 0) {
    throw new ApiError(400, "SKU is required", false);
  }
  const product = await ProductServices.getProductBySku(sku);
  if (!product) {
    throw new ApiError(404, "Product not found with this SKU", false);
  }
  res.json(new ApiResponse(200, product, "Product fetched successfully"));
});
// get Categories
const GetCategories = AsyncHandler(async (_, res: Response) => {
  const category = await ProductServices.getCategories();
  if (!category || category.length === 0) {
    throw new ApiError(404, "No categories found", false);
  }
  res.json(
    new ApiResponse(200, { category }, "Categories retrieved successfully")
  );
});
// get brands
const GetBrands = AsyncHandler(async (_, res: Response) => {
  const brands = await ProductServices.getBrands();
  if (!brands || brands.length === 0) {
    throw new ApiError(404, "No brands found", false);
  }
  res.json(new ApiResponse(200, brands, "Brands retrieved successfully"));
});
// get user orders
const GetUserOrders = AsyncHandler(async (req: Request, res: Response) => {});
// ----------------------------------- Public Routes -----------------------------------
export {
  CreateProduct,
  GetProducts,
  GetProductById,
  DeleteProduct,
  UpdateProduct,
  GetProductBySku,
  GetCategories,
  GetBrands,
  GetProductsByVendor,
  GetUserOrders,
  VendorProducts,
  UpdateProductStatus,
};

//
//{ GET     /api/products                   // Get all products (with filters, pagination, search, sorting)
// GET     /api/products/:id               // Get single product details
// GET     /api/products/category/:slug    // Get products by category
// GET     /api/products/vendor/:vendorId  // Get products by vendor}
//
// // Authenticated (Vendor/Admin)
//{ POST    /api/products                   // Create new product (vendor/admin only)
// PUT     /api/products/:id               // Update product details
// DELETE  /api/products/:id               // Delete product}
//
// // Extra Features
// PUT     /api/products/:id/images        // Update/add product images
// PUT     /api/products/:id/stock         // Update stock/quantity
// PUT     /api/products/:id/price         // Update product price
// PUT     /api/products/:id/status        // Enable/disable product (active/inactive)
//
// // Reviews & Ratings
// POST    /api/products/:id/reviews       // Add product review (customer only)
// GET     /api/products/:id/reviews       // Get all reviews of a product
// DELETE  /api/products/:id/reviews/:id  // Delete review (owner/admin)
//
// // Admin
// GET     /api/admin/products             // Get all products (admin dashboard, with advanced filters)
