// ランキング共通型
export type AttendanceRanker = {
  user_id: string;
  name: string;
  profile_icon_url: string;
  bio: string;
  score: number;
};

export async function fetchTotalRanking(rankingType: "All" | "Rival" = "All", user?: string): Promise<AttendanceRanker[]> {
  const params = new URLSearchParams();
  params.append("rankingType", rankingType);
  if (user) params.append("user", user);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/attendance/ranking/total?${params.toString()}`);
  if (!res.ok) throw new Error("総合ランキング取得に失敗しました");
  const data = await res.json();
  return data.ranking;
}

export async function fetchStreakingRanking(rankingType: "All" | "Rival" = "All", user?: string): Promise<AttendanceRanker[]> {
  const params = new URLSearchParams();
  params.append("rankingType", rankingType);
  if (user) params.append("user", user);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/attendance/ranking/streaking?${params.toString()}`);
  if (!res.ok) throw new Error("連続ランキング取得に失敗しました");
  const data = await res.json();
  return data.ranking;
}

export async function fetchMonthlyRanking(year: number, month: number, rankingType: "All" | "Rival" = "All", user?: string): Promise<AttendanceRanker[]> {
  const monthStr = `${year}${month.toString().padStart(2, "0")}`;
  const params = new URLSearchParams({ month: monthStr, rankingType });
  if (user) params.append("user", user);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/attendance/ranking/monthly?${params.toString()}`);
  if (!res.ok) throw new Error("月間ランキング取得に失敗しました");
  const data = await res.json();
  return data.ranking;
}
