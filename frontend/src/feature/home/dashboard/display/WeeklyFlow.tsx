import { useUser } from "@clerk/nextjs";
import { useWeeklyFlow } from "../hooks/useDashboardMainContnts";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import MainContentsDateRangeSelect from "../components/MainContentsDateRangeSelect";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import { getDateRangeByType } from "../utils/dateRangeUtils";

import { useState } from "react";

type Props = {
  selectedViewIndex: number;
};

export default function WeeklyFlow({ selectedViewIndex }: Props) {
  const { user } = useUser();
  // 全期間データのみ取得
  const { data, loading, error } = useWeeklyFlow(user?.id ?? "");

  // 期間フィルタ
  const { start, end } = getDateRangeByType(selectedViewIndex);

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="w-full h-full text-red-500 flex items-center justify-center">{error}</div>;
  }
  if (!data) {
    return <div className="w-full h-full flex items-center justify-center">No data</div>;
  }

  // ラベルのインデックス範囲を決定
  let startIdx = 0;
  let endIdx = data.labels.length;
  if (start || end) {
    for (let i = 0; i < data.labels.length; i++) {
      const weekLabel = data.labels[i];
      // 週ラベルを日付に変換（"YYYY-WW"→月曜の日付）
      const [year, week] = weekLabel.split("-");
      const monday = getMondayOfISOWeek(Number(week), Number(year));
      const mondayStr = monday.toISOString().slice(0, 10);
      if (start && mondayStr >= start) {
        startIdx = i;
        break;
      }
    }
    for (let i = data.labels.length - 1; i >= 0; i--) {
      const weekLabel = data.labels[i];
      const [year, week] = weekLabel.split("-");
      const monday = getMondayOfISOWeek(Number(week), Number(year));
      const mondayStr = monday.toISOString().slice(0, 10);
      if (end && mondayStr <= end) {
        endIdx = i + 1;
        break;
      }
    }
  }

  // 動的にdatasetsを生成
  const colorMap: Record<string, { borderColor: string; backgroundColor: string }> = {
    Me: {
      borderColor: "rgba(197, 110, 123, 1)",
      backgroundColor: "rgba(197, 110, 123, 0.2)",
    },
    Average: {
      borderColor: "rgba(200, 200, 200, 1)",
      backgroundColor: "rgba(200, 200, 200, 0.2)",
    },
  };
  // ライバル用の色リスト
  const rivalColors = [
    { borderColor: "rgba(100, 181, 246, 1)", backgroundColor: "rgba(100, 181, 246, 0.2)" }, // 青
    { borderColor: "rgba(255, 202, 40, 1)", backgroundColor: "rgba(255, 202, 40, 0.2)" },   // 黄
    { borderColor: "rgba(129, 199, 132, 1)", backgroundColor: "rgba(129, 199, 132, 0.2)" }, // 緑
  ];
  let rivalColorIdx = 0;

  const datasets = Object.keys(data)
    .filter((key) => key !== "labels")
    .map((key) => {
      let borderColor: string;
      let backgroundColor: string;
      if (colorMap[key]) {
        borderColor = colorMap[key].borderColor;
        backgroundColor = colorMap[key].backgroundColor;
      } else {
        borderColor = rivalColors[rivalColorIdx % rivalColors.length].borderColor;
        backgroundColor = rivalColors[rivalColorIdx % rivalColors.length].backgroundColor;
        rivalColorIdx++;
      }
      // フィルタ後のデータ
      const arr = data[key] as number[];
      return {
        label: key,
        data: arr.slice(startIdx, endIdx),
        borderColor,
        backgroundColor,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: borderColor,
        fill: false,
      };
    });

  const chartData = {
    labels: data.labels.slice(startIdx, endIdx),
    datasets,
  };

  // ISO週番号から月曜の日付を取得
  function getMondayOfISOWeek(week: number, year: number) {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    ISOweekStart.setHours(0, 0, 0, 0);
    return ISOweekStart;
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          usePointStyle: false,
          font: { size: 15, weight: "bold" },
          color: "#999999",
        },
      },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#888",
          font: { size: 14, weight: "bold" },
        },
      },
      y: {
        min: 0,
        grid: { color: "#e5e5e5" },
        ticks: {
          color: "#bbb",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="w-full h-full min-h-0 max-h-screen p-4 flex flex-col justify-center gap-2" style={{ boxSizing: "border-box" }}>
      <div className="w-full h-full min-h-0 min-h-0">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
