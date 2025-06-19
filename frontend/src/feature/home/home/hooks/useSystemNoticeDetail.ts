// frontend/src/feature/home/home/hooks/useSystemNoticeDetail.ts
import { useEffect, useState } from 'react';
import { fetchSystemNoticeDetail, SystemNoticeDetail } from '../services/systemNoticeService';

export function useSystemNoticeDetail(id: number | null) {
  const [detail, setDetail] = useState<SystemNoticeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setDetail(null);
      return;
    }
    setIsLoading(true);
    fetchSystemNoticeDetail(id)
      .then(data => {
        setDetail(data);
        setError(null);
      })
      .catch(e => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { detail, isLoading, error };
}