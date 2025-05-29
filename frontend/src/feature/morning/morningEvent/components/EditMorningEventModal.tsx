import { useState, useEffect } from "react";
import { MorningEventDetail, updateMorningEvent } from "../services/morningEventService";
import { useUser } from "@clerk/nextjs";
import { useMorningEventTags } from "../hooks/useMorningEvent";
import CommonButton from "@/components/common/commonButton";
import { calcEndAt } from "../utils/timeUtils";
type Props = {
  onClose: () => void;
  event: MorningEventDetail;
};

export const EditMorningEventModal = ({ onClose, event }: Props) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description || "");
  const [startAt, setStartAt] = useState(event.start_at);
  const [endAt, setEndAt] = useState(event.end_at);
  const [duration, setDuration] = useState<number | null>(null);

  // 初期値セット
  useEffect(() => {
    if (event.start_at && event.end_at) {
      const start = new Date(event.start_at);
      const end = new Date(event.end_at);
      const diff = (end.getTime() - start.getTime()) / 60000;
      setDuration(diff);
    }
  }, [event.start_at, event.end_at]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(event.tags.map(t => t.id));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { tags, loading: tagsLoading } = useMorningEventTags();
  const { user } = useUser();

  // 開始時間・durationが選択されたらendAtを自動計算
  const handleStartTime = (time: string) => {
    const date = startAt ? startAt.slice(0, 10) : new Date().toISOString().slice(0, 10);
    setStartAt(`${date}T${time}`);
    if (duration) {
      setEndAt(calcEndAt(`${date}T${time}`, duration));
    }
  };
  const handleDuration = (min: number) => {
    setDuration(min);
    if (startAt) {
      setEndAt(calcEndAt(startAt, min));
    }
  };

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full w-full justify-between p-8">
      <div className="flex flex-col gap-5 w-full h-full">
        <h2 className="text-lg font-bold mb-2">朝活イベントを編集</h2>
        <div className="flex gap-5 w-full flex-1">
          <div className="w-1/2 flex flex-col gap-5">
            <input
              className="bg-gray-50 rounded-lg py-2 px-4 shadow-md w-full"
              placeholder="タイトルを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="flex gap-5 w-full">
              <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-lg p-4 flex-1 justify-between shadow-md">
                <p className="text-sm text-gray-500">日付</p>
                <input
                  className="bg-gray-50 rounded-lg py-2 px-4"
                  type="date"
                  value={startAt ? startAt.slice(0, 10) : ""}
                  onChange={(e) => {
                    const date = e.target.value;
                    const time = startAt ? startAt.slice(11, 16) : "06:00";
                    setStartAt(`${date}T${time}`);
                    if (duration) {
                      const [h, m] = time.split(":");
                      const startMin = Number(h) * 60 + Number(m);
                      const endMin = startMin + duration;
                      const endH = String(Math.floor(endMin / 60)).padStart(2, "0");
                      const endM = String(endMin % 60).padStart(2, "0");
                      setEndAt(`${date}T${endH}:${endM}`);
                    }
                  }}
                  required
                />
              </div>
              <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-lg p-4 flex-1 justify-between shadow-md">
                <div className="flex gap-2 border-b border-gray-200 pb-2 w-full">
                  {["06:00", "07:00"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm transition
                        ${startAt && startAt.slice(11, 16) === time ? "bg-[#5D6B80] text-white" : "bg-gray-100 text-gray-700"}
                      `}
                      onClick={() => handleStartTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  {[
                    { label: "30min", min: 30 },
                    { label: "1h", min: 60 },
                    { label: "1.5h", min: 90 },
                    { label: "2h", min: 120 },
                  ].map((d) => (
                    <button
                      key={d.min}
                      type="button"
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm transition
                        ${duration === d.min ? "bg-[#D68897] text-white" : "bg-gray-100 text-gray-700"}
                      `}
                      onClick={() => handleDuration(d.min)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {tagsLoading ? (
                  <div>タグ読み込み中...</div>
                ) : (
                  tags.map((tag) => {
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
                  })
                )}
              </div>
            </div>
          </div>
          <div className="w-1/2 ">
            <textarea
              className="bg-gray-50 rounded-lg py-2 px-4 shadow-md w-full h-full"
              placeholder="説明文を入力"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
          </div>
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
