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
  image_url?: string;
  tags: SystemNoticeTag[];
  publish_start_at?: string;
  publish_end_at?: string;
};

export type SystemNoticeDetail = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tags: SystemNoticeTag[];
  publish_start_at: string;
  publish_end_at: string;
};

export async function fetchSystemNoticeList(): Promise<SystemNotice[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/system_notices`);
  if (!res.ok) throw new Error('お知らせの取得に失敗しました');
  return await res.json();
}

export async function fetchSystemNoticeDetail(id: number): Promise<SystemNoticeDetail> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/system_notices/${id}`);
  if (!res.ok) throw new Error('お知らせ詳細の取得に失敗しました');
  return await res.json();
}