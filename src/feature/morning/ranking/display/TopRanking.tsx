import RankingTitle from "../components/RankingTitle";
import { PiRankingFill } from "react-icons/pi";
import RankerContainer from "../components/RankerContainer";
export default function TopRanking() {
  return (
    <div className="flex flex-col gap-5 h-full">
      <RankingTitle RankingTitle="トップランキング" icon={<PiRankingFill />} EnTitle="Top Ranking" />
      <div className="flex-1 flex flex-col gap-2 justify-between overflow-y-auto scrollbar-hide">
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
        <RankerContainer />
      </div>
    </div>
  );
}
