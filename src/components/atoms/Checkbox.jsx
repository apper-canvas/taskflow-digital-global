import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked,
  label,
  ...props 
}, ref) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            "w-5 h-5 border-2 rounded transition-all duration-200",
            checked 
              ? "bg-gradient-to-br from-primary to-primary/80 border-primary shadow-lg" 
              : "border-gray-300 bg-white group-hover:border-primary/50",
            className
          )}
        >
          {checked && (
            <ApperIcon 
              name="Check" 
              size={12} 
              className="text-white absolute top-0.5 left-0.5"
            />
          )}
        </div>
      </div>
      {label && (
        <span className="text-sm text-gray-700 select-none group-hover:text-gray-900">
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;