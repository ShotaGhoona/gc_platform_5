'use client';

import { useUser } from "@clerk/nextjs";
import { useTierListWithFlag } from "@/feature/morning/tier-card/hooks/useTier";
import { useTierDetailWithFlag } from "@/hooks/useTier";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import TierDetailPopUpChildren from "../components/TierDetailPopUpChildren";

function TierCardGridItem({ tier }: { tier: any }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative rounded-lg overflow-hidden cursor-pointer"
      style={{
        backgroundColor: tier.badgeColor,
        filter: tier.flag ? "none" : "blur(10px) grayscale(50%) opacity(0.5)",
      }}
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

function TierDetailWithDialog({ tierId, userId }: { tierId: number; userId: string }) {
  const { tierDetail, loading: detailLoading, error: detailError, refetch } = useTierDetailWithFlag(tierId, userId);

  return (
    <TierDetailPopUpChildren
      tier={tierDetail}
      loading={detailLoading}
      error={detailError}
      refetch={typeof refetch === "function" ? refetch : undefined}
    />
  );
}

export default function IndexPage() {
  const { user } = useUser();
  const userId = user?.id;
  const { tierList, loading, error } = useTierListWithFlag(userId || "");

  // サーバーサイドとクライアントサイドでHydrationエラーを避けるため
  if (!userId || loading) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="w-full h-full flex items-center justify-center">Tier一覧取得エラー</div>;
  }

  return (
    <div className="p-6 flex">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tierList.map((tier) => (
          <Dialog key={tier.id}>
            <DialogTrigger asChild>
              <div className="aspect-square">
                <TierCardGridItem tier={tier} />
              </div>
            </DialogTrigger>
            <DialogContent className="min-w-[300px] md:min-w-[1000px]">
              <TierDetailWithDialog tierId={tier.id} userId={userId || ""} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
