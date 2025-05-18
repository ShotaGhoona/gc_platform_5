"use client";
import { useState } from "react";
import { useExternalEventFilter } from "../context/ExternalEventFilterContext";

type FilterModalProps = {
  onClose: () => void;
};

export const FilterModal = ({ onClose }: FilterModalProps) => {
  const { tags, selectedTagIds, setSelectedTagIds } = useExternalEventFilter();
  const [tempSelected, setTempSelected] = useState<number[]>(selectedTagIds);

  const toggleTag = (id: number) => {
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    setSelectedTagIds(tempSelected);
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
        {tags.map((tag) => (
        <button
          key={tag.id}
          className={`px-6 py-1 rounded-full text-sm ${
            tempSelected.includes(tag.id)
              ? "text-gray-700"
              : "bg-gray-100 text-gray-700"
          }`}
          style={tempSelected.includes(tag.id) ? { backgroundColor: tag.color } : {}}
          onClick={() => toggleTag(tag.id)}
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
