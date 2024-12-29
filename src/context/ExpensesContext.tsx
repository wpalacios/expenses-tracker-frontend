"use client";

import { Expense } from "@/types/Expense";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";

type ExpensesContextProps = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
};

const ExpensesContext = createContext<ExpensesContextProps | undefined>(
  undefined
);

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = useCallback((expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  }, []);

  const value = React.useMemo(
    () => ({ expenses, addExpense, setExpenses }),
    [expenses, addExpense]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};
