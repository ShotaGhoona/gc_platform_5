// frontend/src/feature/home/home/display/leftNotice.tsx
'use client';

import { useSystemNoticeList } from '../hooks/useSystemNoticeList';
import { useSystemNoticeDetail } from '../hooks/useSystemNoticeDetail';
import { NoticeDetailSidePeakChildren } from '../components/NoticeDetailSidePeakChildren';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

export default function LeftNotice() {
  const { notices, isLoading, error } = useSystemNoticeList();
  const [selectedNotice, setSelectedNotice] = useState<any | null>(null);
  const { detail, isLoading: detailLoading, error: detailError } = useSystemNoticeDetail(selectedNotice?.id);

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <div>読み込み中...</div>
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card>
        <CardContent>
          <div className="text-red-500">エラーが発生しました: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-[400px]">
        <CardTitle className="px-6 pt-6">運営からのお知らせ</CardTitle>
        <CardContent>
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-3">
              {Array.isArray(notices) && notices.length === 0 && (
                <Card>
                  <CardContent>お知らせはありません</CardContent>
                </Card>
              )}
              {Array.isArray(notices) && notices.map(notice => (
                <Sheet key={notice.id}>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => setSelectedNotice(notice)}>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-1">
                          {Array.isArray(notice.tags) && notice.tags.map(tag => (
                            <Badge
                              key={tag.id}
                              style={{
                                backgroundColor: `${tag.color}20`,
                                color: tag.color,
                              }}
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-sm font-bold mb-1">{notice.title}</CardTitle>
                        <CardDescription className="text-xs">{notice.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className='w-full sm:max-w-[600px]'
                  >
                    <SheetHeader>
                      <SheetTitle>{notice.title}</SheetTitle>
                      <SheetDescription>
                        {detailLoading && "読み込み中..."}
                        {detailError && `エラー: ${detailError}`}
                      </SheetDescription>
                    </SheetHeader>
                    {selectedNotice?.id === notice.id && detail && <NoticeDetailSidePeakChildren notice={detail} />}
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
