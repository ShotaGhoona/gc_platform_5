import DateRangeSelect from "../components/DateRangeSelect";
import MemberRangeSelect from "../components/MemberRangeSelect";
import TopRanking from "./TopRanking";
import StreakRanking from "./StreakRanking";
import AcquisitionTierRanking from "./AcquisitionTierRanking";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="flex gap-5">
        <DateRangeSelect />
        <MemberRangeSelect />
      </div>
      <div className="flex-1 flex gap-5 w-full min-h-0">
        <div className="bg-white w-full h-full rounded-lg shadow-md p-5">
          <TopRanking />
        </div>
        <div className="bg-white w-full h-full rounded-lg shadow-md p-5">
          <StreakRanking />
        </div>
        <div className="bg-white w-full h-full rounded-lg shadow-md p-5">
          <AcquisitionTierRanking />
        </div>
      </div>
    </div>
  );
}