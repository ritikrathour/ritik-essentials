import mongoose, { Model } from "mongoose";
import { IOrder } from "../../types/Auth.type";

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "product is required"],
        },
        vendorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Vendor Id is required!"],
          index: true,
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: 1,
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
        },
        isReviewed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      city: { type: String, required: true },
      pinCode: {
        type: String,
        required: true,
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    shippingCharges: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PLACED",
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "CARD"],
      default: "COD",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    coupon: {
      type: String,
      discountAmount: { type: Number, min: 0 },
    },
  },
  { timestamps: true },
);
// indexes for performance
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ vendorId: 1, createdAt: -1 });
OrderSchema.index({ ispaid: 1 });
const OrderModel: Model<IOrder> = mongoose.model("Order", OrderSchema);
export default OrderModel;
