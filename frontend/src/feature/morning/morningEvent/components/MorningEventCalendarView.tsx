import { MorningEventListItem } from "../services/morningEventService";

type Props = {
  events: MorningEventListItem[];
  openSidePeak: (eventId: string) => void;
  year: number;
  month: number;
};

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

export default function MorningEventCalendarView({ events, openSidePeak, year, month }: Props) {
  // month: 0-11 で受け取る → 1-12に変換
  const displayMonth = month;
  const monthMatrix = getMonthMatrix(year, displayMonth);

  // 日付ごとにイベントをまとめる
  const eventMap: { [date: string]: MorningEventListItem[] } = {};
  events.forEach((event) => {
    const d = new Date(event.start_at);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    if (!eventMap[key]) eventMap[key] = [];
    eventMap[key].push(event);
  });
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
              ? `${year}-${displayMonth}-${d}`
              : "";
            const today = new Date();
            const isToday =
              d &&
              year === today.getFullYear() &&
              month === today.getMonth() + 1 &&
              d === today.getDate();
            return (
              <div className="p-1">
                <div
                  key={idx}
                  className={`w-full h-full flex flex-col items-center p-1 relative rounded-lg shadow-md ${
                    isToday ? "bg-gray-100" : "bg-white"
                  }`}
                  style={{ minHeight: 0 }}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full mb-1 ${isToday ? "bg-[#5D6B80] text-white" : "text-gray-700"}`}>
                    {d || ""}
                  </div>
                  <div className="flex flex-col gap-1 w-full items-center">
                    {d &&
                      eventMap[dateKey]?.map((event) => (
                        <div 
                          key={event.id}
                          className={`flex items-center gap-1 w-full rounded px-2 py-0.5 shadow-md ${
                            event.is_host ? "bg-[#5D6B80] text-white" : "bg-gray-50 text-gray-700"
                          }`}
                          onClick={() => openSidePeak(event.id)}
                        >
                          <img src={event.host_avatar_image_url} alt="host" className="w-5 h-5 rounded-full" />
                          <span
                            className="text-xs truncate ext-center cursor-pointer"
                            title={event.title}
                          >
                            {event.title}
                          </span>
                        </div>
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
