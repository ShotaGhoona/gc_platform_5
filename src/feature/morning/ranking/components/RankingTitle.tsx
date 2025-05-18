import React from "react";

export default function RankingTitle({
    RankingTitle,
    icon,
    EnTitle,
  }: {
    RankingTitle: string;
    icon: React.ReactElement<any>;
    EnTitle: string;
  }) {
    return (
      <div className="flex items-center gap-2 justify-between relative">
        <p className="
            absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2
            text-gray-50 text-4xl font-bold w-full text-center drop-shadow-lg
        ">
            {EnTitle}
        </p>
        <span className="bg-gray-100 rounded-lg text-[#5D6B80] p-2">
        {React.cloneElement(icon, { className: "w-[20px] h-[20px]" })}
        </span>
        <p className="text-xl font-bold text-[#5D6B80] z-10 drop-shadow-lg">{RankingTitle}</p>
        <span className="bg-gray-100 rounded-lg text-[#5D6B80] p-2">
        {React.cloneElement(icon, { className: "w-[20px] h-[20px]" })}
        </span>
      </div>
    );
  }