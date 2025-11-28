import mongoose from "mongoose";
import { ICart, ICartItem } from "../../types/Cart.type";
import CartModel from "../models/Cart.model";

class CartService {
  constructor() {}
  getOrCreateCart = async (userId: mongoose.Types.ObjectId) => {
    const cart = await CartModel.findOne({ userId }).populate("userId");
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
  calculateCartTotals = async (items: ICartItem[]) => {
    const totalAmount = items.reduce(
      (sum, item) => (sum + item.price) * item.quantity,
      0
    );
  };
  addItemToCart = async (userId: mongoose.Types.ObjectId, item: ICartItem) => {
    //  get cart
    const cart = this.getOrCreateCart(userId);
    //check existingItemIndex
    const existingItemIndex = (await cart)?.items?.findIndex(
      (i) => i.productId === item.productId
    );
    // if present then increase qty or not sotre in cart
    if (existingItemIndex > -1) {
      (await cart).items[existingItemIndex].quantity += item.quantity;
    } else {
      (await cart).items.push(item);
    }
    // calculate total
  };
}
export const Cart = new CartService();
