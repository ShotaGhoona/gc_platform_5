'use client';

import { useUser } from "@clerk/nextjs";
import { useTierListWithFlag } from "@/hooks/useTier";

function TierCardGridItem({ tier }: { tier: any }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative rounded-lg overflow-hidden"
      style={{
        backgroundColor: tier.badgeColor,
        filter: tier.hasTier ? "none" : "blur(10px) grayscale(50%) opacity(0.5)",
      }}
    >
      <img
        src={`/svg/tier/${tier.cardImageUrl}.png`}
        alt={tier.titleEn}
        className="w-[80%] h-[80%] object-contain"
        draggable={false}
      />
      <div className="absolute bottom-0 p-4 text-white flex flex-col items-center justify-center mb-2 w-full">
        <div className="text-lg font-bold">{tier.titleJa}</div>
        <div className="text-2xl font-bold">{tier.titleEn}</div>
      </div>
    </div>
  );
}

export default function IndexPage() {
  const { user } = useUser();
  const userId = user?.id;
  const { tierList, loading, error } = useTierListWithFlag(userId || "");

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
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tierList.map((tier) => (
          <div key={tier.id} className="aspect-square">
            <TierCardGridItem tier={tier} />
          </div>
        ))}
      </div>
    </div>
  );
}
