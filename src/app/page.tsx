"use client";

import React, { useCallback, useEffect } from "react";
import { useExpenses } from "../context/ExpensesContext";
import { useBudget } from "../context/BudgetContext";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import BudgetOverview from "../components/organisms/BudgetOverview";
import ExpenseForm from "../components/molecules/ExpenseForm";
import { Expense } from "../types/Expense";
import ExpenseList from "@/components/organisms/ExpenseList";
import BudgetForm from "@/components/molecules/BudgetFrom";
import Chart from "@/components/organisms/Chart";

const IndexPage: React.FC = () => {
  const { expenses, addExpense } = useExpenses();
  const { setSpent, setBudget, budget, spent } = useBudget();

  const categorizedExpenses = useCallback(() => {
    return expenses.reduce((acc: { [key: string]: number }, expense) => {
      const { description: category, amount } = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});
  }, [expenses]);

  const chartData = Object.keys(categorizedExpenses()).map((category) => ({
    category,
    amount: categorizedExpenses()[category],
  }));

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    setSpent(totalSpent);
  }, [expenses, setSpent]);

  const handleAddExpense = (expense: {
    amount: number;
    currency: string;
    description: string;
  }) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    addExpense(newExpense); // Add to context
  };

  const handleSetBudget = (budget: number) => {
    setBudget(budget);
  };

  return (
    <DashboardTemplate
      header={<h1 className="text-2xl font-bold">Expense Tracker</h1>}
      content={
        <div className="space-y-8">
          <BudgetOverview spent={spent} budget={budget} />

          {spent > 0 && <Chart data={chartData} />}

          <BudgetForm onSubmit={handleSetBudget} />

          <ExpenseForm onSubmit={handleAddExpense} />

          <ExpenseList expenses={expenses} />
        </div>
      }
    />
  );
};

export default IndexPage;
