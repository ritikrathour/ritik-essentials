import mongoose, { FilterQuery, ObjectId } from "mongoose";
import {
  brandsExpiry,
  getBrandsKey,
  getProductCategory,
  getProductFiltersKeyList,
  getProductkey,
  getProductSkuKey,
  getVendorProductskey,
  productCategoryExpiry,
  productExpiry,
} from "../../libs/Redis_keys";
// import { redisClient } from "../../libs/RedisClient";
import {
  IPaginationResult,
  IProdStatus,
  IProduct,
  IProductFilters,
  IUpdateProduct,
} from "../../types/Product.type";
import ProductModel from "../models/Product.model";
import ApiError from "../../utils/ApiError";

export const ProductServices = {
  // create Product
  async createProduct(productData: IProduct): Promise<IProduct> {
    const product = new ProductModel(productData);
    const savedProduct = await product.save();
    // Invalidate cache
    // await redisClient.deletePattern("products:*");
    return savedProduct;
  },
  // update Product
  async updateProduct(id: string, productdata: IUpdateProduct) {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: productdata,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (product) {
      // update cache
      // await redisClient.setEx(
      //   getProductkey(id),
      //   productExpiry,
      //   JSON.stringify(product)
      // );
      // invalidate list cache  //TODO
    }
    return product;
  },
  // get product by ID
  async getProductById(id: string): Promise<IProduct | null> {
    // Try to get from cache first
    // const cachedProduct = await redisClient.get(getProductkey(id));
    // if (cachedProduct) {
    //   return JSON.parse(cachedProduct);
    // }
    const product = await ProductModel.findById(id);
    // if (product) {
    //   // Cache the product
    //   await redisClient.setex(
    //     getProductkey(id),
    //     productExpiry,
    //     JSON.stringify(product)
    //   );
    // }
    return product;
  },
  // get product by sku
  async getProductBySku(sku: string): Promise<IProduct | null> {
    // check sku in redis and return
    // const cachedProduct = await redisClient.get(getProductSkuKey(sku));
    // if (cachedProduct) {
    //   return JSON.parse(cachedProduct);
    // }
    // check sku in mongoDb database
    const product = await ProductModel.findOne({ sku: sku.toUpperCase() });
    // store product in redis
    if (product) {
      // await redisClient.setEx(
      //   getProductSkuKey(sku),
      //   productExpiry,
      //   JSON.stringify(product)
      // );
    }
    return product;
  },
  // delete product by id
  async deleteProduct(productId: string): Promise<boolean> {
    // check in DB and delete
    const product = await ProductModel.findByIdAndDelete(productId);
    if (product) {
      // clear cache
      // await redisClient.del(getProductkey(id));
      return true;
    }
    return false;
  },
  // get products :
  async getProducts(
    filters: IProductFilters
  ): Promise<IPaginationResult<IProduct>> {
    // first get cached result
    // const product = await redisClient.get(getProductFiltersKeyList(filters));
    // if (product) {
    //   return JSON.parse(product);
    // }
    const {
      page,
      limit,
      sort,
      order,
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      minStock,
      minRating,
      maxRating,
    } = filters;
    // build query
    const query: FilterQuery<IProduct> = {};
    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = {
        $regex: category,
        $options: "i",
      };
    }
    if (brand) {
      query.brand = {
        $regex: brand,
        $options: "i",
      };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }
    if (minStock) {
      query.stock = { $gte: minStock };
    }
    if (minRating !== undefined || maxRating !== undefined) {
      query.rating = {};
      if (minRating) query.rating.$gte = Number(minRating);
      if (maxRating) query.rating.$lte = Number(maxRating);
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    // Build sort object
    const sortObj: any = {};
    sortObj[sort] = order === "asc" ? 1 : -1;
    // Execute query
    const [products, total] = await Promise.all([
      ProductModel.find(query).sort(sortObj).skip(skip).limit(limit).lean(),
      ProductModel.countDocuments(query),
    ]);
    // calculate pages
    const totalPages = Math.ceil(total / limit);
    // structure the result
    const result: IPaginationResult<IProduct> = {
      data: products as IProduct[],
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
    // // cache the result
    // await redisClient.setEx(
    //   getProductFiltersKeyList(filters),
    //   productExpiry,
    //   JSON.stringify(result)
    // );
    return result;
  },
  // get Categories
  async getCategories() {
    // cached categories
    // const cachedCategories = await redisClient.get(getProductCategory());
    // if (cachedCategories) {
    //   return JSON.parse(cachedCategories);
    // }
    const categories = await ProductModel.aggregate([
      {
        $match: { isActive: true },
      },
      {
        $group: {
          _id: "$category",
          image: { $first: { $arrayElemAt: ["$images", 0] } }, // pick first image from the first product in each category
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          image: 1,
          count: 1,
        },
      },
    ]);
    // set cached categories
    // await redisClient.setEx(
    //   getProductCategory(),
    //   productCategoryExpiry,
    //   JSON.stringify(categories)
    // );
    return categories;
  },
  // get brands
  async getBrands() {
    // first get cache
    // const cachedBrands = await redisClient.get(getBrandsKey());
    // if (cachedBrands) {
    //   return JSON.parse(cachedBrands);
    // }
    // call db query for brands
    const brands = await ProductModel.aggregate([
      {
        $match: { isActive: true },
      },
      {
        $group: {
          _id: "$brand",
          // count: {'$count'}
        },
      },
      {
        $project: {
          _id: 0,
          brand: "$_id",
          count: 1,
        },
      },
    ]);
    // store brands in cached
    // await redisClient.setEx(
    //   getBrandsKey(),
    //   brandsExpiry,
    //   JSON.stringify(brands)
    // );
    return brands;
  },
  // get ProductsByVendor
  async getProductsByVendor(vendorId: string) {
    // first check products in cache
    // const cachedProducts = await redisClient.get(
    //   getVendorProductskey(vendorId)
    // );
    // if (cachedProducts) {
    //   return JSON.parse(cachedProducts);
    // }
    // call DB query
    const products = await ProductModel.find({ _id: vendorId })
      .populate("vendor", "name email")
      .lean();
    // store products in cache
    // await redisClient.setEx(
    //   getVendorProductskey(vendorId),
    //   productExpiry,
    //   JSON.stringify(products)
    // );
    return products;
  },
  // update product status
  async updateProductStatus(prodId: string, status: IProdStatus) {
    return await ProductModel.findOneAndUpdate(
      { _id: prodId },
      {
        $set: status,
      },
      {
        new: true,
      }
    );
  },
  async getVendorProductById(payload: { productId: string; vendorId: any }) {
    // first get cache
    // const cachedBrands = await redisClient.get(getBrandsKey());
    // if (cachedBrands) {
    //   return JSON.parse(cachedBrands);
    // }
    const VendorProduct = await ProductModel.findOne({
      _id: payload.productId,
      vendor: payload.vendorId,
    });
    if (!VendorProduct) {
      throw new ApiError(404, "Product not found!", false);
    }
    // store brands in cached
    // await redisClient.setEx(
    //   getBrandsKey(),
    //   brandsExpiry,
    //   JSON.stringify(brands)
    // );
    return VendorProduct;
  },
};
