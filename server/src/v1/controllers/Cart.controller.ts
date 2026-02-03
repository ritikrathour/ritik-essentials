import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import AsyncHandler from "../../utils/AsyncHandler";
import { Cart } from "../services/Cart.service";
import ApiError from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { validateAddToCart } from "../../utils/Validation";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  imageUrl?: string;
}

interface Cart {
  _id?: ObjectId;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponsee<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// get cart
const GetCart = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const cart = await Cart.getOrCreateCart(userId);
  if (!cart) {
    throw new ApiError(500, "Cart Not Created! Somthing went wrong!", false);
  }
  res.json(new ApiResponse(200, cart, "Cart Created or get Succcessfully"));
});
// add product to the cart
const AddToCart = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const validation = validateAddToCart(req.body);
  if (!validation?.isValid) {
    throw new ApiError(400, validation?.errors.join(", "), false);
  }
  const cart = await Cart.addItemToCart(userId, req.body);
  if (!cart) {
    throw new ApiError(500, "Items not added to Cart!");
  }
  res.json(new ApiResponse(200, cart, "Item added to cart successfully"));
});
// update cart item
const UpdateItem = AsyncHandler(async (req: Request, res: Response) => {
  const { quantity } = req.body;
  const { itemId } = req.params;
  if (!itemId) {
    throw new ApiError(400, "Cart ItemId is required!");
  }
  // validate QTY
  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    throw new ApiError(
      400,
      "Quantity is required and must be a positive number",
    );
  }
  if (quantity > 99) {
    throw new ApiError(400, "Quantity cannot exceed 99 items");
  }
  const userId = req.user?._id;
  // update cart
  const updateCartItem = await Cart.updateCartItem(userId, itemId, quantity);
  if (!updateCartItem) {
    throw new ApiError(500, "Cart not updated!");
  }
  res.json(
    new ApiResponse(200, updateCartItem, "Cart item updated successfully"),
  );
});
// removeItem from cart
const RemoveItem = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const itemId = req.params?.itemId;
  if (!itemId) {
    throw new ApiError(400, "Cart itemId is required!");
  }
  const cart = await Cart.removeItemFromCart(userId, itemId);
  res.json(new ApiResponse(200, cart, "Item removed from cart successfully"));
});
// clear cart
const ClearCart = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  await Cart.clearCart(userId);
  res.json(new ApiResponse(200, {}, "Cart cleared successfully"));
});
export { GetCart, AddToCart, UpdateItem, RemoveItem, ClearCart };
