export type ParticipatingEvent = {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  host_avatar_image_url: string;
  host_user_id: string;
  is_host: boolean;
};

export async function fetchParticipatingEvents(
  year: number,
  month: number,
  userId: string
): Promise<ParticipatingEvent[]> {
  const monthStr = `${year}${month.toString().padStart(2, "0")}`;
  const params = new URLSearchParams({ month: monthStr, user_id: userId });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/morning_events/participating?${params.toString()}`);
  if (!res.ok) throw new Error("自分のイベント取得に失敗しました");
  return res.json();
}
