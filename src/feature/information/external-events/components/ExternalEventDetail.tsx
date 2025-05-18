// frontend/src/feature/home/home/components/NoticeDetail.tsx

import { ExternalEvent } from '../services/externalEventService';

type ExternalEventDetailProps = {
  event: ExternalEvent;
};

export const ExternalEventDetail = ({ event }: ExternalEventDetailProps) => {
  return (
    <div className="space-y-6 bg-white rounded-lg p-6">
      {/* 画像 */}
      {event.image && (
        <div>
          <img src={event.image} alt={event.title} className="max-w-full rounded" />
        </div>
      )}
      {/* タグ */}
      <div className="flex items-center gap-2">
        {event.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: `${tag.color}`,
              color: "gray",
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* タイトル */}
      <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>

      {/* 本文 */}
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
      </div>
    </div>
  );
};