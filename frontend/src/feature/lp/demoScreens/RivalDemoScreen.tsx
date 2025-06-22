import { Card } from "@/components/ui/card";

export function RivalDemoScreen() {
  const weekDays = ["月", "火", "水", "木", "金", "土", "日"];
  const myAttendance = [true, true, false, true, true, true, false];
  const rivalAttendance = [true, false, true, true, true, false, true];

  const ranking = [
    { rank: 1, name: "田中", score: 28 },
    { rank: 2, name: "あなた", score: 25, isYou: true },
    { rank: 3, name: "ライバル", score: 24, isRival: true }
  ];

  return (
    <div className="p-5 h-full flex-1">
      <div className="grid grid-cols-2 gap-5 h-full">
        {/* Left: Calendar Comparison */}
        <div className="flex flex-col gap-5">
          <Card className="flex-1 p-6">
            <h3 className="font-bold mb-4 text-center">出席比較</h3>
            
            {/* You */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">あなた</p>
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{day}</div>
                    <div className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
                      myAttendance[index] ? 'bg-[#EAC2CA] text-gray-800' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rival */}
            <div>
              <p className="text-sm font-medium mb-2">ライバル（佐藤）</p>
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{day}</div>
                    <div className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
                      rivalAttendance[index] ? 'bg-[#EAC2CA] text-gray-800' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Analysis & Ranking */}
        <div className="flex flex-col gap-5">
          {/* Analysis */}
          <Card className="flex-1 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">週間分析</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-[#5F7392] text-white rounded text-sm">
                  分析
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-sm">
                  フロー
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">あなたの出席率</span>
                <span className="font-bold text-[#5F7392]">71%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">ライバル出席率</span>
                <span className="font-bold text-[#D68897]">71%</span>
              </div>
              <div className="pt-2 border-t">
                <div className="text-center text-sm text-gray-600">
                  現在同率！頑張って差をつけよう
                </div>
              </div>
            </div>
          </Card>

          {/* Ranking */}
          <Card className="flex-1 p-6">
            <h3 className="font-bold mb-4">今月ランキング</h3>
            <div className="space-y-3">
              {ranking.map((user) => (
                <div key={user.rank} className={`flex items-center gap-3 p-2 rounded ${
                  user.isYou ? 'bg-blue-50' : 
                  user.isRival ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    user.rank === 1 ? 'bg-yellow-500' :
                    user.rank === 2 ? 'bg-gray-400' :
                    'bg-orange-500'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{user.name}</span>
                    {user.isRival && <span className="text-xs text-red-600 ml-2">ライバル</span>}
                  </div>
                  <div className="font-bold text-[#5F7392]">{user.score}日</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}