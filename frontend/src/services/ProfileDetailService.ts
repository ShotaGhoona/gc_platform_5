
export type Tier = {
  id: number;
  titleEn: string;
  titleJa: string;
  badgeColor: string;
  cardImageUrl?: string;
};

export type Sns = {
  name: string;
  description?: string;
  link: string;
};

export type MemberDetail = {
  userId: string;
  username: string;
  bio?: string;
  oneLineProfile?: string;
  background?: string;
  avatarImageUrl?: string;
  createdAt?: string;
  interests: string[];
  coreSkills: string[];
  tiers: Tier[];
  sns: Sns[];
  isRival?: boolean;
};

export async function fetchProfileDetail(userId: string, viewerId?: string): Promise<MemberDetail> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/detail/${userId}`;
  if (viewerId) {
    url += (url.includes("?") ? "&" : "?") + `viewer_id=${viewerId}`;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      console.error("fetchProfileDetail: error response =", text);
      throw new Error("プロフィール詳細の取得に失敗しました");
    }
    const data = await res.json();
    return {
      userId: data.user_id,
      username: data.username,
      bio: data.bio,
      oneLineProfile: data.one_line_profile,
      background: data.background,
      avatarImageUrl: data.avatar_image_url,
      createdAt: data.created_at,
      interests: data.interests,
      coreSkills: data.core_skills,
      sns: data.sns,
      tiers: data.tiers.map((tier: any) => ({
        id: tier.id,
        titleEn: tier.title_en,
        titleJa: tier.title_ja,
        badgeColor: tier.badge_color,
        cardImageUrl: tier.card_image_url,
      })),
      isRival: data.isRival,
    };
  } catch (e) {
    console.error("fetchProfileDetail: error =", e);
    throw e;
  }
}
