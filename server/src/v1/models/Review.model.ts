import mongoose from "mongoose";
import { IReview } from "../../types/Review.type";

const ReviewSchema = new mongoose.Schema<IReview>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "ProductId is required"],
      index: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      index: true,
    },
    text: {
      type: String,
      required: [true, "Review text is required"],
      minlength: [10, "Review text must be at least 10 characters"],
      maxlength: [2000, "Review text cannot exceed 2000 characters"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    location: {
      type: String,
      trim: true,
    },
    certified: {
      type: Boolean,
      default: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    dislikedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
// Indexes for performance
ReviewSchema.index({ productId: 1, createdAt: -1 });
ReviewSchema.index({ productId: 1, rating: 1 });
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });
ReviewSchema.index({ likes: -1 });

// Virtual for timeAgo
ReviewSchema.virtual("timeAgo").get(function () {
  const now = new Date();
  const diff = now.getTime() - this.createdAt.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hour = Math.floor(minutes / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 30);
  const year = Math.floor(month / 365);

  if (year > 0) return `${year} year${year > 1 ? "s" : ""} ago`;
  if (month > 0) return `${month} month${month > 1 ? "s" : ""} ago`;
  if (day > 0) return `${day} day${day > 1 ? "s" : ""} ago`;
  if (hour > 0) return `${hour} hour${hour > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minutes${minutes > 1 ? "s" : ""} ago`;
  return "Just Now";
});
export const ReviewModel = mongoose.model<IReview>("Review", ReviewSchema);
