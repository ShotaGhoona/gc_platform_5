export type RivalProfile = {
  user_id: string;
  username: string;
  avatar_image_url?: string | null;
};

export async function fetchRivalAttendanceProfiles(
  userId: string,
  start: string,
  end: string
): Promise<Record<string, RivalProfile[]>> {
  const params = new URLSearchParams({
    user_id: userId,
    start,
    end,
    attendanceType: "rival",
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/attendance-user-profile?${params.toString()}`
  );
  if (!res.ok) throw new Error("出席プロフィール取得に失敗しました");
  const json = await res.json();
  // 日付ごとのプロフィールリストを返す
  return json;
}

export async function addRival(viewerId: string, targetId: string): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/${viewerId}/rival`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target_id: targetId }),
    }
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "ライバル追加に失敗しました");
  }
}

export async function removeRival(viewerId: string, targetId: string): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/${viewerId}/rival`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target_id: targetId }),
    }
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "ライバル解除に失敗しました");
  }
}
