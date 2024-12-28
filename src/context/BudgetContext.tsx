"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type BudgetContextProps = {
  budget: number;
  spent: number;
  setBudget: (budget: number) => void;
  setSpent: (spent: number) => void;
};

const BudgetContext = createContext<BudgetContextProps | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);

  const value = React.useMemo(
    () => ({ budget, spent, setBudget, setSpent }),
    [budget, spent]
  );

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
