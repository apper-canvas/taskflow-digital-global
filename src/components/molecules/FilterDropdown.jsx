import React from "react";
import Select from "@/components/atoms/Select";

const FilterDropdown = ({ value, onChange, options, label, className }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      label={label}
      className={className}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default FilterDropdown;