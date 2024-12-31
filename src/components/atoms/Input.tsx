import React from "react";
import Label from "./Label";
import clsx from "clsx";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};

const Input = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  className,
  ...otherProps
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
      className={clsx(
        "w-full p-3 rounded-lg border border-1 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm text-gray-700",
        className
      )}
      {...otherProps}
    />
  </div>
);

export default Input;
