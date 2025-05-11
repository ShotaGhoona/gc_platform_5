export type MonthlyGoal = {
    id: number;
    user_id: string;
    goal_text: string;
    monthly_start_date: string;
    is_public: boolean;
    fb?: string | null;
    created_at: string;
    deleted_at: string | null;
};

/**
 * 指定月の目標取得
 */
export async function fetchUserGoalsByMonth(userId: string, month?: string): Promise<MonthlyGoal[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/monthly_goals/user/${userId}/current`;
    if (month) {
        url += `?month=${month}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('指定月の目標の取得に失敗しました');
    return await res.json();
}

/**
 * 指定範囲（3ヶ月分など）の目標取得
 */
export async function fetchUserGoalsInRange(userId: string, centerMonth: string): Promise<MonthlyGoal[]> {
    // API: /api/v1/monthly_goals/user/{user_id}/range?center=YYYY-MM
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/monthly_goals/user/${userId}/range?center=${centerMonth}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('範囲指定の目標の取得に失敗しました');
    return await res.json();
}

/**
 * 今月の目標取得（旧: 直接呼び出しは非推奨）
 */
export async function fetchUserCurrentMonthGoals(userId: string): Promise<MonthlyGoal[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/monthly_goals/user/${userId}/current`);
    if (!res.ok) throw new Error('今月の目標の取得に失敗しました');
    return await res.json();
}

/**
 * 全期間の目標取得
 */
export async function fetchUserAllGoals(userId: string): Promise<MonthlyGoal[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/monthly_goals/user/${userId}`);
    if (!res.ok) throw new Error('全期間の目標の取得に失敗しました');
    return await res.json();
}

/**
 * 目標追加
 * @param userId
 * @param goal_text
 * @param is_public
 * @param monthly_start_date YYYY-MM-01形式
 */
export async function createMonthlyGoal(
    userId: string,
    goal_text: string,
    is_public: boolean,
    monthly_start_date: string
): Promise<MonthlyGoal> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/monthly_goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: userId,
            goal_text,
            monthly_start_date,
            is_public,
        }),
    });
    if (!res.ok) throw new Error('目標の追加に失敗しました');
    return await res.json();
}

/**
 * 目標更新（FBも含む）
 */
export async function updateMonthlyGoal(
    goalId: number,
    goal_text: string,
    is_public: boolean,
    monthly_start_date: string,
    fb?: string | null
): Promise<MonthlyGoal> {
    const body: any = {
        goal_text,
        is_public,
        monthly_start_date,
    };
    if (fb !== undefined) body.fb = fb;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/monthly_goals/${goalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('目標の更新に失敗しました');
    return await res.json();
}

// 目標削除
export async function deleteMonthlyGoal(goalId: number): Promise<void> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/monthly_goals/${goalId}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('目標の削除に失敗しました');
}

// 公開目標一覧取得
export async function fetchPublicMonthlyGoals(): Promise<MonthlyGoal[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/monthly_goals/public`);
    if (!res.ok) throw new Error('公開目標の取得に失敗しました');
    return await res.json();
}
