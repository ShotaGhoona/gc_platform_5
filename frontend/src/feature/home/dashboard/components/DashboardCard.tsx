import React from "react";
import { DashboardSummaryResponse } from "../services/dashboardSummaryService";

export type DashboardCard = {
  title: string;
  value?: number;
  unit: string;
  diff?: number;
};

type Props = {
  data: DashboardSummaryResponse | null;
  loading?: boolean;
};

const CARD_DEFS: Omit<DashboardCard, "value" | "diff">[] = [
  { title: "今月の出席回数", unit: "回" },
  { title: "総出席回数", unit: "回" },
  { title: "連続出席回数", unit: "回" },
  { title: "イベント参加回数", unit: "回" },
  { title: "イベント開催回数", unit: "回" },
];

export default function DashboardCards({ data, loading }: Props) {
  // ローディング時はダミー値、データ取得後はAPI値
  const cards: DashboardCard[] = CARD_DEFS.map((def, idx) => {
    if (loading || !data) {
      return { ...def, value: undefined, diff: undefined };
    }
    switch (idx) {
      case 0:
        return {
          ...def,
          value: data.attendance_this_month.value,
          diff: data.attendance_this_month.diff,
        };
      case 1:
        return {
          ...def,
          value: data.attendance_total.value,
        };
      case 2:
        return {
          ...def,
          value: data.streak.value,
        };
      case 3:
        return {
          ...def,
          value: data.participated_events_this_month.value,
          diff: data.participated_events_this_month.diff,
        };
      case 4:
        return {
          ...def,
          value: data.hosted_events_this_month.value,
          diff: data.hosted_events_this_month.diff,
        };
      default:
        return { ...def };
    }
  });

  return (
    <div className="h-full w-full flex gap-5 items-center justify-center">
      {cards.map((card, idx) => (
        <div
          key={card.title + idx}
          className="h-full w-full flex flex-col gap-2 items-center justify-center bg-white rounded-lg shadow-md p-5"
        >
          <p className="text-xs font-bold text-gray-500">{card.title}</p>
          <div className="flex-1 flex items-center justify-center">
            {loading || card.value === undefined ? (
              <div className="w-24 h-12 bg-gray-200 animate-pulse rounded" />
            ) : (
              <h2 className="text-6xl font-bold text-gray-500">
                {card.value}
                <span className="text-2xl">{card.unit}</span>
              </h2>
            )}
          </div>
          {typeof card.diff === "number" && !loading && (
            <div
              className={`text-xs font-bold ${
                card.diff > 0
                  ? "text-green-500"
                  : card.diff < 0
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {card.diff > 0 && "+"}
              {card.diff}
              {" 先月比"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
