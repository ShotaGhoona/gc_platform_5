"use client";
import { useState } from "react";
import { VisionChatMessage, VisionIdea } from "../types/visionSettingType";
import { fetchVisionIdeas } from "../services/visionSettingService";

export function useVisionSettingChat() {
  const [messages, setMessages] = useState<VisionChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // mode: "chat" | "suggest"
  const [mode, setMode] = useState<"chat" | "suggest">("chat");

  // handleSendはmode, reply, ideasを返す
  const handleSend = async (sendMode?: "chat" | "suggest"): Promise<{mode: string, reply: string, ideas: VisionIdea[]}> => {
    const useMode = sendMode || mode;
    if (!input.trim()) return { mode: useMode, reply: "", ideas: [] };
    const newMessages: VisionChatMessage[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const data = await fetchVisionIdeas(newMessages, useMode);
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      const ideas: VisionIdea[] = (data.ideas || []).map((text: string, idx: number) => ({
        id: `${Date.now()}-${idx}`,
        text,
      }));
      return { mode: data.mode, reply: data.reply, ideas };
    } catch (e: any) {
      setError(e.message || "エラーが発生しました");
      return { mode: useMode, reply: "", ideas: [] };
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    error,
    mode,
    setMode,
    handleSend,
  };
}
