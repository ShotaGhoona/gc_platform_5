import { useState } from "react";
import { grantTierByAction, getTierDetail, TierDetail } from "../services/tierService";

function getTierGrantKey(userId: string, action: string) {
  return `tier_granted_${userId}_${action}`;
}

export function useTierGrantAndPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<TierDetail | null>(null);

  const openPopUp = (data: TierDetail) => {
    setSelectedData(data);
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
    setSelectedData(null);
  };

  /**
   * 任意のアクションでTier付与＆ポップアップ表示
   * 例: grantAndShowTier(userId, "login"), grantAndShowTier(userId, "profile_complete")
   * === 新しいアクションを追加した場合はここで呼び出すアクション名を指定してください ===
   */
  async function grantAndShowTier(userId: string, action: string) {
    const grantKey = getTierGrantKey(userId, action);
    if (typeof window !== "undefined" && localStorage.getItem(grantKey) === "true") {
      return; // すでに付与済みなら何もしない
    }
    try {
      const res = await grantTierByAction(userId, action);
      if (res.granted && res.user_tier) {
        const tierDetail: TierDetail = await getTierDetail(res.user_tier.tier_id);
        openPopUp(tierDetail);
        if (typeof window !== "undefined") {
          localStorage.setItem(grantKey, "true");
        }
      } else if (res.message === "Already granted" && typeof window !== "undefined") {
        localStorage.setItem(grantKey, "true");
      }
    } catch (e) {
      // すでに付与済み or エラー時は何もしない
      if (typeof window !== "undefined") {
        console.error("Tier付与APIエラー:", e);
      }
    }
  }

  return { isOpen, selectedData, openPopUp, closePopUp, grantAndShowTier };
}
