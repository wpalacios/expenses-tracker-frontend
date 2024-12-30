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
  <div className="p-4 border rounded-lg mb-4">
    {description && <div className="text-lg font-bold">{description}</div>}
    <div className="flex flex-row gap-2 items-baseline">
      <div className="font-bold text-gray-500">
        {amount} {currency}
      </div>
      {date && (
        <div className="text-xs text-gray-400">
          {format(date, "yyyy-MM-dd HH:mm a")}
        </div>
      )}
    </div>
  </div>
);

export default ExpenseCard;
