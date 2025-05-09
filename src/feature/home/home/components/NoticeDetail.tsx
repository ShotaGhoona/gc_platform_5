// frontend/src/feature/home/home/components/NoticeDetail.tsx

import { SystemNotionDetail } from '../services/systemNoticeDetailService';

type NoticeDetailProps = {
  notice: SystemNotionDetail;
};

export const NoticeDetail = ({ notice }: NoticeDetailProps) => {
  return (
    <div className="space-y-6 bg-white rounded-lg p-6">
      {/* タグ */}
      <div className="flex items-center gap-2">
        {notice.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: `${tag.color}20`,
              color: tag.color,
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* タイトル */}
      <h2 className="text-xl font-bold text-gray-800">{notice.title}</h2>

      {/* 本文 */}
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-600 whitespace-pre-wrap">{notice.description}</p>
      </div>

      {/* 画像 */}
      {notice.img_url && (
        <div>
          <img src={notice.img_url} alt={notice.title} className="max-w-full rounded" />
        </div>
      )}
    </div>
  );
};