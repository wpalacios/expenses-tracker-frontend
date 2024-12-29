"use client";

import { useBudget } from "@/context/BudgetContext";
import { useExpenses } from "@/context/ExpensesContext";
import { useExchangeService } from "@/hooks/useExchangeService";
import { useExpensesService } from "@/hooks/useExpenseService";
import { Expense } from "@/types/Expense";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Dropdown from "./Dropdown";

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
  const { convertToUsd } = useExchangeService();
  const [amount, setAmount] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);
  const [currency, setCurrency] = useState("usd");
  const [description, setDescription] = useState("");
  const { currencies } = useExchangeService();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddExpense();

    if (amount && currency !== "" && budget) {
      onSubmit({ amount: amount, currency, description });
    }
  };

  const handleAddExpense = useCallback(async () => {
    try {
      if (amount && currency !== "" && budget) {
        const newExpense: Expense = await addNewExpense({
          date: new Date().toISOString(),
          budgetId: budget.id,
          userId: 1,
          amount,
          usdAmount,
          currency,
          description,
        });

        if (newExpense) {
          setAmount(0);
          setDescription("");
        }
      }
    } catch (error) {
      console.error("Error trying to add Expense: ", error);
    }
  }, [amount, usdAmount, currency, description, budget, addNewExpense]);

  const getUsdAmount = useCallback(
    async (selectedCurrency: string) => {
      if (amount && selectedCurrency === "usd") {
        setUsdAmount(amount);
        return;
      }

      if (
        amount &&
        selectedCurrency &&
        selectedCurrency.toLowerCase() !== "usd"
      ) {
        const response = await convertToUsd(amount, selectedCurrency);

        if (response?.amount) {
          setUsdAmount(response?.amount);
        }
      }
    },
    [convertToUsd, amount]
  );

  useEffect(() => {
    if (amount > 0 && currency !== "") {
      getUsdAmount(currency);
    }
  }, [amount, currency]);

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("p-4 rounded", bordered && "border")}
    >
      <Input
        label="Expense Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <Label htmlFor="currency">
        Currency:{" "}
        {currency !== "usd" && (
          <span className="font-semibold">
            {currency} equivalent to {usdAmount.toFixed(2)} usd
          </span>
        )}
        {currency === "usd" && (
          <span className="font-semibold">{currency}</span>
        )}
      </Label>
      <Dropdown
        id="currency"
        className="mb-4"
        options={Object.entries(currencies).map(([key, value]) => ({
          value: key,
          label:
            (value as unknown as string) === ""
              ? key.toLocaleUpperCase()
              : (value as unknown as string),
        }))}
        value={currency}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCurrency(e.target.value)
        }
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
