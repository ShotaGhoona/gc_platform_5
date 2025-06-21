"use client";
// import MemberRangeSelect from "../components/MemberRangeSelect";
import TopRankingAllSeason from "./TopRankingAllSeason";
import StreakRanking from "./StreakRanking";
import TopRankingThisMonth from "./TopRankingThisMonth";
import MonthRangeChangeButton from "@/components/common/MonthRangeChangeButton";
import { useState } from "react";
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
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleProfileClick = (userId: string) => {
    // This will be handled by the Dialog component
  };

  return (
    <>
      <div className="flex flex-col gap-5 h-full w-full">
        <div className="flex gap-5">
          <MonthRangeChangeButton year={year} setYear={setYear} month={month} setMonth={setMonth} />
        </div>
        <div className="flex-1 flex gap-5 w-full min-h-0">
          <div className="bg-white w-full h-full rounded-lg shadow-md p-5">
            <TopRankingThisMonth year={year} month={month} onProfileClick={handleProfileClick} rankingType="All" ProfileDialog={ProfileDialog} />
          </div>
          <div className="bg-white w-full h-full rounded-lg shadow-md p-5">
            <TopRankingAllSeason onProfileClick={handleProfileClick} rankingType="All" ProfileDialog={ProfileDialog} />
          </div>
          <div className="bg-white w-full h-full rounded-lg shadow-md p-5">
            <StreakRanking onProfileClick={handleProfileClick} rankingType="All" ProfileDialog={ProfileDialog} />
          </div>
        </div>
      </div>
    </>
  );
}
