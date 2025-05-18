'use client';

import { useUserMaxTier } from "@/hooks/useTier";

type Props = {
  userId: string;
};

export const TierCard = ({ userId }: Props) => {
  const { tier, loading, error } = useUserMaxTier(userId);

  console.log("TierCard: userId", userId);
  console.log("TierCard: tier", tier, "loading", loading, "error", error);

  if (!userId) {
    return <div className="w-full h-full flex items-center justify-center">userId未指定</div>;
  }
  if (loading) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }
  if (error || !tier) {
    return <div className="w-full h-full flex items-center justify-center">Tier情報が取得できません</div>;
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative rounded-lg overflow-hidden"
      style={{ backgroundColor: tier.badgeColor }}
    >
      <img
        src={`/svg/tier/${tier.cardImageUrl}.png`}
        alt={tier.titleEn}
        className="w-[80%] h-[80%] object-contain"
      />
      <div className="absolute bottom-0 p-6 text-white flex flex-col items-center justify-center mb-">
        <div className="text-2xl font-bold">{tier.titleJa}</div>
        <div className="text-4xl font-bold">{tier.titleEn}</div>
      </div>
    </div>
  );
};
