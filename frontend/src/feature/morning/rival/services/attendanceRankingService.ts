// ランキング共通型
export type AttendanceRanker = {
  user_id: string;
  name: string;
  profile_icon_url: string;
  bio: string;
  score: number;
};

// 総合ランキング取得
export async function fetchTotalRanking(): Promise<AttendanceRanker[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/attendance/ranking/total`);
  if (!res.ok) throw new Error("総合ランキング取得に失敗しました");
  const data = await res.json();
  return data.ranking;
}

// 連続ランキング取得
export async function fetchStreakingRanking(): Promise<AttendanceRanker[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/attendance/ranking/streaking`);
  if (!res.ok) throw new Error("連続ランキング取得に失敗しました");
  const data = await res.json();
  return data.ranking;
}

// 月間ランキング取得
export async function fetchMonthlyRanking(year: number, month: number): Promise<AttendanceRanker[]> {
  const monthStr = `${year}${month.toString().padStart(2, "0")}`;
  const params = new URLSearchParams({ month: monthStr });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/attendance/ranking/monthly?${params.toString()}`);
  if (!res.ok) throw new Error("月間ランキング取得に失敗しました");
  const data = await res.json();
  return data.ranking;
}
