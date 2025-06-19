'use client';

import { useState, useEffect, useRef } from "react";
import { ProfileResponse, ProfileUpdateRequest } from '../types/profile';
import { FiUploadCloud } from "react-icons/fi";

type Props = {
  profile: ProfileResponse | null;
  isLoading: boolean;
  error: string | null;
  setAvatar: (file: File | null) => void;
  avatarFile: File | null;
  form: Partial<ProfileUpdateRequest>;
  onChange: (fields: Partial<ProfileUpdateRequest>) => void;
};

export const BasicProfileForm = ({
  profile,
  isLoading,
  error,
  setAvatar,
  avatarFile,
  form,
  onChange,
}: Props) => {
  // 入力値のローカル状態
  const [localForm, setLocalForm] = useState<Partial<ProfileUpdateRequest>>(form);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalForm((prev) => ({ ...prev, [name]: value }));
    onChange({ [name]: value });
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
      setAvatar(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="flex gap-10 justify-between w-full">
        <div className="w-2/3 flex flex-col gap-5">
          {/* ユーザーネーム */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm text-[#5D6B80] font-bold"
              >
              ユーザーネーム
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={localForm.username || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md text-sm text-gray-600 bg-[#f9f9f9] px-4 py-2"
              placeholder="ユーザーネームを入力"
              />
          </div>
          {/* ひとこと */}
          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm text-[#5D6B80] font-bold"
              >
              公開フレーズ｜ひとこと
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={localForm.bio || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md text-sm text-gray-600 bg-[#f9f9f9] px-4 py-2"
              placeholder="あなたを表す一言を入力"
              />
          </div>
          {/* One-Line Profile */}
          <div className="space-y-2">
            <label
              htmlFor="one_line_profile"
              className="block text-sm text-[#5D6B80] font-bold"
            >
              One-Line Profile
              <span className="text-sm text-gray-500 ml-2">
                (30文字以内)
              </span>
            </label>
            <input
              type="text"
              id="one_line_profile"
              name="one_line_profile"
              maxLength={30}
              value={localForm.one_line_profile || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md text-sm text-gray-600 bg-[#f9f9f9] px-4 py-2"
              placeholder="自分を一言で表現してください"
            />
          </div>
        </div>
        {/* アバターアップロード */}
        <div className="w-1/3 h-full flex flex-col gap-2">
          <label className="text-sm text-[#5D6B80] font-bold">プロフィールアバター</label>
          <div
            className={`w-full py-5 flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition
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
            {!avatarFile && (
              <div className="flex flex-col items-center gap-2">
                <FiUploadCloud className="text-4xl text-gray-400" />
                <span className="text-xs text-gray-500">ここに画像をドラッグ&ドロップ<br />またはクリックして選択</span>
              </div>
            )}
            {avatarFile && (
              <img
                src={URL.createObjectURL(avatarFile)}
                alt="avatar"
                className="w-full h-36 object-cover rounded"
              />
            )}
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="space-y-2">
        <label
          htmlFor="background"
          className="block text-sm text-[#5D6B80] font-bold"
        >
          Background
          <span className="text-sm text-gray-500 ml-2">
            (140文字以内)
          </span>
        </label>
        <textarea
          id="background"
          name="background"
          maxLength={140}
          value={localForm.background || ""}
          onChange={handleInputChange}
          rows={5}
          className="mt-1 block w-full rounded-md text-sm text-gray-600 bg-[#f9f9f9] px-4 py-2"
          placeholder="あなたの経歴や背景を教えてください"
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
