// frontend/src/feature/home/home/services/systemNoticeDetailService.ts
export type SystemNoticeTag = {
    id: number;
    name: string;
    color: string;
};

export type SystemNotionDetail = {
    id: number;
    title: string;
    description: string;
    img_url: string;
    tags: SystemNoticeTag[];
};

export async function fetchSystemNoticeDetail(id: number): Promise<SystemNotionDetail> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/system-notions/${id}`);
    if (!res.ok) throw new Error('お知らせ詳細の取得に失敗しました');
    return await res.json();
}