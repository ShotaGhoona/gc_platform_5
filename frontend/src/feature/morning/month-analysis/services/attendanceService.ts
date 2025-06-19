export async function fetchAttendanceDaysByMonth(
  userId: string,
  year: number,
  month: number
): Promise<string[]> {
  const monthStr = `${year}${month.toString().padStart(2, "0")}`;
  const params = new URLSearchParams({ user_id: userId, month: monthStr });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/attendance/me?${params.toString()}`);
  if (!res.ok) throw new Error("出席日取得に失敗しました");
  const data = await res.json();
  return data.days;
}