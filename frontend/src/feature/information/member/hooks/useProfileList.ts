'use client';

import { useEffect, useState } from "react";
import { fetchProfileList, MemberListItem } from "../services/profileService";

export const useProfileList = () => {
  const [profiles, setProfiles] = useState<MemberListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProfileList()
      .then((data: MemberListItem[]) => {
        setProfiles(data);
        setError(null);
      })
      .catch((e: any) => {
        setError("メンバー一覧の取得に失敗しました");
        setProfiles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { profiles, loading, error };
};
