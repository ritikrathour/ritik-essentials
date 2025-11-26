import { useCallback, useState } from "react";
import { validEmail, validPassword } from "../../utils/validation";
interface IFormData {
  name?: string;
  email: string;
  password: string;
  type?: "Register";
}
interface ValidationErrors {
  [key: string]: string;
}
export const useValidateAuthForm = (formData: IFormData) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const validate = useCallback(() => {
    const newErrors: ValidationErrors = {};
    // First name validation
    if (formData.type === "Register") {
      if (!formData?.name?.trim()) {
        newErrors.name = "Name is required";
      } else if (formData.name?.trim().length < 3) {
        newErrors.name = "Name must be at least 3 characters";
      }
    }
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters with uppercase, lowercase, number, and special character";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);
  return { errors, validate, setErrors };
};
