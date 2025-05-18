'use client';

import { useEffect, useState } from "react";
import { fetchUserMaxTier, fetchTierListWithFlag, Tier, TierWithFlag } from "@/services/tierService";
export function useUserMaxTier(userId: string) {
  const [tier, setTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchUserMaxTier(userId)
      .then((t) => setTier(t))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return { tier, loading, error };
}

export function useTierListWithFlag(userId: string) {
  const [tierList, setTierList] = useState<TierWithFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchTierListWithFlag(userId)
      .then((list) => setTierList(list))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return { tierList, loading, error };
}
