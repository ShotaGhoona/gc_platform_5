"use client";
import { useUser } from "@clerk/nextjs";
import StreakRanking from "../../ranking/display/StreakRanking";
import TopRankingThisMonth from "../../ranking/display/TopRankingThisMonth";
import TopRankingAllSeason from "../../ranking/display/TopRankingAllSeason";
import WeeklyFlow from "../../../home/dashboard/display/WeeklyFlow";
import WeeklyAnalysis from "../../../home/dashboard/display/WeeklyAnalysis";
import AnalysisTypeSelect from "../components/AnalysisTypeSelect";
import { useState } from "react";
import MonthRangeChangeButton from "@/components/common/MonthRangeChangeButton";
import RivalCompareCalendar from "./RivalCompareCalendar";
import MainContentsDateRangeSelect from "@/feature/home/dashboard/components/MainContentsDateRangeSelect";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ProfileDetailPopUpChildren } from "@/components/modal/ProfileDetailPopUpChildren";

const ProfileDialog = ({ userId, children }: { userId: string; children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <ProfileDetailPopUpChildren userId={userId} />
      </DialogContent>
    </Dialog>
  );
};

export default function IndexPage() {
  const handleProfileClick = (userId: string) => {
    // This will be handled by the Dialog component
  };

  const [selectedViewIndex, setSelectedViewIndex] = useState(0);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(5);
  return (
    <>
      <div className="flex flex-col gap-5 h-full w-full">
        <div className="flex-1 flex flex-shrink gap-5 w-full">
          <div className="w-1/2 flex flex-col h-full gap-2">
            <div className="flex items-center justify-start">
              <MonthRangeChangeButton year={year} month={month} setYear={setYear} setMonth={setMonth} /> 
            </div>
            <div className="flex-1 flex flex-col">
              <RivalCompareCalendar year={year} month={month} />
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-5 h-full">
            <div className="flex items-center justify-between">
              <AnalysisTypeSelect selectedViewIndex={selectedViewIndex} onChangeViewIndex={setSelectedViewIndex} />
              <MainContentsDateRangeSelect selectedViewIndex={selectedDateIndex} onChangeViewIndex={setSelectedDateIndex}/>
            </div>
            <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg p-5 min-h-0 overflow-hidden">
              {selectedViewIndex === 0 && <WeeklyAnalysis selectedViewIndex={selectedDateIndex} />}
              {selectedViewIndex === 1 && <WeeklyFlow selectedViewIndex={selectedDateIndex} />}
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-full">
          {(() => {
            const { user } = useUser();
            const userId = user?.id ?? "";
            return (
              <>
                <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg p-5">
                  <TopRankingThisMonth year={year} month={month} onProfileClick={handleProfileClick} rankingType="Rival" userId={userId} ProfileDialog={ProfileDialog} />
                </div>
                <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg p-5">
                  <TopRankingAllSeason onProfileClick={handleProfileClick} rankingType="Rival" userId={userId} ProfileDialog={ProfileDialog} />
                </div>
                <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg p-5">
                  <StreakRanking onProfileClick={handleProfileClick} rankingType="Rival" userId={userId} ProfileDialog={ProfileDialog} />
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </>
  );
}
