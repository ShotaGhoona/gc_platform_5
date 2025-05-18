'use client';


import { useState, useEffect } from "react";
import { ProfileResponse, ProfileUpdateRequest } from '../types/profile';

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

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalForm((prev) => ({ ...prev, [name]: value }));
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-8">
      {/* アバターアップロード */}
      <div className="space-y-4">
        <label className="block text-sm text-[#5D6B80] font-bold">
          Ghoona Campプロフィールアバター
        </label>
        <input
          type="file"
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              setAvatar(e.target.files[0]);
            }
          }}
        />
      </div>
      <div className="flex gap-5 w-full">
        {/* ユーザーネーム */}
        <div className="space-y-2 w-1/2">
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
        <div className="space-y-2 w-1/2">
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
