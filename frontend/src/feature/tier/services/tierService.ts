export type TierDetail = {
  id: number;
  title_en: string;
  title_ja: string;
  badge_color: string;
  card_image_url?: string;
  short_description?: string;
  long_description?: string;
};

/**
 * 任意のアクションでTier付与APIを呼び出す
 * 例: grantTierByAction(userId, "login"), grantTierByAction(userId, "profile_complete")
 * === 新しいアクションを追加した場合はここで呼び出すアクション名を指定してください ===
 */
export async function grantTierByAction(userId: string, action: string) {
  // === バックエンドのエンドポイント名を変更した場合はここも修正 ===
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/grant-tier/grant?user_id=${encodeURIComponent(userId)}&action=${encodeURIComponent(action)}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Tier付与APIエラー");
  return await res.json();
}

// ログイン時にTier1を付与
export async function grantLoginTier(userId: string) {
  return grantTierByAction(userId, "login");
}




// 詳細モーダル用
export async function getTierDetail(tierId: number): Promise<TierDetail> {
  // === バックエンドのエンドポイント名を変更した場合はここも修正 ===
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/grant-tier/${tierId}`);
  if (!res.ok) throw new Error("Tier詳細取得APIエラー");
  return await res.json();
}
