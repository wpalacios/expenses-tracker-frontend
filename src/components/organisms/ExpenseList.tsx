"use client";

import React from "react";
import ExpenseCard from "../molecules/ExpenseCard";
import { Expense } from "@/types/Expense";

type ExpenseListProps = {
  expenses: Expense[];
};

const ExpenseList = ({ expenses }: ExpenseListProps) => (
  <div>
    {expenses.map((expense) => (
      <ExpenseCard
        key={expense.id}
        amount={expense.amount}
        currency={expense.currency}
        description={expense.description}
        date={expense.date}
      />
    ))}
  </div>
);

export default ExpenseList;
