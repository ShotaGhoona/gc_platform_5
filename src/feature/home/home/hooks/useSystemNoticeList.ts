// frontend/src/feature/home/home/hooks/useSystemNoticeList.ts
import { useEffect, useState } from 'react';
import { fetchSystemNoticeList, SystemNotice } from '../services/systemNoticeService';

export function useSystemNoticeList() {
  const [notices, setNotices] = useState<SystemNotice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchSystemNoticeList()
      .then(data => {
        setNotices(data);
        setError(null);
      })
      .catch(e => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { notices, isLoading, error };
}