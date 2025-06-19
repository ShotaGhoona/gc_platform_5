import React from "react";

type Props = {
  card_image_url?: string;
  title_en: string;
  title_ja: string;
  short_description?: string;
  long_description?: string;
};

export default function TierPopUpContent({
  card_image_url,
  title_en,
  title_ja,
  short_description,
  long_description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-between h-full gap-10 p-10">
      <div className="
          text-5xl font-bold
          text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
      ">
            Finally you got it!
      </div>
      <div className="flex-1 flex items-center justify-center w-full gap-10">
        <div className="h-full w-auto flex items-center justify-center bg-gray-100 rounded-lg shadow-lg p-5 relative">
          {card_image_url && (
            <img
              src={card_image_url}
              alt={title_en}
              className="w-100 h-100"
            />
          )}
        </div>
        <div className="flex flex-col justify-between">
          {short_description && (
            <div className="text-base text-gray-700 mb-2">{short_description}</div>
          )}
          <div className="flex-1 flex flex-col gap-2">
            <div className="text-4xl text-[#5F7392] font-bold z-10">{title_ja}</div>
            <div className="text-7xl text-[#5F7392] font-bold z-10">{title_en}</div>
          </div>
          {long_description && (
            <div className="text-sm text-gray-500">{long_description}</div>
          )}
        </div>
      </div>
    </div>
  );
}
