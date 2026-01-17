import { Request, Response } from "express";
import AsyncHandler from "../../utils/AsyncHandler";
import {
  CreateReviewDTO,
  ReviewInteractionDTO,
  UpdateReviewDTO,
} from "../../types/Review.type";
import { ReviewService } from "../services/Review.service";
import ApiError from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import OrderModel from "../models/Order.model";
// CreateReview
const CreateReview = AsyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const data: CreateReviewDTO = req.body;
  // 1. Verify Purchase: Look for a completed order with this product and user
  const hasPurchased = await OrderModel.findOne({
    user,
    productId: data?.productId,
    isPaid: true,
  });
  if (!hasPurchased) {
    throw new ApiError(
      403,
      "You can only review products you have purchased.",
      false
    );
  }
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
// update review
const UpdateProductReview = AsyncHandler(
  async (req: Request, res: Response) => {
    const { reviewId } = req.params;
    const data: UpdateReviewDTO = req.body;
    const user = req.user._id;
    const updateReview = await ReviewService.updateProductReview(
      reviewId,
      data,
      user
    );
    if (!updateReview) {
      throw new ApiError(500, "Review not updated At!", false);
    }
    res.json(
      new ApiResponse(200, updateReview, "Review updated successfully!")
    );
  }
);
const DeleteProductreview = AsyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user._id;
    const { reviewId } = req.params;
    const deleteReview = await ReviewService.deleteProductReview(
      reviewId,
      user
    );
    res.json(
      new ApiResponse(200, { deleteReview }, "Review deleted successfully!")
    );
  }
);
const InteractWithReview = AsyncHandler(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const user = req.user._id;
  const { action }: ReviewInteractionDTO = req.body;
  const result = await ReviewService.interactWithReview(reviewId, user, action);
  res.json(new ApiResponse(201, result, "Interaction added!"));
});
export {
  CreateReview,
  GetProductReview,
  UpdateProductReview,
  DeleteProductreview,
  InteractWithReview,
};
