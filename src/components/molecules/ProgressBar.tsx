import React from "react";

type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="w-full bg-gray-300 rounded h-4">
    <div
      className="bg-green-500 h-4 rounded"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default ProgressBar;
