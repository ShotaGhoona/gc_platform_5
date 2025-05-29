import { useMonthlyGoals } from "@/hooks/useMonthlyGoals";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import CommonButton from "@/components/common/commonButton";
export default function MonthlyGoal() {
  const { user } = useUser();
  const { goals, isLoading, error } = useMonthlyGoals(user?.id ?? "");
  const month = new Date().getMonth() + 1;
  console.log(goals);

  return (
    <div className="w-full h-full min-h-0 flex flex-col items-center justify-between">
      <p className="text-lg font-bold text-center">{month}月の目標</p>
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-5">
        {goals.map((goal) => (
          <div key={goal.id} className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-center
              text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]">
                {goal.goal_text}
            </p>
          </div>
        ))}
      </div>
      <Link href="/monthly-goal">
        <CommonButton
          label="Visit Monthly Goal"
          className="bg-gray-200 text-gray-500"
          icon={<FaArrowRight />}
          onClick={() => {}}
        />
      </Link>

    </div>
  );
}
