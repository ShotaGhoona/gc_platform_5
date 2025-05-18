import { useEffect, useState } from "react";
import { fetchProfileDetail, MemberDetail } from "../services/ProfileDetailService";

export const useProfileDetail = (userId: string | null) => {
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
    fetchProfileDetail(userId)
      .then((data) => {
        setProfile(data);
        setError(null);
      })
      .catch((e) => {
        setError("プロフィール詳細の取得に失敗しました");
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { profile, loading, error };
};
