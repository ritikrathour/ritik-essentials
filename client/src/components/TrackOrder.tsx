import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { closeTrackOrderPopup } from "../redux-store/UISlice";
type OrderStatus =
  | "pending"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "canceled";
interface TrackOrderProps {
  orderId: string;
  currentStatus: OrderStatus;
  createdAt: string;
}

const ORDER_STEPS: {
  label: string;
  status: OrderStatus;
}[] = [
  { label: "Order Placed", status: "pending" },
  { label: "Shipped", status: "shipped" },
  { label: "Out for Delivery", status: "out_for_delivery" },
  { label: "Delivered", status: "delivered" },
  { label: "Canceled", status: "canceled" },
];

const TrackOrder: React.FC<TrackOrderProps> = ({
  orderId,
  currentStatus,
  createdAt,
}) => {
  const dispatch = useDispatch();
  const currentStepIndex = ORDER_STEPS.findIndex(
    (step) => step.status?.toLowerCase() === currentStatus?.toLowerCase(),
  );
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,.2)] z-50"
    >
      <div className="w-full max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-sm relative">
        <div
          className="absolute top-2 right-2 cursor-pointer hover:bg-gray-200 rounded-sm duration-200"
          onClick={() => dispatch(closeTrackOrderPopup())}
        >
          <X size={20} />
        </div>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Track Order</h2>
          <p className="text-sm text-gray-500 mt-1">
            Order ID: <span className="font-medium">{orderId}</span>
          </p>
          <p className="text-sm text-gray-400">
            Placed on {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-6">
          {ORDER_STEPS.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            return (
              <div key={step.status} className="flex items-start gap-4">
                {/* Indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  {index !== ORDER_STEPS.length - 1 && (
                    <div
                      className={`w-px h-10 ${
                        isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>

                {/* Text */}
                <div>
                  <p
                    className={`font-medium ${
                      isCompleted ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default TrackOrder;
