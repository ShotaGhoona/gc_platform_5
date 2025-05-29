import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { grantLoginTier, getTierDetail, TierDetail } from "../services/tierService";
import { usePopUp } from "@/hooks/usePopUp";
import { PopUp } from "@/components/display/PopUp";
import TierPopUpContent from "./TierPopUpContent";

export default function TierLoginTest() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { isOpen, selectedData, openPopUp, closePopUp } = usePopUp();

  async function handleGrantTier() {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await grantLoginTier(user.id);
      if (res.granted && res.user_tier) {
        // tier_id=1の詳細を取得
        const tierDetail: TierDetail = await getTierDetail(5);
        openPopUp(tierDetail);
      } else {
        alert("すでに付与済み or 付与できません");
      }
    } catch (e) {
      alert("エラー: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        className="px-6 py-2 bg-pink-400 text-white rounded-lg font-bold shadow hover:bg-pink-500 transition"
        onClick={handleGrantTier}
        disabled={loading}
      >
        {loading ? "付与中..." : "ログインTier付与テスト"}
      </button>
      <PopUp isOpen={isOpen} onClose={closePopUp}>
        {selectedData && (
          <TierPopUpContent
            card_image_url={selectedData.card_image_url}
            title_en={selectedData.title_en}
            title_ja={selectedData.title_ja}
            short_description={selectedData.short_description}
            long_description={selectedData.long_description}
          />
        )}
      </PopUp>
    </div>
  );
}
