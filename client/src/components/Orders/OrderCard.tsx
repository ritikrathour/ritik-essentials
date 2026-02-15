// import { Link } from "react-router-dom";
// import { IProduct } from "../../utils/Types/Product.types";
// import { Button } from "../ui/Button";
// import TrackOrder from "../TrackOrder";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux-store/Store";
// import {
//   closeRatingPopup,
//   openRatingPopup,
//   openTrackOrderPopup,
// } from "../../redux-store/UISlice";
// import RateProductPopup from "../popups/RateProductPopup";
//
// export interface OrderItem {
//   _id: string;
//   product: IProduct;
//   productId: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// }
//
// export type OrderStatus =
//   | "pending"
//   | "shipped"
//   | "out_for_delivery"
//   | "delivered";
//
// interface Order {
//   _id: string;
//   orderNumber: string;
//   items: OrderItem[];
//   totalAmount: number;
//   status: OrderStatus;
//   createdAt: string;
// }
//
// interface Props {
//   order: Order;
// }
//
// const statusColorMap: Record<string, string> = {
//   pending: "bg-yellow-100 text-yellow-700",
//   confirmed: "bg-blue-100 text-blue-700",
//   shipped: "bg-indigo-100 text-indigo-700",
//   out_for_delivery: "bg-purple-100 text-purple-700",
//   delivered: "bg-green-100 text-green-700",
//   cancelled: "bg-red-100 text-red-700",
// };
// export function OrderCard({ order }: Props) {
//   const { isTrackOrderOpen, isRatingPopupOpen } = useSelector(
//     (state: RootState) => state.ui,
//   );
//   const dispatch = useDispatch();
//   return (
//     <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">
//             Order: {order.orderNumber}
//           </h2>
//           <p className="text-sm text-gray-500">{order.createdAt}</p>
//         </div>
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-medium ${
//             statusColorMap[order.status]
//           }`}
//         >
//           {order.status.replace(/_/g, " ").toUpperCase()}
//         </span>
//       </div>
//
//       {/* Items */}
//       <div className="space-y-4">
//         {order.items.map((item) => {
//           return (
//             <>
//               <Link
//                 to={`/product-details/${item.product?._id}`}
//                 key={item._id}
//                 className="flex items-center flex-wrap gap-4"
//               >
//                 <img
//                   src={"../public/assets/girl.png"}
//                   alt={item?.product.name}
//                   className="w-20! h-20! object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-sm font-medium text-gray-800">
//                     {item.product.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                 </div>
//                 <div className="text-sm font-semibold text-gray-700">
//                   ₹{item.price}
//                 </div>
//               </Link>
//             </>
//           );
//         })}
//       </div>
//
//       {/* Footer */}
//       <div className="mt-6 flex justify-between items-center border-t pt-4">
//         {isTrackOrderOpen && (
//           <TrackOrder
//             orderId={order.orderNumber}
//             createdAt={order.createdAt}
//             currentStatus={order?.status}
//           />
//         )}
//         <div className="flex items-center gap-2.5">
//           <span className="text-sm text-gray-600">Total:</span>
//           <span className="text-md font-bold text-gray-900">
//             ₹{order.totalAmount}
//           </span>
//         </div>
//         <div className="flex items-center gap-2.5">
//           <Button onClick={() => dispatch(openTrackOrderPopup())} type="button">
//             Track Order
//           </Button>
//           {/* {order.status === "delivered" && ( */}
//           <Button
//             onClick={() => dispatch(openRatingPopup())}
//             variant="secondary"
//             type="button"
//           >
//             Rate Product
//           </Button>
//           {/* )} */}
//           <RateProductPopup
//             isOpen={isRatingPopupOpen}
//             onClose={closeRatingPopup}
//             productId={order.items[0].productId}
//             productName={order.items[0]?.product.name}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

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
