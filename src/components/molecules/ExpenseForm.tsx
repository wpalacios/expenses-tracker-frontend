"use client";

import { useBudget } from "@/context/BudgetContext";
import { useExpenses } from "@/context/ExpensesContext";
import { useExpensesService } from "@/hooks/useExpenseService";
import { Expense } from "@/types/Expense";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

type ExpenseFormProps = {
  bordered?: boolean;
  onSubmit: (expense: {
    amount: number;
    currency: string;
    description: string;
  }) => void;
};

const ExpenseForm = ({ onSubmit, bordered = false }: ExpenseFormProps) => {
  const { budget } = useBudget();
  const { expenses } = useExpenses();
  const { addNewExpense } = useExpensesService();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddExpense();

    onSubmit({ amount: parseFloat(amount), currency, description });
  };

  const handleAddExpense = useCallback(async () => {
    try {
      if (amount && currency && budget) {
        const newExpense: Expense = await addNewExpense({
          date: new Date().toISOString(),
          budgetId: budget.id,
          userId: 1,
          amount: parseFloat(amount),
          currency,
          description,
        });

        if (newExpense) {
          setAmount("");
          setDescription("");
        }
      }
    } catch (error) {
      console.error("Error trying to add Expense: ", error);
    }
  }, [amount, currency, budget, addNewExpense]);

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("p-4 rounded", bordered && "border")}
    >
      <Input
        label="Expense Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
      />
      <Input
        label="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />
      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-row gap-4">
        <Button
          text="Add Expense"
          onClick={expenses?.length > 0 ? handleAddExpense : handleSubmit}
          className="w-full"
        />
        {expenses?.length > 0 && (
          <Button type="submit" text="Add Expense & Close" className="w-full" />
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
