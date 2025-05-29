// frontend/src/feature/home/home/display/leftNotice.tsx
'use client';

import { useSystemNoticeList } from '../hooks/useSystemNoticeList';
import { useSidePeak } from '@/hooks/useSidePeak';
import { SidePeak } from '@/components/display/SidePeak';
import { useSystemNoticeDetail } from '../hooks/useSystemNoticeDetail';
import { NoticeDetailSidePeakChildren } from '../components/NoticeDetailSidePeakChildren';

export default function LeftNotice() {
  const { notices, isLoading, error } = useSystemNoticeList();
  const { isOpen, selectedData, openSidePeak, closeSidePeak } = useSidePeak();
  const { detail, isLoading: detailLoading, error: detailError } = useSystemNoticeDetail(selectedData?.id);
  
  // ローディング設定
  if (isLoading) {return <div className="w-full h-full p-10">読み込み中...</div>;}
  if (error) {return <div className="w-full h-full p-10 text-red-500">エラーが発生しました: {error}</div>;}

  return (
    <>
      <div className="w-full h-full p-5 flex flex-col">
        <h2 className="text-base font-bold text-gray-700 mb-6 flex-shrink-0">
          運営からのお知らせ
        </h2>
        <div className="flex-1 overflow-y-auto space-y-2">
          {Array.isArray(notices) && notices.length === 0 && <div>お知らせはありません</div>}
          {Array.isArray(notices) && notices.map(notice => (
            <div
              key={notice.id}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openSidePeak(notice)}
            >
              <div className="flex items-center mb-1">
                {Array.isArray(notice.tags) && notice.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="text-[8px] px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <h3 className="text-[12px] font-bold text-gray-800 mb-1">{notice.title}</h3>
              <p className="text-[10px] text-gray-600">{notice.description}</p>
            </div>
          ))}
        </div>
      </div>
      <SidePeak isOpen={isOpen} onClose={closeSidePeak}>
        {detailLoading && <div>読み込み中...</div>}
        {detailError && <div className="text-red-500">{detailError}</div>}
        {detail && <NoticeDetailSidePeakChildren notice={detail} />}
      </SidePeak>
    </>
  );
}