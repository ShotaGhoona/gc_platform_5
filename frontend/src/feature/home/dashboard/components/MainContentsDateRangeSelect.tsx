"use client";

import { TbPercentage10, TbPercentage50, TbPercentage90 } from "react-icons/tb";

type Props = {
  selectedViewIndex: number;
  onChangeViewIndex: (idx: number) => void;
};

export default function MainContentsDateRangeSelect({ selectedViewIndex, onChangeViewIndex }: Props) {
  const viewOptionsIcon = [
    {
      icon: <TbPercentage90  className="size-5" />,
      label: "All Season",
    },
    {
      icon: <TbPercentage50 className="size-5" />,
      label: "3 months",
    },
    {
      icon: <TbPercentage10 className="size-5" />,
      label: "1 month",
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
