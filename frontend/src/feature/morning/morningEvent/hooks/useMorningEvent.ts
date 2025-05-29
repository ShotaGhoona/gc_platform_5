"use client";
import { useEffect, useState } from "react";
import {
  fetchMorningEventListByMonth,
  fetchMorningEventTags,
  MorningEventListItem,
  MorningEventTag,
} from "../services/morningEventService";

// 日付範囲でイベント一覧を取得
export function useMorningEventList(
  year: number,
  month: number,
  userId?: string
) {
  const [events, setEvents] = useState<MorningEventListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMorningEventListByMonth(year, month, userId)
      .then((data) => {
        setEvents(data);
        setError(null);
      })
      .catch((e) => {
        setError(e.message ?? "取得に失敗しました");
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, [year, month, userId]);

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
