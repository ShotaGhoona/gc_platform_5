import { Card } from "@/components/ui/card";

export function RankingDemoScreen() {
  const mockRanking = [
    { rank: 1, name: "田中", score: 28 },
    { rank: 2, name: "佐藤", score: 26 },
    { rank: 3, name: "山田", score: 24 }
  ];

  return (
    <div className="p-5 h-full flex-1 bg-gray-100 overflow-hidden">
      {/* Month Selector */}
      <div className="flex justify-end mb-3">
        <div className="bg-white px-3 py-1 rounded text-sm">
          12月
        </div>
      </div>

      {/* Three Ranking Cards */}
      <div className="grid grid-cols-3 gap-3 h-full max-h-[calc(100%-3rem)]">
        {/* Monthly Ranking */}
        <Card className="p-4 overflow-hidden">
          <h3 className="font-bold mb-3 text-center text-sm">今月ランキング</h3>
          <div className="space-y-2">
            {mockRanking.map((user) => (
              <div key={user.rank} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  user.rank === 1 ? 'bg-yellow-500' :
                  user.rank === 2 ? 'bg-gray-400' :
                  'bg-orange-500'
                }`}>
                  {user.rank}
                </div>
                <div className="flex-1 text-sm font-medium">{user.name}</div>
                <div className="font-bold text-[#5F7392] text-sm">{user.score}日</div>
              </div>
            ))}
          </div>
        </Card>

        {/* All Season Ranking */}
        <Card className="p-4 overflow-hidden">
          <h3 className="font-bold mb-3 text-center text-sm">通算ランキング</h3>
          <div className="space-y-2">
            {mockRanking.map((user, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 text-sm font-medium">{user.name}</div>
                <div className="font-bold text-[#5F7392] text-sm">{user.score + 50}日</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Streak Ranking */}
        <Card className="p-4 overflow-hidden">
          <h3 className="font-bold mb-3 text-center text-sm">連続ランキング</h3>
          <div className="space-y-2">
            {mockRanking.map((user, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 text-sm font-medium">{user.name}</div>
                <div className="font-bold text-[#5F7392] text-sm">{user.score - 10}日</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}