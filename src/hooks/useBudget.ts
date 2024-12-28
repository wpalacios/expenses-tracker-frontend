import { useBudget } from "../context/BudgetContext";

export const useBudgetData = () => {
  const { budget, setBudget } = useBudget();

  const updateBudget = (newBudget: number) => {
    setBudget(newBudget);
  };

  return { budget, updateBudget };
};
