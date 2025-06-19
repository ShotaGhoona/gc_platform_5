"use client";

import { useState } from "react";

export default function DateRangeSelect() {
  const dateRangeOptions = ["this weekend", "this month", "all time"];
  const [selectedDateRangeIndex, setSelectedDateRangeIndex] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md p-2">
      <div className="relative flex">
        <div
          className="absolute top-0 w-[150px] h-full bg-[#5D6B80] rounded-lg transition-all duration-200 shadow-md"
          style={{ left: `${selectedDateRangeIndex * 150}px`, zIndex: 0 }}
        ></div>
        {dateRangeOptions.map((label, idx) => (
          <button
            key={label}
            className="w-[150px] flex items-center justify-center rounded-lg p-2 relative z-10"
            onClick={() => setSelectedDateRangeIndex(idx)}
          >
            <p
              className={`text-sm font-bold ${
                selectedDateRangeIndex === idx ? "text-white text-shadow-md" : "text-black"
              }`}
            >
              {label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
