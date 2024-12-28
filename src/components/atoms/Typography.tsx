import React from "react";

type TypographyProps = {
  variant?: "h1" | "h2" | "p";
  children: React.ReactNode;
  className?: string;
};

const Typography = ({
  variant = "p",
  children,
  className,
}: TypographyProps) => {
  const Component = variant;
  return (
    <Component className={`text-gray-800 ${className}`}>{children}</Component>
  );
};

export default Typography;
