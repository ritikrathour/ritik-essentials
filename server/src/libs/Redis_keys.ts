import mongoose from "mongoose";

// redis auth keys
const getUserKey = (email: string) => `user:${email}`;
const getOTPkey = (email: string, type: string) => `otp:${type}:${email}`;
const getForgetPassKey = (otp: string) => `reset-pass:${otp}`;
const getVerificationKey = (token: string) => `verify:${token}`;
const getLoginAttemptsKey = (email: string) => `attemps:${email}`;
const getOTPResendCooldown = (email: string) => `otp-cooldown:${email}`;
const getOTPAttemptsKey = (email: string, type: string) =>
  `otp_attempts:${type}:${email}`;
const getOTPCooldownKey = (email: string, type: string) =>
  `otp_cooldown:${type}:${email}`;
const getBlockedKey = (email: string) => `blocked:${email}`;
const getDailyCountKey = (email: string): string => {
  const today = new Date().toISOString().split("T")[0];
  return `otp_daily:${email}:${today}`;
};
const loginAttempstExpiry = 3600; // 1 hour
// redis product keys
const getProductkey = (id: string) => `product:${id}`;
const getBrandsKey = () => "product:brands";
const getProductCategory = () => "product:categories";
const getProductSkuKey = (sku: string) => `products:sku:${sku}`;
const productExpiry = 3000;
const productCategoryExpiry = 3600;
const brandsExpiry = 3600;
const getProductFiltersKeyList = (filters: any) => `products:list:${filters}`;
const getVendorProductskey = (vendorId: string) =>
  `vendor:products:${vendorId}`;
const categoriesKey = () => "Categories";
const categoriesExpiry = 3600;
// checkout keys
const InventoryReservation = (userId: mongoose.Types.ObjectId) =>
  `ReserveInventry-${userId}`;
// order keys
const getOrderkey = (orderId: mongoose.Types.ObjectId | string) =>
  `order:${orderId}`;
const getOrderskey = `orders:All`;
const vendorOrders = (vendorId: mongoose.Types.ObjectId) =>
  `vendorOrder:${vendorId}`;
export {
  getOrderkey,
  categoriesExpiry,
  categoriesKey,
  getUserKey,
  getOTPkey,
  getVerificationKey,
  getLoginAttemptsKey,
  loginAttempstExpiry,
  getOTPResendCooldown,
  getOTPAttemptsKey,
  getOTPCooldownKey,
  getBlockedKey,
  getDailyCountKey,
  getForgetPassKey,
  getProductkey,
  getProductSkuKey,
  productExpiry,
  getProductFiltersKeyList,
  getProductCategory,
  productCategoryExpiry,
  getBrandsKey,
  brandsExpiry,
  getVendorProductskey,
  InventoryReservation,
  vendorOrders,
  getOrderskey,
};
