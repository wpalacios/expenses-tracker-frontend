"use client";

import { useBudget } from "@/context/BudgetContext";
import { useExpenses } from "@/context/ExpensesContext";
import { useExchangeService } from "@/hooks/useExchangeService";
import { useExpensesService } from "@/hooks/useExpenseService";
import { Expense } from "@/types/Expense";
import clsx from "clsx";
import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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

type FormValues = {
  amount: number;
  currency: string;
  description: string;
};

const ExpenseForm = ({ onSubmit, bordered = false }: ExpenseFormProps) => {
  const { budget } = useBudget();
  const { expenses } = useExpenses();
  const { addNewExpense } = useExpensesService();
  const { convertToUsd, currencies } = useExchangeService();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      amount: 0,
      currency: "usd",
      description: "",
    },
  });

  const amount = watch("amount");
  const currency = watch("currency");

  const handleAddExpense = useCallback(
    async (data: FormValues) => {
      try {
        if (data.amount && data.currency !== "" && budget) {
          const usdAmount =
            data.currency === "usd"
              ? data.amount
              : (await convertToUsd(data.amount, data.currency))?.amount ?? 0;

          const newExpense: Expense = await addNewExpense({
            date: new Date().toISOString(),
            budgetId: budget.id,
            userId: 1,
            amount: data.amount,
            usdAmount,
            currency: data.currency,
            description: data.description,
          });

          if (newExpense) {
            setValue("amount", 0);
            setValue("description", "");
          }
        }
      } catch (error) {
        console.error("Error trying to add Expense: ", error);
      }
    },
    [budget, addNewExpense, convertToUsd, setValue]
  );

  const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
    await handleAddExpense(data);
    onSubmit(data);
  };

  useEffect(() => {
    if (amount > 0 && currency !== "usd") {
      convertToUsd(amount, currency).then((response) => {
        if (response?.amount) {
          console.log(`Equivalent USD amount: ${response.amount}`);
        }
      });
    }
  }, [amount, currency, convertToUsd]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={clsx("p-4 rounded", bordered && "border")}
    >
      <div className="mb-4">
        <Input
          label="Expense Amount"
          type="number"
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
            min: { value: 1, message: "Value has to be greater than zero" },
          })}
        />
        {errors.amount && (
          <span className="text-sm text-red-500">{errors.amount.message}</span>
        )}
      </div>
      <Label htmlFor="currency">
        Currency:{" "}
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
            setValue("currency", e.target.value)
          }
        />
      </Label>
      <div className="mb-4">
        <Input
          label="Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-sm text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="flex flex-row gap-4">
        <Button
          type="submit"
          text="Add Expense"
          className="w-full"
          variant="secondary"
        />
        {expenses?.length > 0 && (
          <Button
            type="submit"
            text="Add Expense & Close"
            className="w-full"
            variant="secondary"
          />
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
