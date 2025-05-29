"use client";

import EventList from "@/feature/information/external-events/display/EventList";
import { ExternalEventFilterProvider } from "@/feature/information/external-events/context/ExternalEventFilterContext";
import SelectedTagChips from "@/feature/information/external-events/components/SelectedTagChips";
import { PopUp } from "@/components/display/PopUp";
import { useState } from "react";
import { AddExternalEventPopUpChildren } from "@/feature/information/external-events/components/AddExternalEventPopUpChildren";
import { FilterPopUpChildren } from "@/feature/information/external-events/components/FilterPopUpChildren";
import { FaFilter, FaPlus } from "react-icons/fa";
import  CommonButton  from "@/components/common/commonButton";
import { ExternalEventDetailSidePeakChildren } from "@/feature/information/external-events/components/ExternalEventDetailSidePeakChildren";
import { SidePeak } from "@/components/display/SidePeak";
import { EditExternalEventPopUpChildren } from "@/feature/information/external-events/components/EditExternalEventPopUpChildren";
import { ProfileDetailPopUpChildren } from "@/components/modal/ProfileDetailPopUpChildren";
import { usePopUp } from "@/hooks/usePopUp";
import { useSidePeak } from "@/hooks/useSidePeak";

export default function IndexPage() {
  const { isOpen: isProfileOpen, openPopUp: openProfilePopUp, closePopUp: closeProfilePopUp } = usePopUp();
  const { isOpen: isAddEventOpen, openPopUp: openAddEventPopUp, closePopUp: closeAddEventPopUp } = usePopUp();
  const { isOpen: isFilterOpen, openPopUp: openFilterPopUp, closePopUp: closeFilterPopUp } = usePopUp();
  const { isOpen: isEditEventOpen, openPopUp: openEditEventPopUp, closePopUp: closeEditEventPopUp } = usePopUp();

  const { isOpen: isRefetchOpen, selectedData: selectedEvent, openSidePeak, closeSidePeak } = useSidePeak();
  // 編集・消去後のリフレッシュ処理などはここで管理

  return (
    <ExternalEventFilterProvider>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between gap-5">
          <div className="flex gap-2 items-center">
            <SelectedTagChips />
          </div>
          <div className="flex gap-2">
            <CommonButton
              onClick={openFilterPopUp}
              icon={<FaFilter className="text-gray-500" />}
              label="フィルター"
              className="bg-white text-gray-500"
            />
            <CommonButton
              onClick={openAddEventPopUp}
              icon={<FaPlus className="text-white" />}
              label="新規作成"
              className="bg-[#5D6B80] text-white"
            />
          </div>
        </div>
        <EventList
          onEventClick={(event) => {
            openSidePeak(event);
          }}
        />
      </div>
      {/* 詳細サイドピーク */}
      <SidePeak isOpen={isRefetchOpen} onClose={closeSidePeak}>
        {selectedEvent && !isEditEventOpen && (
          <ExternalEventDetailSidePeakChildren
            event={selectedEvent}
            onEditClick={openEditEventPopUp}
            onProfileClick={openProfilePopUp}
            onDeleted={() => {
              closeSidePeak();
              // リストリフレッシュなど
            }}
          />
        )}
      </SidePeak>

      {/* モーダル */}
      <PopUp isOpen={isAddEventOpen} onClose={closeAddEventPopUp}>
        {isAddEventOpen && (
          <AddExternalEventPopUpChildren
            onClose={closeAddEventPopUp}
          />
        )}
      </PopUp>
      <PopUp isOpen={isFilterOpen} onClose={closeFilterPopUp}>
        {isFilterOpen && (
          <FilterPopUpChildren
            onClose={closeFilterPopUp}
          />
        )}
      </PopUp>
      <PopUp isOpen={isEditEventOpen} onClose={closeEditEventPopUp}>
        {isEditEventOpen && (
          <EditExternalEventPopUpChildren
            event={selectedEvent}
            onClose={closeEditEventPopUp}
          />
        )}
      </PopUp>
      <PopUp isOpen={isProfileOpen} onClose={closeProfilePopUp}>
        {selectedEvent?.hostUserId && <ProfileDetailPopUpChildren userId={selectedEvent.hostUserId} />}
      </PopUp>
    </ExternalEventFilterProvider>
  );
}
