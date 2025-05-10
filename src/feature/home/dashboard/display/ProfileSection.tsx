// import { useWeeklyGoals } from '../hooks/useWeeklyGoals';
// import { usePopUp } from '@/hooks/usePopUp';
// import { PopUp } from '@/components/display/PopUp';
// import { EditGoalModal } from '../modals/EditGoalModal';
// import { FeedBackGoalModal } from '../modals/FeedBackGoalModal';

export const ProfileSection = () => {
//   const { goals, isLoading, error } = useWeeklyGoals();
//   const { isOpen, openPopUp, closePopUp, selectedData } = usePopUp();
  
//   console.log('Component - レンダリング時の状態:', {
//     goalsLength: goals.length,
//     isLoading,
//     hasError: !!error
//   });

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <div className="w-full h-[20%] bg-white rounded-lg p-5 flex flex-col">
              <p className="text-sm text-gray-400">将来の夢・ビジョン</p>
              <p className="
              flex-1 text-3xl font-bold text-center flex items-center justify-center
              text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
              ">AIの民主化によって世界を、生活を、1段階進化させる</p>
          </div>
          <div className="w-full flex-1 gap-3 flex">
              <div className="w-[70%] h-full bg-white rounded-lg p-5 flex flex-col">
                  <p className="text-sm text-gray-400">今週の目標</p>
                  <div className="flex-1 flex flex-col justify-center gap-2">
                      {/* {isLoading ? (
                          <p className="text-gray-400">読み込み中...</p>
                      ) : error ? (
                          <p className="text-red-500">エラーが発生しました</p>
                      ) : goals.length === 0 ? (
                          <p className="text-gray-400">目標が設定されていません</p>
                      ) : (
                          goals.map((goal) => (
                              <p key={goal.id} className="text-gray-700 text-xl font-bold">{goal.content}</p>
                          ))
                      )} */}
                  </div>
              </div>
              <div className="w-[30%] h-full gap-2 flex flex-col">
                  {/* <div
                      onClick={() => openPopUp('goal')}
                      className="flex-1 bg-gray-200 rounded-lg w-full flex items-center gap-2 px-5 hover:bg-gray-300 transition-colors"
                  >
                      <img src="/svg/edit.svg" alt="" className="w-5 h-5"/>
                      <p className="text-gray-400 font-bold">今週の目標を設定</p>
                  </div>
                  <div 
                    onClick={() => openPopUp('feedback')}
                    className="flex-1 bg-gray-200 rounded-lg w-full flex items-center gap-2 px-5 cursor-pointer hover:bg-gray-300 transition-colors"
                  >
                      <img src="/svg/edit.svg" alt="" className="w-5 h-5"/>
                      <p className="text-gray-400 font-bold">先週の目標を振り返る</p>
                  </div>
                  <div 
                    onClick={() => openPopUp('past')}
                    className="flex-1 bg-gray-200 rounded-lg w-full flex items-center gap-2 px-5 cursor-pointer hover:bg-gray-300 transition-colors"
                  >
                      <img src="/svg/edit.svg" alt="" className="w-5 h-5"/>
                      <p className="text-gray-400 font-bold">過去の目標を振り返る</p>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-lg w-full flex items-center gap-2 px-5">
                      <img src="/svg/edit.svg" alt="" className="w-5 h-5"/>
                      <p className="text-gray-400 font-bold">メモを設定</p>
                  </div> */}
              </div>
          </div>
          <div className="w-full h-[20%] bg-white rounded-lg p-5">
              <p className="text-sm text-gray-400">メモ</p>
          </div>
      </div>

      {/* モーダル */}
        {/* {isOpen && selectedData === 'goal' && (
            <PopUp isOpen={isOpen} onClose={closePopUp}>
            <EditGoalModal onClose={closePopUp} />
            </PopUp>
        )} */}
      {/* モーダル */}
      {/* {isOpen && selectedData === 'feedback' && (
        <PopUp isOpen={isOpen} onClose={closePopUp}>
          <FeedBackGoalModal onClose={closePopUp} />
        </PopUp>
      )} */}
      {/* モーダル */}
      {/* {isOpen && selectedData === 'past' && (
        <PopUp isOpen={isOpen} onClose={closePopUp}>
          <PastGoalModal onClose={closePopUp} />
        </PopUp>
      )} */}
    </>
  );
};
