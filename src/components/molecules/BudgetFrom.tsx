"use client";

import { useBudgetService } from "@/hooks/useBudgetService";
import clsx from "clsx";
import React, { useCallback } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useBudget } from "@/context/BudgetContext";

type BudgetFormProps = {
  bordered?: boolean;
};

const BudgetForm = ({ bordered = false }: BudgetFormProps) => {
  const { budget } = useBudget();
  const { updateBudget, createBudget } = useBudgetService();
  const VARIANT = 500;

  const handleCreateOrUpdate = useCallback(
    (amount: number) => {
      if (budget?.id) {
        updateBudget({ ...budget, amount });
      } else {
        createBudget({ amount, currency: "USD" });
      }
    },
    [budget, createBudget, updateBudget]
  );

  const handleIncrease = useCallback(() => {
    if (budget) {
      const newAmount = (budget.amount ?? 0) + VARIANT; // Correct operator precedence
      handleCreateOrUpdate(newAmount);
    }
  }, [budget, handleCreateOrUpdate]);

  const handleDecrease = useCallback(() => {
    if (budget && budget.amount > 0) {
      const newAmount = (budget.amount ?? 0) - VARIANT; // Correct operator precedence
      handleCreateOrUpdate(newAmount);
    }
  }, [budget, handleCreateOrUpdate]);

  return (
    <div className={clsx("p-4 rounded", bordered && "border")}>
      <Input
        label="Budget"
        value={budget?.amount}
        onChange={(e) => handleCreateOrUpdate(parseFloat(e.target.value))}
        type="number"
      />
      <div className="flex flex-row gap-4">
        <Button
          text="- 500"
          onClick={handleDecrease}
          className="w-full"
          variant="secondary"
        />
        <Button
          text="+ 500"
          onClick={handleIncrease}
          className="w-full"
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default BudgetForm;
