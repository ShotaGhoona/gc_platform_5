// frontend/src/feature/home/home/display/leftNotice.tsx
'use client';

import { useSystemNoticeList } from '../hooks/useSystemNoticeList';
import { useSystemNoticeDetail } from '../hooks/useSystemNoticeDetail';
import { NoticeDetailSidePeakChildren } from '../components/NoticeDetailSidePeakChildren';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useState } from 'react';

export default function LeftNotice() {
  const { notices, isLoading, error, pagination, goToPage } = useSystemNoticeList();
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
      <Card className="w-[400px] h-full flex flex-col">
        <CardTitle className="px-6 pt-6">運営からのお知らせ</CardTitle>
        <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <ScrollArea className="flex-1 min-h-0">
            <div className="flex flex-col gap-3 pr-4">
              {Array.isArray(notices) && notices.length === 0 && (
                <Card>
                  <CardContent>お知らせはありません</CardContent>
                </Card>
              )}
              {Array.isArray(notices) && notices.map(notice => (
                <Sheet key={notice.id}>
                  <SheetTrigger asChild>
                    <Card className="cursor-pointer" onClick={() => setSelectedNotice(notice)}>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-1">
                          {Array.isArray(notice.tags) && notice.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              className="bg-blue-100 text-blue-800"
                            >
                              {tag}
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
                    className='w-full sm:max-w-[600px] p-5'
                  >
                    <SheetHeader>
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
          
          {/* ページネーション - ScrollAreaの外側で固定高さ */}
          {pagination.total_pages > 1 && (
            <div className="mt-4 flex justify-center flex-shrink-0">
              <Pagination>
                <PaginationContent>
                  {pagination.page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(pagination.page - 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        isActive={pageNum === pagination.page}
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(pageNum);
                        }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {pagination.page < pagination.total_pages && (
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(pagination.page + 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
