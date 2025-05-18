import RankingTitle from "../components/RankingTitle";
import { IoExtensionPuzzle } from "react-icons/io5";
export default function StreakRanking() {
  return (
    <div>
      <RankingTitle RankingTitle="連続ランキング" icon={<IoExtensionPuzzle />} EnTitle="Streak Ranking" />
    </div>
  );
}   
