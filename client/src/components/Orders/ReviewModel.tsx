import { useState } from "react";
import { Button } from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { OrdersApi } from "../../services/orders.service";
import toast from "react-hot-toast";

interface Props {
  productId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ReviewModal = ({ productId, onClose, onSuccess }: Props) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { data, mutate, error, isError, isPending } = useMutation({
    mutationFn: () => OrdersApi.rating({ productId, rating, text: comment }),
    // onSuccess:()=>{},
    onError: () => {
      toast.error(error?.message || "Review not Added");
    },
  });
  const handleSubmit = async () => {
    // validation
    if (!rating) {
      toast.error("Please give the rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write the comment!");
      return;
    } else if (comment.trim().length < 10) {
      toast.error("Commnet atleast 10 charactors");
      return;
    }
    mutate();
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,.3)] backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Rate Product</h2>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-2 rounded mb-3 "
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>

        <textarea
          className="w-full border p-2 rounded mb-3 resize-none"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button onClick={() => onClose()} variant="danger" type="button">
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit()}
            disabled={isPending}
            type="button"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};
