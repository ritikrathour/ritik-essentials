import mongoose from "mongoose";
import { IProduct } from "../../types/Product.type";
const ImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);
const Product = new mongoose.Schema<IProduct>(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: 50,
      index: true,
    },
    organic: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      index: true,
    },
    unit: {
      type: String,
    },
    images: [ImageSchema],
    discount: {
      type: Number,
      default: 0,
    },
    expiryDiscount: {
      type: Date,
    },
    sales: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    status: {
      type: String,
      default: "publised",
    },
    weight: {
      type: Number,
      min: 0,
    },
    dimensions: {
      length: {
        type: Number,
        min: 0,
      },
      width: {
        type: Number,
        min: 0,
      },
      height: {
        type: Number,
        min: 0,
      },
    },
    rating: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
  },
  { timestamps: true }
);
// Compound indexes for better query performance
Product.index({ category: 1, price: 1 });
Product.index({ brand: 1, isActive: 1 });
Product.index({ name: "text", description: "text", tags: "text" });
Product.index({ createdAt: -1 });
const ProductModel = mongoose.model<IProduct>("Product", Product);
export default ProductModel;
