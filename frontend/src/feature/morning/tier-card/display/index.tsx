'use client';

import { useUser } from "@clerk/nextjs";
import { useTierListWithFlag } from "@/feature/morning/tier-card/hooks/useTier";
import { useTierDetailWithFlag } from "@/hooks/useTier";
import { PopUp } from "@/components/display/PopUp";
import { usePopUp } from "@/hooks/usePopUp";
import TierDetailPopUpChildren from "../components/TierDetailPopUpChildren";
import { useState } from "react";

function TierCardGridItem({ tier, onClick }: { tier: any; onClick: () => void }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative rounded-lg overflow-hidden cursor-pointer"
      style={{
        backgroundColor: tier.badgeColor,
        filter: tier.flag ? "none" : "blur(10px) grayscale(50%) opacity(0.5)",
      }}
      onClick={onClick}
    >
      <img
        src={`/images/tier-back-transparent/${tier.id}.png`}
        alt={tier.id.toString()}
        className="w-[90%] h-[90%] object-contain"
        draggable={false}
      />
    </div>
  );
}

export default function IndexPage() {
  const { user } = useUser();
  const userId = user?.id;
  const { tierList, loading, error } = useTierListWithFlag(userId || "");
  const { isOpen, openPopUp, closePopUp } = usePopUp();
  const [selectedTierId, setSelectedTierId] = useState<number | null>(null);

  const { tierDetail, loading: detailLoading, error: detailError, refetch } = useTierDetailWithFlag(selectedTierId, userId || "");

  const handleCardClick = (tierId: number) => {
    setSelectedTierId(tierId);
    openPopUp();
  };

  if (!userId) {
    return <div className="w-full h-full flex items-center justify-center">userId未指定</div>;
  }
  if (loading) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="w-full h-full flex items-center justify-center">Tier一覧取得エラー</div>;
  }

  return (
    <>
      <div className="p-6 flex">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tierList.map((tier) => (
            <div key={tier.id} className="aspect-square">
              <TierCardGridItem tier={tier} onClick={() => handleCardClick(tier.id)} />
            </div>
          ))}
        </div>
      </div>
      <PopUp isOpen={isOpen} onClose={closePopUp}>
        <TierDetailPopUpChildren
          tier={tierDetail}
          loading={detailLoading}
          error={detailError}
          refetch={typeof refetch === "function" ? refetch : undefined}
        />
      </PopUp>
    </>
  );
}
