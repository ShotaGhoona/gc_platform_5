import { useUser } from "@clerk/nextjs";
import { useMainSubTierThumbnails, useTierDetailWithFlag } from "@/hooks/useTier";
import Link from "next/link";
import { PopUp } from "@/components/display/PopUp";
import TierDetailPopUpChildren from "@/feature/morning/tier-card/components/TierDetailPopUpChildren";
import { usePopUp } from "@/hooks/usePopUp";
import { useState } from "react";

export default function MainSubTierCard() {
  const { user } = useUser();
  const userId = user?.id || "";
  const { data, loading, error } = useMainSubTierThumbnails(userId);
  const { isOpen, openPopUp, closePopUp } = usePopUp();
  const [selectedTierId, setSelectedTierId] = useState<number | null>(null);

  const { tierDetail, loading: detailLoading, error: detailError, refetch } = useTierDetailWithFlag(selectedTierId, userId);

  const handleMainClick = () => {
    if (data?.main?.id) {
      setSelectedTierId(data.main.id);
      openPopUp();
    }
  };

  const handleSubClick = (i: number) => {
    if (data?.sub?.[i]?.id) {
      setSelectedTierId(data.sub[i].id);
      openPopUp();
    }
  };

  return (
    <>
      <div className="w-full flex gap-[15px]">
        <div
          className="w-[300px] aspect-square rounded-lg shadow-md flex items-center justify-center relative cursor-pointer"
          style={{
            backgroundColor: data?.main?.badge_color || "#fff",
          }}
          onClick={handleMainClick}
        >
          {loading ? (
            <span>Loading...</span>
          ) : data?.main?.id ? (
            <img
              src={`/images/tier-back-transparent/${data.main.id}.png`}
              alt="main"
              className="w-full h-full aspect-square object-contain"
              draggable={false}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <Link href="/tier-card" className="text-[#5D6D7E] text-sm">
                メインカードを設定する
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[15px] w-[90px]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-[90px] aspect-square rounded-lg shadow-md flex items-center justify-center relative cursor-pointer"
              style={{
                backgroundColor: data?.sub?.[i]?.badge_color || "#fff",
              }}
              onClick={() => handleSubClick(i)}
            >
              {loading ? (
                <span>Loading...</span>
              ) : data?.sub?.[i]?.id ? (
                <img
                  src={`/images/tier-back-transparent/${data.sub[i].id}.png`}
                  alt={`sub${i + 1}`}
                  className="w-[80%] h-[80%] object-contain"
                  draggable={false}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Link href="/tier-card" className="text-[#5D6D7E] text-[8px]">
                    サブカードを設定する
                  </Link>
                </div>
              )}
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
