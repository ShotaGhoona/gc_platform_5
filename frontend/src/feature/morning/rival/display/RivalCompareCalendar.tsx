
function getMonthMatrix(year: number, month: number) {
    // month: 1-12
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const firstWeekDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
  
    // 月曜始まりに変換（日曜日は6、月曜日は0）
    const adjustedFirstWeekDay = firstWeekDay === 0 ? 6 : firstWeekDay - 1;
  
    const matrix: (number | null)[][] = [];
    let week: (number | null)[] = Array(adjustedFirstWeekDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d);
      if (week.length === 7) {
        matrix.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      matrix.push(week);
    }
    return matrix;
  }

type Props = {
  year: number;
  month: number;
};
  
import { useUser } from "@clerk/nextjs";
import { useRivalAttendanceProfiles } from "../hooks/useRival";

export default function RivalCompareCalendar({ year, month }: Props) {
  const displayMonth = month;
  const monthMatrix = getMonthMatrix(year, displayMonth);

  const { user } = useUser();
  const userId = user?.id ?? "";
  const { profiles, loading, error } = useRivalAttendanceProfiles(userId, year, displayMonth);

  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

  return (
    <div className="flex items-center w-full h-full gap-5">
      <div className="flex flex-col flex-1 w-full h-full overflow-hidden min-h-0">
        {/* 曜日行 */}
        <div className="grid grid-cols-7 w-full h-10">
          {weekDays.map((wd) => (
            <div key={wd} className="flex items-center justify-center font-semibold text-gray-600">{wd}</div>
          ))}
        </div>
        {/* 日付グリッド */}
        <div className="flex-1 grid grid-cols-7 w-full h-full">
          {monthMatrix.flat().map((d, idx) => {
            const dateKey = d
              ? `${year}-${displayMonth.toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`
              : "";
            const today = new Date();
            const isToday =
              d &&
              year === today.getFullYear() &&
              month === today.getMonth() + 1 &&
              d === today.getDate();

            // 日付ごとにprofiles[dateKey]を表示
            return (
              <div className="p-1" key={dateKey || idx}>
                <div
                  className={`w-full h-full flex flex-col items-center p-1 relative rounded-lg shadow-md ${
                    isToday ? "bg-gray-100" : "bg-white"
                  }`}
                  style={{ minHeight: 0 }}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full mb-1 ${isToday ? "bg-[#5D6B80] text-white" : "text-gray-700"}`}>
                    {d || ""}
                  </div>
                  <div className="h-full flex justify-center items-center">
                    {loading && <div className="col-span-2 text-xs text-gray-400">Loading...</div>}
                    {error && <div className="col-span-2 text-xs text-red-400">{error}</div>}
                    {!loading && !error && d && Array.isArray(profiles[dateKey]) && profiles[dateKey].map((profile) => (
                      <img
                        key={profile.user_id}
                        src={profile.avatar_image_url || "/images/profile/sampleProfileIcon.png"}
                        alt={profile.username}
                        className="w-5 h-5 rounded-full"
                        title={profile.username}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
