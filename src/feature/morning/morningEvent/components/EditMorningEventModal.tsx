import { useState, useEffect } from "react";
import { MorningEventDetail, updateMorningEvent } from "../services/morningEventService";
import { useUser } from "@clerk/nextjs";
import { useMorningEventTags } from "../hooks/useMorningEvent";
import CommonButton from "@/components/common/commonButton";
type Props = {
  onClose: () => void;
  event: MorningEventDetail;
};

export const EditMorningEventModal = ({ onClose, event }: Props) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description || "");
  const [startAt, setStartAt] = useState(event.start_at);
  const [endAt, setEndAt] = useState(event.end_at);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(event.tags.map(t => t.id));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { tags, loading: tagsLoading } = useMorningEventTags();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateMorningEvent(event.id, {
        title,
        description,
        start_at: startAt,
        end_at: endAt,
        tags: selectedTagIds,
        host_user_id: user?.id ?? "",
      });
      onClose();
    } catch (e: any) {
      setError(e.message ?? "編集に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-between p-8">
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-bold mb-2">朝活イベントを編集</h2>
        <input
          className="bg-gray-50 rounded-lg py-2 px-4 shadow-md"
          placeholder="タイトルを入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="bg-gray-50 rounded-lg py-2 px-4 shadow-md"
          placeholder="説明文を入力"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
        <div className="flex gap-5 w-full">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-4 w-1/2 justify-between shadow-md">
            <p className="text-sm text-gray-500">開始時間</p>
            <input
              type="datetime-local"
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-4 w-1/2 justify-between shadow-md">
            <p className="text-sm text-gray-500">終了時間</p>
            <input
              className="bg-gray-50 rounded-lg py-2 px-4"
              type="datetime-local"
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <p className="text-base font-bold text-gray-500 mb-2">タグを選択</p>
          {tagsLoading ? (
            <div>タグ読み込み中...</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const selected = selectedTagIds.includes(tag.id);
                return (
                  <button
                    type="button"
                    key={tag.id}
                    className={`px-3 py-1 rounded-full text-sm shadow-sm transition
                      ${selected ? "bg-[#5D6B80] text-white border-[#5D6B80]" : "bg-gray-50 text-gray-700 border-gray-300"}
                    `}
                    style={{ backgroundColor: selected ? tag.color : undefined }}
                    onClick={() => {
                      setSelectedTagIds((prev) =>
                        prev.includes(tag.id)
                          ? prev.filter((id) => id !== tag.id)
                          : [...prev, tag.id]
                      );
                    }}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <div className="flex gap-2 justify-end">
        <CommonButton onClick={onClose} icon={null} label="閉じる" className="bg-gray-200 text-gray-700" />
        <button type="submit" className="bg-[#5D6B80] text-white rounded px-4 py-2" disabled={loading}>
          {loading ? "保存中..." : "保存"}
        </button>
      </div>
    </form>
  );
};
