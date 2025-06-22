import { Card } from "@/components/ui/card";

export function MonthAnalysisDemoScreen() {
  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];
  
  // Simplified calendar data (4 weeks)
  const calendarWeeks = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25]
  ];
  
  // Attended days (mock data)
  const attendedDays = [2, 3, 6, 8, 13, 15, 20, 22];

  return (
    <div className="p-5 h-full flex-1 overflow-hidden">
      {/* Month Selector */}
      <div className="flex justify-end mb-3">
        <div className="bg-white px-3 py-1 rounded text-sm">
          12月
        </div>
      </div>

      {/* Calendar */}
      <Card className="p-4 h-full max-h-[calc(100%-3rem)] overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Week Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center font-bold text-gray-600 text-xs p-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 space-y-1 min-h-0">
            {calendarWeeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1 h-1/4">
                {week.map((day, dayIndex) => {
                  const isAttended = day && attendedDays.includes(day);
                  const isWeekend = dayIndex === 5 || dayIndex === 6;
                  const isToday = day === 22; // Mock today
                  
                  return (
                    <div
                      key={dayIndex}
                      className={`flex items-center justify-center rounded border h-full ${
                        isAttended ? 'bg-[#EAC2CA]' :
                        isWeekend ? 'bg-gray-100' : 'bg-gray-50'
                      }`}
                    >
                      {day && (
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                          isToday ? 'bg-[#5D6B80] text-white font-bold' : 'text-gray-700'
                        }`}>
                          {day}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-3 pt-2 border-t">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#EAC2CA] rounded"></div>
              <span className="text-xs text-gray-600">出席</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#D68897] rounded"></div>
              <span className="text-xs text-gray-600">開催</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#5D6B80] rounded"></div>
              <span className="text-xs text-gray-600">参加</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}