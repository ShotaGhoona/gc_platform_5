import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { grantLoginTier, getTierDetail, TierDetail } from "../services/tierService";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TierPopUpContent from "./TierPopUpContent";

export default function TierLoginTest() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<TierDetail | null>(null);

  async function handleGrantTier() {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await grantLoginTier(user.id);
      if (res.granted && res.user_tier) {
        // tier_id=1の詳細を取得
        const tierDetail: TierDetail = await getTierDetail(5);
        setSelectedData(tierDetail);
        setIsOpen(true);
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          {selectedData && (
            <TierPopUpContent
              card_image_url={selectedData.card_image_url}
              title_en={selectedData.title_en}
              title_ja={selectedData.title_ja}
              short_description={selectedData.short_description}
              long_description={selectedData.long_description}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
