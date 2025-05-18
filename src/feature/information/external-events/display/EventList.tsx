"use client";
import { useEffect, useState } from "react";
import EventContainer from "@/feature/information/external-events/components/EventContainer";
import { fetchExternalEventList, ExternalEvent } from "../services/externalEventService";
import { useExternalEventFilter } from "../context/ExternalEventFilterContext";
import { SidePeak } from "@/components/display/SidePeak";
import { ExternalEventDetail } from "@/feature/information/external-events/components/ExternalEventDetail";

export default function EventList() {
  const [events, setEvents] = useState<ExternalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedTagIds } = useExternalEventFilter();
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [eventDetail, setEventDetail] = useState<ExternalEvent | null>(null);
  const [eventDetailLoading, setEventDetailLoading] = useState(false);
  const [eventDetailError, setEventDetailError] = useState<string | null>(null);
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
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {events.map((event) => (
          <EventContainer
            key={event.id}
            event={event}
            onClick={() => {
              setEventDetail(event);
              setIsEventDetailOpen(true);
            }}
          />
        ))}
      </div>
      <SidePeak isOpen={isEventDetailOpen} onClose={() => setIsEventDetailOpen(false)}>
        {eventDetail && <ExternalEventDetail event={eventDetail} />}
      </SidePeak>
    </>
  );
}
