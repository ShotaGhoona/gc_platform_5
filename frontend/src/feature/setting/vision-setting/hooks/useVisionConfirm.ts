import { useState } from "react";
import { confirmVision } from "../services/visionSettingService";

export function useVisionConfirm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleConfirm = async (userId: string, vision: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await confirmVision(userId, vision);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Visionの登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleConfirm };
}
