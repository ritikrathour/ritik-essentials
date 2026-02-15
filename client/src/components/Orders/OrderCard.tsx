import { useState } from "react";
import { IOrder } from "../../utils/Types/Order.types";
import { ReviewModal } from "./ReviewModel";
import { OrderTimeline } from "./OrderTimeline";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

interface Props {
  order: IOrder;
  refetch: () => void;
}

export const OrderCard = ({ order, refetch }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<
    string | null | number
  >(null);
  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">Order #{order.orderNumber}</h3>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="font-bold">₹{order.totalAmount}</p>
      </div>

      <OrderTimeline status={order.status} />

      <div className="mt-4 space-y-4">
        {order.items.map((item) => {
          return (
            <div key={item.product._id} className="flex gap-4 items-center">
              <Link to={`/product-details/${item.product._id?.toString()}`}>
                <img
                  src={item.product.image || ""}
                  alt={item.product.name}
                  className="w-16! h-16! object-cover rounded border"
                />
              </Link>

              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              {order.status === "DELIVERED" && !item.isReviewed && (
                <Button
                  onClick={() => setSelectedProduct(item.product._id)}
                  type="button"
                >
                  Write Review
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <ReviewModal
          productId={selectedProduct.toString()}
          onClose={() => setSelectedProduct(null)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};
