"use client";
import { VisionChatMessage } from "../types/visionSettingType";
import { FaArrowAltCircleUp } from "react-icons/fa";

type Props = {
  messages: VisionChatMessage[];
  input: string;
  setInput: (v: string) => void;
  loading: boolean;
  error: string | null;
  mode: "chat" | "suggest";
  setMode: (m: "chat" | "suggest") => void;
  onSend: () => void;
};

export default function VisionSettingChatContainer({
  messages,
  input,
  setInput,
  loading,
  error,
  mode,
  setMode,
  onSend,
}: Props) {
  return (
    <div className="w-full bg-white rounded-xl p-5 h-full shadow-lg flex flex-col justify-between gap-4">
      {/* mode切り替えスイッチ */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <button
          className={`px-4 py-1 rounded-full text-sm font-bold transition ${
            mode === "chat"
              ? "bg-[#5D6B80] text-white shadow"
              : "bg-gray-100 text-gray-500"
          }`}
          onClick={() => setMode("chat")}
          disabled={loading}
        >
          会話モード
        </button>
        <button
          className={`px-4 py-1 rounded-full text-sm font-bold transition ${
            mode === "suggest"
              ? "bg-[#BF6375] text-white shadow"
              : "bg-gray-100 text-gray-500"
          }`}
          onClick={() => setMode("suggest")}
          disabled={loading}
        >
          提案モード
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`
              flex w-full my-2
              ${msg.role === "user" ? "justify-end" : "justify-start"}
            `}
          >
            <div
              className={`
                max-w-[70%] px-4 py-2 rounded-2xl shadow
                ${msg.role === "user"
                  ? "bg-gradient-to-r from-[#e0e7ef] to-[#c7d0e6] text-right text-gray-800"
                  : "bg-gradient-to-r from-[#f7fafd] to-[#e9eef6] text-left text-gray-700"}
                break-words
              `}
              style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm text-center mt-2">AIが考え中...</div>}
        {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
      </div>
      <div className="flex gap-2 shadow-lg rounded-xl p-3 bg-[#f7fafd]">
        <textarea
          className="flex-1 resize-none rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-[#5D6B80] text-base"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey && !(e.nativeEvent as any).isComposing) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="VisionについてAIと会話しよう"
          disabled={loading}
          rows={2}
        />
        <button
          className="flex items-center justify-center gap-2 p-2 rounded-full bg-[#5D6B80] hover:bg-[#3d4a5e] transition text-white shadow-lg disabled:opacity-50"
          onClick={onSend}
          disabled={loading}
        >
          <FaArrowAltCircleUp className="text-2xl"/>
        </button>
      </div>
    </div>
  );
}
