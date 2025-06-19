import RankingTitle from "../components/RankingTitle";
import { PiRankingFill } from "react-icons/pi";
import RankerContainer from "../components/RankerContainer";
import { useMonthlyRanking } from "../hooks/useAttendanceRanking";

type Props = {
  year: number;
  month: number;
  onProfileClick: (userId: string) => void;
  rankingType?: "All" | "Rival";
  userId?: string;
};

export default function TopRankingThisMonth({ year, month, onProfileClick, rankingType = "All", userId }: Props) {
  const { data, loading, error } = useMonthlyRanking(year, month, rankingType, userId);

  return (
    <div className="flex flex-col gap-5 h-full">
      <RankingTitle RankingTitle={`${month}月のランキング`} icon={<PiRankingFill />} EnTitle="Top Ranking" RankingType={rankingType} />
      <div className="overflow-y-auto scrollbar-hide">
        {loading && <div>読み込み中...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {data && data.length === 0 && <div>ランキングデータがありません</div>}
        {data && data.map((ranker) => (
          <RankerContainer
            key={ranker.user_id}
            name={ranker.name}
            profileIconUrl={ranker.profile_icon_url}
            bio={ranker.bio}
            score={ranker.score}
            scoreSuffix="回"
            onProfileClick={() => onProfileClick(ranker.user_id)}
          />
        ))}
      </div>
    </div>
  );
}
