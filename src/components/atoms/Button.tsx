import React, { MouseEventHandler } from "react";

type ButtonProps = {
  text?: string;
  type?: "submit" | "button";
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button = ({ text, type, onClick, className, children }: ButtonProps) => (
  <button
    type={type ?? "button"}
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
  >
    {text ?? children}
  </button>
);

export default Button;
