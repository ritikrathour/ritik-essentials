import { Request, Response, NextFunction } from "express";
import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import AsyncHandler from "../../utils/AsyncHandler";
import { Cart } from "../services/Cart.service";
import ApiError from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { ICartItem } from "../../types/Cart.type";
import { validateAddToCart } from "../../utils/Validation";
import mongoose from "mongoose";

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

let db: Db;
let cartsCollection: Collection<Cart>;

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
    const client = await MongoClient.connect(mongoUri);

    db = client.db();
    cartsCollection = db.collection<Cart>("carts");

    // Create indexes
    await cartsCollection.createIndex({ userId: 1 }, { unique: true });
    await cartsCollection.createIndex({ updatedAt: 1 });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const validateUpdateCartItem = (
  body: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (
    !body.quantity ||
    typeof body.quantity !== "number" ||
    body.quantity <= 0
  ) {
    errors.push("Quantity is required and must be a positive number");
  }

  return { isValid: errors.length === 0, errors };
};

const createError = (statusCode: number, message: string): Error => {
  const error: any = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

const findCartByUserId = async (userId: string): Promise<Cart | null> => {
  return await cartsCollection.findOne({ userId });
};

const createCart = async (userId: string): Promise<Cart> => {
  const cart: Cart = {
    userId,
    items: [],
    totalAmount: 0,
    totalItems: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await cartsCollection.insertOne(cart);
  return { ...cart, _id: result.insertedId };
};

const updateCart = async (
  userId: string,
  cart: Partial<Cart>
): Promise<Cart | null> => {
  const result = await cartsCollection.findOneAndUpdate(
    { userId },
    {
      $set: {
        ...cart,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result;
};

const deleteCart = async (userId: string): Promise<boolean> => {
  const result = await cartsCollection.deleteOne({ userId });
  return result.deletedCount > 0;
};

const calculateCartTotals = (
  items: CartItem[]
): { totalAmount: number; totalItems: number } => {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return { totalAmount, totalItems };
};

const getOrCreateCart = async (userId: string): Promise<Cart> => {
  let cart = await findCartByUserId(userId);
  if (!cart) {
    cart = await createCart(userId);
  }
  return cart;
};

const addItemToCart = async (userId: string, item: CartItem): Promise<Cart> => {
  const cart = await getOrCreateCart(userId);

  const existingItemIndex = cart.items.findIndex(
    (i) => i.productId === item.productId
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  const totals = calculateCartTotals(cart.items);

  const updatedCart = await updateCart(userId, {
    items: cart.items,
    totalAmount: totals.totalAmount,
    totalItems: totals.totalItems,
  });

  if (!updatedCart) {
    throw createError(500, "Failed to update cart");
  }

  return updatedCart;
};

const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<Cart> => {
  const cart = await getOrCreateCart(userId);
  const itemIndex = cart.items.findIndex((i) => i.productId === productId);
  if (itemIndex === -1) {
    throw createError(404, "Item not found in cart");
  }
  cart.items[itemIndex].quantity = quantity;

  const totals = calculateCartTotals(cart.items);

  const updatedCart = await updateCart(userId, {
    items: cart.items,
    totalAmount: totals.totalAmount,
    totalItems: totals.totalItems,
  });

  if (!updatedCart) {
    throw createError(500, "Failed to update cart");
  }

  return updatedCart;
};

const removeItemFromCart = async (
  userId: string,
  productId: string
): Promise<Cart> => {
  const cart = await getOrCreateCart(userId);

  const initialLength = cart.items.length;
  cart.items = cart.items.filter((i) => i.productId !== productId);

  if (cart.items.length === initialLength) {
    throw createError(404, "Item not found in cart");
  }

  const totals = calculateCartTotals(cart.items);

  const updatedCart = await updateCart(userId, {
    items: cart.items,
    totalAmount: totals.totalAmount,
    totalItems: totals.totalItems,
  });

  if (!updatedCart) {
    throw createError(500, "Failed to update cart");
  }

  return updatedCart;
};

const clearUserCart = async (userId: string): Promise<void> => {
  await deleteCart(userId);
};

const getUserCart = async (userId: string): Promise<Cart> => {
  return await getOrCreateCart(userId);
};

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
  const { productId } = req.params;
  if (!productId) {
    throw new ApiError(404, "product id is required!");
  }
  const userId = req.user?._id;
  // validate cart items
  const validation = validateAddToCart(req.body);
  if (!validation?.isValid) {
    throw new ApiError(400, validation?.errors.join(", "), false);
  }
  const itemData: ICartItem = req.body;
  const cart = await Cart.addItemToCart(userId, itemData, productId);
  if (!cart) {
    throw new ApiError(500, "Items not added to Cart!");
  }
  res.json(new ApiResponse(200, cart, "Item added to cart successfully"));
});
// update cart item
const UpdateItem = AsyncHandler(async (req: Request, res: Response) => {
  const { quantity } = req.body;
  // validate QTY
  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    throw new ApiError(
      400,
      "Quantity is required and must be a positive number"
    );
  }
  const userId = req.user?._id;
  const { productId } = req.params;
  if (!productId) {
    throw new ApiError(404, "ProductId not found");
  }
  // update cart
  const updateCart = await Cart.updateCartItem(userId, productId, quantity);
  if (!updateCart) {
    throw new ApiError(500, "Cart not updated!");
  }
  res.json(new ApiResponse(200, updateCart, "Cart item updated successfully"));
});
// removeItem from cart
const RemoverItem = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId } = req.params;
  if (!productId) {
    throw new ApiError(400, "ProductId is required!");
  }
  const cart = await Cart.removeItemFromCart(userId, productId);
  res.json(new ApiResponse(200, cart, "Item removed from cart successfully"));
});
// clear cart
const ClearCart = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  await Cart.clearCart(userId);
  res.json(new ApiResponse(200, {}, "Cart cleared successfully"));
});
export { GetCart, AddToCart, UpdateItem, RemoverItem, ClearCart };
const getCart = async (
  req: Request,
  res: Response<ApiResponsee<Cart>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const cart = await getUserCart(userId);

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (
  req: Request,
  res: Response<ApiResponsee<Cart>>,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = validateAddToCart(req.body);
    if (!validation.isValid) {
      throw createError(400, validation.errors.join(", "));
    }
    const userId = (req as any).user.id;
    const itemData: CartItem = req.body;

    const cart = await addItemToCart(userId, itemData);

    res.status(200).json({
      success: true,
      data: cart,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (
  req: Request,
  res: Response<ApiResponsee<Cart>>,
  next: NextFunction
): Promise<void> => {
  try {
    const validation = validateUpdateCartItem(req.body);
    if (!validation.isValid) {
      throw createError(400, validation.errors.join(", "));
    }

    const userId = (req as any).user.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await updateCartItem(userId, productId, quantity);

    res.status(200).json({
      success: true,
      data: cart,
      message: "Cart item updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const removeItem = async (
  req: Request,
  res: Response<ApiResponsee<Cart>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { productId } = req.params;

    const cart = await removeItemFromCart(userId, productId);

    res.status(200).json({
      success: true,
      data: cart,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (
  req: Request,
  res: Response<ApiResponsee>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    await clearUserCart(userId);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    next(error);
  }
};
