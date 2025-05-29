import { useEffect, useState } from "react";
import { fetchAttendanceDaysByMonth } from "../services/attendanceService";
import { useUser } from "@clerk/nextjs";

export function useAttendance(viewYear: number, viewMonth: number) {
  const { user } = useUser();
  const [days, setDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setDays([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchAttendanceDaysByMonth(user.id, viewYear, viewMonth)
      .then((data) => {
        setDays(data);
        setError(null);
      })
      .catch((e) => {
        setError(e.message ?? "出席日取得に失敗しました");
        setDays([]);
      })
      .finally(() => setLoading(false));
  }, [user?.id, viewYear, viewMonth]);

  return { days, loading, error };
}
