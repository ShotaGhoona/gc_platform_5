import { useCallback, useEffect, useState } from "react";
import { getDiscordId, setDiscordId } from "../services/discordSettingService";

export function useDiscordSetting(userId: string) {
  const [discordId, setDiscordIdState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscordId = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const id = await getDiscordId(userId);
      setDiscordIdState(id);
    } catch (e) {
      setError("取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const linkDiscord = useCallback(
    async (newDiscordId: string) => {
      setLoading(true);
      setError(null);
      try {
        const ok = await setDiscordId(userId, newDiscordId);
        if (ok) {
          setDiscordIdState(newDiscordId);
        } else {
          setError("連携に失敗しました");
        }
      } catch (e) {
        setError("連携に失敗しました");
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchDiscordId();
  }, [fetchDiscordId]);

  return {
    discordId,
    loading,
    error,
    refetch: fetchDiscordId,
    linkDiscord,
  };
}
