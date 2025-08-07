import React from "react";
import { cn } from "@/utils";

const Input = React.forwardRef(
  (
    {
      type = "text",
      placeholder = "",
      className = "",
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "px-4 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
          className
        )}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
