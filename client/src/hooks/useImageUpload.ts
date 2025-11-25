import { useCallback, useState } from "react";
import { ProductImage } from "../utils/Types/Product.types";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGES } from "../utils/constant";

export const useImageUpload = () => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const MAX_FILE_SIZE = 5 * 1024 * 1024; //5MB
  const validateImage = useCallback((file: File) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "Only JPEG, PNG, and WebP images are allowed";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Image size must be less than 5MB";
    }
  }, []);

  const handleFiles = useCallback(
    (files: FileList) => {
      setUploadError("");
      // remainingSlot
      const remainingSlot = MAX_IMAGES - images.length;
      if (remainingSlot === 0) {
        setUploadError(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }
      // validFiles array
      const validFiles: ProductImage[] = [];
      Array.from(files)
        .slice(0, remainingSlot)
        .forEach((file) => {
          const error = validateImage(file);
          if (error) {
            setUploadError(error);
            return;
          }
          validFiles.push({
            id: `${Date.now()}-${Math.random().toString(36)}`,
            url: URL.createObjectURL(file),
            file,
            isPrimary: images.length === 0 && validFiles.length === 0,
          });
          setImages((prev) => [...prev, ...validFiles]);
        });
    },
    [images.length, validateImage]
  );
  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const filterdImage = prev.filter((img) => img.id !== id);
      // if user delete first image (primary image) then make another image to primary image
      if (
        filterdImage.length > 0 &&
        !filterdImage.some((img) => img.isPrimary)
      ) {
        filterdImage[0].isPrimary = true;
      }
      return filterdImage;
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
