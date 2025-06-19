'use client';

import VisionContainer from "../components/VisionContainer";
import DashboardCards from "../components/DashboardCard";
import AnalysisTypeSelect from "../components/AnalysisTypeSelect";
import { useState } from "react";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { useUser } from "@clerk/nextjs";
import WeeklyAnalysis from "./WeeklyAnalysis";
import TodayLive from "./TodayLive";
import WeeklyFlow from "./WeeklyFlow";
import { PopUp } from "@/components/display/PopUp";
import { ProfileDetailPopUpChildren } from "@/components/modal/ProfileDetailPopUpChildren";
import TopRankingThisMonth from "@/feature/morning/ranking/display/TopRankingThisMonth";
import MonthlyGoal from "./MonthlyGoal";
import MainSubTierCard from "./MainSubTierCard";
import { usePopUp } from "@/hooks/usePopUp";
import MainContentsDateRangeSelect from "../components/MainContentsDateRangeSelect";

export default function DashboardPage() {
  const [selectedViewIndex, setSelectedViewIndex] = useState(0);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const { user } = useUser();
  const { isOpen, openPopUp, closePopUp } = usePopUp();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleProfileClick = (userId: string) => {
    setSelectedUserId(userId);
    openPopUp();
  };

  const { data, loading, error } = useDashboardSummary(user?.id ?? "");

  return (
    <>
      <div className="flex  gap-5 h-full w-full">
        <div className="flex-1 flex flex-col gap-5">
          <VisionContainer />
          <div className="flex gap-5">
            <DashboardCards data={data} loading={loading} />
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="flex gap-5 justify-between">
            <AnalysisTypeSelect selectedViewIndex={selectedViewIndex} onChangeViewIndex={setSelectedViewIndex} />
            {selectedViewIndex === 0 && <MainContentsDateRangeSelect selectedViewIndex={selectedDateIndex} onChangeViewIndex={setSelectedDateIndex}/>}
            {selectedViewIndex === 1 && <MainContentsDateRangeSelect selectedViewIndex={selectedDateIndex} onChangeViewIndex={setSelectedDateIndex}/>}
          </div>
          <div className="flex-1 h-full bg-white rounded-lg shadow-md p-5 min-h-0">
            {selectedViewIndex === 0 && (<WeeklyAnalysis selectedViewIndex={selectedDateIndex} />)}
            {selectedViewIndex === 1 && <WeeklyFlow selectedViewIndex={selectedDateIndex} />}
            {selectedViewIndex === 2 && <TodayLive onProfileClick={handleProfileClick} />}
            {selectedViewIndex === 3 && <MonthlyGoal />}
          </div>
        </div>
        <div className="flex flex-col gap-5 flex-shrink w-[405px]">
          <div className="w-full">
            <MainSubTierCard />
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-md p-5">
            <TopRankingThisMonth year={new Date().getFullYear()} month={new Date().getMonth() + 1} onProfileClick={handleProfileClick} />
          </div>
        </div>
        {/* <TierLoginTest /> */}
      </div>
      <PopUp isOpen={isOpen} onClose={closePopUp}>
        <ProfileDetailPopUpChildren userId={selectedUserId ?? ""} />
      </PopUp>
    </>
  );
}
