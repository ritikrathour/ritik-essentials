import React from "react";

export interface IFormErrors {
  name?: string;
  email?: string;
  password?: string;
  newPass?: string;
  confirmPassword?: string;
}

// Input Component
export interface InputProps {
  name: string;
  label: string;
  type: string;
  value: string | undefined;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  defaultValue?: string;
  min?: string;
  max?: string;
  step?: string;
}
// button
export interface IButtonProps {
  children: React.ReactNode;
  style?: string;
  type: "submit" | "reset" | "button";
  loading?: boolean;
  onClick?: () => void;
}
