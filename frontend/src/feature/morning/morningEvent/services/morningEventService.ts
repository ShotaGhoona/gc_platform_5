export type MorningEventTag = {
  id: string;
  name: string;
  color: string;
};

export type MorningEventListItem = {
  id: string;
  title: string;
  description?: string;
  host_avatar_image_url?: string;
  start_at: string;
  end_at: string;
  tags: MorningEventTag[];
  is_participating: boolean;
  is_host: boolean;
};

export type MorningEventParticipant = {
  user_id: string;
  avatar_image_url?: string;
  user_name?: string;
};

export type MorningEventDetail = {
  id: string;
  title: string;
  description?: string;
  host_avatar_image_url?: string;
  host_user_name?: string;
  host_user_id?: string;
  start_at: string;
  end_at: string;
  tags: MorningEventTag[];
  participants: MorningEventParticipant[];
  is_participating: boolean;
};

export type AddMorningEventInput = {
  title: string;
  description?: string;
  start_at: string;
  end_at: string;
  tags: string[];
  host_user_id: string;
};

export async function fetchMorningEventListByMonth(
  year: number,
  month: number, // 1-12
  userId?: string
): Promise<MorningEventListItem[]> {
  const monthStr = `${year}${month.toString().padStart(2, "0")}`;
  const params = new URLSearchParams();
  params.append("month", monthStr);
  if (userId) params.append("user_id", userId);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/morning_events_list?${params.toString()}`);
  if (!res.ok) throw new Error("イベント一覧の取得に失敗しました");
  return res.json();
}


export async function addMorningEvent(input: AddMorningEventInput): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/morning_events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("イベント作成に失敗しました");
}

export async function fetchMorningEventTags(): Promise<MorningEventTag[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/morning_event_tags`);
  if (!res.ok) throw new Error("タグ一覧の取得に失敗しました");
  return res.json();
}


export async function updateMorningEvent(eventId: string, input: AddMorningEventInput): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/morning_events/${eventId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("イベント編集に失敗しました");
}
