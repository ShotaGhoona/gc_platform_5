import { useEffect, useState } from "react";
import { fetchDashboardSummary, DashboardSummaryResponse } from "../services/dashboardSummaryService";

export function useDashboardSummary(userId: string) {
  const [data, setData] = useState<DashboardSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchDashboardSummary(userId)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error };
}
