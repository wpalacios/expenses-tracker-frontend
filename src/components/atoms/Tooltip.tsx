import React from "react";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip = ({ text, children }: TooltipProps) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1/8 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded">
      {text}
    </div>
  </div>
);

export default Tooltip;
