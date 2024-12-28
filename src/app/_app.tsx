import { AppProps } from "next/app";
import { BudgetProvider } from "../context/BudgetContext";
import { ExpensesProvider } from "../context/ExpensesContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BudgetProvider>
      <ExpensesProvider>
        <Component {...pageProps} />
      </ExpensesProvider>
    </BudgetProvider>
  );
}

export default MyApp;
