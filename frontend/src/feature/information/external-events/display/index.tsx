"use client";

import EventList from "@/feature/information/external-events/display/EventList";
import { ExternalEventFilterProvider } from "@/feature/information/external-events/context/ExternalEventFilterContext";
import SelectedTagChips from "@/feature/information/external-events/components/SelectedTagChips";
import { useState } from "react";
import { AddExternalEventPopUpChildren } from "@/feature/information/external-events/components/AddExternalEventPopUpChildren";
import { FilterPopUpChildren } from "@/feature/information/external-events/components/FilterPopUpChildren";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FaFilter, FaPlus } from "react-icons/fa";
import  CommonButton  from "@/components/common/commonButton";
import { ExternalEventDetailSidePeakChildren } from "@/feature/information/external-events/components/ExternalEventDetailSidePeakChildren";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditExternalEventPopUpChildren } from "@/feature/information/external-events/components/EditExternalEventPopUpChildren";
import { ProfileDetailPopUpChildren } from "@/components/modal/ProfileDetailPopUpChildren";

export default function IndexPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);

  const [isRefetchOpen, setIsRefetchOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const openSidePeak = (event: any) => {
    setSelectedEvent(event);
    setIsRefetchOpen(true);
  };
  
  const closeSidePeak = () => {
    setIsRefetchOpen(false);
    setSelectedEvent(null);
  };
  // 編集・消去後のリフレッシュ処理などはここで管理

  return (
    <ExternalEventFilterProvider>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between gap-5">
          <div className="flex gap-2 items-center">
            <SelectedTagChips />
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <CommonButton
                  icon={<FaFilter className="text-gray-500" />}
                  label="フィルター"
                  className="bg-white text-gray-500"
                  onClick={() => {}}
                />
              </DialogTrigger>
              <DialogContent>
                <FilterPopUpChildren
                  onClose={() => {}}
                />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <CommonButton
                  icon={<FaPlus className="text-white" />}
                  label="新規作成"
                  className="bg-[#5D6B80] text-white"
                  onClick={() => {}}
                />
              </DialogTrigger>
              <DialogContent className="w-[300px] md:min-w-[1000px]">
                <AddExternalEventPopUpChildren
                  onClose={() => {}}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <EventList
          onEventClick={(event) => {
            openSidePeak(event);
          }}
        />
      </div>
      {/* 詳細サイドピーク */}
      <Sheet open={isRefetchOpen} onOpenChange={setIsRefetchOpen}>
        <SheetContent side="right" className="w-[800px]">
          {selectedEvent && !isEditEventOpen && (
            <ExternalEventDetailSidePeakChildren
              event={selectedEvent}
              onEditClick={() => setIsEditEventOpen(true)}
              onProfileClick={() => setIsProfileOpen(true)}
              onDeleted={() => {
                closeSidePeak();
                // リストリフレッシュなど
              }}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Event Dialog */}
      <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
        <DialogContent className="w-[300px] md:min-w-[1000px]">
          {selectedEvent && (
            <EditExternalEventPopUpChildren
              event={selectedEvent}
              onClose={() => setIsEditEventOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="w-[300px] md:min-w-[1000px]">
          {selectedEvent?.hostUserId && <ProfileDetailPopUpChildren userId={selectedEvent.hostUserId} />}
        </DialogContent>
      </Dialog>
    </ExternalEventFilterProvider>
  );
}
