import { useEffect, useState } from "react";
import { fetchRivalAttendanceProfiles, RivalProfile } from "../services/rivalService";

// 指定月のstart, endをYYYY-MM-DDで返す
function getMonthRange(year: number, month: number): { start: string; end: string } {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

// 日付ごとにプロフィールをグループ化
function groupProfilesByDate(profiles: RivalProfile[]): Record<string, RivalProfile[]> {
  // 今回はAPIが日付情報を返さないため、全日同じデータを返す仮実装
  // 本来はAPI側で日付ごとに返すべき
  return {};
}

export function useRivalAttendanceProfiles(userId: string, year: number, month: number) {
  const [profiles, setProfiles] = useState<Record<string, RivalProfile[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !year || !month) return;
    setLoading(true);
    const { start, end } = getMonthRange(year, month);
    fetchRivalAttendanceProfiles(userId, start, end)
      .then((res) => {
        setProfiles(res);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setProfiles({});
      })
      .finally(() => setLoading(false));
  }, [userId, year, month]);

  return { profiles, loading, error };
}
