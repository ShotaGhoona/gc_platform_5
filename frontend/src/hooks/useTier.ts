'use client';

import { useEffect, useState } from "react";
import { fetchTierDetailWithFlag, TierDetail, updateUserTierRole } from "@/services/tierService";

export function useTierDetailWithFlag(tierId: number | null, userId: string) {
  const [tierDetail, setTierDetail] = useState<TierDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tierId || !userId) return;
    setLoading(true);
    fetchTierDetailWithFlag(tierId, userId)
      .then((detail) => setTierDetail(detail))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [tierId, userId]);

  return { tierDetail, loading, error, refetch: () => {
    if (!tierId || !userId) return;
    setLoading(true);
    fetchTierDetailWithFlag(tierId, userId)
      .then((detail) => setTierDetail(detail))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }};
}
import { fetchMainSubTierThumbnails, MainSubTierThumbnailsResponse } from "@/services/tierService";

export function useMainSubTierThumbnails(userId: string) {
  const [data, setData] = useState<MainSubTierThumbnailsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchMainSubTierThumbnails(userId)
      .then((res) => setData(res))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [userId]);
  console.log(data);
  return { data, loading, error };
}

export function useUpdateUserTierRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateRole = async (
    tierId: number,
    userId: string,
    role: "main" | "sub" | null
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const res = await updateUserTierRole(tierId, userId, role);
    setLoading(false);
    if (res.success) {
      setSuccess(true);
    } else {
      setError(res.error || "エラーが発生しました");
    }
    return res;
  };

  return { updateRole, loading, error, success };
}
