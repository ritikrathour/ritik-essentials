import mongoose from "mongoose";
import { IProductFeature } from "../../types/Review.type";

const ProductFeatureSchema = new mongoose.Schema<IProductFeature>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      unique: true,
      index: true,
      trim: true,
    },
    features: {
      type: Map,
      of: Number,
      default: new Map(),
    },
  },
  {
    timestamps: true,
  }
);
export const ProductFeatureModel = mongoose.model<IProductFeature>(
  "ProductFeature",
  ProductFeatureSchema
);
// export default ProductFeatureModel
