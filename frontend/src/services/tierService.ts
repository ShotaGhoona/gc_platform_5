export type Tier = {
  id: number;
  titleEn: string;
  titleJa: string;
  badgeColor: string;
  cardImageUrl: string;
  createdAt: string;
  deletedAt: string | null;
  role: string | null;
};

export type TierWithFlag = Tier & { hasTier: boolean };

export type TierDetail = {
  id: number;
  titleEn: string;
  titleJa: string;
  badgeColor: string;
  shortDescription: string | null;
  longDescription: string | null;
  story: string | null;
  hasTier: boolean;
  role: string | null;
};
export type MainSubTierThumbnail = {
  id: number;
  badge_color: string;
};
export type MainSubTierThumbnailsResponse = {
  main: MainSubTierThumbnail | null;
  sub: MainSubTierThumbnail[];
};

export async function fetchTierDetailWithFlag(
  tierId: number,
  userId: string
): Promise<TierDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tiers/detail/${tierId}/with_flag?user_id=${userId}`
    );
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} ${res.statusText} - ${errorText}`);
    }
    
    const data = await res.json();
    return {
      id: data.id,
      titleEn: data.title_en,
      titleJa: data.title_ja,
      badgeColor: data.badge_color,
      shortDescription: data.short_description,
      longDescription: data.long_description,
      story: data.story,
      hasTier: data.has_tier,
      role: data.role,
    };
  } catch (error) {
    console.error('fetchTierDetailWithFlag error:', error);
    throw error; // エラーを再スローして上位で処理
  }
}


export async function fetchMainSubTierThumbnails(userId: string): Promise<MainSubTierThumbnailsResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tiers/main_sub?user_id=${userId}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

export async function updateUserTierRole(
  tierId: number,
  userId: string,
  role: "main" | "sub" | null
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tiers/${tierId}/role`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, role }),
    }
  );
  if (res.ok) {
    return { success: true };
  } else {
    const data = await res.json().catch(() => ({}));
    return { success: false, error: data.detail || "エラーが発生しました" };
  }
}
