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
    const result = await CartModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          items: cart.items,
          totalAmount: cart.totalAmount,
          totalItems: cart.totalItems,
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
    itemId: string,
    quantity: number
  ) => {
    // get cart
    const cart = this.getOrCreateCart(userId);
    // find item in the cart
    const Item = (await cart).items.find(
      (item) => item._id.toString() === itemId
    );
    if (!Item) {
      throw new ApiError(400, "Item not found in cart");
    }
    // Verify product still exists and get latest price
    const product = await ProductModel.findById(Item.productId);
    if (!product) {
      throw new ApiError(400, "Product no longer available");
    }
    // Check product stock availability
    if (!product.stock) {
      throw new ApiError(404, "Product is out of stock");
    }
    if (product.stock < quantity) {
      throw new ApiError(400, `Only ${product.stock} items available in stock`);
    }
    // Update item Quantity
    Item.quantity = quantity;
    // Recalculate cart total
    const totals = this.calculateCartTotals((await cart).items);
    // update cart
    const updatedCart = this.updateCart(userId, {
      items: (await cart).items,
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
  addItemToCart = async (userId: mongoose.Types.ObjectId, item: ICartItem) => {
    // check stock and get products
    const product = await ProductModel.findById(item.productId);
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
    const updateCart = this.updateCart(userId, {
      items: (await cart).items,
      totalAmount: (await totals).totalAmount,
      totalItems: (await totals).totalItems,
    });
    return updateCart;
  };
  removeItemFromCart = async (userId: mongoose.Types.ObjectId, itemId: any) => {
    const cart = this.getOrCreateCart(userId);
    const itemIndex = (await cart).items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      throw new ApiError(404, "item not found in cart!");
    }
    // Remove item
    (await cart).items.splice(itemIndex, 1);
    const totals = this.calculateCartTotals((await cart).items);
    // update cart
    const updateCart = this.updateCart(userId, {
      items: (await cart).items,
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
