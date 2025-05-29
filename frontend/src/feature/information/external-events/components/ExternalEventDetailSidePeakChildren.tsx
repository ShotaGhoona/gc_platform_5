// frontend/src/feature/home/home/components/NoticeDetail.tsx

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { ExternalEvent, deleteExternalEvent } from '../services/externalEventService';
import CommonButton from "@/components/common/commonButton";
import { MdDelete, MdEdit } from "react-icons/md";

type ExternalEventDetailProps = {
  event: ExternalEvent;
  onEditClick?: () => void;
  onDeleted?: () => void;
  onProfileClick?: (userId: string) => void;
};

export const ExternalEventDetailSidePeakChildren = ({ event, onEditClick, onDeleted, onProfileClick }: ExternalEventDetailProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("本当にこのイベントを消去しますか？")) return;
    setLoading(true);
    try {
      await deleteExternalEvent(event.id);
      if (onDeleted) onDeleted();
      window.location.reload();
    } catch (e) {
      alert("消去に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-between h-full items-center">

      <div className="space-y-6 bg-white rounded-lg p-6">
        <div className="flex gap-2 items-center justify-between">
          <p className="text-sm text-gray-500">prod by</p>
          <div
            className="flex gap-2 items-center cursor-pointer hover:opacity-80"
            onClick={() => {
              if (event.hostUserId && onProfileClick) onProfileClick(event.hostUserId);
            }}
          >
            <p className="text-sm text-gray-700 font-bold">{event.hostUserName}</p>
            <img src={event.hostAvatarImageUrl} alt="" className="w-8 h-8 rounded-full" />
          </div>
        </div>
        {/* 画像 */}
        {event.image && (
          <div>
            <img src={event.image} alt={event.title} className="max-w-full rounded" />
          </div>
        )}
        {/* タグ */}
        <div className="flex items-center gap-2">
          {event.tags.map((tag) => (
            <span
            key={tag.id}
            className="text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: `${tag.color}`,
              color: "gray",
            }}
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* タイトル */}
        <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>

        {/* 本文 */}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
        </div>
      </div>

      {/* 編集・消去ボタン（主催者のみ） */}
      {user?.id === event.hostUserId && (
        <div className="flex gap-2 justify-center mt-4">
          <CommonButton
            onClick={handleDelete}
            icon={<MdDelete className="text-[#5D6B80]" />}
            label={loading ? "消去中..." : "消去"}
            className="bg-gray-300 text-[#5D6B80]"
            disabled={loading}
            />
          <button
            onClick={onEditClick}
            className="bg-gray-300 text-[#5D6B80] flex items-center gap-2 px-4 py-1 rounded-lg shadow-md"
            disabled={loading}
            >
            <MdEdit className="text-[#5D6B80]" />
            <span className="text-sm font-bold">編集</span>
          </button>
        </div>
      )}
    </div>
  );
};
