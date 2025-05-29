export async function postDiscordCallback(code: string, userId: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/discord/callback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, user_id: userId }),
    });
    if (res.ok) {
      return { success: true, message: "Discord連携が完了しました！" };
    } else {
      const data = await res.json();
      return { success: false, message: data.detail || "連携に失敗しました" };
    }
  } catch {
    return { success: false, message: "連携に失敗しました" };
  }
}
