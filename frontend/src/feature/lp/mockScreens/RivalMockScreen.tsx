import { Users, Calendar, TrendingUp } from "lucide-react";

export function RivalMockScreen() {
  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];
  
  // カレンダーの出席データ（プロフィール画像で表示）
  const attendanceData = {
    "2025-01-01": ["/images/profile.png"],
    "2025-01-02": ["/images/profile.png", "/images/profile.png"],
    "2025-01-03": [],
    "2025-01-04": ["/images/profile.png"],
    "2025-01-05": ["/images/profile.png", "/images/profile.png"],
    "2025-01-06": ["/images/profile.png"],
    "2025-01-07": ["/images/profile.png", "/images/profile.png"],
    "2025-01-08": ["/images/profile.png"],
    "2025-01-09": [],
    "2025-01-10": ["/images/profile.png", "/images/profile.png"]
  };

  const rankings = [
    { rank: 1, name: "@morning_hero", count: 28, type: "今月", isUser: false },
    { rank: 2, name: "@early_bird", count: 26, type: "今月", isUser: false },
    { rank: 3, name: "あなた", count: 23, type: "今月", isUser: true },
    { rank: 4, name: "@sunrise_warrior", count: 22, type: "今月", isUser: false }
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 min-h-[400px] p-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Comparison */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">出席カレンダー比較</h3>
          
          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const dateKey = `2025-01-${day.toString().padStart(2, '0')}`;
              const attendees = attendanceData[dateKey as keyof typeof attendanceData] || [];
              const isToday = day === 15; // 例として15日を今日とする
              
              return (
                <div
                  key={day}
                  className={`aspect-square border border-gray-200 rounded-lg p-1 flex flex-col items-center justify-center relative ${
                    isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'
                  }`}
                >
                  <div className={`text-xs font-medium mb-1 ${isToday ? 'text-blue-700' : 'text-gray-700'}`}>
                    {day}
                  </div>
                  <div className="flex gap-0.5 flex-wrap">
                    {attendees.slice(0, 2).map((avatar: string, index: number) => (
                      <div key={index} className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
                    ))}
                    {attendees.length > 2 && (
                      <div className="w-3 h-3 rounded-full bg-gray-400 text-white text-[8px] flex items-center justify-center border border-white">
                        +
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ranking and Analysis */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ライバルランキング</h3>
          
          <div className="space-y-3 mb-6">
            {rankings.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  user.isUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  user.rank === 1 ? 'bg-yellow-500 text-white' :
                  user.rank === 2 ? 'bg-gray-400 text-white' :
                  user.rank === 3 ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}>
                  {user.rank}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${user.isUser ? 'text-blue-900' : 'text-gray-900'}`}>
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-600">{user.type}出席</div>
                </div>
                <div className="text-lg font-bold text-gray-700">{user.count}日</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-6 bg-purple-50 rounded-xl p-4 border border-purple-200">
        <div className="text-center">
          <h4 className="font-semibold text-purple-900 mb-2">🔥 出席ベースのライバル機能</h4>
          <div className="flex justify-center gap-6 text-sm text-purple-700">
            <span>• カレンダー形式での出席比較</span>
            <span>• 月間・全期間・連続記録ランキング</span>
            <span>• シンプルな分析とフィードバック</span>
          </div>
        </div>
      </div>
    </div>
  );
}