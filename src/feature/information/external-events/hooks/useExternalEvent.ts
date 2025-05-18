import { useState } from "react";
import { createExternalEvent, ExternalEvent, ExternalEventCreate } from "../services/externalEventService";

export function useCreateExternalEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const mutate = async (event: ExternalEventCreate): Promise<ExternalEvent | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await createExternalEvent(event);
      setSuccess(true);
      return result;
    } catch (e: any) {
      setError(e.message || "イベント作成に失敗しました");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, success };
}
