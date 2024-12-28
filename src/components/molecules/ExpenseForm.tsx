"use client";

import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

type ExpenseFormProps = {
  onSubmit: (expense: {
    amount: number;
    currency: string;
    description: string;
  }) => void;
};

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount: parseFloat(amount), currency, description });
    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
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
      <Button text="Add Expense" onClick={handleSubmit} className="w-full" />
    </form>
  );
};

export default ExpenseForm;
