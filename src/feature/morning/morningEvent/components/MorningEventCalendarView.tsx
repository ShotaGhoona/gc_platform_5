import { useState } from "react";
import { MorningEventListItem } from "../services/morningEventService";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from "react-icons/tb";

type Props = {
  events: MorningEventListItem[];
  openSidePeak: (eventId: string) => void;
};

function getMonthMatrix(year: number, month: number) {
  // month: 1-12
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const firstWeekDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const matrix: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstWeekDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }
  return matrix;
}

export default function MorningEventCalendarView({ events, openSidePeak }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);

  const monthMatrix = getMonthMatrix(viewYear, viewMonth);

  // 日付ごとにイベントをまとめる
  const eventMap: { [date: string]: MorningEventListItem[] } = {};
  events.forEach((event) => {
    const d = new Date(event.start_at);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    if (!eventMap[key]) eventMap[key] = [];
    eventMap[key].push(event);
  });

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

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

  // カレンダーの週数
  const weekCount = monthMatrix.length;

  return (
    <div className="flex items-center w-full h-full gap-5">
      <div className="flex justify-center items-center w-1/3 relative h-full">
        <div className="flex items-center justify-center z-1">
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
        {/* <img src="/images/serson/4.jpg" alt="calendar" className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 rounded-lg" /> */}
        <div className="absolute w-[50%] h-[10%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-5 blur-lg"></div>
      </div>
      <div className="flex flex-col flex-1 w-full h-full overflow-hidden min-h-0">
        {/* 曜日行 */}
        <div className="grid grid-cols-7 w-full h-10">
          {weekDays.map((wd) => (
            <div key={wd} className="flex items-center justify-center font-semibold text-gray-600">{wd}</div>
          ))}
        </div>
        {/* 日付グリッド */}
        <div className="flex-1 grid grid-cols-7 w-full h-full">
          {monthMatrix.flat().map((d, idx) => {
            const col = idx % 7;
            const row = Math.floor(idx / 7);
            const dateKey = d
              ? `${viewYear}-${viewMonth}-${d}`
              : "";
            const isToday =
              d &&
              viewYear === today.getFullYear() &&
              viewMonth === today.getMonth() + 1 &&
              d === today.getDate();
            return (
              <div
                key={idx}
                className={`w-full h-full flex flex-col items-center p-1 relative rounded-[15px] border-5 border-white ${
                  isToday ? "bg-gray-100" : "bg-gray-50"
                }`}
                style={{ minHeight: 0 }}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-full mb-1 ${isToday ? "bg-[#5D6B80] text-white" : "text-gray-700"}`}>
                  {d || ""}
                </div>
                <div className="flex flex-col gap-1 w-full items-center">
                  {d &&
                    eventMap[dateKey]?.map((event) => (
                      <div 
                        key={event.id}
                        className={`flex items-center gap-1 w-full rounded px-2 py-0.5 shadow-md ${
                          event.is_host ? "bg-[#5D6B80] text-white" : "bg-gray-50 text-gray-700"
                        }`}
                        onClick={() => openSidePeak(event.id)}
                      >
                        <img src={event.host_avatar_image_url} alt="host" className="w-5 h-5 rounded-full" />
                        <span
                          className="text-xs truncate ext-center cursor-pointer"
                          title={event.title}
                        >
                          {event.title}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
