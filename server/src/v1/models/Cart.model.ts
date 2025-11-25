import mongoose from "mongoose";
import { ICart, ICartItem } from "../../types/Cart.type";

const CartItemSchema = new mongoose.Schema<ICartItem>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "ProductID is required!"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  { timestamps: true }
);
const CartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    items: [CartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model<ICart>("Cart", CartSchema);
export default CartModel;
