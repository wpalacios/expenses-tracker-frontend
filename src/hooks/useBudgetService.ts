import { useCallback, useEffect, useState } from "react";
import { useBudget } from "../context/BudgetContext";
import apiClient from "@/api/apiClient";
import { Budget } from "@/types/Budget";

export interface CreateBudgetPayload {
  amount: number;
  currency: string;
}

export interface UpdateBudgetPayload {
  amount: number;
  id: number;
}

export const useBudgetService = () => {
  const { setBudget } = useBudget();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBudget = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Budget>("/budget");

      if (response.data) {
        setBudget(response.data);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [setBudget]);

  const createBudget = useCallback(
    async (payload: CreateBudgetPayload) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.post<Budget>("/budget", payload);
        setBudget(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [setBudget]
  );

  const updateBudget = useCallback(
    async (payload: UpdateBudgetPayload) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.put<Budget>(
          `/budget/${payload.id}`,
          payload
        );
        setBudget(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [setBudget]
  );

  useEffect(() => {
    fetchBudget();
  }, [fetchBudget]);

  return { createBudget, updateBudget, fetchBudget, loading, error };
};
