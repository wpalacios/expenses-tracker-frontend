import { useExpenses } from "@/context/ExpensesContext";
import { Expense } from "@/types/Expense";
import apiClient from "@/utils/api";
import { useCallback, useState } from "react";

export const useExpensesService = () => {
  const { expenses, addExpense, setExpenses } = useExpenses();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(
    async (budgetId: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<Expense[]>(
          `/expenses/budget/${budgetId}`
        );

        if (response.data) {
          setExpenses(response.data);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [setExpenses]
  );

  const addNewExpense = async (expenseData: {
    description: string;
    amount: number;
    usdAmount: number;
    currency: string;
    date: string;
    budgetId?: number;
    userId: number;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<Expense>("/expenses", expenseData);
      addExpense({ ...response.data });

      return response.data;
    } catch (error) {
      setError((error as Error).message);
      throw new Error("Error creating expense: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { expenses, loading, error, fetchExpenses, addNewExpense };
};
