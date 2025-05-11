import { useUser } from '@clerk/nextjs';
import { useMonthlyGoals } from '@/hooks/useMonthlyGoals';
import { PopUp } from '@/components/display/PopUp';
import { useState } from 'react';
import { EditGoalModal } from '@/components/EditGoalModal';
import { EditFbModal } from '@/components/EditFbModal';
export const ProfileSection = () => {

  const { user } = useUser();
  const userId = user?.id;
  const { goals, isLoading, error } = useMonthlyGoals(userId);
  const thisMonth = new Date().getMonth() + 1;
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);
  const [isEditFbOpen, setIsEditFbOpen] = useState(false);
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <div className="w-full bg-white rounded-lg p-5 flex flex-col">
              <p className="text-sm text-gray-400">将来の夢・ビジョン</p>
              <p className="
              flex-1 text-3xl font-bold text-center flex items-center justify-center
              text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
              ">AIの民主化によって世界を、生活を、1段階進化させる</p>
          </div>
          <div className="w-full flex-1 gap-3 flex">
              <div className="w-[80%] h-full bg-white rounded-lg p-5 flex flex-col">
                <p className="text-sm text-gray-400">今月の目標</p>
                <div className="flex-1 flex flex-col justify-center gap-1">
                  {isLoading && <p>読み込み中...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {goals.length === 0 && !isLoading && <p className="text-center">右側から今月の目標を設定してください</p>}
                  {goals.map(goal => (
                    <div className="flex items-center gap-2">
                      <p className="text-gray-400 font-bold w-4">●</p>
                      <p key={goal.id} className="text-lg font-bold">{goal.goal_text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-[25%] h-full gap-2 flex flex-col">
                  <div
                      onClick={() => setIsEditGoalOpen(true)}
                      className="flex-1 bg-gray-200 rounded-lg w-full flex items-center gap-2 px-5 hover:bg-gray-300 transition-colors"
                  >
                      <img src="/svg/edit.svg" alt="" className="w-5 h-5"/>
                      <p className="text-gray-400 font-bold">今月の目標を設定</p>
                  </div>
                  <div 
                    onClick={() => setIsEditFbOpen(true)}
                    className="flex-1 bg-gray-200 rounded-lg w-full flex items-center gap-2 px-5 cursor-pointer hover:bg-gray-300 transition-colors"
                  > 
                      <img src="/svg/edit.svg" alt="" className="w-5 h-5"/>
                      <p className="text-gray-400 font-bold">先月の目標を振り返る</p>
                  </div>
                  <div 
                    // onClick={() => setIsAllGoalOpen(true)}
                    className="flex-1 bg-gray-200 rounded-lg w-full flex items-center gap-2 px-5 cursor-pointer hover:bg-gray-300 transition-colors"
                  >
                      <img src="/svg/edit.svg" alt="" className="w-5 h-5"/>
                      <p className="text-gray-400 font-bold">全ての目標設定</p>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg w-full flex items-center gap-2 px-5">
                      <img src="/svg/edit.svg" alt="" className="w-5 h-5"/>
                      <p className="text-gray-400 font-bold">メモを設定</p>
                  </div>
              </div>
          </div>
      </div>

      {/* モーダル */}
      {isEditGoalOpen && (
        <PopUp isOpen={isEditGoalOpen} onClose={() => setIsEditGoalOpen(false)}>
          <EditGoalModal onClose={() => setIsEditGoalOpen(false)} />
        </PopUp>
      )}
      {/* モーダル */}
      {isEditFbOpen && (
        <PopUp isOpen={isEditFbOpen} onClose={() => setIsEditFbOpen(false)}>
          <EditFbModal 
            onClose={() => setIsEditFbOpen(false)}
            addMonth={`${thisMonth-1}-01`}
          />
        </PopUp>
      )}
    </>
  );
};
