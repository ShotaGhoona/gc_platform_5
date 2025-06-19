'use client';

import { useEffect, useState } from "react";
import { fetchTierListWithFlag, TierFlag } from "../services/tierService";

export function useTierListWithFlag(userId: string) {
  const [tierList, setTierList] = useState<TierFlag[]>([]);
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
