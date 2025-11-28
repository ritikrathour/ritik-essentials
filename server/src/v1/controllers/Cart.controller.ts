// ============================================================================
// TYPES & INTERFACES
// ============================================================================

import express, { Request, Response, NextFunction } from "express";
import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import AsyncHandler from "../../utils/AsyncHandler";
import { Cart } from "../services/Cart.service";
import ApiError from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { ICartItem } from "../../types/Cart.type";

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

interface AddToCartRequest {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  imageUrl?: string;
}

interface UpdateCartItemRequest {
  quantity: number;
}

// ============================================================================
// DATABASE CONNECTION
// ============================================================================

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

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

const validateAddToCart = (
  body: any
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!body.productId || typeof body.productId !== "string") {
    errors.push("Product ID is required and must be a string");
  }
  if (
    !body.quantity ||
    typeof body.quantity !== "number" ||
    body.quantity <= 0
  ) {
    errors.push("Quantity is required and must be a positive number");
  }
  if (!body.price || typeof body.price !== "number" || body.price <= 0) {
    errors.push("Price is required and must be a positive number");
  }
  if (!body.name || typeof body.name !== "string") {
    errors.push("Product name is required");
  }
  if (body.imageUrl && typeof body.imageUrl !== "string") {
    errors.push("Image URL must be a string");
  }
  return { isValid: errors.length === 0, errors };
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

// ============================================================================
// ERROR HANDLING
// ============================================================================

const createError = (statusCode: number, message: string): Error => {
  const error: any = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response<ApiResponsee>,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal server error";

  if (!err.isOperational) {
    console.error("Unhandled Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

// ============================================================================
// MIDDLEWARE
// ============================================================================

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError(401, "No authentication token provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw createError(401, "Invalid token");
    }

    // Mock user extraction (Replace with JWT verification)
    (req as any).user = { id: token };
    next();
  } catch (error) {
    next(error);
  }
};

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

// ============================================================================
// CART REPOSITORY
// ============================================================================

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

// ============================================================================
// CART SERVICE
// ============================================================================

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

// ============================================================================
// CART CONTROLLERS
// ============================================================================

////////////////////////////////////////////////////////////////////////
const GetCart = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "UnAuthorized user!");
  }
  const cart = await Cart.getOrCreateCart(userId);
  if (!cart) {
    throw new ApiError(500, "Cart Not Created! Somthing went wrong!", false);
  }
  res.json(new ApiResponse(200, cart, "Cart Created or get Succcessfully"));
});
const AddToCart = AsyncHandler(async (req: Request, res: Response) => {
  // validate cart items
  const validation = validateAddToCart(req.body);
  if (!validation?.isValid) {
    throw new ApiError(400, validation?.errors.join(", "), false);
  }
  const userId = req.user?._id
  const itemData:ICartItem = req.body
  const cart = await 
  res.json({ ok: "ji" });
});
export { GetCart, AddToCart };
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

// ============================================================================
// ROUTES
// ============================================================================

const createCartRouter = (): express.Router => {
  const router = express.Router();

  router.use(authenticate);

  router.get("/", getCart);
  router.post("/items", addToCart);
  router.put("/items/:productId", updateItem);
  router.delete("/items/:productId", removeItem);
  router.delete("/", clearCart);

  return router;
};

// ============================================================================
// APP SETUP
// ============================================================================

const createApp = (): express.Application => {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);

  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/cart", createCartRouter());

  app.use(errorHandler);

  return app;
};
