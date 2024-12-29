import React from "react";
import Label from "./Label";

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
    <Label htmlFor={id}>{label}</Label>
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
