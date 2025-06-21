export type MemberListItem = {
  userId: string;
  username: string;
  avatarImageUrl: string;
  bio: string;
};

export async function fetchProfileList(): Promise<MemberListItem[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/members`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("メンバー一覧の取得に失敗しました");
    const data = await res.json();
    return data.map((item: any) => ({
      userId: item.user_id,
      username: item.username,
      avatarImageUrl: item.avatar_image_url,
      bio: item.bio,
    }));
  } catch (e) {
    throw e;
  }
}

