import mongoose from "mongoose";

const FavProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required"],
  },
});
const FavProductModel = mongoose.model("FavProduct", FavProductSchema);
export default FavProductModel;
