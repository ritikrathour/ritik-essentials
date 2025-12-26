import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import { CategoryValidate } from "../../utils/Validation";
import ApiError from "../../utils/ApiError";
import CategoryModel from "../models/Category.model";
import { ApiResponse } from "../../utils/ApiResponse";
// import { redisClient } from "../../libs/RedisClient";
// import { categoriesExpiry, categoriesKey } from "../../libs/Redis_keys";

// create category
const CreateCategory = AsyncHandler(async (req: Request, res: Response) => {
  const { name, parent } = req.body;
  // validation
  const { errors, valid } = CategoryValidate({ name, parent });
  if (!valid) {
    throw new ApiError(400, errors.join(", "), false);
  }
  // find category in db
  const isCategory = await CategoryModel.findOne({ name });
  if (isCategory) {
    throw new ApiError(400, "This Categroy is Already Exist!");
  }
  // create category in DB
  const CreateCategory = await CategoryModel.create({
    name,
    parent,
  });
  if (!CreateCategory) {
    throw new ApiError(500, "Category not Created yet!");
  }
  res.json(
    new ApiResponse(201, CreateCategory, "Category Created Successfully!")
  );
});
// fetch Categories
const FetchCategroy = AsyncHandler(async (req: Request, res: Response) => {
  const categories = await CategoryModel.find().lean();
  // const isCategories = await redisClient.get(categoriesKey());
  // if (isCategories) {
  //   return JSON.parse(isCategories);
  // }
  if (!categories) {
    throw new ApiError(500, "Categories Not Fetched!");
  }
  // await redisClient.setEx(
  //   categoriesKey(),
  //   categoriesExpiry,
  //   JSON.stringify(categories)
  // );
  res.json(
    new ApiResponse(200, categories, "Categories Fetched successfully!")
  );
});
export { CreateCategory, FetchCategroy };
