const GoalCard = ({ goal }: { goal: any }) => (
  <div className="bg-gray-100 rounded-xl shadow p-5 mb-6 w-full min-h-[100px] flex flex-col justify-center">
    <div className="font-bold text-base mb-2">{goal.goal_text}</div>
    <div className="text-gray-400 text-sm whitespace-pre-line">{goal.fb || " "}</div>
  </div>
);

export const GoalColumn = ({
  ym,
  goals,
}: {
  ym: string;
  goals: any[];
}) => (
  <div className=" flex-1 flex flex-col items-center mx-2 min-h-[500px]">
    <div className="text-lg font-bold mb-6">{ym.replace("-", "/")}</div>
    {goals.length === 0 ? (
      <div className="text-gray-300 text-center">目標がありません</div>
    ) : (
      goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))
    )}
  </div>
);
