"use client";

import React from "react";
import ProgressBar from "../molecules/ProgressBar";

type BudgetOverviewProps = {
  spent: number;
  budget: number;
};

const BudgetOverview = ({ spent, budget }: BudgetOverviewProps) => {
  const remaining = budget - spent;
  const progress = Math.min((spent / budget) * 100, 100);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold">Budget Overview</h3>
      <p className="text-gray-600">Spent: {spent.toFixed(2)} USD</p>
      <p className="text-gray-600">Remaining: {remaining.toFixed(2)} USD</p>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default BudgetOverview;
