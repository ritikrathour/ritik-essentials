import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import ApiError from "../../utils/ApiError";
import FavProductModel from "../models/FavouriteProd.model";
import { ApiResponse } from "../../utils/ApiResponse";

const GetFavProducts = AsyncHandler(async (req: Request, res: Response) => {
  const product = req.body;
  const userId = req.user?._id;
  if (!product) {
    throw new ApiError(400, "Product id is required");
  }
});
const AddFavProducts = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  const userId = req.user?._id;
  if (!id) {
    throw new ApiError(400, "Product id is required");
  }
  const isAlreadyExistFav = await FavProductModel.find({ product: id });
  if (isAlreadyExistFav) {
    throw new ApiError(400, "Product Already Exist");
  }
  const CreateFavProduct = await FavProductModel.create({
    product: id,
    user: userId,
  });
  if (!CreateFavProduct) {
    throw new ApiError(500, "Not Added Fav product");
  }
  res.json(
    new ApiResponse(201, CreateFavProduct, "Fav Product Created successfully!")
  );
});
export { GetFavProducts, AddFavProducts };
