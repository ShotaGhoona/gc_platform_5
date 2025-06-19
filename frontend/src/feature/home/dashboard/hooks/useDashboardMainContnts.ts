import { useEffect, useState } from "react";
import {
  fetchWeeklyStats,
  WeeklyStatsResponse,
  fetchTodayLiveProfiles,
  TodayLiveProfile,
  fetchWeeklyFlow,
  WeeklyFlowResponse,
} from "../services/dashboardMainContentsService";

export function useDashboardMainContents(userId: string, start?: string, end?: string) {
  const [data, setData] = useState<WeeklyStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchWeeklyStats(userId, start, end)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [userId, start, end]);

  return { data, loading, error };
}
export function useWeeklyFlow(userId: string, start?: string, end?: string) {
  const [data, setData] = useState<WeeklyFlowResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchWeeklyFlow(userId, start, end)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [userId, start, end]);

  return { data, loading, error };
}

export function useTodayLiveProfiles() {
  const [profiles, setProfiles] = useState<TodayLiveProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTodayLiveProfiles()
      .then((res) => {
        setProfiles(res);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setProfiles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { profiles, loading, error };
}
