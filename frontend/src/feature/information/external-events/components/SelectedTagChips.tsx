"use client";
import { useExternalEventFilter } from "../context/ExternalEventFilterContext";

export default function SelectedTagChips() {
  const { tags, selectedTagNames, setSelectedTagNames, getTagIdByName } = useExternalEventFilter();

  const handleRemove = (tagName: string) => {
    setSelectedTagNames(selectedTagNames.filter((name) => name !== tagName));
  };

  if (selectedTagNames.length === 0) return null;

  return (
    <>
      {selectedTagNames.map((tagName) => {
        // 既存タグから色を取得、なければグレー
        const tagId = getTagIdByName(tagName);
        const tag = tagId ? tags.find(t => t.id === tagId) : null;
        const tagColor = tag?.color || "#e5e7eb";
        
        return (
          <div
            key={tagName}
            className="bg-gray-200 rounded-full px-4 text-sm text-gray-700 flex items-center gap-1"
            style={{ backgroundColor: tagColor }}
          >
            {tagName}
            <button
              className="ml-1 text-lg text-gray-700 hover:text-red-500"
              onClick={() => handleRemove(tagName)}
              type="button"
            >
              ×
            </button>
          </div>
        );
      })}
    </>
  );
}
