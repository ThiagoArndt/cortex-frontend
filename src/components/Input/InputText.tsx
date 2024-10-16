import React, { ReactNode, forwardRef } from "react";

interface InputTextProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: ReactNode;
  placeholder: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ children, placeholder, className = "", ...props }, ref) => {
    return (
      <div className="relative">
        {children}
        <input
          ref={ref}
          className={`w-full px-4 text-black placeholder:font-normal font-semibold py-2 border-2 text-lg outline-none bg-transparent border-light-grey rounded-lg ${className}`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

export default InputText;
