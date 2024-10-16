import React, { forwardRef } from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ title, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full bg-primary-color text-white py-2 rounded-lg hover:bg-opacity-95 ${className}`}
        {...props}
      >
        {title}
      </button>
    );
  }
);

export default Button;
