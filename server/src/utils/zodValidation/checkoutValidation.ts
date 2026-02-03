import z from "zod";
export const objectIdZod = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
// order item
const OrderItem = z.object({
  product: objectIdZod,
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
});
const shippingAddressSchema = z.object({
  fullName: z.string().min(5, "Full name is required"),
  phone: z.number().min(10, "Phone number is required"),
  email: z.email("Invalid email address"),
  fullAddress: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  pinCode: z.string().min(4, "PinCode is required"),
  state: z.string().min(1, "State is required"),
});
const couponSchema = z
  .object({
    code: z.string().min(1),
    discountAmount: z.number().min(0),
  })
  .optional();
export const CheckoutValidatation = z.object({
  orderNumber: z.string().min(1, "Order Number Is required!"),
  user: objectIdZod,
  items: z.array(OrderItem).min(1, "At least one item is required"),
  shippingAddress: shippingAddressSchema,
  totalAmount: z.number().int().min(0, "Total amount should be positive"),
  discount: z.number().min(0).default(0),
  tax: z.number().min(0).default(0),
  shippingCharges: z.number().min(0).default(0),
  status: z
    .enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"])
    .default("Pending"),
  paymentMethod: z.enum(["COD", "ONLINE"]).default("COD"),
  isPaid: z.boolean().default(false),
  coupon: couponSchema,
});

export const orderNumberValidate = z.object({
  orderNumber: z.string().min(1, "Order Number Is required!"),
});
