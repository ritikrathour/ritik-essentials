import mongoose from "mongoose";
import { ICart, ICartItem } from "../../types/Cart.type";
import CartModel from "../models/Cart.model";
import ApiError from "../../utils/ApiError";
import ProductModel from "../models/Product.model";

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
  updateCart = async (
    userId: mongoose.Types.ObjectId,
    cart: Partial<ICart>
  ) => {
    // find and update cart by userID
    const result = await CartModel.findByIdAndUpdate(
      { userId },
      {
        $set: {
          ...cart,
        },
      },
      {
        returnDocument: "after",
      }
    );
    return result;
  };
  updateCartItem = async (
    userId: mongoose.Types.ObjectId,
    productId: string,
    quantity: number
  ) => {
    // get cart
    const cart = this.getOrCreateCart(userId);
    // find item by productId in the cart
    const ItemIndex = (await cart).items.findIndex(
      (i: any) => i.productId === productId
    );
    if (ItemIndex === -1) {
      throw new ApiError(400, "Item not found in cart");
    }
    (await cart)?.items[ItemIndex].quantity;

    const totals = this.calculateCartTotals((await cart).items);
    // update cart
    const updatedCart = this.updateCart(userId, {
      totalAmount: (await totals).totalAmount,
      totalItems: (await totals).totalItems,
    });
    return updatedCart;
  };
  calculateCartTotals = async (items: ICartItem[]) => {
    const totalAmount = items.reduce(
      (sum, item) => (sum + item.price) * item.quantity,
      0
    );
    const totalItems = items?.reduce((sum, item) => sum + item.quantity, 0);
    return { totalAmount, totalItems };
  };
  addItemToCart = async (
    userId: mongoose.Types.ObjectId,
    item: ICartItem,
    productId: string
  ) => {
    // check stock and get products
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found!");
    }
    if (product.stock < item.quantity) {
      throw new ApiError(400, "Insufficient stock");
    }
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
    const totals = this.calculateCartTotals((await cart).items);
    // update cart
    const updateCart = await CartModel.findByIdAndUpdate(
      { userId },
      {
        $set: {
          items: (await cart).items,
          totalAmount: (await totals).totalAmount,
          totalItems: (await totals).totalItems,
        },
      },
      {
        returnDocument: "after",
      }
    );
    return updateCart;
  };
  removeItemFromCart = async (
    userId: mongoose.Types.ObjectId,
    productId: any
  ) => {
    const cart = this.getOrCreateCart(userId);
    const initialLength = (await cart).items.length;
    (await cart).items = (await cart).items.filter(
      (i) => i.productId !== productId
    );
    if ((await cart).items.length === initialLength) {
      throw new ApiError(404, "item not found in cart!");
    }
    const totals = this.calculateCartTotals((await cart).items);
    const updateCart = this.updateCart(userId, {
      totalAmount: (await totals).totalAmount,
      totalItems: (await totals).totalItems,
    });
    if (!updateCart) {
      throw new ApiError(500, "Faild to update cart");
    }
    return updateCart;
  };
  clearCart = async (userId: mongoose.Types.ObjectId) => {
    const result = await CartModel.deleteOne({ userId });
    return result.deletedCount > 0;
  };
}
export const Cart = new CartService();
