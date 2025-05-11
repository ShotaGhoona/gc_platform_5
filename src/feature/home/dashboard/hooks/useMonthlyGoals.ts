// import { useEffect, useState } from 'react';
// import {
//   fetchUserCurrentMonthGoals,
//   createMonthlyGoal,
//   updateMonthlyGoal,
//   deleteMonthlyGoal,
//   MonthlyGoal
// } from '../services/monthlyGoalService';

// export function useMonthlyGoals(userId: string | undefined) {
//   const [goals, setGoals] = useState<MonthlyGoal[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // 目標一覧取得
//   const fetchGoals = async () => {
//     if (!userId) return;
//     setIsLoading(true);
//     try {
//       const data = await fetchUserCurrentMonthGoals(userId);
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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   // 目標追加
//   const addGoal = async (goal_text: string, is_public: boolean, monthly_start_date: string) => {
//     if (!userId) return;
//     setIsLoading(true);
//     try {
//       const newGoal = await createMonthlyGoal(userId, goal_text, is_public, monthly_start_date);
//       setGoals((prev) => [...prev, newGoal]);
//       setError(null);
//     } catch (e: any) {
//       setError(e.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 目標更新
//   const editGoal = async (goalId: number, goal_text: string, is_public: boolean, monthly_start_date: string) => {
//     setIsLoading(true);
//     try {
//       const updatedGoal = await updateMonthlyGoal(goalId, goal_text, is_public, monthly_start_date);
//       setGoals((prev) =>
//         prev.map((goal) => (goal.id === goalId ? updatedGoal : goal))
//       );
//       setError(null);
//     } catch (e: any) {
//       setError(e.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 目標削除
//   const removeGoal = async (goalId: number) => {
//     setIsLoading(true);
//     try {
//       await deleteMonthlyGoal(goalId);
//       setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
//       setError(null);
//     } catch (e: any) {
//       setError(e.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     goals,
//     isLoading,
//     error,
//     addGoal,
//     editGoal,
//     removeGoal,
//     refetch: fetchGoals,
//   };
// }
