// ============================================
// 1. TYPES & INTERFACES
// ============================================

// types/checkout.types.ts
export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  CARD = "CARD",
  UPI = "UPI",
  WALLET = "WALLET",
  COD = "COD",
}

export interface ICheckoutRequest {
  items: ICheckoutItem[];
  shippingAddress: IShippingAddress;
  billingAddress?: IShippingAddress;
  paymentMethod: PaymentMethod;
  couponCode?: string;
}

export interface ICheckoutItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// ============================================
// 2. MODELS
// ============================================

// models/Order.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  variant?: mongoose.Types.ObjectId;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  discount: number;
  tax: number;
  total: number;
  image?: string;
}

interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  billingAddress: IShippingAddress;

  subtotal: number;
  discount: number;
  tax: number;
  shippingCharges: number;
  total: number;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDetails?: {
    transactionId: string;
    gateway: string;
    paidAt?: Date;
  };

  orderStatus: OrderStatus;
  statusHistory: Array<{
    status: OrderStatus;
    timestamp: Date;
    note?: string;
  }>;

  coupon?: {
    code: string;
    discountAmount: number;
  };

  notes?: string;
  cancelReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variant: { type: Schema.Types.ObjectId, ref: "ProductVariant" },
        name: { type: String, required: true },
        sku: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        discount: { type: Number, default: 0, min: 0 },
        tax: { type: Number, default: 0, min: 0 },
        total: { type: Number, required: true, min: 0 },
        image: String,
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    billingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    shippingCharges: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },

    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentDetails: {
      transactionId: String,
      gateway: String,
      paidAt: Date,
    },

    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: Object.values(OrderStatus),
          required: true,
        },
        timestamp: { type: Date, default: Date.now },
        note: String,
      },
    ],

    coupon: {
      code: String,
      discountAmount: { type: Number, min: 0 },
    },

    notes: String,
    cancelReason: String,
  },
  {
    timestamps: true,
  },
);

// Indexes for performance
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1, createdAt: -1 });
OrderSchema.index({ "paymentDetails.transactionId": 1 });

export const Order = mongoose.model<IOrder>("Order", OrderSchema);

// ============================================
// 3. CUSTOM ERRORS
// ============================================

// errors/AppError.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message);
  }
}

export class PaymentError extends AppError {
  constructor(message: string) {
    super(402, message);
  }
}

// ============================================
// 4. DTOs & VALIDATION
// ============================================

// dtos/checkout.dto.ts
import Joi from "joi";

export const checkoutValidationSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        variantId: Joi.string().optional(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    )
    .min(1)
    .required(),

  shippingAddress: Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required(),
    email: Joi.string().email().required(),
    addressLine1: Joi.string().min(5).max(200).required(),
    addressLine2: Joi.string().max(200).optional(),
    city: Joi.string().min(2).max(100).required(),
    state: Joi.string().min(2).max(100).required(),
    postalCode: Joi.string().min(4).max(10).required(),
    country: Joi.string().min(2).max(100).required(),
  }).required(),

  billingAddress: Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required(),
    email: Joi.string().email().required(),
    addressLine1: Joi.string().min(5).max(200).required(),
    addressLine2: Joi.string().max(200).optional(),
    city: Joi.string().min(2).max(100).required(),
    state: Joi.string().min(2).max(100).required(),
    postalCode: Joi.string().min(4).max(10).required(),
    country: Joi.string().min(2).max(100).required(),
  }).optional(),

  paymentMethod: Joi.string()
    .valid(...Object.values(PaymentMethod))
    .required(),
  couponCode: Joi.string().optional(),
});

// ============================================
// 5. REPOSITORIES (Data Access Layer)
// ============================================

// repositories/order.repository.ts
export class OrderRepository {
  async create(orderData: Partial<IOrder>): Promise<IOrder> {
    const order = new Order(orderData);
    return await order.save();
  }

  async findById(orderId: string): Promise<IOrder | null> {
    return await Order.findById(orderId)
      .populate("user", "name email")
      .populate("items.product", "name images");
  }

  async findByOrderNumber(orderNumber: string): Promise<IOrder | null> {
    return await Order.findOne({ orderNumber })
      .populate("user", "name email")
      .populate("items.product", "name images");
  }

  async findByUser(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("items.product", "name images"),
      Order.countDocuments({ user: userId }),
    ]);

    return { orders, total, page, totalPages: Math.ceil(total / limit) };
  }

  async updateStatus(
    orderId: string,
    status: OrderStatus,
    note?: string,
  ): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: status,
        $push: {
          statusHistory: { status, timestamp: new Date(), note },
        },
      },
      { new: true },
    );
  }

  async updatePaymentStatus(
    orderId: string,
    paymentStatus: PaymentStatus,
    paymentDetails?: any,
  ): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus, paymentDetails },
      { new: true },
    );
  }
}

// repositories/product.repository.ts
export class ProductRepository {
  async findByIds(productIds: string[]) {
    return await Product.find({ _id: { $in: productIds }, isActive: true });
  }

  async checkStock(
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ): Promise<boolean> {
    const product = await Product.findById(productId);
    if (!product) return false;

    if (variantId) {
      const variant = product.variants?.find(
        (v) => v._id.toString() === variantId,
      );
      return variant ? variant.stock >= quantity : false;
    }

    return product.stock >= quantity;
  }

  async decrementStock(
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) {
    if (variantId) {
      return await Product.updateOne(
        { _id: productId, "variants._id": variantId },
        { $inc: { "variants.$.stock": -quantity } },
      );
    }

    return await Product.updateOne(
      { _id: productId },
      { $inc: { stock: -quantity } },
    );
  }
}

// ============================================
// 6. SERVICES (Business Logic Layer)
// ============================================

// services/checkout.service.ts
export class CheckoutService {
  constructor(
    private orderRepo: OrderRepository,
    private productRepo: ProductRepository,
    private inventoryService: InventoryService,
    private pricingService: PricingService,
    private paymentService: PaymentService,
    private couponService: CouponService,
  ) {}

  async initiateCheckout(userId: string, checkoutData: ICheckoutRequest) {
    // 1. Validate and fetch products
    const validatedItems = await this.validateAndFetchItems(checkoutData.items);

    // 2. Check inventory availability
    await this.inventoryService.validateStock(validatedItems);

    // 3. Calculate pricing
    const pricing = await this.pricingService.calculateOrderPricing(
      validatedItems,
      checkoutData.shippingAddress,
      checkoutData.couponCode,
    );

    // 4. Generate order number
    const orderNumber = await this.generateOrderNumber();

    // 5. Create order
    const order = await this.orderRepo.create({
      orderNumber,
      user: new mongoose.Types.ObjectId(userId),
      items: validatedItems.map((item) => ({
        product: item.product._id,
        variant: item.variantId,
        name: item.product.name,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        tax: item.tax,
        total: item.total,
        image: item.product.images?.[0],
      })),
      shippingAddress: checkoutData.shippingAddress,
      billingAddress:
        checkoutData.billingAddress || checkoutData.shippingAddress,
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      tax: pricing.tax,
      shippingCharges: pricing.shippingCharges,
      total: pricing.total,
      paymentMethod: checkoutData.paymentMethod,
      paymentStatus: PaymentStatus.PENDING,
      orderStatus: OrderStatus.PENDING,
      statusHistory: [{ status: OrderStatus.PENDING, timestamp: new Date() }],
      coupon: pricing.coupon,
    });

    // 6. Reserve inventory
    await this.inventoryService.reserveStock(
      order._id.toString(),
      validatedItems,
    );

    return order;
  }

  async processPayment(orderId: string, paymentData: any) {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new NotFoundError("Order not found");

    try {
      // Process payment through payment gateway
      const paymentResult = await this.paymentService.processPayment({
        orderId: order._id.toString(),
        amount: order.total,
        method: order.paymentMethod,
        ...paymentData,
      });

      if (paymentResult.success) {
        // Update order with payment details
        await this.orderRepo.updatePaymentStatus(
          orderId,
          PaymentStatus.COMPLETED,
          {
            transactionId: paymentResult.transactionId,
            gateway: paymentResult.gateway,
            paidAt: new Date(),
          },
        );

        // Update order status to confirmed
        await this.orderRepo.updateStatus(
          orderId,
          OrderStatus.CONFIRMED,
          "Payment successful",
        );

        // Commit inventory reservation
        await this.inventoryService.commitReservation(orderId);

        return { success: true, order, paymentResult };
      } else {
        // Payment failed - release inventory
        await this.inventoryService.releaseReservation(orderId);
        await this.orderRepo.updatePaymentStatus(orderId, PaymentStatus.FAILED);

        throw new PaymentError(
          paymentResult.message || "Payment processing failed",
        );
      }
    } catch (error) {
      // Release inventory on any error
      await this.inventoryService.releaseReservation(orderId);
      throw error;
    }
  }

  private async validateAndFetchItems(items: ICheckoutItem[]) {
    const productIds = items.map((item) => item.productId);
    const products = await this.productRepo.findByIds(productIds);

    if (products.length !== items.length) {
      throw new ValidationError("Some products are not available");
    }

    return items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      if (!product)
        throw new ValidationError(`Product ${item.productId} not found`);

      const variant = item.variantId
        ? product.variants?.find((v) => v._id.toString() === item.variantId)
        : null;

      return {
        product,
        variantId: item.variantId,
        quantity: item.quantity,
        sku: variant?.sku || product.sku,
        price: variant?.price || product.price,
        discount: 0,
        tax: 0,
        total: 0,
      };
    });
  }

  private async generateOrderNumber(): Promise<string> {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }
}

// services/inventory.service.ts
export class InventoryService {
  async validateStock(items: any[]): Promise<void> {
    for (const item of items) {
      const hasStock = await productRepo.checkStock(
        item.product._id,
        item.variantId,
        item.quantity,
      );

      if (!hasStock) {
        throw new ValidationError(
          `Insufficient stock for ${item.product.name}. Available: ${item.product.stock}`,
        );
      }
    }
  }

  async reserveStock(orderId: string, items: any[]): Promise<void> {
    // Create inventory reservations with TTL (30 minutes)
    const reservations = items.map((item) => ({
      orderId,
      productId: item.product._id,
      variantId: item.variantId,
      quantity: item.quantity,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    }));

    await InventoryReservation.insertMany(reservations);
  }

  async commitReservation(orderId: string): Promise<void> {
    const reservations = await InventoryReservation.find({ orderId });

    for (const reservation of reservations) {
      await productRepo.decrementStock(
        reservation.productId,
        reservation.variantId,
        reservation.quantity,
      );
    }

    await InventoryReservation.deleteMany({ orderId });
  }

  async releaseReservation(orderId: string): Promise<void> {
    await InventoryReservation.deleteMany({ orderId });
  }
}

// services/pricing.service.ts
export class PricingService {
  async calculateOrderPricing(
    items: any[],
    shippingAddress: IShippingAddress,
    couponCode?: string,
  ) {
    let subtotal = 0;

    // Calculate subtotal and item-level pricing
    for (const item of items) {
      const itemPrice = item.price * item.quantity;
      const itemTax = this.calculateTax(itemPrice, shippingAddress.state);

      item.tax = itemTax;
      item.total = itemPrice + itemTax;
      subtotal += itemPrice;
    }

    // Apply coupon if provided
    let discount = 0;
    let coupon = null;

    if (couponCode) {
      const couponResult = await couponService.validateAndApply(
        couponCode,
        subtotal,
      );
      discount = couponResult.discountAmount;
      coupon = { code: couponCode, discountAmount: discount };
    }

    // Calculate tax on discounted amount
    const taxableAmount = subtotal - discount;
    const tax = this.calculateTax(taxableAmount, shippingAddress.state);

    // Calculate shipping
    const shippingCharges = this.calculateShipping(
      subtotal,
      shippingAddress.country,
    );

    const total = taxableAmount + tax + shippingCharges;

    return { subtotal, discount, tax, shippingCharges, total, coupon };
  }

  private calculateTax(amount: number, state: string): number {
    // Implement state-specific tax calculation
    const taxRate = 0.18; // 18% GST for India, adjust as needed
    return Math.round(amount * taxRate * 100) / 100;
  }

  private calculateShipping(subtotal: number, country: string): number {
    // Free shipping above threshold
    if (subtotal >= 500) return 0;

    // Country-specific shipping rates
    const shippingRates: Record<string, number> = {
      India: 50,
      USA: 150,
      // Add more countries
    };

    return shippingRates[country] || 100;
  }
}

// ============================================
// 7. CONTROLLERS
// ============================================

// controllers/checkout.controller.ts
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  initiateCheckout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { error, value } = checkoutValidationSchema.validate(req.body);
      if (error) throw new ValidationError(error.details[0].message);

      const userId = req.user!.id;
      const order = await this.checkoutService.initiateCheckout(userId, value);

      res.status(201).json({
        success: true,
        data: { order },
        message: "Checkout initiated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  processPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const paymentData = req.body;

      const result = await this.checkoutService.processPayment(
        orderId,
        paymentData,
      );

      res.status(200).json({
        success: true,
        data: result,
        message: "Payment processed successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const order = await orderRepo.findById(orderId);

      if (!order) throw new NotFoundError("Order not found");

      // Verify order belongs to user
      if (order.user.toString() !== req.user!.id) {
        throw new AppError(403, "Access denied");
      }

      res.status(200).json({
        success: true,
        data: { order },
      });
    } catch (error) {
      next(error);
    }
  };

  getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await orderRepo.findByUser(userId, page, limit);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

// ============================================
// 8. ROUTES
// ============================================

// routes/checkout.routes.ts
import express, { NextFunction } from "express";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();
const checkoutController = new CheckoutController(checkoutService);

router.post("/checkout", authenticate, checkoutController.initiateCheckout);
router.post(
  "/checkout/:orderId/payment",
  authenticate,
  checkoutController.processPayment,
);
router.get("/orders/:orderId", authenticate, checkoutController.getOrder);
router.get("/orders", authenticate, checkoutController.getUserOrders);

export default router;

// ============================================
// 9. MIDDLEWARE
// ============================================

// middlewares/error.middleware.ts
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  console.error("Unexpected error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && {
      error: err.message,
      stack: err.stack,
    }),
  });
};

// ============================================
// 10. USAGE IN APP
// ============================================

// app.ts
import express from "express";
import checkoutRoutes from "./routes/checkout.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use("/api", checkoutRoutes);
app.use(errorHandler);

export default app;
