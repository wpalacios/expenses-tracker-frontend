"use client";

import React from "react";
import ExpenseCard from "../molecules/ExpenseCard";
import { Expense } from "@/types/Expense";
import Typography from "../atoms/Typography";

type ExpenseListProps = {
  expenses: Expense[];
};

const ExpenseList = ({ expenses }: ExpenseListProps) => (
  <div>
    {expenses?.length > 0 && <Typography variant="h2">Expenses</Typography>}
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
