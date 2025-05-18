import { useEffect, useState } from "react";
import { getUserCount } from "../services/userService";

/**
 * ユーザー数を取得するカスタムフック
 */
export function useUserCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getUserCount()
      .then((c) => {
        setCount(c);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "ユーザー数の取得に失敗しました");
        setLoading(false);
      });
  }, []);

  return { count, loading, error };
}
