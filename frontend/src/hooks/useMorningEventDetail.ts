"use client";
import { useEffect, useState, useCallback } from "react";
import { fetchMorningEventDetail, MorningEventDetail } from "../services/morningEventDetailService";
import { useUser } from "@clerk/nextjs";

export function useMorningEventDetail(eventId: string | null) {
  const [detail, setDetail] = useState<MorningEventDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const fetchDetail = useCallback((id: string) => {
    setLoading(true);
    setError(null);
    fetchMorningEventDetail(id, user?.id)
      .then((data) => {
        setDetail(data);
        setError(null);
      })
      .catch((e) => {
        setError(e.message ?? "詳細取得に失敗しました");
        setDetail(null);
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  useEffect(() => {
    if (eventId) {
      fetchDetail(eventId);
    } else {
      setDetail(null);
    }
  }, [eventId, fetchDetail]);

  return { detail, loading, error };
}
