import { useEffect, useState } from 'react';

import {
  fetchUserGoalsByMonth,
  createMonthlyGoal,
  updateMonthlyGoal,
  deleteMonthlyGoal,
  MonthlyGoal,
  fetchUserGoalsInRange,
  fetchPublicMonthlyGoals,
} from '../service/monthlyGoalService';

export function useMonthlyGoals(userId: string | undefined, month?: string) {
  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 目標一覧取得
  const fetchGoals = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const data = await fetchUserGoalsByMonth(userId, month);
      setGoals(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, month]);

  // 目標追加
  const addGoal = async (goal_text: string, is_public: boolean, monthly_start_date: string) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const newGoal = await createMonthlyGoal(userId, goal_text, is_public, monthly_start_date);
      setGoals((prev) => [...prev, newGoal]);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 目標更新
  const editGoal = async (
    goalId: number,
    goal_text: string,
    is_public: boolean,
    monthly_start_date: string,
    fb?: string | null
  ) => {
    setIsLoading(true);
    try {
      const updatedGoal = await updateMonthlyGoal(goalId, goal_text, is_public, monthly_start_date, fb);
      setGoals((prev) =>
        prev.map((goal) => (goal.id === goalId ? updatedGoal : goal))
      );
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 目標削除
  const removeGoal = async (goalId: number) => {
    setIsLoading(true);
    try {
      await deleteMonthlyGoal(goalId);
      setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    goals,
    isLoading,
    error,
    addGoal,
    editGoal,
    removeGoal,
    refetch: fetchGoals,
  };
}
type GroupedGoals = {
  [ym: string]: MonthlyGoal[];
};

export function useMonthlyGoalsRange(userId: string | undefined, centerMonth: string) {
  const [groupedGoals, setGroupedGoals] = useState<GroupedGoals>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const data = await fetchUserGoalsInRange(userId, centerMonth);
      // 年月ごとにグループ化
      const grouped: GroupedGoals = {};
      data.forEach((g: MonthlyGoal) => {
        const ym = g.monthly_start_date.slice(0, 7);
        if (!grouped[ym]) grouped[ym] = [];
        grouped[ym].push(g);
      });
      setGroupedGoals(grouped);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, centerMonth]);

  return {
    groupedGoals,
    isLoading,
    error,
    refetch: fetchGoals,
  };
}
export function usePublicMonthlyGoals() {
  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPublicMonthlyGoals();
      setGoals(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return {
    goals,
    isLoading,
    error,
    refetch: fetchGoals,
  };
}
