import React, { forwardRef, ReactNode } from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  children?: ReactNode;
  hasBackground?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ title, children, hasBackground = true, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full ${
          hasBackground
            ? "bg-primary-color text-white"
            : "bg-transparent text-gray-700 border border-gray-300"
        }  text-base font-medium rounded-lg hover:bg-opacity-95 ${className}`}
        {...props}
      >
        {children}
        {title}
      </button>
    );
  }
);

export default Button;
