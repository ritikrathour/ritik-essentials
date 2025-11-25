import mongoose from "mongoose";
import { ICart } from "../../types/Cart.type";
import CartModel from "../models/Cart.model";

class CartService {
  constructor() {}
  getOrCreateCart = async (userId: mongoose.Types.ObjectId) => {
    const cart = await CartModel.findOne({ userId })
      .populate("userId")
      .select("-password");
    if (!cart) {
      // create cart
      const createCart: ICart = await CartModel.create({
        userId,
        items: [],
        totalAmount: 0,
        totalItems: 0,
      });
      return createCart;
    }
    return cart;
  };
}
export const Cart = new CartService();
