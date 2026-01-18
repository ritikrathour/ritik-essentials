import mongoose from "mongoose";
import z from "zod";
export const createReviewValidation = z.object({
  body: z.object({
    productId: z
      .string()
      .min(1, "ProductId is required")
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        error: "Invalid Product Id Format",
      }),
    rating: z
      .number({
        error: (issue) => {
          if (issue.input === undefined) return "Rating is required";
          return "rating must be a number";
        },
      })
      .min(1, "Rating must be at least 1")
      .max(5, "rating cannot exceed 5"),
    text: z
      .string({
        error: "Review text is required",
      })
      .trim()
      .min(10, "Review text must be at least 10 characters")
      .max(2000, "Review text cannot exceed 2000 characters")
      .regex(
        /^[a-zA-Z0-9\s.,!?'"()\-]+$/,
        "Review text contains invalid characters"
      ),
    image: z
      .url({
        error: "Invalid image URL formate",
      })
      .refine((url) => /\.(jpg|jpeg|png|webp)$/i.test(url), {
        error: "URL must end with a valid image extension (jpg, png, etc.)",
      })
      .optional(),
    location: z
      .string({
        error: "Location is required",
      })
      .trim()
      .min(4, "Location must be at least 4 characters")
      .max(100, "Location cannot exceed 100 characters")
      .regex(/^[a-zA-Z\s,.-]+$/, "Location contains invalid characters"),
    features: z
      .array(
        z
          .string()
          .trim()
          .min(2, "Each feature must be at leaset 2 character")
          .max(20, "Each feature cannot exceed 20 characters")
          .regex(
            /^[a-zA-Z\s]+$/,
            "Features must contain only letters and spaces"
          )
      )
      .max(5, "Cannot have more than 5 Features")
      .optional(),
  }),
});

// Type exports for TypeScript inference
export type CreateReviewInput = z.infer<typeof createReviewValidation>;
