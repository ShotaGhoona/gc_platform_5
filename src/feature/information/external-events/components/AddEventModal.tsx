"use client";
import { useState } from "react";
import { useCreateExternalEvent } from "../hooks/useExternalEvent";
import { fetchExternalEventTags, ExternalEventTag } from "../services/externalEventService";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
type AddEventModalProps = {
  onClose: () => void;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const AddEventModal = ({ onClose }: AddEventModalProps) => {
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
      .from("ghoonacamp")
      .upload(filePath, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type || "image/jpeg",
      });

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    const url = `${supabaseUrl}/storage/v1/object/public/ghoonacamp/${filePath}`;
    setImageUrl(url);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken({ template: "supabase" });
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const hostUserId = user?.id;

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
      hostUserId: hostUserId || "",
      tagIds,
    });
    onClose();
  };

  return (
    <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
      <h1 className="text-lg font-bold mb-2">イベント追加</h1>
      <input
        className="border rounded p-2"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border rounded p-2"
        placeholder="説明文"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <div>
        <div className="mb-1">タグ</div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              className={`px-3 py-1 rounded-full text-sm border ${
                tagIds.includes(tag.id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              style={{ borderColor: tag.color }}
              onClick={() =>
                setTagIds((prev) =>
                  prev.includes(tag.id)
                    ? prev.filter((tid) => tid !== tag.id)
                    : [...prev, tag.id]
                )
              }
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1">画像</div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0]);
              setImageUrl(undefined);
            }
          }}
        />
        {imageFile && (
          <div className="mt-2">
            <img
              src={imageUrl || URL.createObjectURL(imageFile)}
              alt="preview"
              className="w-32 h-20 object-cover rounded"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="datetime-local"
          className="border rounded p-2"
          value={startAt}
          onChange={(e) => setStartAt(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          className="border rounded p-2"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          保存
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          onClick={onClose}
        >
          キャンセル
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">イベントを追加しました</div>}
    </form>
  );
};
