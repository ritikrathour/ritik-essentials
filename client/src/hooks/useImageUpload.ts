import { useCallback, useState } from "react";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGES } from "../utils/constant";
import { ProductImage } from "../utils/Types/Product.types";
export const useImageUpload = () => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const validateImage = useCallback((file: File): string | null => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "Only JPEG, PNG, and WebP images are allowed";
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return "Image size must be less than 5MB";
    }
    return null;
  }, []);

  const handleFiles = useCallback(
    (files: FileList) => {
      setUploadError("");
      const remainingSlots = MAX_IMAGES - images.length;
      if (remainingSlots === 0) {
        setUploadError(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }

      const validFiles: ProductImage[] = [];
      Array.from(files)
        .slice(0, remainingSlots)
        .forEach((file) => {
          const error = validateImage(file);
          if (error) {
            setUploadError(error);
            return;
          }
          validFiles.push({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: URL.createObjectURL(file),
            file,
            isPrimary: images.length === 0 && validFiles.length === 0,
          });
        });
      setImages((prev) => [...prev, ...validFiles]);
    },
    [images.length, validateImage]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      // If we removed the primary image, make the first remaining image primary
      if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  }, []);

  const setPrimaryImage = useCallback((id: string) => {}, []);

  return {
    images,
    dragActive,
    setDragActive,
    uploadError,
    handleFiles,
    removeImage,
    setPrimaryImage,
  };
};
// setImages((prev) =>
//   prev.map((img) => ({
//     ...img,
//     isPrimary: img.id === id,
//   }))
// );
