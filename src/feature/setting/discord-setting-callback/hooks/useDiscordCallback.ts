import { useEffect, useState } from "react";
import { postDiscordCallback } from "../services/discordCallbackService";

export function useDiscordCallback(code: string | null, userId: string | null) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!code || !userId) {
      setStatus("error");
      setMessage("認可コードまたはユーザーIDがありません");
      return;
    }
    setStatus("loading");
    setMessage("");
    postDiscordCallback(code, userId)
      .then((result) => {
        if (result.success) {
          setStatus("success");
          setMessage(result.message);
        } else {
          setStatus("error");
          setMessage(result.message);
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("連携に失敗しました");
      });
  }, [code, userId]);

  return { status, message };
}
