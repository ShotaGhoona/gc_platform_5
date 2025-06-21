"use client";
import { useState } from "react";
import { useExternalEventFilter } from "../context/ExternalEventFilterContext";

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

type FilterModalProps = {
  onClose: () => void;
};

export const FilterPopUpChildren = ({ onClose }: FilterModalProps) => {
  const { selectedTagNames, setSelectedTagNames } = useExternalEventFilter();
  const [tempSelected, setTempSelected] = useState<string[]>(selectedTagNames);

  const toggleTag = (tagName: string) => {
    setTempSelected((prev) =>
      prev.includes(tagName) ? prev.filter((name) => name !== tagName) : [...prev, tagName]
    );
  };

  const handleSave = () => {
    setSelectedTagNames(tempSelected);
    onClose();
  };

  return (
    <div className="flex flex-col h-full p-8 justify-between">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="border-l-4 border-[#5F7392] mr-3 pl-2">
          イベントのフィルター
        </span>
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {PREDEFINED_TAGS.map((tag) => (
        <button
          key={tag.name}
          className={`px-6 py-1 rounded-full text-sm ${
            tempSelected.includes(tag.name)
              ? "text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          style={tempSelected.includes(tag.name) ? { backgroundColor: tag.color } : {}}
          onClick={() => toggleTag(tag.name)}
          type="button"
        >
          {tag.name}
        </button>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <button
          className="px-6 py-2 bg-[#5F7392] text-white rounded"
          onClick={handleSave}
        >
          保存
        </button>
      </div>
    </div>
  );
};
