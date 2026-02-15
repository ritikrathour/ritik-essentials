// src/features/reviews/components/RatingStars.tsx

import { useState } from "react";

interface Props {
  rating: number;
  onChange: (rating: number) => void;
}

export default function RatingStars({ rating, onChange }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = hovered ? star <= hovered : star <= rating;

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className={`text-2xl transition ${
              isActive ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
