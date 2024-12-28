export const validateBudget = (budget: number): boolean => {
    if (budget <= 0) {
      alert('Budget must be greater than zero.');
      return false;
    }
    return true;
  };
  
  export const validateExpense = (expense: {
    amount: number;
    currency: string;
    description: string;
  }): boolean => {
    if (expense.amount <= 0) {
      alert('Amount must be greater than zero.');
      return false;
    }
  
    if (!expense.currency) {
      alert('Currency is required.');
      return false;
    }
  
    if (!expense.description.trim()) {
      alert('Description is required.');
      return false;
    }
  
    return true;
  };
  