"use client";
import { useState } from "react";
import MonthCalendar from "./MonthCalendar";
import MonthRangeChangeButton from "@/components/common/MonthRangeChangeButton";
import { useParticipatingEvents } from "../hooks/useParticipatingEvents";
import { useAttendance } from "../hooks/useAttendance";
import { SidePeak } from "@/components/display/SidePeak";
import MorningEventSidePeakChildren from "@/components/modal/MorningEventSidePeakChildren";
import { useMorningEventDetail } from "@/hooks/useMorningEventDetail";
import { AttendanceCountThisMonth, AttendanceCountTotal, MorningEventCountHost, MorningEventCountParticipate } from "../components/DashboardComponent";
import { PopUp } from "@/components/display/PopUp";
import { ProfileDetailPopUpChildren } from "@/components/modal/ProfileDetailPopUpChildren";
import { usePopUp } from "@/hooks/usePopUp";

export default function IndexPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);

  // カレンダーは即時切り替え、イベントは非同期で追いかけて取得
  const { events, loading, error } = useParticipatingEvents(viewYear, viewMonth);
  const { days: attendanceDays, loading: attendanceLoading, error: attendanceError } = useAttendance(viewYear, viewMonth);

  // サイドピーク用
  const { isOpen, selectedData, openPopUp, closePopUp } = usePopUp();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { detail, loading: detailLoading, error: detailError } = useMorningEventDetail(selectedEventId);

  const openSidePeak = (eventId: string) => {
    setSelectedEventId(eventId);
    openPopUp(eventId);
  };
  const closeSidePeak = () => {
    closePopUp();
    setSelectedEventId(null);
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showEditMorningEventModal, setShowEditMorningEventModal] = useState(false);
  const [editTargetEvent, setEditTargetEvent] = useState<any>(null);
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
      <div className="flex flex-col h-full gap-2">
        <div className="flex justify-end items-center">
          <div>
            <MonthRangeChangeButton
              year={viewYear}
              setYear={setViewYear}
              month={viewMonth}
              setMonth={setViewMonth}
            />
          </div>
        </div>
        <div className="flex gap-5 flex-1">
          <div className="w-1/3 h-full flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="bg-white rounded-lg p-5 w-full h-full shadow-lg">
                <AttendanceCountThisMonth />
              </div>
              <div className="bg-white rounded-lg p-5 w-full h-full shadow-lg">
                <AttendanceCountTotal />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="bg-white rounded-lg p-5 w-full h-full shadow-lg">
                <MorningEventCountHost />
              </div>
              <div className="bg-white rounded-lg p-5 w-full h-full shadow-lg">
                <MorningEventCountParticipate />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-5 w-2/3 h-full shadow-lg">
            <MonthCalendar
              viewYear={viewYear}
              viewMonth={viewMonth}
              events={loading ? [] : events}
              attendanceDays={attendanceDays}
              onEventClick={openSidePeak}
            />
            {attendanceLoading && <div className="text-center text-gray-400 mt-2">出席日取得中...</div>}
            {attendanceError && <div className="text-red-500 mt-2">{attendanceError}</div>}
            {loading && <div className="text-center text-gray-400 mt-2">イベント取得中...</div>}
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </div>
      </div>
      
      <SidePeak isOpen={isOpen} onClose={closeSidePeak}>
        {selectedEventId && detail && (
          <MorningEventSidePeakChildren
            event={detail}
            onProfileClick={handleProfileClick}
            onEditClick={() => handleEditClick(detail)}
          />
        )}
        {selectedEventId && detailLoading && <div>読み込み中...</div>}
        {selectedEventId && detailError && <div className="text-red-500">{detailError}</div>}
      </SidePeak>
      <PopUp isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        {selectedUserId && <ProfileDetailPopUpChildren userId={selectedUserId} />}
      </PopUp>
    </>
  );
}
