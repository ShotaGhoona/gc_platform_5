import { useEffect, useState } from "react";
import { fetchProfileDetail, MemberDetail } from "../services/ProfileDetailService";

export const useProfileDetail = (userId: string | null, viewerId?: string) => {
  const [profile, setProfile] = useState<MemberDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    fetchProfileDetail(userId, viewerId)
      .then((data) => {
        setProfile(data);
        setError(null);
      })
      .catch((e) => {
        setError("プロフィール詳細の取得に失敗しました");
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, [userId, viewerId]);

  return { profile, loading, error };
};
