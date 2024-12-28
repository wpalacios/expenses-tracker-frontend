"use client";

import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useBudget } from "@/context/BudgetContext";

type BudgetFormProps = {
  onSubmit: (budget: number) => void;
};

const BudgetForm = ({ onSubmit }: BudgetFormProps) => {
  const { budget, setBudget } = useBudget();
  const VARIANT = 500;

  const handleIncrease = () => onSubmit(budget + VARIANT);

  const handleDecrease = () => onSubmit(budget > 0 ? budget - VARIANT : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(budget + 500);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <Input
        label="Budget"
        value={budget}
        onChange={(e) => setBudget(parseFloat(e.target.value))}
        type="number"
      />
      <div className="flex flex-row gap-4">
        <Button
          text="Decrease Budget by 500"
          onClick={handleDecrease}
          className="w-full"
        />
        <Button
          text="Increase Budget by 500"
          onClick={handleIncrease}
          className="w-full"
        />
      </div>
    </form>
  );
};

export default BudgetForm;
