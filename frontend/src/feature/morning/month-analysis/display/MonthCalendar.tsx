"use client";

import Link from "next/link";
import { FiSunrise } from "react-icons/fi";
function getMonthMatrix(year: number, month: number) {
  // month: 1-12, 月曜始まり
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  // JS: 0=日, 1=月, ..., 6=土 → 月曜始まりに変換
  const firstWeekDay = (firstDay.getDay() + 6) % 7;
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

import { ParticipatingEvent } from "../services/participatingEventService";
import { useUser } from "@clerk/nextjs";

type Props = {
  viewYear: number;
  viewMonth: number;
  events: ParticipatingEvent[];
  onEventClick?: (eventId: string) => void;
  attendanceDays?: string[];
};

export default function MonthCalendar({ viewYear, viewMonth, events, onEventClick, attendanceDays = [] }: Props) {
  const { user } = useUser();
  const today = new Date();
  const monthMatrix = getMonthMatrix(viewYear, viewMonth);
  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

  // 日付ごとにイベントをまとめる
  const eventMap: { [date: string]: ParticipatingEvent[] } = {};
  events.forEach((event) => {
    const d = new Date(event.start_at);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    if (!eventMap[key]) eventMap[key] = [];
    eventMap[key].push(event);
  });

  return (
    <div className="flex flex-col items-center w-full h-full gap-5">
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
            const isToday =
              d &&
              viewYear === today.getFullYear() &&
              viewMonth === today.getMonth() + 1 &&
              d === today.getDate();
            const isSat = col === 5;
            const isSun = col === 6;
            const dateKey = d ? `${viewYear}-${viewMonth}-${d}` : "";
            // 参加日判定
            const dateStr = d ? `${viewYear}-${String(viewMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}` : "";
            const isAttended = attendanceDays.includes(dateStr);
            return (
              <div
                key={idx}
                className={`w-full h-full flex flex-col items-center p-1 relative rounded-[15px] border-5 border-white
                  ${isAttended ? "bg-[#EAC2CA]" : isSat || isSun ? "bg-gray-100" : "bg-gray-50"}
                `}
                style={{ minHeight: 0 }}
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 ${isToday ? "bg-[#5D6B80] text-white" : "text-gray-700"}`}>
                  {d || ""}
                </div>
                <div className="flex flex-col gap-1 w-full items-center">
                  {d &&
                    eventMap[dateKey]?.map((event) => {
                      const bgColor = event.is_host ? "bg-[#D68897]" : "bg-[#5D6B80]";
                      return (
                        <div
                          key={event.id}
                          className={`flex items-center gap-1 w-full rounded px-2 py-0.5 shadow-md text-white cursor-pointer ${bgColor}`}
                          onClick={() => onEventClick?.(event.id)}
                        >
                          <img src={event.host_avatar_image_url} alt="host" className="w-5 h-5 rounded-full" />
                          <span className="text-xs truncate w-full text-center font-bold">{event.title}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between w-full gap-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-8 bg-[#EAC2CA] rounded-lg"></div>
            <p className="text-xs font-bold text-gray-500">出席日</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-4 bg-[#D68897] rounded-lg"></div>
            <p className="text-xs font-bold text-gray-500">開催イベント</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-4 bg-[#5D6B80] rounded-lg"></div>
            <p className="text-xs font-bold text-gray-500">参加イベント</p>
          </div>
        </div>
        <Link href="/morning-event" className="flex items-center gap-2 text-gray-500 bg-gray-100 rounded-lg py-2 px-4 shadow-md">
          <p className="text-xs">朝活イベント一覧を見る</p>
          <FiSunrise />
        </Link>
      </div>
    </div>
  );
}
