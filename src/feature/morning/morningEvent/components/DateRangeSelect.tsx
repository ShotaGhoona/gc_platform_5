"use client";

import { useState } from "react";

type DateRangeType = "last_month" | "this_month" | "next_month" | "all";

interface DateRangeSelectProps {
  onChangeDateRange?: (dateRange: DateRangeType) => void;
}

const dateRangeOptions: { label: string; value: DateRangeType }[] = [
  { label: "先月", value: "last_month" },
  { label: "今月", value: "this_month" },
  { label: "来月", value: "next_month" },
  { label: "全て", value: "all" },
];

export default function DateRangeSelect({ onChangeDateRange }: DateRangeSelectProps) {
  const [selectedDateRangeIndex, setSelectedDateRangeIndex] = useState(1);

  const handleClick = (idx: number) => {
    setSelectedDateRangeIndex(idx);
    if (onChangeDateRange) {
      onChangeDateRange(dateRangeOptions[idx].value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2">
      <div className="relative flex">
        <div
          className="absolute top-0 w-[100px] h-full bg-[#5D6B80] rounded-lg transition-all duration-200 shadow-md"
          style={{ left: `${selectedDateRangeIndex * 100}px`, zIndex: 0 }}
        ></div>
        {dateRangeOptions.map((option, idx) => (
          <button
            key={option.label}
            className="w-[100px] flex items-center justify-center rounded-lg p-2 relative"
            onClick={() => handleClick(idx)}
          >
            <p
              className={`text-sm font-bold ${
                selectedDateRangeIndex === idx ? "text-white text-shadow-md" : "text-black"
              }`}
            >
              {option.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
