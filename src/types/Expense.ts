export type Expense = {
  id: number;
  budgetId: number;
  userId: number;
  amount: number;
  currency: string;
  description: string;
  date: string;
  usdAmount: number;
};
