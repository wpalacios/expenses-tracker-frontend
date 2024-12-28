import { Expense } from "@/types/Expense";
import { useExpenses } from "../context/ExpensesContext";
import { api } from "../utils/api";

export const useExpensesData = () => {
  const { expenses, addExpense } = useExpenses();

  const fetchExpenses = async () => {
    const { data } = await api.get<Expense[]>("/expenses");
    data.forEach((expense: Expense) => addExpense(expense));
  };

  //   TODO: take partial props from Expense type
  const addNewExpense = (expense: {
    amount: number;
    currency: string;
    description: string;
    date: string;
  }) => {
    addExpense({ ...expense, id: Date.now() });
  };

  return { expenses, fetchExpenses, addNewExpense };
};
