export type TierFlag = {
  id: number;
  badgeColor: string;
  flag: boolean;
};

export async function fetchTierListWithFlag(userId: string): Promise<TierFlag[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tiers/list/with_flag?user_id=${userId}`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id,
    badgeColor: item.badge_color,
    flag: item.flag,
  }));
}
