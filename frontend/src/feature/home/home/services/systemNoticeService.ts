// frontend/src/feature/home/home/services/systemNoticeListService.ts
export type SystemNoticeTag = {
  id: number;
  name: string;
  color: string;
};

export type SystemNotice = {
  id: number;
  title: string;
  description: string;
  tags: string[];  // 文字列配列に変更
};

export type SystemNoticeDetail = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tags: string[];  // 文字列配列に変更
  publish_start_at: string;
  publish_end_at: string;
};

export type SystemNoticeListResponse = {
  notices: SystemNotice[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export async function fetchSystemNoticeList(page: number = 1, limit: number = 10): Promise<SystemNoticeListResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/system_notices?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('お知らせの取得に失敗しました');
  return await res.json();
}

export async function fetchSystemNoticeDetail(id: number): Promise<SystemNoticeDetail> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/system_notices/${id}`);
  if (!res.ok) throw new Error('お知らせ詳細の取得に失敗しました');
  return await res.json();
}