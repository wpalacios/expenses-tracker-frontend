import { format } from "date-fns";
import React from "react";

type ExpenseCardProps = {
  amount: number;
  currency: string;
  description: string;
  date: string;
};

const ExpenseCard = ({
  amount,
  currency,
  description,
  date,
}: ExpenseCardProps) => (
  <div className="p-4 border rounded mb-4">
    <div className="text-lg font-bold">
      {amount} {currency}
    </div>
    {description && <div className="text-sm text-gray-600">{description}</div>}
    {date && (
      <div className="text-xs text-gray-400">
        {format(date, "yyyy-MM-dd HH:mm a")}
      </div>
    )}
  </div>
);

export default ExpenseCard;
