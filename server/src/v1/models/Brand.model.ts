import mongoose from "mongoose";

const Brand = new mongoose.Schema<any>(
  {
    name: {
      type: String,
      required: [true, "Brand Name is required!"],
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Brand Image is required"],
    },
  },
  {
    timestamps: true,
  }
);
export const BrandSChema = mongoose.model("Brand", Brand);
