import { useUser } from "@clerk/nextjs";
import { useDashboardMainContents } from "../hooks/useDashboardMainContnts";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { getDateRangeByType } from "../utils/dateRangeUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

type Props = {
  selectedViewIndex: number;
};

export default function WeeklyAnalysis({ selectedViewIndex }: Props) {
  const { user } = useUser();
  const { start, end } = getDateRangeByType(selectedViewIndex);
  const { data, loading, error } = useDashboardMainContents(user?.id ?? "", start, end);

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="w-full h-full text-red-500 flex items-center justify-center">{error}</div>;
  }
  if (!data) {
    return <div className="w-full h-full flex items-center justify-center">No data</div>;
  }

  // 動的にdatasetsを生成
  const colorMap: Record<string, string> = {
    Me: "rgba(197, 110, 123, 0.7)",
    Average: "rgba(200, 200, 200, 0.7)",
  };
  // ライバル用の色リスト
  const rivalColors = [
    "rgba(100, 181, 246, 0.7)", // 青
    "rgba(255, 202, 40, 0.7)",  // 黄
    "rgba(129, 199, 132, 0.7)", // 緑
  ];
  let rivalColorIdx = 0;

  const datasets = Object.keys(data)
    .filter((key) => key !== "labels")
    .map((key) => {
      let backgroundColor: string;
      if (colorMap[key]) {
        backgroundColor = colorMap[key];
      } else {
        backgroundColor = rivalColors[rivalColorIdx % rivalColors.length];
        rivalColorIdx++;
      }
      return {
        label: key,
        data: data[key] as number[],
        backgroundColor,
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      };
    });

  const barData = {
    labels: data.labels,
    datasets,
  };

  const barOptions: ChartOptions<"bar"> = {
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
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`,

        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#888",
          font: { size: 18, weight: "bold" },
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: "#e5e5e5" },
        ticks: {
          color: "#bbb",
          font: { size: 16 },
          callback: (v) => `${v}%`,
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-8 px-5">
      <div className="w-full h-full pt-8">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
