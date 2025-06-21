import { useUser } from "@clerk/nextjs";
import { useMainSubTierThumbnails, useTierDetailWithFlag } from "@/hooks/useTier";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import TierDetailPopUpChildren from "@/feature/morning/tier-card/components/TierDetailPopUpChildren";

function TierDetailDialog({ tierId, userId }: { tierId: number; userId: string }) {
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

export default function MainSubTierCard() {
  const { user } = useUser();
  const userId = user?.id || "";
  const { data, loading, error } = useMainSubTierThumbnails(userId);

  return (
    <div className="w-full flex gap-[15px]">
      {data?.main?.id ? (
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="w-[300px] aspect-square rounded-lg shadow-md flex items-center justify-center relative cursor-pointer"
              style={{
                backgroundColor: data?.main?.badge_color || "#fff",
              }}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <img
                  src={`/images/tier-back-transparent/${data.main.id}.png`}
                  alt="main"
                  className="w-full h-full aspect-square object-contain"
                  draggable={false}
                />
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="min-w-[300px] md:min-w-[1000px]">
            <TierDetailDialog tierId={data.main.id} userId={userId} />
          </DialogContent>
        </Dialog>
      ) : (
        <div
          className="w-[300px] aspect-square rounded-lg shadow-md flex items-center justify-center relative"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Link href="/tier-card" className="text-[#5D6D7E] text-sm">
              メインカードを設定する
            </Link>
          </div>
        </div>
      )}
      
      <div className="flex flex-col gap-[15px] w-[90px]">
        {[0, 1, 2].map((i) => (
          data?.sub?.[i]?.id ? (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <div
                  className="w-[90px] aspect-square rounded-lg shadow-md flex items-center justify-center relative cursor-pointer"
                  style={{
                    backgroundColor: data?.sub?.[i]?.badge_color || "#fff",
                  }}
                >
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <img
                      src={`/images/tier-back-transparent/${data.sub[i].id}.png`}
                      alt={`sub${i + 1}`}
                      className="w-[80%] h-[80%] object-contain"
                      draggable={false}
                    />
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className="min-w-[300px] md:min-w-[1000px]">
                <TierDetailDialog tierId={data.sub[i].id} userId={userId} />
              </DialogContent>
            </Dialog>
          ) : (
            <div
              key={i}
              className="w-[90px] aspect-square rounded-lg shadow-md flex items-center justify-center relative"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Link href="/tier-card" className="text-[#5D6D7E] text-[8px]">
                  サブカードを設定する
                </Link>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
