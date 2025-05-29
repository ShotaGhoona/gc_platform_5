"use client";

import { RiGalleryView2, RiCalendarLine } from "react-icons/ri";

type Props = {
  selectedViewIndex: number;
  onChangeViewIndex: (idx: number) => void;
};

export default function ViewSelect({ selectedViewIndex, onChangeViewIndex }: Props) {
  const viewOptionsIcon = [
    <RiGalleryView2 className="size-5" />,
    <RiCalendarLine className="size-5" />,
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-2">
      <div className="relative flex">
        <div
          className="absolute top-0 w-[50px] h-full bg-[#5D6B80] rounded-lg transition-all duration-200 shadow-md"
          style={{ left: `${selectedViewIndex * 50}px`, zIndex: 0 }}
        ></div>
        {viewOptionsIcon.map((icon, idx) => (
          <button
            key={idx}
            className="w-[50px] flex items-center justify-center rounded-lg p-2 relative"
            onClick={() => onChangeViewIndex(idx)}
          >
            <div
              className={`text-sm font-bold ${
                selectedViewIndex === idx ? "text-white text-shadow-md" : "text-black"
              }`}
            >
              {icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
