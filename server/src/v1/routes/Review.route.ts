import express from "express";
import Authenticate from "../middlewares/Authtenticate.middleware";
import {
  CreateReview,
  DeleteProductreview,
  GetProductReview,
  InteractWithReview,
  UpdateProductReview,
} from "../controllers/Review.controller";
import { ReviewValidate } from "../middlewares/ZodValidationMiddleware/ReviewValidate";
import { createReviewValidation } from "../../utils/zodValidation/ReviewValidatain";
export const reviewRouter = express.Router();
reviewRouter
  .route("/review")
  .post(Authenticate, ReviewValidate(createReviewValidation), CreateReview);
reviewRouter
  .route("/review/:productId")
  .post(Authenticate, UpdateProductReview);
reviewRouter
  .route("/review/:reviewId")
  .delete(Authenticate, DeleteProductreview);
reviewRouter.route("/review/:productId").get(GetProductReview);
reviewRouter
  .route("/review/:reviewId/interact")
  .post(Authenticate, InteractWithReview);
