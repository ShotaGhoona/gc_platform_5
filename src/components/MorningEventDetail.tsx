import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { MorningEventDetail as MorningEventDetailType, joinMorningEvent, cancelMorningEvent, deleteMorningEvent, fetchMorningEventDetail } from "../services/morningEventDetailService";
import CommonButton from "@/components/common/commonButton";
import { RiUserAddFill, RiCloseFill } from "react-icons/ri";
import { MdDelete, MdEdit } from "react-icons/md";
type Props = {
  event: MorningEventDetailType;
  onProfileClick?: (userId: string) => void;
  onEditClick?: () => void;
};

export default function MorningEventDetail({ event, onProfileClick, onEditClick }: Props) {
  const { user } = useUser();
  const [eventDetail, setEventDetail] = useState<MorningEventDetailType>(event);
  const [loading, setLoading] = useState(false);

  // デバッグ用: host_user_idの値を出力
  if (typeof window !== "undefined") {
    console.log("host_user_id:", eventDetail.host_user_id);
    console.log("host_user_name:", eventDetail.host_user_name);
  }

  const handleJoin = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      await joinMorningEvent(eventDetail.id, user.id);
      const updated = await fetchMorningEventDetail(eventDetail.id, user.id);
      setEventDetail(updated);
    } catch (e) {
      alert("参加に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      await cancelMorningEvent(eventDetail.id, user.id);
      const updated = await fetchMorningEventDetail(eventDetail.id, user.id);
      setEventDetail(updated);
    } catch (e) {
      alert("キャンセルに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("本当にこのイベントを消去しますか？")) return;
    setLoading(true);
    try {
      await deleteMorningEvent(eventDetail.id);
      window.location.reload();
    } catch (e) {
      alert("消去に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-2 h-full">
        {/* タグ */}
        <div className="flex gap-2 flex-wrap">
          {eventDetail.tags.map((tag) => (
            <p
              key={tag.id}
              className="text-[10px] text-gray-500 rounded-full px-4 py-1"
              style={{ backgroundColor: tag.color || "#f3f4f6" }}
            >
              {tag.name}
            </p>
          ))}
        </div>
        {/* 日時 */}
        <div className="flex gap-2">
          <p className="text-sm text-gray-500">
            {new Date(eventDetail.start_at).toLocaleString("ja-JP", { dateStyle: "short", timeStyle: "short" })}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(eventDetail.end_at).toLocaleString("ja-JP", { dateStyle: "short", timeStyle: "short" })}
          </p>
        </div>
        {/* イベント詳細 */}
        <div className="flex-1 flex flex-col justify-between bg-white rounded-lg p-4 my-10">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center justify-between">
              <p className="text-sm text-gray-500">prod by</p>
              <div
                className="flex gap-2 items-center cursor-pointer hover:opacity-80"
                onClick={() => {
                  if (eventDetail.host_user_id && onProfileClick) onProfileClick(eventDetail.host_user_id);
                }}
              >
                <p className="text-sm text-gray-700 font-bold">{eventDetail.host_user_name}</p>
                <img src={eventDetail.host_avatar_image_url} alt="" className="w-8 h-8 rounded-full" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-center my-5
              text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]">{eventDetail.title}</h2>
            <p className="text-base text-gray-700">{eventDetail.description}</p>
          </div>
          {/* 参加予定 */}
          <div className="w-full">
            <div className="flex gap-2 items-center">
              <div className=" flex-1 h-[1px] bg-gray-200"></div>
              <div className="font-bold text-sm mb-1 text-gray-500">参加予定</div>
              <div className=" flex-1 h-[1px] bg-gray-200"></div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {eventDetail.participants.map((p) => (
                <div
                  key={p.user_id}
                  className="flex flex-col items-center cursor-pointer hover:opacity-80"
                  onClick={() => {
                    if (onProfileClick) onProfileClick(p.user_id);
                  }}
                >
                  <img
                    src={p.avatar_image_url}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  {/* <span className="text-xs text-gray-700">{p.user_name}</span> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        {user?.id === eventDetail.host_user_id && (
          <div className="flex gap-2">
            <CommonButton
              onClick={handleDelete}
              icon={<MdDelete className="text-[#5D6B80]" />}
              label={loading ? "消去中..." : "消去"}
              className="bg-gray-300 text-[#5D6B80]"
              disabled={loading}
              />
            <CommonButton
              onClick={() => { onEditClick?.(); }}
              icon={<MdEdit className="text-[#5D6B80]" />}
              label={loading ? "編集中..." : "編集"}
              className="bg-gray-300 text-[#5D6B80]"
              disabled={loading}
            />
          </div>
        )}
        {eventDetail.is_participating ? (
          <CommonButton
            onClick={handleCancel}
            icon={<RiCloseFill className="text-[#5D6B80]" />}
            label={loading ? "キャンセル中..." : "やっぱやめとく"}
            className="bg-gray-300 text-[#5D6B80]"
            disabled={loading}
          />
        ) : (
          <CommonButton
            onClick={handleJoin}
            icon={<RiUserAddFill className="text-white" />}
            label={loading ? "参加中..." : "参加しようかな"}
            className="bg-[#D68897] text-white"
            disabled={loading}
          />
        )}
      </div>
    </div>
  );
}
