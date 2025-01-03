import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BudgetProvider } from "@/context/BudgetContext";
import { ExpensesProvider } from "@/context/ExpensesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slope Budget Tracker",
  description: "Take-home challenge from Slope's team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BudgetProvider>
          <ExpensesProvider>{children}</ExpensesProvider>
        </BudgetProvider>
      </body>
    </html>
  );
}
