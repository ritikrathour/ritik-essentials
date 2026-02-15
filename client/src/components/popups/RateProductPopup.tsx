import { useState } from "react";
// import { submitReview } from "../api";
import RatingStars from "../RatingStars";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { OrdersApi } from "../../services/orders.service";

interface Props {
  productId: string;
  productName: string;
  isOpen: boolean;
  onClose: any;
  onSuccess?: () => void;
}
interface IreviewPayload {
  productId: string;
  rating: number | null;
  text: string;
}
export default function RateProductPopup({
  productId,
  productName,
  isOpen,
  onClose,
}: Props) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const dispatch = useDispatch();
  if (!isOpen) return null;

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: (payload: IreviewPayload) => OrdersApi.rating(payload),
    onSuccess: () => {
      dispatch(onClose());
      setRating(0);
      setComment("");
    },
  });
  const handleSubmit = async () => {
    if (!rating) {
      return;
    }
    mutate({
      rating,
      productId: productId,
      text: comment,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Rate the product</h2>
          <button
            onClick={() => dispatch(onClose())}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Stars */}
        <div className="mb-4">
          <RatingStars rating={rating} onChange={setRating} />
        </div>

        {/* Comment */}
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-black focus:outline-none resize-none"
          rows={4}
        />

        {isError && (
          <p className="text-red-500 text-sm mt-2">{error.message}</p>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => dispatch(onClose())}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending || rating === null || comment === ""}
            className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
