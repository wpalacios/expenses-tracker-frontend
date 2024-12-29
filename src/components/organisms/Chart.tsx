import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type ChartProps = {
  data: { category: string; amount: number }[];
};

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4CAF50",
  "#FF9800",
  "#FF6F61",
  "#FF8C42",
  "#FFCD65",
  "#4BC0C0",
  "#36D7B7",
  "#FFB6C1",
  "#B3E5FC",
  "#F7C9B0",
  "#A5D6A7",
  "#FFD54F",
  "#FF5722",
  "#2196F3",
  "#FFC107",
  "#009688",
  "#FF7043",
  "#82B1FF",
  "#FFEB3B",
  "#8BC34A",
  "#FF5722",
  "#607D8B",
  "#3F51B5",
  "#C2185B",
  "#8D6E63",
  "#FF9800",
  "#00BCD4",
  "#9E9D24",
  "#795548",
  "#3F51B5",
  "#4CAF50",
  "#F44336",
  "#00E5FF",
  "#FF8A80",
  "#673AB7",
  "#FFCC80",
  "#C2185B",
  "#7E57C2",
  "#FF80AB",
  "#00C853",
  "#FFC400",
  "#1976D2",
  "#8E24AA",
  "#E91E63",
  "#0288D1",
  "#FF3D00",
  "#7C4DFF",
];
const Chart = ({ data }: ChartProps) => (
  <ResponsiveContainer width="100%" height={700}>
    <PieChart>
      <Pie
        data={data}
        dataKey="amount"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={200}
        fill="#8884d8"
        label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default Chart;
