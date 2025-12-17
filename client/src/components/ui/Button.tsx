import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
//  button type
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "glass"
  | "danger"
  | "dark"
  | "dangerLight";
type ButtonSize = "sm" | "md" | "lg";
type IconPosition = "left" | "right";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  type: "submit" | "reset" | "button";
  size?: ButtonSize;
  isLoading?: boolean;
  iconPosition?: IconPosition;
  icon?: ReactNode;
  children?: ReactNode;
}
// button.styles
const buttonBase =
  "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 outline-none disabled:opacity-90 disabled:cursor-not-allowed relative overflow-hidden cursor-pointer ";

const buttonVariants = {
  primary:
    "bg-[#febd2f] text-[#173334] backdrop-blur-sm hover:bg-[#173334] hover:text-[#febd2f]",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300  ",
  outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
  dangerLight: "text-red-600 hover:bg-red-50 p-2 rounded-lg transition",
  dark: "bg-[#173334] text-white hover:bg-[#1e4243]",
  glass:
    "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:shadow-[0_4px_30px_rgba(255,255,255,0.15)]",
};
const buttonSizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};
// Glassy reflection effect on hover
const reflectionEffect = `
    before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br
    before:from-white/40 before:to-transparent before:opacity-0
    hover:before:opacity-20 before:transition-opacity before:duration-300
  `;
export const Button: React.FC<ButtonProps> = ({
  type,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        buttonBase,
        buttonVariants[variant],
        buttonSizes[size],
        reflectionEffect,
        className
      )}
      type={type}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        <div
          className={clsx(
            "flex items-center gap-2",
            iconPosition === "right" && "flex-row-reverse"
          )}
        >
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </div>
      )}
      {/* Soft glow pulse animation when hovered */}
      <span
        className={clsx(
          "absolute inset-0 rounded-xl transition-all duration-500 ease-in-out opacity-0",
          "hover:opacity-30",
          variant === "primary" && "bg-blue-400/30",
          variant === "danger" && "bg-red-400/30",
          variant === "glass" && "bg-white/10"
        )}
      />
    </button>
  );
};
