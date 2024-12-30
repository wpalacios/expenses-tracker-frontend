"use client";

import {
  AdjustmentsHorizontalIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";
import Button from "../atoms/Button";
import ProgressBar from "../molecules/ProgressBar";
import Typography from "../atoms/Typography";

type BudgetOverviewProps = {
  spent: number;
  budget: number;
  enableExpense: boolean;
  onBudgetClick: MouseEventHandler<HTMLButtonElement>;
  onExpenseClick: MouseEventHandler<HTMLButtonElement>;
};

const BudgetOverview = ({
  budget,
  spent,
  enableExpense = false,
  onBudgetClick,
  onExpenseClick,
}: BudgetOverviewProps) => {
  const remaining = budget - spent;
  const progress = Math.min((spent / budget) * 100, 100);

  return (
    <div className="border bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2 w-full">
          <Typography variant="h2" className="text-xl font-bold">
            Budget Overview
          </Typography>
          <p className="text-gray-600">
            <span className="font-semibold">Budget:</span> {budget.toFixed(2)}{" "}
            USD
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Spent:</span> {spent.toFixed(2)} USD
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Remaining:</span>
            {remaining.toFixed(2)} USD
          </p>
          <ProgressBar progress={progress} />
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={onBudgetClick} className="text-blue-500">
            <AdjustmentsHorizontalIcon className="size-6 text-white" />
          </Button>
          {enableExpense === true && (
            <Button onClick={onExpenseClick} className="text-blue-500">
              <CurrencyDollarIcon className="size-6 text-white" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
