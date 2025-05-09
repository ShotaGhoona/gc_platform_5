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
  tags: SystemNoticeTag[];
};

export async function fetchSystemNoticeList(): Promise<SystemNotice[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/system-notions`);
  if (!res.ok) throw new Error('お知らせの取得に失敗しました');
  return await res.json();
}