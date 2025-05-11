// import { useEffect, useState } from "react";
// import { fetchPublicMonthlyGoals, MonthlyGoal } from "../services/monthlyGoalService";

// export function usePublicMonthlyGoals() {
//   const [goals, setGoals] = useState<MonthlyGoal[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchGoals = async () => {
//     setIsLoading(true);
//     try {
//       const data = await fetchPublicMonthlyGoals();
//       setGoals(data);
//       setError(null);
//     } catch (e: any) {
//       setError(e.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGoals();
//   }, []);

//   return {
//     goals,
//     isLoading,
//     error,
//     refetch: fetchGoals,
//   };
// }
