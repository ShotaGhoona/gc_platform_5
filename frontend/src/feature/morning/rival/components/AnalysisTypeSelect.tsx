"use client";

import { RiBarChart2Fill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
type Props = {
  selectedViewIndex: number;
  onChangeViewIndex: (idx: number) => void;
};

export default function AnalysisTypeSelect({ selectedViewIndex, onChangeViewIndex }: Props) {
  const viewOptionsIcon = [
    {
      icon: <RiBarChart2Fill className="size-5" />,
      label: "Weekly Analysis",
    },
    {
      icon: <FaChartLine className="size-5" />,
      label: "Weekly Flow",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-2">
      <div className="relative flex">
        <div
          className="absolute top-0 w-[150px] h-full bg-[#5D6B80] rounded-lg transition-all duration-200 shadow-md"
          style={{ left: `${selectedViewIndex * 150}px`, zIndex: 0 }}
        ></div>
        {viewOptionsIcon.map((type, idx) => (
          <button
            key={idx}
            className="w-[150px] flex items-center justify-center rounded-lg p-2 relative"
            onClick={() => onChangeViewIndex(idx)}
          >
            <div
              className={`text-sm font-bold flex items-center justify-center gap-2 ${
                selectedViewIndex === idx ? "text-white text-shadow-md" : "text-gray-500"
              }`}
            >
              {type.icon}
              <p className="text-xs">{type.label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
