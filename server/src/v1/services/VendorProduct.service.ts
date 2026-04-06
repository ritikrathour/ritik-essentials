import { FilterQuery } from "mongoose";
import { productExpiry } from "../../libs/Redis_keys";
import { redisClient } from "../../libs/RedisClient";
import { IProduct } from "../../types/Product.type";
import ProductModel from "../models/Product.model";
export const VendorProduct = {
  async getProduct(filters: any) {
    // first get products from redis cache
    const cacheKey = `products:${filters?.vendorId}:page=${filters?.page}:limit=${filters?.limit}:category=${filters?.category || "all"}`;
    const VendorProducts = await redisClient.get(cacheKey);
    if (VendorProducts) {
      return JSON.parse(VendorProducts);
    }
    const { category, limit, page, search, status, sortOrder, vendorId } =
      filters;
    //   build query filter
    const query: FilterQuery<IProduct> = {};
    if (vendorId) {
      query.vendor = vendorId;
    }
    if (category) {
      query.category = {
        $regex: category,
        $options: "i",
      };
    }
    if (search) {
      query.$text = { $search: search };
    }
    if (status) {
      query.status = status;
    }
    // Calculate pagination
    const skip = (page - 1) * limit;
    // execute query
    const [products, total] = await Promise.all([
      ProductModel.find(query)
        .skip(skip)
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean(),
      ProductModel.countDocuments(query),
    ]);
    // calculate pages
    const totalPages = Math.ceil(total / limit);
    // structure the result
    const result = {
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
      },
    };
    // cache the reuslt
    await redisClient.setEx(cacheKey, productExpiry, JSON.stringify(result));
    return result;
  },
};
