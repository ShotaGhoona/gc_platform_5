import { useState } from "react";
import { createExternalEvent, updateExternalEvent, deleteExternalEvent, ExternalEventCreate, ExternalEvent } from "../services/externalEventService";

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

export function useUpdateExternalEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (eventId: number, input: Partial<ExternalEventCreate>): Promise<ExternalEvent | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateExternalEvent(eventId, input);
      return result;
    } catch (e: any) {
      setError(e.message || "イベント編集に失敗しました");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

export function useDeleteExternalEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (eventId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteExternalEvent(eventId);
      return true;
    } catch (e: any) {
      setError(e.message || "イベント削除に失敗しました");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
