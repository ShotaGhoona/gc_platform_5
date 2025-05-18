export type Tier = {
  id: number;
  titleEn: string;
  titleJa: string;
  badgeColor: string;
  cardImageUrl: string;
  createdAt: string;
  deletedAt: string | null;
};

export type TierWithFlag = Tier & { hasTier: boolean };

export async function fetchTierListWithFlag(userId: string): Promise<TierWithFlag[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tiers/with_flag?user_id=${userId}`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id,
    titleEn: item.title_en,
    titleJa: item.title_ja,
    badgeColor: item.badge_color,
    cardImageUrl: item.card_image_url,
    createdAt: item.created_at,
    deletedAt: item.deleted_at,
    hasTier: item.has_tier,
  }));
}

export async function fetchUserMaxTier(userId: string): Promise<Tier | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/tiers/max`
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (!data) return null;
  // スネークケース→キャメルケース変換
  return {
    id: data.id,
    titleEn: data.title_en,
    titleJa: data.title_ja,
    badgeColor: data.badge_color,
    cardImageUrl: data.card_image_url,
    createdAt: data.created_at,
    deletedAt: data.deleted_at,
  };
}
