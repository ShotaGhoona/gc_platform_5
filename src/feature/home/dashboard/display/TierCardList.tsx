
import { useTierListWithFlag } from "../hooks/useTier";

type Props = {
  userId: string;
};

export const TierCardList = ({ userId }: Props) => {
  const { tierList, loading, error } = useTierListWithFlag(userId);

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
    <div className="w-full flex gap-2">
        {tierList.map((tier) => (
          <div
            key={tier.id}
            className="w-[100px] h-[100px] rounded-lg flex items-center justify-center relative"
            style={{
              filter: tier.hasTier ? "none" : "blur(4px) grayscale(80%) opacity(0.5)",
              backgroundColor: tier.badgeColor,
            }}
          >
            <img
              src={`/svg/tier/${tier.cardImageUrl}.png`}
              alt={tier.titleEn}
              className="w-[80%] h-[80%] object-contain"
              draggable={false}
            />
          </div>
        ))}
    </div>
  );
};