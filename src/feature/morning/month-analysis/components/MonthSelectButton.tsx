import { Dispatch, SetStateAction } from "react";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from "react-icons/tb";

type Props = {
  viewYear: number;
  setViewYear: Dispatch<SetStateAction<number>>;
  viewMonth: number;
  setViewMonth: Dispatch<SetStateAction<number>>;
};

export default function MonthSelectButton({ viewYear, setViewYear, viewMonth, setViewMonth }: Props) {
  const handlePrevMonth = () => {
    setViewMonth((prev) => {
      if (prev === 1) {
        setViewYear((y) => y - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setViewMonth((prev) => {
      if (prev === 12) {
        setViewYear((y) => y + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  return (
    <div className="flex items-center justify-center bg-white rounded-lg px-5 py-2 shadow-lg">
      <button
        className="px-2 py-1 rounded hover:bg-gray-200 transition"
        onClick={handlePrevMonth}
        aria-label="前月"
      >
        <span><TbPlayerTrackPrevFilled className="text-2xl text-gray-500" /></span>
      </button>
      <h2 className="text-xl font-bold mx-5 text-gray-500">{viewYear}年 {viewMonth}月</h2>
      <button
        className="px-2 py-1 rounded hover:bg-gray-200 transition"
        onClick={handleNextMonth}
        aria-label="次月"
      >
        <span><TbPlayerTrackNextFilled className="text-2xl text-gray-500" /></span>
      </button>
    </div>
  );
}
