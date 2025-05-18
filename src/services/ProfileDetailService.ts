export type Interest = {
    id: number;
    name: string;
    color?: string;
  };
  
  export type CoreSkill = {
    id: number;
    name: string;
    color?: string;
    icon?: string;
  };
  
  export type Tier = {
    id: number;
    titleEn: string;
    titleJa: string;
    badgeColor: string;
    cardImageUrl?: string;
  };
  
  export type MemberDetail = {
    userId: string;
    username: string;
    bio?: string;
    oneLineProfile?: string;
    background?: string;
    avatarImageUrl?: string;
    createdAt?: string;
    interests: Interest[];
    coreSkills: CoreSkill[];
    tiers: Tier[];
  };
  
  export async function fetchProfileDetail(userId: string): Promise<MemberDetail> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/${userId}`;
    console.log("fetchProfileDetail: url =", url);
    try {
      const res = await fetch(url);
      console.log("fetchProfileDetail: res.status =", res.status);
      if (!res.ok) {
        const text = await res.text();
        console.error("fetchProfileDetail: error response =", text);
        throw new Error("プロフィール詳細の取得に失敗しました");
      }
      const data = await res.json();
      console.log("fetchProfileDetail: data =", data);
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
        tiers: data.tiers.map((tier: any) => ({
        id: tier.id,
        titleEn: tier.title_en,
        titleJa: tier.title_ja,
        badgeColor: tier.badge_color,
        cardImageUrl: tier.card_image_url,
      })),
      };
    } catch (e) {
      console.error("fetchProfileDetail: error =", e);
      throw e;
    }
  }
  