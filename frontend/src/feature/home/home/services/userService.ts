/**
 * ユーザー数を取得するサービス
 */
export async function getUserCount(): Promise<number> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/count`);
  if (!res.ok) throw new Error("ユーザー数の取得に失敗しました");
  const data = await res.json();
  return data.count;
}
