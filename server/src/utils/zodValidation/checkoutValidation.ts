import z from "zod";
export const objectIdZod = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
// order item
const OrderItem = z.object({
  productId: objectIdZod,
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
  vendorId: objectIdZod,
});
const shippingAddressSchema = z.object({
  fullName: z.string().min(5, "Full name is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.literal(""),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  pinCode: z.string(),
  paymentMethod: z.enum(["COD", "ONLINE"]).default("COD"),
});
export const CheckoutValidatation = z.object({
  items: z.array(OrderItem).min(1, "At least one item is required"),
  shippingAddress: shippingAddressSchema,
});

export const orderNumberValidate = z.object({
  orderNumber: z.string().min(1, "Order Number Is required!"),
});
