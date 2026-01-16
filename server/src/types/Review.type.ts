// src/types/index.ts

import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
  _id: string;
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  text: string;
  image?: string;
  location: string;
  certified: boolean;
  likes: number;
  dislikes: number;
  likedBy: mongoose.Types.ObjectId[];
  dislikedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductFeature extends Document {
  productId: string;
  features: Map<string, number>;
}

export interface CreateReviewDTO {
  productId: string;
  rating: number;
  text: string;
  image?: string;
  location: string;
  features?: string[];
}

export interface UpdateReviewDTO {
  rating?: number;
  text?: string;
  image?: string;
}

export interface ReviewInteractionDTO {
  action: "like" | "dislike";
}

export interface ProductRatingResponse {
  averageRating: number;
  totalRatings: number;
  totalReviews: number;
  customerFeatures: string[];
  customerImages: string[];
  moreImagesCount: number;
  reviews: ReviewResponse[];
}

export interface ReviewResponse {
  id: string;
  rating: number;
  text: string;
  image?: string;
  userName: string;
  timeAgo: string;
  location: string;
  certified: boolean;
  likes: number;
  dislikes: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  rating?: number;
}
