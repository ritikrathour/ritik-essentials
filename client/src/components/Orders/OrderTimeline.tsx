import { OrderStatus } from "../../utils/Types/Order.types";

const steps: OrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

interface Props {
  status: OrderStatus;
}

export const OrderTimeline = ({ status }: Props) => {
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex items-center justify-between mt-4">
      {steps.map((step, index) => (
        <div key={step} className="flex-1 text-center">
          <div
            className={`w-6 h-6 mx-auto rounded-full ${
              index <= currentIndex ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <p className="text-xs mt-2">{step.replaceAll("_", " ")}</p>
        </div>
      ))}
    </div>
  );
};
