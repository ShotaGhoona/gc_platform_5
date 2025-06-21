// frontend/src/feature/home/home/hooks/useSystemNoticeList.ts
import { useEffect, useState } from 'react';
import { fetchSystemNoticeList, SystemNotice, SystemNoticeListResponse } from '../services/systemNoticeService';

export function useSystemNoticeList() {
  const [notices, setNotices] = useState<SystemNotice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 0
  });

  const loadNotices = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const data: SystemNoticeListResponse = await fetchSystemNoticeList(page, pagination.limit);
      setNotices(data.notices);
      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.total,
        total_pages: data.total_pages
      });
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotices(1);
  }, []);

  const goToPage = (page: number) => {
    loadNotices(page);
  };

  return { notices, isLoading, error, pagination, goToPage };
}