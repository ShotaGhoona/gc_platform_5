"use client";
import { useState, useRef } from "react";
import { useCreateExternalEvent } from "../hooks/useExternalEvent";
import { useAuth, useUser } from "@clerk/nextjs";
import { FiUploadCloud } from "react-icons/fi";
import CommonButton from "@/components/common/commonButton";
import { FaTimes, FaPlus } from "react-icons/fa";
import { DialogTitle } from "@/components/ui/dialog";
import { getSimpleSupabase } from "../services/supabaseClientWithAuth";
type AddExternalEventModalProps = {
  onClose: () => void;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 定義済みタグ選択肢
const PREDEFINED_TAGS = [
  { name: "技術", color: "#3B82F6" },
  { name: "ビジネス", color: "#10B981" },
  { name: "デザイン", color: "#F59E0B" },
  { name: "スポーツ", color: "#EF4444" },
  { name: "文化", color: "#8B5CF6" },
  { name: "音楽", color: "#EC4899" },
  { name: "料理", color: "#F97316" },
  { name: "旅行", color: "#06B6D4" },
  { name: "健康", color: "#84CC16" },
  { name: "教育", color: "#6366F1" }
];

export const AddExternalEventPopUpChildren = ({ onClose }: AddExternalEventModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const { mutate, loading, error, success } = useCreateExternalEvent();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTagNames.includes(customTag.trim())) {
      setSelectedTagNames([...selectedTagNames, customTag.trim()]);
      setCustomTag("");
    }
  };

  const removeTag = (tagName: string) => {
    setSelectedTagNames(selectedTagNames.filter(name => name !== tagName));
  };

  const sanitizeFilename = (name: string) =>
    name.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  const handleImageUpload = async (file: File) => {
    try {
      // 簡単なSupabaseクライアントでテスト
      const supabase = getSimpleSupabase();
      const safeName = sanitizeFilename(file.name);
      const filePath = `external-events/${Date.now()}_${safeName}`;

      console.log('外部イベント画像アップロード開始:', filePath);

      const { error, data } = await supabase.storage
        .from("external-event-thumnail")
        .upload(filePath, file, {
          upsert: true,
          cacheControl: "3600",
          contentType: file.type || "image/jpeg",
        });

      if (error) {
        console.error("アップロードエラー:", error);
        throw error;
      }

      console.log('アップロード成功:', data);

      const url = `${supabaseUrl}/storage/v1/object/public/external-event-thumnail/${filePath}`;
      setImageUrl(url);
      console.log('パブリックURL:', url);
      return url;
    } catch (error) {
      console.error('予期しないエラー:', error);
      throw error;
    }
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
      tags: selectedTagNames,
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full w-full justify-between">
      <DialogTitle className="sr-only">外部イベントを追加</DialogTitle>
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
                <div className="flex flex-col items-center gap-2 max-h-30">
                  <FiUploadCloud className="text-4xl text-gray-400" />
                  <span className="text-xs text-gray-500">ここに画像をドラッグ&ドロップ<br />またはクリックして選択</span>
                </div>
              )}
              {imageFile && (
                <img
                  src={imageUrl || URL.createObjectURL(imageFile)}
                  alt="preview"
                  className="w-full h-29 object-cover rounded-lg max-h-30"
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
              <p className="text-sm font-medium text-gray-700 mb-3">タグを選択</p>
              
              {/* 選択済みタグ */}
              {selectedTagNames.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">選択済み:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTagNames.map((tagName, index) => {
                      const predefinedTag = PREDEFINED_TAGS.find(t => t.name === tagName);
                      return (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm text-white flex items-center gap-2"
                          style={{ backgroundColor: predefinedTag?.color || "#5D6B80" }}
                        >
                          {tagName}
                          <button
                            type="button"
                            onClick={() => removeTag(tagName)}
                            className="hover:bg-white hover:bg-opacity-20 rounded-full p-1"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* 定義済みタグ */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">定義済みタグ:</p>
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_TAGS.map((tag) => {
                    const selected = selectedTagNames.includes(tag.name);
                    return (
                      <button
                        type="button"
                        key={tag.name}
                        className={`px-3 py-1 rounded-full text-sm shadow-sm transition ${
                          selected ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                        }`}
                        style={{ 
                          backgroundColor: tag.color,
                          color: "white"
                        }}
                        onClick={() => {
                          if (!selected) {
                            setSelectedTagNames([...selectedTagNames, tag.name]);
                          }
                        }}
                        disabled={selected}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* カスタムタグ入力 */}
              <div>
                <p className="text-xs text-gray-500 mb-2">カスタムタグを追加:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    placeholder="タグ名を入力"
                    className="bg-gray-50 rounded-lg py-2 px-3 text-sm flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addCustomTag}
                    className="bg-[#5D6B80] text-white rounded-lg px-3 py-2 text-sm hover:bg-opacity-80"
                  >
                    追加
                  </button>
                </div>
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
