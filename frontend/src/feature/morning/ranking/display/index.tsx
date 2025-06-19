"use client";
// import MemberRangeSelect from "../components/MemberRangeSelect";
import TopRankingAllSeason from "./TopRankingAllSeason";
import StreakRanking from "./StreakRanking";
import TopRankingThisMonth from "./TopRankingThisMonth";
import MonthRangeChangeButton from "@/components/common/MonthRangeChangeButton";
import { useState } from "react";
import { PopUp } from "@/components/display/PopUp";
import { ProfileDetailPopUpChildren } from "@/components/modal/ProfileDetailPopUpChildren";
import { usePopUp } from "@/hooks/usePopUp";
export default function IndexPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { isOpen, selectedData, openPopUp, closePopUp } = usePopUp();

  const handleProfileClick = (userId: string) => {
    openPopUp(userId);
  };

  return (
    <>
      <div className="flex flex-col gap-5 h-full w-full">
        <div className="flex gap-5">
          <MonthRangeChangeButton year={year} setYear={setYear} month={month} setMonth={setMonth} />
        </div>
        <div className="flex-1 flex gap-5 w-full min-h-0">
          <div className="bg-white w-full h-full rounded-lg shadow-md p-5">
            <TopRankingThisMonth year={year} month={month} onProfileClick={handleProfileClick} rankingType="All" />
          </div>
          <div className="bg-white w-full h-full rounded-lg shadow-md p-5">
            <TopRankingAllSeason onProfileClick={handleProfileClick} rankingType="All" />
          </div>
          <div className="bg-white w-full h-full rounded-lg shadow-md p-5">
            <StreakRanking onProfileClick={handleProfileClick} rankingType="All" />
          </div>
        </div>
      </div>
      <PopUp isOpen={isOpen} onClose={closePopUp}>
        {selectedData && <ProfileDetailPopUpChildren userId={selectedData} />}
      </PopUp>
    </>
  );
}
