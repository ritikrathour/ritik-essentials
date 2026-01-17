import mongoose from "mongoose";
import {
  CreateReviewDTO,
  IReview,
  PaginationOptions,
  ReviewInteractionDTO,
  UpdateReviewDTO,
} from "../../types/Review.type";
import { ReviewModel } from "../models/Review.model";
import ApiError from "../../utils/ApiError";
import { ProductFeatureModel } from "../models/ProductFeature.model";

export const ReviewService = {
  async createReview(
    userId: mongoose.Types.ObjectId,
    data: CreateReviewDTO
  ): Promise<IReview> {
    // Check if user has already reviewed this product
    const existingReview = await ReviewModel.findOne({
      productId: data.productId,
      userId,
    });
    if (existingReview) {
      throw new ApiError(400, "You have already reviewed this product", false);
    }
    // Create review
    const review = await ReviewModel.create({
      productId: data.productId,
      userId,
      rating: data.rating,
      text: data.text,
      image: data.image,
      location: data.location,
      certified: true,
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
    });
    // Update product features
    if (data.features && data.features.length > 0) {
      await this.updateProductFeature(data.productId, data.features);
    }
    return review;
  },
  async updateProductFeature(
    productId: mongoose.Types.ObjectId,
    features: string[]
  ) {
    let productFeature = await ProductFeatureModel.findOne({
      productId,
    });
    if (!productFeature) {
      const featuresMap = new Map<string, number>();
      features.forEach((feature) => {
        featuresMap.set(feature, 1);
      });
      await ProductFeatureModel.create({ productId, features: featuresMap });
    } else {
      features.forEach((feature) => {
        const count = productFeature?.features.get(feature) || 0;
        productFeature?.features.set(feature, count + 1);
      });
      await productFeature.save();
    }
  },
  async getProductReviews(productId: string, options: PaginationOptions) {
    const { limit, page, rating, sortBy } = options;
    // build query
    let query: any = { productId };
    if (rating) {
      query.rating = rating;
    }
    // build sort
    let sort: any = { createdAt: -1 };
    switch (sortBy) {
      case "helpful":
        sort = { likes: -1, createdAt: -1 };
        break;
      case "rating_high":
        sort = { rating: -1, createdAt: -1 };
        break;
      case "rating_low":
        sort = { rating: 1, createdAt: -1 };
        break;
    }
    // Execute queries in parallel
    const [reviews, totalReviews, stats] = await Promise.all([
      ReviewModel.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ReviewModel.countDocuments(query),
      this.getProductStats(productId),
    ]);
    // Get customer features
    const ProductFeature = await ProductFeatureModel.findOne({
      productId,
    }).lean();
    // const customerFeatures = ProductFeature ? Array.from(ProductFeature.features?.entries()).sort()
    // Get customer images
    const reviewWithImages = await ReviewModel.find({
      productId,
      image: { $exist: true, $ne: null },
    })
      .select("image")
      .limit(10)
      .lean();
    const customerImages = reviewWithImages.slice(0, 4).map((r) => r.image);
    const moreImagesCount = Math.max(0, reviewWithImages.length - 4);
    // Format reviews with timeAgo
    const formattedReviews = reviews.map((review) => {
      const timeAgo = this.calculateTimeAgo(review.createdAt);
      return {
        id: review.id,
        rating: review.rating,
        text: review.text,
        image: review.image,
        timeAgo,
        location: review.location,
        certified: review.certified,
        likes: review.likes,
        dislikes: review.dislikes,
      };
    });
    return {
      avarageRating: stats.avarageRating,
      totalRating: stats.totalRating,
      totalReviews,
      ProductFeature,
      customerImages,
      moreImagesCount,
      reviews: formattedReviews,
    };
  },
  async getProductStats(productId: string) {
    const result = await ReviewModel.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: null,
          avarageRating: { $avg: "$rating" },
          totalRating: { $sum: 1 },
        },
      },
    ]);
    if (result.length === 0) {
      return { avarageRating: 0, totalRating: 0 };
    }
    return {
      avarageRating: Math.round(result[0].avarageRating * 10) / 10,
      totalRating: result[0].totalRating,
    };
  },
  calculateTimeAgo(date: Date) {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  },
  async updateProductReview(
    reviewId: string,
    data: UpdateReviewDTO,
    userId: mongoose.Types.ObjectId
  ): Promise<IReview> {
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      throw new ApiError(404, `Review Not found with this id ${reviewId}`);
    }
    if (review?.userId! === userId) {
      throw new ApiError(400, "Not authorized to update this review");
    }
    // Update fields
    if (data?.text !== undefined) review.text = data.text;
    if (data?.rating !== undefined) review.rating = data?.rating;
    if (data?.image !== undefined) review.image = data?.image;
    await review.save();
    return review;
  },
  async deleteProductReview(
    reviewId: string,
    userId: mongoose.Types.ObjectId
  ): Promise<void> {
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      throw new ApiError(404, `Review not found with this id ${reviewId}`);
    }
    if (review.userId !== userId) {
      throw new ApiError(400, "Not authorized to delete this review");
    }
    await ReviewModel.findByIdAndDelete(reviewId);
  },
  async interactWithReview(
    reviewId: string,
    userId: mongoose.Types.ObjectId,
    action: "like" | "dislike"
  ): Promise<{ likes: number; dislike: number }> {
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      throw new ApiError(404, `Review not found with this id ${reviewId}`);
    }
    const hasLiked = review.likedBy.includes(userId);
    const hasDisliked = review.dislikedBy.includes(userId);
    // remove previous interaction
    if (hasLiked) {
      review.likedBy = review.likedBy.filter((id) => id !== userId);
      review.likes = Math.max(0, review.likes - 1);
    }
    if (hasDisliked) {
      review.dislikedBy = review.dislikedBy.filter((id) => id !== userId);
      review.dislikes = Math.max(0, review.dislikes - 1);
    }
    // Add new interaction if different from previous
    if (action === "like" && !hasLiked) {
      review.likedBy.push(userId);
      review.likes += 1;
    } else if (action === "dislike" && !hasDisliked) {
      review.dislikedBy.push(userId);
      review.dislikes += 1;
    }
    await review.save();
    return { likes: review.likes, dislike: review.dislikes };
  },
};
