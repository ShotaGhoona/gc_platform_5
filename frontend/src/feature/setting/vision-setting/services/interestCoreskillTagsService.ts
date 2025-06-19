export type InterestTag = {
  id: number;
  name: string;
  color?: string;
};

export type CoreSkillTag = {
  id: number;
  name: string;
  color?: string;
  icon?: string;
};

export async function fetchInterestTags(): Promise<InterestTag[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interests`);
  if (!res.ok) throw new Error("興味・関心タグの取得に失敗しました");
  return await res.json();
}

export async function fetchCoreSkillTags(): Promise<CoreSkillTag[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/core_skills`);
  if (!res.ok) throw new Error("コアスキルタグの取得に失敗しました");
  return await res.json();
}
