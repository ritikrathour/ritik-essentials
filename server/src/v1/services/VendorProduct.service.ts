import { FilterQuery } from "mongoose";
import { getProductFiltersKeyList, productExpiry } from "../../libs/Redis_keys";
import { redisClient } from "../../libs/RedisClient";
import { IProduct } from "../../types/Product.type";
import ProductModel from "../models/Product.model";
export const VendorProduct = {
  async getProduct(filters: any) {
    // first get products from redis cache
    // const products = await redisClient.get(getProductFiltersKeyList(filters))
    // if(products){
    //     return JSON.parse(products)
    // }
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
        .sort(sortOrder || "asc")
        .skip(skip)
        .limit(limit)
        .lean(),
      ProductModel.countDocuments(query),
    ]);
    // calculate pages
    const totalPages = Math.ceil(total / limit);
    // structure the result
    const result = {
      data: products as IProduct[],
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
      },
    };
    // cache the reuslt
    // await redisClient.setEx(
    //   getProductFiltersKeyList(filters),
    //   productExpiry,
    //   JSON.stringify(result)
    // );
    return result;
  },
};
