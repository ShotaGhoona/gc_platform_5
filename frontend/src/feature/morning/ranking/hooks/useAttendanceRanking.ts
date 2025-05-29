import { useEffect, useState } from "react";
import { AttendanceRanker, fetchTotalRanking, fetchStreakingRanking, fetchMonthlyRanking } from "../services/attendanceRankingService";

// 月間ランキング用フック
export function useMonthlyRanking(
  year: number,
  month: number,
  rankingType: "All" | "Rival" = "All",
  user?: string
) {
  const [data, setData] = useState<AttendanceRanker[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMonthlyRanking(year, month, rankingType, user)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [year, month, rankingType, user]);

  return { data, loading, error };
}

// 総合ランキング用フック
export function useTotalRanking(
  rankingType: "All" | "Rival" = "All",
  user?: string
) {
  const [data, setData] = useState<AttendanceRanker[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTotalRanking(rankingType, user)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [rankingType, user]);

  return { data, loading, error };
}

// 連続ランキング用フック
export function useStreakingRanking(
  rankingType: "All" | "Rival" = "All",
  user?: string
) {
  const [data, setData] = useState<AttendanceRanker[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchStreakingRanking(rankingType, user)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [rankingType, user]);

  return { data, loading, error };
}
