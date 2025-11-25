import React from "react";
import { AlertTriangle } from "lucide-react";

interface CarouselErrorProps {
  error: any;
  onRetry?: () => void;
}
const ErrorUI: React.FC<CarouselErrorProps> = ({ error, onRetry }) => {
  console.log(error);

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-xl">
      <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
      <p className="text-red-600 text-sm font-medium">
        {error?.response?.data?.message ||
          error?.message ||
          "Failed to load products"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorUI;
