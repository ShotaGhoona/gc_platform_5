export type DashboardSummaryResponse = {
  attendance_this_month: { value: number; diff: number };
  attendance_total: { value: number };
  streak: { value: number };
  participated_events_this_month: { value: number; diff: number };
  hosted_events_this_month: { value: number; diff: number };
};

export async function fetchDashboardSummary(userId: string): Promise<DashboardSummaryResponse | null> {
  if (!userId) return null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/summary/?user=${userId}`);
  if (!res.ok) throw new Error("API error");
  const json: DashboardSummaryResponse = await res.json();
  return json;
}
