import { Dispatch, SetStateAction } from "react";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from "react-icons/tb";

type Props = {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  onChange?: (year: number, month: number) => void;
  className?: string;
};

export default function MonthRangeChangeButton({
  year,
  setYear,
  month,
  setMonth,
  onChange,
  className = "",
}: Props) {
  // month: 1-12
  const handlePrevMonth = () => {
    let newYear = year;
    let newMonth = month - 1;
    if (newMonth < 1) {
      newYear -= 1;
      newMonth = 12;
    }
    setYear(newYear);
    setMonth(newMonth);
    if (onChange) onChange(newYear, newMonth);
  };

  const handleNextMonth = () => {
    let newYear = year;
    let newMonth = month + 1;
    if (newMonth > 12) {
      newYear += 1;
      newMonth = 1;
    }
    setYear(newYear);
    setMonth(newMonth);
    if (onChange) onChange(newYear, newMonth);
  };

  return (
    <div className={`flex items-center justify-center bg-white rounded-lg px-5 py-2 shadow-lg ${className}`}>
      <button
        className="px-2 rounded hover:bg-gray-200 transition"
        onClick={handlePrevMonth}
        aria-label="前月"
      >
        <span>
          <TbPlayerTrackPrevFilled className="text-xl text-gray-500" />
        </span>
      </button>
      <h2 className="text-base font-bold mx-5 text-gray-500">
        {year}年 {month}月
      </h2>
      <button
        className="px-2 rounded hover:bg-gray-200 transition"
        onClick={handleNextMonth}
        aria-label="次月"
      >
        <span>
          <TbPlayerTrackNextFilled className="text-xl text-gray-500" />
        </span>
      </button>
    </div>
  );
}
