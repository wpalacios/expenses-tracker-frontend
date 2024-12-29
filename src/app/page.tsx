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
      header={<h1 className="text-2xl font-bold">Expense Tracker</h1>}
      content={
        <div className="space-y-8">
          <BudgetOverview
            spent={spent}
            budget={budget.amount ?? 0}
            enableExpense={budget.id !== undefined && budget?.amount > 0}
            onBudgetClick={() => setIsModalOpen(!isModalOpen)}
            onExpenseClick={() => setIsExpenseModalOpen(!isExpenseModalOpen)}
          />

          <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/2">
              {spent > 0 && <Chart data={chartData} />}
            </div>
            <div className="flex flex-col w-1/2 ">
              {expenses?.length > 0 && (
                <Typography variant="h2" className="text-lg font-bold pb-4">
                  Expenses
                </Typography>
              )}
              <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                {spent > 0 && <ExpenseList expenses={expenses} />}
              </div>
            </div>
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
