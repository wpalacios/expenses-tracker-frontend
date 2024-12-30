import React from "react";

export interface Option {
  value: string | number;
  label: string;
}

export type DropdownProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: Option[];
  value: string | number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
}: DropdownProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm text-gray-700  ${className}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
