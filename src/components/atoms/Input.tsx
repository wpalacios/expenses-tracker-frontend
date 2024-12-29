import React from "react";

type InputProps = {
  id?: string;
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const Input = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onScroll={() => {}}
      onWheel={() => {}}
      onFocus={() => {}}
      className="w-full px-3 py-2 border rounded"
    />
  </div>
);

export default Input;
