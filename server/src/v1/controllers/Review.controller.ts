import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import { CreateReviewDTO } from "../../types/Review.type";
import { ReviewService } from "../services/Review.service";
import ApiError from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import mongoose from "mongoose";
// CreateReview
const CreateReview = AsyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const data: CreateReviewDTO = req.body;
  const review = await ReviewService.createReview(user?._id, data);
  if (!review) {
    throw new ApiError(500, "Review not created!");
  }
  res.json(new ApiResponse(201, review, "Review created successfully!"));
});
// getProductReviews
const GetProductReview = AsyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const page = parseInt(req.params.page as string) || 1;
  const limit = parseInt(req.params.limit as string) || 10;
  const sortBy = req.params.sortBy as string;
  const rating = req.params.rating
    ? parseInt(req.params.rating as string)
    : undefined;
  const result = await ReviewService.getProductReviews(productId, {
    page,
    limit,
    sortBy,
    rating,
  });
  res.json(
    new ApiResponse(
      200,
      {
        data: result,
        pagination: {
          currentPage: page,
          pageSize: limit,
          totalReviews: result.totalReviews,
          totalPages: Math.floor(result.totalReviews / limit),
        },
      },
      "Products Reviews get successfully!"
    )
  );
});
export { CreateReview, GetProductReview };
