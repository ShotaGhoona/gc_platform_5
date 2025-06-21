"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useMonthlyGoalsRange } from "@/hooks/useMonthlyGoals";
import { EditGoalPopUpChildren } from "@/components/modal/EditGoalPopUpChildren";
import { EditFbPopUpChildren } from "@/components/modal/EditFbPopUpChildren";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { GoalColumn } from "../components/GoalColumn";
import MonthRangeChangeButton from "@/components/common/MonthRangeChangeButton";
import CommonButton from "@/components/common/commonButton";
import { FaEdit } from "react-icons/fa";

export default function IndexPage() {
  const { user } = useUser();
  const userId = user?.id;
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-12

  const centerMonth = `${year}-${String(month).padStart(2, "0")}`;
  const { groupedGoals, isLoading, error } = useMonthlyGoalsRange(userId, centerMonth);

  // 3カラム分の年月を計算
  const centerDate = new Date(centerMonth + "-01");
  const months = [-1, 0, 1].map((offset) => {
    const d = new Date(centerDate);
    d.setMonth(d.getMonth() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  return (
    <>
      <div className="h-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <MonthRangeChangeButton
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
          />
          <div className="flex items-center gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <CommonButton 
                  icon={<FaEdit className="text-white" />}
                  label="目標を追加"
                  className="bg-[#5F7392] text-white"
                  onClick={() => {}}
                />
              </DialogTrigger>
              <DialogContent className="min-w-[300px] md:min-w-[1000px]">
                <EditGoalPopUpChildren
                  onClose={() => {}}
                  addMonth={centerMonth}
                />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <CommonButton 
                  icon={<FaEdit className="text-white" />}
                  label="フィードバックを記入"
                  className="bg-[#5F7392] text-white"
                  onClick={() => {}}
                />
              </DialogTrigger>
              <DialogContent className="min-w-[300px] md:min-w-[1000px]">
                <EditFbPopUpChildren
                  onClose={() => {}}
                  addMonth={centerMonth}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="relative flex-1 flex justify-center items-center overflow-hidden" style={{ minHeight: 400 }}>
          <div className="relative max-w-[1500px] w-full h-full flex items-center justify-center">
            <div className="bg-white absolute top-1/2 -translate-y-1/2 left-0 w-[600px] h-[90%] rounded-2xl shadow-lg px-6 py-8 opacity-50 pointer-events-none z-1" >
                <GoalColumn ym={months[0]} goals={groupedGoals[months[0]] || []} />
            </div>
            <div className="relative z-10 w-[600px] mx-auto h-full bg-white rounded-2xl shadow-lg px-6 py-8" >
              <GoalColumn ym={months[1]} goals={groupedGoals[months[1]] || []} />
            </div>
            <div className="bg-white absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[90%] rounded-2xl shadow-lg px-6 py-8 opacity-50 pointer-events-none z-1" >
                <GoalColumn ym={months[2]} goals={groupedGoals[months[2]] || []} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
