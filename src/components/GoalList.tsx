import { usePublicMonthlyGoals } from "@/hooks/useMonthlyGoals";

export const GoalList = () => {
  const { goals, isLoading, error } = usePublicMonthlyGoals();

  return (
    <div className="h-full min-h-0 flex flex-col">
      <h2 className="text-center text-lg font-bold text-gray-800 border-b border-[#5F7392] pb-2 mb-3">みんなの目標</h2>
      {isLoading && <div>読み込み中...</div>}
      {error && <div style={{ color: "red" }}>エラー: {error}</div>}
      {/* flex-1で残りの高さを全て使い、overflow-y-autoでスクロール */}
      <ul className="flex-1 overflow-y-auto rounded p-2">
        {goals.length === 0 && !isLoading && !error ? (
          <li className="text-gray-500">公開目標はありません。</li>
        ) : (
          goals.map((goal) => (
            <li key={goal.id} className="mb-2">
              <div>
                <strong>{goal.goal_text}</strong>
                <div style={{ fontSize: "0.9em", color: "#666" }}>
                  ユーザーID: {goal.user_id} / 開始日: {goal.monthly_start_date}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
