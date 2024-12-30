"use client";

import Typography from "@/components/atoms/Typography";
import BudgetForm from "@/components/molecules/BudgetFrom";
import Modal from "@/components/molecules/Modal";
import Chart from "@/components/organisms/Chart";
import ExpenseList from "@/components/organisms/ExpenseList";
import { useBudgetService } from "@/hooks/useBudgetService";
import { useExpensesService } from "@/hooks/useExpenseService";
import React, { useCallback, useEffect, useState } from "react";
import ExpenseForm from "../components/molecules/ExpenseForm";
import BudgetOverview from "../components/organisms/BudgetOverview";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import { useBudget } from "../context/BudgetContext";
import { useExpenses } from "../context/ExpensesContext";

const IndexPage: React.FC = () => {
  const { expenses } = useExpenses();
  const { budget, setSpent, spent } = useBudget();
  const { fetchBudget } = useBudgetService();
  const { fetchExpenses } = useExpensesService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const categorizedExpenses = useCallback(() => {
    debugger;
    return expenses.reduce((acc: { [key: string]: number }, expense) => {
      const { description: category, usdAmount } = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += usdAmount;
      return acc;
    }, {});
  }, [expenses]);

  const chartData = Object.keys(categorizedExpenses()).map((category) => ({
    category,
    amount: categorizedExpenses()[category],
  }));

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (acc, expense) => acc + expense.usdAmount,
      0
    );
    setSpent(totalSpent);
  }, [expenses, setSpent]);

  useEffect(() => {
    if (budget.id) {
      fetchExpenses(budget.id);
    }
  }, [fetchExpenses, budget.id]);

  useEffect(() => {
    fetchBudget();
  }, [fetchBudget]);

  return (
    <DashboardTemplate
      header={
        <div className="flex items-center justify-between px-6 py-4  text-white shadow-md">
          <Typography variant="h1" className="text-2xl font-bold">
            Expense Tracker
          </Typography>
        </div>
      }
      content={
        <div className="p-6 space-y-8 bg-background h-screen">
          <BudgetOverview
            spent={spent}
            budget={budget.amount ?? 0}
            enableExpense={budget.id !== undefined && budget?.amount > 0}
            onBudgetClick={() => setIsModalOpen(!isModalOpen)}
            onExpenseClick={() => setIsExpenseModalOpen(!isExpenseModalOpen)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spent > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Chart data={chartData} />
              </div>
            )}
            {expenses?.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Typography variant="h2" className="text-xl font-bold pb-4">
                  Expenses
                </Typography>
                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                  {spent > 0 && <ExpenseList expenses={expenses} />}
                </div>
              </div>
            )}
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(!isModalOpen)}
            title="Set Budget"
          >
            <BudgetForm />
          </Modal>

          <Modal
            isOpen={isExpenseModalOpen}
            onClose={() => setIsExpenseModalOpen(!isExpenseModalOpen)}
            title="Add Expense"
          >
            <ExpenseForm
              onSubmit={() => setIsExpenseModalOpen(!isExpenseModalOpen)}
            />
          </Modal>
        </div>
      }
    />
  );
};

export default IndexPage;
