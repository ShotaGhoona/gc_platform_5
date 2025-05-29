import RankingTitle from "../components/RankingTitle";
import { IoExtensionPuzzle } from "react-icons/io5";
import { useStreakingRanking } from "../hooks/useAttendanceRanking";
import RankerContainer from "../components/RankerContainer";

type Props = {
  onProfileClick: (userId: string) => void;
  rankingType?: "All" | "Rival";
  userId?: string;
};

export default function StreakRanking({ onProfileClick, rankingType = "All", userId }: Props) {
  const { data, loading, error } = useStreakingRanking(rankingType, userId);

  return (
    <div className="flex flex-col gap-5 h-full">
      <RankingTitle RankingTitle="連続ランキング" icon={<IoExtensionPuzzle />} EnTitle="Streak Ranking" RankingType={rankingType} />
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
            scoreSuffix="日"
            onProfileClick={() => onProfileClick(ranker.user_id)}
          />
        ))}
      </div>
    </div>
  );
}
