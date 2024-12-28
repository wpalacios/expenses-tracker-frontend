import DashboardTemplate from '../components/templates/DashboardTemplate';
import ExpenseList from '../components/organisms/ExpenseList';

const expenses = [
  { id: 1, amount: 100, currency: 'USD', description: 'Groceries', date: '2024-12-01' },
  { id: 2, amount: 50, currency: 'USD', description: 'Transport', date: '2024-12-02' },
];

const ExpensesPage = () => (
  <DashboardTemplate
    header={<h1 className="text-2xl font-bold">Expenses</h1>}
    content={<ExpenseList expenses={expenses} />}
  />
);

export default ExpensesPage;
