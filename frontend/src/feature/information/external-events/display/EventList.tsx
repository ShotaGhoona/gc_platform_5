"use client";
import { useEffect, useState } from "react";
import EventContainer from "@/feature/information/external-events/components/EventContainer";
import { fetchExternalEventList, ExternalEvent } from "../services/externalEventService";
import { useExternalEventFilter } from "../context/ExternalEventFilterContext";

type Props = {
  onEventClick?: (event: ExternalEvent) => void;
};

export default function EventList({ onEventClick }: Props) {
  const [events, setEvents] = useState<ExternalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedTagIds } = useExternalEventFilter();

  useEffect(() => {
    setLoading(true);
    fetchExternalEventList(selectedTagIds)
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [selectedTagIds]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>イベント一覧取得エラー: {error}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {events.map((event) => (
        <EventContainer
          key={event.id}
          event={event}
          onClick={() => onEventClick?.(event)}
        />
      ))}
    </div>
  );
}
