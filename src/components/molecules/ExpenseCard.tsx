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
    <div className="text-sm text-gray-600">{description}</div>
    <div className="text-xs text-gray-400">{date}</div>
  </div>
);

export default ExpenseCard;
