import { VisionChatMessage } from "../types/visionSettingType";

export async function fetchVisionIdeas(messages: VisionChatMessage[], mode: "chat" | "suggest") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/vision/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, mode }),
  });
  if (!res.ok) throw new Error("Vision案の取得に失敗しました");
  // mode, reply, ideasを返す
  return res.json();
}

export async function confirmVision(userId: string, vision: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/vision/confirm`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, vision }),
  });
  if (!res.ok) throw new Error("Visionの登録に失敗しました");
  return res.json();
}
