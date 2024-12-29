import { Currency } from "@/types/currency";
import apiClient from "@/utils/api";
import { useCallback, useEffect, useState } from "react";

export const useExchangeService = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const convertToUsd = useCallback(
    async (
      amount: number,
      currency: string
    ): Promise<{ amount: number; currency: string } | undefined> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<{ convertedAmount: number }>(
          `/exchange/usd?amount=${amount}&currency=${currency}`
        );

        if (response.data) {
          return { amount: response.data.convertedAmount, currency: "USD" };
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
      return undefined;
    },
    []
  );

  const fetchCurrencies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Currency[]>("/exchange/currencies");

      if (response.data) {
        setCurrencies(response.data);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  return { fetchCurrencies, convertToUsd, currencies, loading, error };
};
