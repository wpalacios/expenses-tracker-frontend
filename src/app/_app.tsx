import { AppProps } from "next/app";
import { BudgetProvider } from "../context/BudgetContext";
import { ExpensesProvider } from "../context/ExpensesContext";
import { UserProvider } from "@/context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <BudgetProvider>
        <ExpensesProvider>
          <Component {...pageProps} />
        </ExpensesProvider>
      </BudgetProvider>
    </UserProvider>
  );
}

export default MyApp;
