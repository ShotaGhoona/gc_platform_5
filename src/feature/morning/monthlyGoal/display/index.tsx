"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useMonthlyGoalsRange } from "@/hooks/useMonthlyGoals";
import { MonthSelector } from "../components/MonthSelector";
import { AddGoalButton } from "../components/AddGoalButton";
import { EditGoalButton } from "../components/EditGoalButton";
import { PopUp } from "@/components/display/PopUp";
import { EditGoalModal } from "@/components/EditGoalModal";
import { EditFbModal } from "@/components/EditFbModal";


import { GoalColumn } from "../components/GoalColumn";

export default function IndexPage() {
  const { user } = useUser();
  const userId = user?.id;
  const [centerMonth, setCenterMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const { groupedGoals, isLoading, error } = useMonthlyGoalsRange(userId, centerMonth);

  const [showEditGoalModal, setShowEditGoalModal] = useState<string | false>(false);
  const [showEditFbModal, setShowEditFbModal] = useState<string | false>(false);
  // 3カラム分の年月を計算
  const centerDate = new Date(centerMonth + "-01");
  const months = [-1, 0, 1].map((offset) => {
    const d = new Date(centerDate);
    d.setMonth(d.getMonth() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center items-center py-8">
        <MonthSelector value={centerMonth} onChange={setCenterMonth} />
      </div>
      {/* 3カラムを中央に固定し、左右を半分見切れるようにUI調整 */}
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
      <div className="flex justify-center gap-4 py-6">
        <AddGoalButton onClick={() => setShowEditGoalModal(centerMonth)} />
        <EditGoalButton onClick={() => setShowEditFbModal(centerMonth)} />
      </div>
      {isLoading && <div className="text-center text-gray-400">読み込み中...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      
      {/* 目標編集 */}
      <PopUp isOpen={!!showEditGoalModal} onClose={() => setShowEditGoalModal(false)}>
        {showEditGoalModal && (
          <EditGoalModal
            onClose={() => setShowEditGoalModal(false)}
            addMonth={showEditGoalModal}
          />
        )}
      </PopUp>
      {/* フィードバック編集 */}
      <PopUp isOpen={!!showEditFbModal} onClose={() => setShowEditFbModal(false)}>
        {showEditFbModal && (
          <EditFbModal
            onClose={() => setShowEditFbModal(false)}
            addMonth={showEditFbModal}
          />
        )}
      </PopUp>
      
    </div>
  );
}
