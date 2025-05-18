"use client";
import { useEffect, useState } from "react";
import {
  fetchMorningEventListByRange,
  fetchMorningEventTags,
  MorningEventListItem,
  MorningEventTag,
} from "../services/morningEventService";

// 日付範囲でイベント一覧を取得
export function useMorningEventList(
  dateRange: "last_month" | "this_month" | "next_month" | "all" = "this_month",
  userId?: string
) {
  const [events, setEvents] = useState<MorningEventListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMorningEventListByRange(dateRange, userId)
      .then((data) => {
        setEvents(data);
        setError(null);
      })
      .catch((e) => {
        setError(e.message ?? "取得に失敗しました");
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, [dateRange, userId]);

  return { events, loading, error };
}


export function useMorningEventTags() {
  const [tags, setTags] = useState<MorningEventTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMorningEventTags()
      .then((data) => {
        setTags(data);
        setError(null);
      })
      .catch((e) => {
        setError(e.message ?? "タグ取得に失敗しました");
        setTags([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { tags, loading, error };
}
