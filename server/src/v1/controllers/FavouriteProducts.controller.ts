import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import ApiError from "../../utils/ApiError";
import FavProductModel from "../models/FavouriteProd.model";
import { ApiResponse } from "../../utils/ApiResponse";

const GetFavProducts = AsyncHandler(async (req: Request, res: Response) => {
  const productId = req.body?.productId;
  if (!productId) {
    throw new ApiError(400, "Product id is required");
  }
  const userId = req.user?._id;
  const page = parseInt(req.query?.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortby = (req.query.sortby as string) || "createdAt";
  const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";
  const sortObj: any = {};
  sortObj[sortby] = sortOrder === "asc" ? 1 : -1;
  const skip = page - 1 * limit;
  const [favProducts, total] = await Promise.all([
    await FavProductModel.find({
      user: userId,
      product: productId,
    })
      .sort(sortObj)
      .skip(skip)
      .lean(),
    await FavProductModel.countDocuments({ user: userId, product: productId }),
  ]);
  const totalPages = Math.ceil(total / limit);
  const result = {
    data: favProducts,
    pagination: {
      page,
      limit,
      total,
      pages: totalPages,
    },
  };
  res.json(new ApiResponse(200, result, "favProduct Get successfully!"));
});
const AddFavProducts = AsyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.body;
  const userId = req.user?._id;
  if (!productId) {
    throw new ApiError(400, "Product id is required");
  }
  const isAlreadyExistFav = await FavProductModel.countDocuments({
    user: userId,
    product: productId,
  });
  if (isAlreadyExistFav > 0) {
    throw new ApiError(409, "Product already in favorites", false);
  }
  const favorite = await FavProductModel.create({
    product: productId,
    user: userId,
  });
  if (!favorite) {
    throw new ApiError(500, "Favorite Product not added!");
  }
  res.json(new ApiResponse(201, favorite, "Fav Product Created successfully!"));
});
const RemoveFavProduct = AsyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const userId = req.user._id;
  if (!productId) {
    throw new ApiError(400, "Product id is required!", false);
  }
  const isFavProduct = await FavProductModel.countDocuments({
    user: userId,
    product: productId,
  });
  if (isFavProduct === 0) {
    throw new ApiError(404, "Product Not found", false);
  }
  // remove favProduct
  const removedFavProduct = await FavProductModel.deleteOne({
    user: userId,
    product: productId,
  });
  console.log(removedFavProduct);
  // if (removedFavProduct?.deletedCount > 0) {
  //   throw new ApiError(404, "FavProduct not found!", false);
  // }
  res.json(new ApiResponse(200, {}, "Product removed Successfully"));
});
export { GetFavProducts, AddFavProducts, RemoveFavProduct };
