import { usePublicMonthlyGoals } from "@/hooks/useMonthlyGoals";

export const GoalList = () => {
  const { goals, isLoading, error } = usePublicMonthlyGoals();

  return (
    <div className="h-full min-h-0 flex flex-col">
      <h2 className="text-center text-lg font-bold text-gray-800 border-b border-[#5F7392] pb-2 mb-3">みんなの目標</h2>
      {isLoading && <div>読み込み中...</div>}
      {error && <div style={{ color: "red" }}>エラー: {error}</div>}
      <ul className="flex-1 overflow-y-auto rounded space-y-4 scrollbar-hide">
        {goals.length === 0 && !isLoading && !error ? (
          <li className="text-gray-500">公開目標はありません。</li>
        ) : (
          goals.map((goal) => (
            <li key={goal.id} className="mb-2">
              <div className="rounded-lg shadow-md p-4 flex flex-col gap-2 transition">
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={goal.avatar_image_url || "/images/profile/sampleProfileIcon.png"}
                    alt={goal.username || "user"}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                  <span className="text-xs font-bold text-[#5F7392]">{goal.username || "ユーザー"}</span>
                  <span className="text-xs text-gray-500 ml-auto">{goal.monthly_start_date}</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-lg font-bold text-center text-[#5F7392] break-words">{goal.goal_text}</span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
