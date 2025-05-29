"use client";
import { useState } from "react";
import MonthRangeChangeButton from "@/components/common/MonthRangeChangeButton";
import ViewSelect from "../components/ViewSelect";
import CommonButton from "@/components/common/commonButton";
import { FaPlus } from "react-icons/fa";
import { useMorningEventList } from "../hooks/useMorningEvent";
import { useMorningEventDetail } from "@/hooks/useMorningEventDetail";
import { useUser } from "@clerk/nextjs";
import { useSidePeak } from "@/hooks/useSidePeak";
import { SidePeak } from "@/components/display/SidePeak";
import MorningEventSidePeakChildren from "@/components/modal/MorningEventSidePeakChildren";
import MorningEventGalleryView from "../components/MorningEventGalleryView";
import MorningEventCalendarView from "../components/MorningEventCalendarView";
import { PopUp } from "@/components/display/PopUp";
import { ProfileDetailPopUpChildren } from "@/components/modal/ProfileDetailPopUpChildren";
import { AddMorningEventModal } from "../components/AddMorningEventModal";
import { EditMorningEventModal } from "../components/EditMorningEventModal";
import { usePopUp } from "@/hooks/usePopUp";

export default function IndexPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-12
  const [selectedViewIndex, setSelectedViewIndex] = useState(0);

  const { isOpen: isProfileOpen, openPopUp: openProfilePopUp, closePopUp: closeProfilePopUp } = usePopUp();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { user } = useUser();
  const { events, loading, error } = useMorningEventList(year, month, user?.id);
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
      mainView = (
        <MorningEventCalendarView events={events} openSidePeak={openSidePeak} year={year} month={month}/>
      );
    }
  }

  const handleProfileClick = (userId: string) => {
    openProfilePopUp(userId);
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
            <ViewSelect selectedViewIndex={selectedViewIndex} onChangeViewIndex={setSelectedViewIndex} />
            <MonthRangeChangeButton
              year={year}
              setYear={setYear}
              month={month}
              setMonth={setMonth}
            />
          </div>
          <div className="flex gap-2">
            <CommonButton
              onClick={() => { setShowAddMorningEventModal(true); }}
              icon={<FaPlus className="text-white" />}
              label="新規作成"
              className="bg-[#D68897] text-white"
            />
          </div>
        </div>
        <div className="flex-1 flex w-full gap-5 min-h-0">
          <div className="w-full overflow-y-auto scrollbar-hide">
            {mainView}
          </div>
        </div>
      </div>
      <SidePeak isOpen={isOpen} onClose={closeSidePeak}>
        {eventId && detail && (
          <MorningEventSidePeakChildren
            event={detail}
            onProfileClick={handleProfileClick}
            onEditClick={() => handleEditClick(detail)}
          />
        )}
        {eventId && detailLoading && <div>読み込み中...</div>}
        {eventId && detailError && <div className="text-red-500">{detailError}</div>}
      </SidePeak>
      <PopUp isOpen={isProfileOpen} onClose={closeProfilePopUp}>
        {selectedUserId && <ProfileDetailPopUpChildren userId={selectedUserId} />}
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
            onClose={() => {
              setShowEditMorningEventModal(false);
              setEditTargetEvent(null);
            }}
            event={editTargetEvent}
          />
        )}
      </PopUp>
    </>
  );
}
