import DashboardTemplate from '../components/templates/DashboardTemplate';
import ExpenseForm from '../components/molecules/ExpenseForm';

const BudgetPage = () => {
  const handleSubmit = (expense: { amount: number; currency: string; description: string }) => {
    console.log(expense);
  };

  return (
    <DashboardTemplate
      header={<h1 className="text-2xl font-bold">Set Budget</h1>}
      content={<ExpenseForm onSubmit={handleSubmit} />}
    />
  );
};

export default BudgetPage;
