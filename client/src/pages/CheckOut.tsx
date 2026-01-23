import { useState, useEffect, ChangeEvent } from "react";
import { CreditCard, Truck, ShoppingBag, CheckCircle } from "lucide-react";
import Input from "../components/Input";
import { Button } from "../components/ui/Button";
import { OptimizedImage } from "../components/ui/OptimizedImage";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pinCode: string;
  paymentMethod: "card" | "cod";
}

interface OrderItem {
  product: number;
  name: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface OrderData {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalAmount: number;
}

export default function CheckoutPage() {
  const [step, setStep] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pinCode: "",
    paymentMethod: "cod",
  });

  useEffect(() => {
    // Simulated cart items - replace with your actual cart data from API
    // Example API call:
    // const fetchCart = async () => {
    //   const response = await fetch('/api/cart', {
    //     headers: { 'Authorization': `Bearer ${token}` }
    //   });
    //   const data = await response.json();
    //   setCartItems(data.items);
    // };
    // fetchCart();

    setCartItems([
      {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      },
    ]);
  }, []);

  const subtotal: number = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping: number = 10.0;
  const tax: number = subtotal * 0.1;
  const total: number = subtotal + shipping + tax;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (): Promise<void> => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Process payment and create order
      try {
        const orderData: OrderData = {
          items: cartItems.map((item) => ({
            product: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: {
            fullName: formData.fullName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.pinCode,
            country: "",
            phone: formData.phone,
          },
          paymentMethod: formData.paymentMethod,
          totalAmount: total,
        };

        // Replace with your actual API call
        // const response = await fetch('/api/checkout/create-order', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   },
        //   body: JSON.stringify(orderData)
        // });
        // const data = await response.json();
        // if (data.success) {
        //   setStep(3);
        // }

        console.log("Order Data:", orderData);
        setStep(3);
      } catch (error) {
        console.error("Order creation failed:", error);
      }
    }
  };

  return (
    <div className="md:px-10 px-2 bg-gray-50 py-4">
      <div className="mx-auto">
        {/* Progress Steps */}
        <div className="mb-8 w-[600px] m-auto">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-[#febd2f] text-white" : "bg-gray-300"}`}
              >
                <ShoppingBag size={20} />
              </div>
              <div
                className={`w-24 h-1 ${step >= 2 ? "bg-[#febd2f]" : "bg-gray-300"}`}
              ></div>
            </div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-[#febd2f] text-white" : "bg-gray-300"}`}
              >
                <CreditCard size={20} />
              </div>
              <div
                className={`w-24 h-1 ${step >= 3 ? "bg-[#febd2f]" : "bg-gray-300"}`}
              ></div>
            </div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-[#febd2f] text-white" : "bg-gray-300"}`}
            >
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="flex justify-center gap-20 mt-2 text-sm">
            <span
              className={
                step >= 1 ? "text-[173334] font-medium" : "text-gray-500"
              }
            >
              Shipping
            </span>
            <span
              className={
                step >= 2 ? "text-[173334] font-medium" : "text-gray-500"
              }
            >
              Payment
            </span>
            <span
              className={
                step >= 3 ? "text-[173334] font-medium" : "text-gray-500"
              }
            >
              Complete
            </span>
          </div>
        </div>

        {step === 3 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500" size={64} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. We'll send you a confirmation email
              shortly.
            </p>
            <Button type="button">View Order Details</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Truck size={24} />
                      Shipping Information
                    </h2>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          name="fullName"
                          onchange={handleInputChange}
                          type="text"
                          value={formData.fullName}
                          required
                          placeholder="Full Name"
                          label="Full Name"
                        />
                        <Input
                          name="email"
                          onchange={handleInputChange}
                          type="email"
                          value={formData.email}
                          placeholder="example@example.com"
                          label="Email"
                        />
                      </div>
                      <Input
                        name="phone"
                        onchange={handleInputChange}
                        type="tel"
                        value={formData.phone}
                        required
                        placeholder="0123456789"
                        label="Phone Number"
                      />
                      <Input
                        name="address"
                        onchange={handleInputChange}
                        type="text"
                        value={formData.address}
                        required
                        placeholder="Full Address"
                        label="Address"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          name="city"
                          onchange={handleInputChange}
                          type="text"
                          value={formData.city}
                          required
                          placeholder="City"
                          label="City"
                        />
                        <Input
                          name="pinCode"
                          onchange={handleInputChange}
                          type="text"
                          value={formData.pinCode}
                          required
                          placeholder="226104"
                          label="Pin Code"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <CreditCard size={24} />
                      Payment Method
                    </h2>

                    <div className="space-y-4">
                      <div
                        onClick={() =>
                          setFormData({ ...formData, paymentMethod: "cod" })
                        }
                        className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <Truck className="mr-2" size={20} />
                        <label>Cash on Delivery</label>
                      </div>
                      <div
                        onClick={() =>
                          setFormData({ ...formData, paymentMethod: "card" })
                        }
                        className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === "card"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <CreditCard className="mr-2" size={20} />
                        <label>UPI/GooglePay/PayTM/PhonePay</label>
                      </div>
                      {formData.paymentMethod === "card" && (
                        <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between items-center">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="w-[150px]"
                    >
                      Back
                    </Button>
                  )}
                  <Button type="button" onClick={handleSubmit}>
                    {step === 1 ? "Continue to Payment" : "Place Order"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  {cartItems.map((item: CartItem) => (
                    <div key={item.id} className="flex gap-3">
                      {/* <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border"
                      /> */}
                      <div className="w-[100px] h-[80px]">
                        <OptimizedImage alt={item.image} src={item.image} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">₹{item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
