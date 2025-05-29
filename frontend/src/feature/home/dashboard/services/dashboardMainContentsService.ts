export type WeeklyStatsResponse = {
  labels: string[];    // ["M", "T", "W", "T", "F", "S", "S"]
  [key: string]: string[] | number[]; // "Me", "Average", "Rival:xxx" など動的に対応
};

export type TodayLiveProfile = {
  user_id: string;
  username: string;
  avatar_image_url?: string | null;
};

export type TodayLiveProfilesResponse = {
  profiles: TodayLiveProfile[];
};

export type WeeklyFlowResponse = {
  labels: string[];    // ["2025-01", "2025-02", ...]
  [key: string]: string[] | number[]; // "Me", "Average", "Rival:xxx" など動的に対応
};

export async function fetchWeeklyStats(
  userId: string,
  start?: string,
  end?: string
): Promise<WeeklyStatsResponse> {
  if (!userId) throw new Error("userId is required");
  const params = new URLSearchParams({ user: userId });
  if (start) params.append("start", start);
  if (end) params.append("end", end);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/weekly-stats?${params.toString()}`
  );
  if (!res.ok) throw new Error("API error");
  return await res.json();
}

export async function fetchWeeklyFlow(
  userId: string,
  start?: string,
  end?: string
): Promise<WeeklyFlowResponse> {
  if (!userId) throw new Error("userId is required");
  const params = new URLSearchParams({ user: userId });
  if (start) params.append("start", start);
  if (end) params.append("end", end);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/weekly-flow?${params.toString()}`
  );
  if (!res.ok) throw new Error("API error");
  return await res.json();
}

export async function fetchTodayLiveProfiles(): Promise<TodayLiveProfile[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/attendance-user-profile?attendanceType=today`);
  if (!res.ok) throw new Error("API error");
  const json = await res.json();
  // APIが配列を返す場合はそのまま返す
  return Array.isArray(json) ? json : (json.profiles ?? json ?? []);
}
