export type MorningEventDetail = {
  id: string;
  title: string;
  description?: string;
  host_avatar_image_url?: string;
  host_user_name?: string;
  host_user_id?: string;
  start_at: string;
  end_at: string;
  tags: { id: string; name: string; color: string }[];
  participants: { user_id: string; avatar_image_url?: string; user_name?: string }[];
  is_participating: boolean;
};

export async function fetchMorningEventDetail(eventId: string, userId?: string): Promise<MorningEventDetail> {
  const params = userId ? `?user_id=${encodeURIComponent(userId)}` : "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/morning_events/${eventId}${params}`);
  if (!res.ok) throw new Error("イベント詳細の取得に失敗しました");
  const data = await res.json();
  if (!data.host_user_id && data.host_user && data.host_user.clerk_id) {
    data.host_user_id = data.host_user.clerk_id;
  }
  return data;
}

export async function joinMorningEvent(eventId: string, userId: string): Promise<void> {
  const params = new URLSearchParams({ user_id: userId });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/morning_events/${eventId}/join?${params.toString()}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error("イベント参加に失敗しました");
}

export async function cancelMorningEvent(eventId: string, userId: string): Promise<void> {
  const params = new URLSearchParams({ user_id: userId });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/morning_events/${eventId}/cancel?${params.toString()}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error("イベントキャンセルに失敗しました");
}

export async function deleteMorningEvent(eventId: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/morning_events/${eventId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("イベント削除に失敗しました");
}
