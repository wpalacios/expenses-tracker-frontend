import clsx from "clsx";
import React, { MouseEventHandler } from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text?: string;
  type?: "submit" | "button";
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: "primary" | "secondary";
};

const Button = ({
  text,
  type,
  onClick,
  children,
  className,
  ...otherProps
}: ButtonProps) => {
  const styles = {
    primary: "bg-primary",
    secondary: "bg-black",
    default: "bg-inherit",
  };

  const bg = styles[otherProps.variant ?? "default"];

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={clsx(
        "p-2 font-montserrat text-white rounded",
        bg,
        className
      )}
      {...otherProps}
    >
      {text ?? children}
    </button>
  );
};

export default Button;
