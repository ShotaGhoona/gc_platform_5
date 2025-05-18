"use client";
import { useState } from "react";
import DateRangeSelect from "../components/DateRangeSelect";
import ViewSelect from "../components/ViewSelect";
import CommonButton from "@/components/common/commonButton";
import { FaFilter, FaPlus } from "react-icons/fa";
import { useMorningEventList } from "../hooks/useMorningEvent";
import { useMorningEventDetail } from "@/hooks/useMorningEventDetail";
import { useUser } from "@clerk/nextjs";
import { useSidePeak } from "@/hooks/useSidePeak";
import { SidePeak } from "@/components/display/SidePeak";
import MorningEventDetail from "@/components/MorningEventDetail";
import MorningEventGalleryView from "../components/MorningEventGalleryView";
import MorningEventCalendarView from "../components/MorningEventCalendarView";
import { PopUp } from "@/components/display/PopUp";
import { ProfileDetailModal } from "@/components/ProfileDetailModal";
import { AddMorningEventModal } from "../components/AddMorningEventModal";
import { EditMorningEventModal } from "../components/EditMorningEventModal";
type DateRangeType = "last_month" | "this_month" | "next_month" | "all";

export default function IndexPage() {
  const [dateRange, setDateRange] = useState<DateRangeType>("this_month");
  const [selectedViewIndex, setSelectedViewIndex] = useState(0);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { user } = useUser();
  const { events, loading, error } = useMorningEventList(dateRange, user?.id);
  const { isOpen, selectedData, openSidePeak, closeSidePeak } = useSidePeak();
  const eventId = selectedData as string | null;
  const { detail, loading: detailLoading, error: detailError } = useMorningEventDetail(eventId);

  const [showAddMorningEventModal, setShowAddMorningEventModal] = useState(false);
  const [showEditMorningEventModal, setShowEditMorningEventModal] = useState(false);
  const [editTargetEvent, setEditTargetEvent] = useState<any>(null);
  let mainView = null;
  if (loading) {
    mainView = <div>読み込み中...</div>;
  } else if (error) {
    mainView = <div className="text-red-500">{error}</div>;
  } else {
    if (selectedViewIndex === 0) {
      mainView = <MorningEventGalleryView events={events} openSidePeak={openSidePeak} />;
    } else if (selectedViewIndex === 1) {
      mainView = <MorningEventCalendarView events={events} openSidePeak={openSidePeak} />;
    }
  }

  const handleProfileClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsProfileOpen(true);
  };

  const handleEditClick = (event: any) => {
    setEditTargetEvent(event);
    setShowEditMorningEventModal(true);
  };

  return (
    <>
      <div className="flex flex-col h-full gap-5">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <DateRangeSelect onChangeDateRange={setDateRange} />
            <ViewSelect selectedViewIndex={selectedViewIndex} onChangeViewIndex={setSelectedViewIndex} />
          </div>
          <div className="flex gap-2">
            <CommonButton
              onClick={() => {}}
              icon={<FaFilter className="text-gray-500" />}
              label="フィルター"
              className="bg-white text-gray-500"
            />
            <CommonButton
              onClick={() => { setShowAddMorningEventModal(true); }}
              icon={<FaPlus className="text-white" />}
              label="新規作成"
              className="bg-[#D68897] text-white"
            />
          </div>
        </div>
        <div className="flex-1 flex w-full gap-5 min-h-0">
          <div className="w-full bg-white rounded-lg shadow-md p-5 overflow-y-auto scrollbar-hide">
            {mainView}
          </div>
        </div>
      </div>
      <SidePeak isOpen={isOpen} onClose={closeSidePeak}>
        {eventId && detail && (
          <MorningEventDetail
            event={detail}
            onProfileClick={handleProfileClick}
            onEditClick={() => handleEditClick(detail)}
          />
        )}
        {eventId && detailLoading && <div>読み込み中...</div>}
        {eventId && detailError && <div className="text-red-500">{detailError}</div>}
      </SidePeak>
      <PopUp isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        {selectedUserId && <ProfileDetailModal userId={selectedUserId} />}
      </PopUp>
      <PopUp isOpen={!!showAddMorningEventModal} onClose={() => setShowAddMorningEventModal(false)}>
        {showAddMorningEventModal && (
          <AddMorningEventModal
            onClose={() => setShowAddMorningEventModal(false)}
          />
        )}
      </PopUp>
      <PopUp isOpen={!!showEditMorningEventModal} onClose={() => setShowEditMorningEventModal(false)}>
        {showEditMorningEventModal && editTargetEvent && (
          <EditMorningEventModal
            onClose={() => setShowEditMorningEventModal(false)}
            event={editTargetEvent}
          />
        )}
      </PopUp>
    </>
  );
}
