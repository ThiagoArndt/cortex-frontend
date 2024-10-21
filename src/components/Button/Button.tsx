import React, { forwardRef, ReactNode } from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ title, children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full bg-primary-color text-white text-base font-medium py-3 rounded-lg hover:bg-opacity-95 ${className}`}
        {...props}
      >
        {children}
        {title}
      </button>
    );
  }
);

export default Button;
