'use client';

import { useState } from "react";
import { GrInstagram } from "react-icons/gr";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";
import { AiOutlineGlobal, AiFillTikTok } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

export const SNS_TYPES = [
  { id: 1, value: "instagram", label: "Instagram", icon: <GrInstagram /> },
  { id: 2, value: "facebook", label: "Facebook", icon: <FaFacebookSquare /> },
  { id: 3, value: "x", label: "X (旧Twitter)", icon: <PiXLogoBold /> },
  { id: 4, value: "linkedin", label: "LinkedIn", icon: <FaLinkedin /> },
  { id: 5, value: "website", label: "Website", icon: <AiOutlineGlobal /> },
  { id: 6, value: "tiktok", label: "TikTok", icon: <AiFillTikTok /> },
  { id: 7, value: "github", label: "GitHub", icon: <FaGithub /> },
];

const SNS_DESCRIPTION_PRESETS: Record<string, string[]> = {
  instagram: [
    "プライベートアカウント",
    "所属企業アカウント",
    "〇〇イベント公式アカウント",
  ],
  facebook: [
    "プライベートアカウント",
    "所属企業アカウント",
    "〇〇イベント公式アカウント",
  ],
  x: [
    "プライベートアカウント",
    "所属企業アカウント",
    "〇〇イベント公式アカウント",
  ],
  linkedin: [
    "プライベートアカウント",
    "所属企業アカウント",
    "〇〇イベント公式アカウント",
  ],
  website: [
    "ポートフォリオサイト",
    "ブログ",
    "所属企業アカウント",
    "〇〇イベント公式アカウント",
  ],
  tiktok: [
    "プライベートアカウント",
    "所属企業アカウント",
    "〇〇イベント公式アカウント",
  ],
  github: [
    "個人開発のコードを公開",
    "オープンソース活動用アカウント",
  ],
};

type SnsItem = {
  type: string;
  link: string;
  description: string;
};

type SnsFormProps = {
  snsList: SnsItem[];
  setSnsList: (list: SnsItem[]) => void;
};

function getDescriptionPresets(type: string): string[] {
  return SNS_DESCRIPTION_PRESETS[type] || [];
}

export const SnsForm = ({ snsList, setSnsList }: SnsFormProps) => {
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);

  const handleAdd = () => {
    setSnsList([...snsList, { type: "", link: "", description: "" }]);
  };

  const handleRemove = (idx: number) => {
    setSnsList(snsList.filter((_, i) => i !== idx));
  };

  const handleChange = (idx: number, key: keyof SnsItem, value: string) => {
    setSnsList(
      snsList.map((item, i) =>
        i === idx ? { ...item, [key]: value } : item
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {snsList.map((sns, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 shadow">
            {/* アイコン */}
            <span className="text-xl text-gray-500">
              {SNS_TYPES.find((t) => t.value === sns.type)?.icon}
            </span>
            {/* SNS種別 */}
            {sns.type ? (
              <>
                {/* リンク */}
                <input
                  className="rounded px-2 py-1 flex-1"
                  type="url"
                  placeholder="リンクを入力"
                  value={sns.link}
                  onChange={(e) => handleChange(idx, "link", e.target.value)}
                  required
                />
                {/* 説明文 */}
                <div className="flex flex-col flex-1 gap-1 relative">
                  <input
                    className="rounded px-2 py-1 w-full"
                    type="text"
                    placeholder="説明文 (任意)"
                    value={sns.description}
                    onChange={(e) => handleChange(idx, "description", e.target.value)}
                    onFocus={() => setFocusedIdx(idx)}
                    onBlur={() => setTimeout(() => setFocusedIdx(null), 150)}
                  />
                  {focusedIdx === idx && (
                    <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded shadow-lg flex flex-col">
                      {getDescriptionPresets(sns.type).map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          className="text-left px-3 py-2 text-xs text-gray-700 hover:bg-[#D68897] hover:text-white transition"
                          onMouseDown={() => handleChange(idx, "description", preset)}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                {SNS_TYPES.map((snsType) => (
                  <div 
                    key={snsType.value} 
                    className="rounded-lg px-4 py-1 bg-white flex items-center gap-2 cursor-pointer shadow-md"
                    onClick={() => handleChange(idx, "type", snsType.value)}
                  >
                    <span className="text-xl text-gray-500">
                      {snsType.icon}
                    </span>
                    <p className="text-gray-500 text-sm">{snsType.label}</p>
                  </div>
                ))}
              </div>
            )}
            {/* 削除ボタン */}
              <button
                type="button"
                className="text-[#D68897] font-bold px-2"
                onClick={() => handleRemove(idx)}
                aria-label="削除"
              >
                ×
              </button>
          </div>
        ))}
      </div>
      <div>
        <div 
          className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 shadow"
          onClick={handleAdd}
        >
          <FaPlus className="text-gray-500" />
          <span className="text-base text-gray-500">SNSを追加</span>
        </div>
      </div>
    </div>
  );
};
