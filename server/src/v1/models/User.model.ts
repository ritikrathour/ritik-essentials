import mongoose, { Model } from "mongoose";
import { IUser } from "../../types/Auth.type";
const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      min: [3, "Name min Length should be 3"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password min length should be 6"],
      // select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "vendor"],
      default: "customer",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockedUntil: {
      type: Date,
      default: null,
    },
    phone: String,
    avatar: {
      type: String,
      default:
        "https://www.freepik.com/free-psd/3d-rendered-user-icon-blue-circle_420191379.htm#fromView=keyword&page=1&position=0&uuid=4ae17975-8f60-4a78-8d75-9ad6d4334804&query=Default+user",
    },
    refreshToken: {
      type: String,
    },
    address: String,
    // Vendor-only fields
    shopName: String,
    gstNumber: String,
    // Admin specific
    permissions: [String],
  },
  { timestamps: true }
);
const UserModel: Model<IUser> = mongoose.model("User", UserSchema);
export default UserModel;
