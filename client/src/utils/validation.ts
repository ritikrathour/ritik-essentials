import { useState } from "react";
import { IFormErrors } from "./Types/Component.types";
import { IProductFormData } from "./Types/Product.types";

export const validEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const validPassword = (password: string): boolean => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};
export const validateForm = (
  name: string | undefined,
  email: string,
  password: string,
  setErrors: any,
  type: string
): boolean => {
  const newErrors: IFormErrors = {};
  // First name validation
  if (type === "register") {
    if (!name?.trim()) {
      newErrors.name = "Name is required";
    } else if (name?.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
  }
  // Email validation
  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!validEmail(email)) {
    newErrors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!password) {
    newErrors.password = "Password is required";
  } else if (!validPassword(password)) {
    newErrors.password =
      "Password must be at least 6 characters with uppercase, lowercase, number, and special character";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
interface IValidationErrors {
  [key: string]: string;
}
export const CreateProductValidation = (formData: IProductFormData) => {
  const [errors, setErrors] = useState<IValidationErrors>({});
  const newErrors: IValidationErrors = {};
  // product name
  if (!formData.name?.trim()) {
    newErrors.name = "Product name is required ";
  } else if (formData.name.length < 3) {
    newErrors.name = "Product name must be at least 3 characters";
  }
  if (!formData.description.trim()) {
    newErrors.desciption = "Product Description is required";
  } else if (formData.description.length > 200) {
    newErrors.desciption = "Product description cannot excieded 200 characters";
  }
  // Product category
  if (!formData.category) {
    newErrors.category = "Category is required";
  }
  // product price
  if (!formData.price) {
    newErrors.price = "Price is required";
  } else if (parseFloat(formData.price) <= 0) {
    newErrors.price = "Price must be greater than 0";
  }
  // compare price
  if (!formData.comparePrice) {
    newErrors.comparePrice = "Compare price required";
  } else if (parseFloat(formData.comparePrice) < parseFloat(formData.price)) {
    newErrors.comparePrice = "Compare price must be greater than price";
  }
  // product stock
  if (!formData.stock) {
    newErrors.stock = "Stock quantity is required";
  } else if (parseInt(formData.stock) < 0) {
    newErrors.stock = "Stock cannot be negative";
  }
  if (!formData.unit) {
    newErrors.unit = "Unit is required";
  }

  if (
    formData.discount &&
    (parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100)
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
  if (formData.tags && formData.tags.length > 5) {
    newErrors.tags = "Tags can not be greater than 5";
  }
  if (!formData.sku.trim()) {
    newErrors.sku = "SKU is required";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
