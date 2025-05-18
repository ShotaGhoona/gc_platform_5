import { useEffect, useState } from "react";
import { fetchParticipatingEvents, ParticipatingEvent } from "../services/participatingEventService";
import { useUser } from "@clerk/nextjs";

export function useParticipatingEvents(viewYear: number, viewMonth: number) {
  const { user } = useUser();
  const [events, setEvents] = useState<ParticipatingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setEvents([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchParticipatingEvents(viewYear, viewMonth, user.id)
      .then((data) => {
        setEvents(data);
        setError(null);
      })
      .catch((e) => {
        setError(e.message ?? "取得に失敗しました");
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, [viewYear, viewMonth, user?.id]);

  return { events, loading, error };
}
