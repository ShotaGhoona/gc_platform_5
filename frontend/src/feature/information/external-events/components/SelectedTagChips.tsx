"use client";
import { useExternalEventFilter } from "../context/ExternalEventFilterContext";

export default function SelectedTagChips() {
  const { tags, selectedTagIds, setSelectedTagIds } = useExternalEventFilter();

  const handleRemove = (id: number) => {
    setSelectedTagIds(selectedTagIds.filter((tid) => tid !== id));
  };

  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));

  if (selectedTags.length === 0) return null;

  return (
    <>
      {selectedTags.map((tag) => (
        <div
          key={tag.id}
          className="bg-gray-200 rounded-full px-4 text-sm text-gray-700 flex items-center gap-1"
          style={{ backgroundColor: tag.color || undefined }}
        >
          {tag.name}
          <button
            className="ml-1 text-lg text-gray-700 hover:text-red-500"
            onClick={() => handleRemove(tag.id)}
            type="button"
          >
            ×
          </button>
        </div>
      ))}
    </>
  );
}
