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
      default:"https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_incoming&w=740&q=80"
    },
    refreshToken: {
      type: String,
    },
    address: String,
    // Vendor-only fields
    shopName: String,
    shopImage: String,
    gstNumber: String,
    // Admin specific
    permissions: [String],
  },
  { timestamps: true },
);
const UserModel: Model<IUser> = mongoose.model("User", UserSchema);
export default UserModel;
