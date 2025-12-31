import { useCallback, useState } from "react";
import { IProductFormData } from "../../utils/Types/Product.types";
interface IValidationErrors {
  [key: string]: string;
}
export const useCreateProductValidation = (formData: IProductFormData) => {
  const [errors, setErrors] = useState<IValidationErrors>({});
  const newErrors: IValidationErrors = {};
  const validate = useCallback(() => {
    // product name
    if (!formData.name?.trim()) {
      newErrors.name = "Product name is required ";
    } else if (formData.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Product Description is required";
    } else if (formData.description.length > 200) {
      newErrors.description =
        "Product description cannot excieded 200 characters";
    }
    // Product category
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    // product price
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    // compare price
    if (!formData.originalPrice) {
      newErrors.originalPrice = "Compare price required";
    } else if (Number(formData.originalPrice) < Number(formData.price)) {
      newErrors.originalPrice = "Compare price must be greater than price";
    }
    // product stock
    if (!formData.stock) {
      newErrors.stock = "Stock quantity is required";
    } else if (Number(formData.stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }
    if (!formData.unit) {
      newErrors.unit = "Unit is required";
    }
    if (
      formData.discount &&
      (Number(formData.discount) < 0 || Number(formData.discount) > 100)
    ) {
      newErrors.discount = "Discount must be between 0 and 100";
    }
    if (formData.expiryDate) {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (expiryDate < today) {
        newErrors.expiryDate = "Expiry date cannot be in the past";
      }
    }
    if (!formData.brand.trim()) {
      newErrors.brand = "product Brand is required";
    }
    if (formData.tags && formData.tags.length > 5) {
      newErrors.tags = "Tags can not be greater than 5";
    }
    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    } else if (!/^[A-Za-z0-9_-]+$/.test(formData.sku)) {
      newErrors.sku =
        "SKU can only contain letters, numbers, hyphens, and underscores";
    }
    setErrors(newErrors);
    return { IsError: Object.keys(newErrors).length === 0, errors };
  }, [formData]);
  return { errors, validate, setErrors };
};
