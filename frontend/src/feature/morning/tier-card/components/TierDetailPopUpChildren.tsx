import { TbCardsFilled } from "react-icons/tb";
import CommonButton from "@/components/common/commonButton";
import { useUpdateUserTierRole } from "@/hooks/useTier";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

type Props = {
  tier: any;
  loading?: boolean;
  error?: string | null;
  refetch?: () => void;
};

export default function TierDetailPopUpChildren({ tier, loading, error, refetch }: Props) {
  const { user } = useUser();
  const userId = user?.id;
  const { updateRole, loading: updateLoading, error: updateError } = useUpdateUserTierRole();
  const [localError, setLocalError] = useState<string | null>(null);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-500">エラー: {error}</div>;
  }
  if (!tier) {
    return <div className="p-8">データがありません</div>;
  }

  const isOwned = tier.hasTier;

  const handleUpdate = async (role: "main" | "sub" | null) => {
    setLocalError(null);
    if (!userId) {
      setLocalError("ユーザーIDが取得できません");
      return;
    }
    const res = await updateRole(tier.id, userId, role);
    if (!res.success) {
      setLocalError(res.error || "エラーが発生しました");
    }
    if (refetch) {
      refetch();
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8 w-full">
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div
          className="flex items-center justify-center bg-gray-100 rounded-lg shadow-lg p-5 w-[320px] h-[320px] aspect-square"
          style={{
            backgroundColor: tier.badgeColor,
          }}
        >
          <img
            src={`/images/tier-back-transparent/${tier.id}.png`}
            alt={tier.titleEn}
            className="w-full h-full object-contain"
            style={
              isOwned
                ? {}
                : {
                    filter: "blur(10px) grayscale(50%) opacity(0.5)",
                    pointerEvents: "none",
                  }
            }
            draggable={false}
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-4 w-full gap-5">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 rounded bg-gray-200 text-xs font-semibold text-gray-600">
              {tier.shortDescription}
            </span>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <div className="text-2xl md:text-4xl text-[#5F7392] font-bold">
              {isOwned ? tier.titleJa : ""}
            </div>
            {isOwned ? (
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]">
                {tier.titleEn}
              </div>
            ) : (
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]">
                oh...<br />You have not yet unlocked<br />this tier card.
              </div>
            )}
          </div>
          {tier.longDescription && (
            <>
              {isOwned && (
                <div className="text-sm text-gray-500 whitespace-pre-line">
                  {tier.longDescription}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {tier.story && (
        <div className="w-full">
          <div className="font-bold mb-2 text-lg text-[#5F7392]">Story</div>
          {isOwned ? (
            <div className="text-gray-500 whitespace-pre-line flex items-center justify-center">
              {tier.story}
            </div>
          ) : (
            <div className="h-[100px] border border-gray-200 rounded-lg flex items-center justify-center">
              ???
            </div>
          )}
        </div>
      )}
      {localError && (
        <div className="w-full text-center text-red-500 font-bold">{localError}</div>
      )}
      <div className="w-full flex justify-center gap-5">
        {tier.hasTier ? (
          tier.role === "main" ? (
            <CommonButton
              onClick={() => handleUpdate(null)}
              label={updateLoading ? "変更中" : "メインカードから解除"}
              className="w-full bg-gray-400 text-white"
              icon={<TbCardsFilled className="text-white" />}
              disabled={updateLoading}
            />
          ) : tier.role === "sub" ? (
            <CommonButton
              onClick={() => handleUpdate(null)}
              label={updateLoading ? "変更中" : "サブカードから解除"}
              className="w-full bg-gray-400 text-white"
              icon={<TbCardsFilled className="text-white" />}
              disabled={updateLoading}
            />
          ) : (
            <>
              <CommonButton
                onClick={() => handleUpdate("sub")}
                label={updateLoading ? "変更中" : "サブカードに設定"}
                className="w-full bg-[#5F7392] text-white"
                icon={<TbCardsFilled className="text-white" />}
                disabled={updateLoading}
              />
              <CommonButton
                onClick={() => handleUpdate("main")}
                label={updateLoading ? "変更中" : "メインカードに設定"}
                className="w-full bg-[#D68897] text-white"
                icon={<TbCardsFilled className="text-white" />}
                disabled={updateLoading}
              />
            </>
          )
        ) : null}
      </div>
    </div>
  );
}
