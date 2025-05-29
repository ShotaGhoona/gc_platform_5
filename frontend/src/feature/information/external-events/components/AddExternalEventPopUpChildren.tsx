"use client";
import { useState, useRef } from "react";
import { useCreateExternalEvent } from "../hooks/useExternalEvent";
import { fetchExternalEventTags, ExternalEventTag } from "../services/externalEventService";
import { createClient } from "@supabase/supabase-js";
import { useAuth, useUser } from "@clerk/nextjs";
import { FiUploadCloud } from "react-icons/fi";
import CommonButton from "@/components/common/commonButton";
import { FaTimes, FaPlus } from "react-icons/fa";
type AddExternalEventModalProps = {
  onClose: () => void;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const AddExternalEventPopUpChildren = ({ onClose }: AddExternalEventModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [tags, setTags] = useState<ExternalEventTag[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const { mutate, loading, error, success } = useCreateExternalEvent();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useState(() => {
    fetchExternalEventTags().then(setTags);
  });

  const sanitizeFilename = (name: string) =>
    name.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  const handleImageUpload = async (file: File) => {
    const token = await getToken({ template: "supabase" });
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const safeName = sanitizeFilename(file.name);
    const filePath = `external-events/${Date.now()}_${safeName}`;

    const { error } = await supabase.storage
      .from("external-event-thumnail")
      .upload(filePath, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type || "image/jpeg",
      });

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    const url = `${supabaseUrl}/storage/v1/object/public/external-event-thumnail/${filePath}`;
    setImageUrl(url);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hostUserId = user?.id || "";

    let url = imageUrl;
    if (imageFile && !imageUrl) {
      url = await handleImageUpload(imageFile);
    }

    await mutate({
      title,
      description,
      image: url,
      startAt,
      endAt,
      hostUserId: hostUserId,
      tagIds,
    });
    onClose();
  };

  // ドラッグ&ドロップハンドラ
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0]);
      setImageUrl(undefined);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full w-full justify-between p-8">
      <div className="flex flex-col gap-5 w-full h-full">
        <h2 className="text-lg font-bold mb-2">外部イベントを追加</h2>
        <div className="flex gap-5 w-full flex-1">
          <div className="w-1/2 flex flex-col gap-5">
            <input
              className="bg-gray-50 rounded-lg py-2 px-4 shadow-md w-full"
              placeholder="タイトルを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div
              className={`w-full h-30 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition
                ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"}
              `}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              style={{ cursor: "pointer" }}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {!imageFile && (
                <div className="flex flex-col items-center gap-2">
                  <FiUploadCloud className="text-4xl text-gray-400" />
                  <span className="text-xs text-gray-500">ここに画像をドラッグ&ドロップ<br />またはクリックして選択</span>
                </div>
              )}
              {imageFile && (
                <img
                  src={imageUrl || URL.createObjectURL(imageFile)}
                  alt="preview"
                  className="w-full h-29 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-lg p-4 flex-1 justify-between shadow-md">
                <p className="text-sm text-gray-500">表示開始</p>
                <input
                  className="bg-gray-50 rounded-lg py-2 px-4"
                  type="datetime-local"
                  value={startAt}
                  onChange={(e) => setStartAt(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-lg p-4 flex-1 justify-between shadow-md">
                <p className="text-sm text-gray-500">表示終了</p>
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
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const selected = tagIds.includes(tag.id);
                  return (
                    <button
                      type="button"
                      key={tag.id}
                      className={`px-3 py-1 rounded-full text-sm shadow-sm transition
                        ${selected ? "bg-[#5D6B80] text-white border-[#5D6B80]" : "bg-gray-50 text-gray-700 border-gray-300"}
                      `}
                      style={{ backgroundColor: selected ? tag.color : undefined }}
                      onClick={() => {
                        setTagIds((prev) =>
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
        <CommonButton
          onClick={onClose}
          icon={<FaTimes />}
          label="閉じる"
          className="bg-gray-200 text-gray-700"
        />
        <button type="submit" className="bg-[#5D6B80] text-white rounded-lg px-4 py-1 flex items-center gap-2" disabled={loading}>
          <FaPlus />
          {loading ? "作成中..." : "作成"}
        </button>
      </div>
    </form>
  );
};
