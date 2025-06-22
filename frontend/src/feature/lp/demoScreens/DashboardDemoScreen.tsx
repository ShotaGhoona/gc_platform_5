import { TrendingUp, TrendingDown, Target, Users, Calendar, Award, Crown } from "lucide-react";

export function DashboardDemoScreen() {
  const metrics = [
    { label: "今月出席", value: "18", unit: "日", change: "+3", trend: "up", color: "text-green-600" },
    { label: "総出席数", value: "142", unit: "日", change: "+5", trend: "up", color: "text-blue-600" },
    { label: "連続記録", value: "12", unit: "日", change: "0", trend: "neutral", color: "text-purple-600" },
    { label: "参加イベント", value: "4", unit: "回", change: "+2", trend: "up", color: "text-orange-600" },
    { label: "主催イベント", value: "1", unit: "回", change: "+1", trend: "up", color: "text-pink-600" }
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6 min-h-[400px]">
      {/* Vision Section */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">あなたのビジョン</h3>
        </div>
        <div className="bg-white/70 rounded-lg p-4">
          <p className="text-gray-800 italic">
            "毎朝6時に起きて英語学習と運動を習慣化し、1年後にはTOEIC800点を達成して健康的な生活を送る"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metrics Cards */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">活動状況</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                  {metric.value}<span className="text-sm font-normal">{metric.unit}</span>
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" && <TrendingUp className="w-3 h-3 text-green-500" />}
                  {metric.trend === "down" && <TrendingDown className="w-3 h-3 text-red-500" />}
                  <span className={`text-xs ${
                    metric.trend === "up" ? "text-green-600" : 
                    metric.trend === "down" ? "text-red-600" : "text-gray-600"
                  }`}>
                    {metric.change === "0" ? "変化なし" : `前月比${metric.change}`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Analysis Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">週間分析</h4>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                <option>今週</option>
                <option>先週</option>
                <option>今月</option>
              </select>
            </div>
            
            {/* Weekly Chart Mockup */}
            <div className="space-y-2">
              {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => {
                const attendance = [true, true, false, true, true, true, true][index];
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-6 text-sm text-gray-600">{day}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${attendance ? 'bg-green-500' : 'bg-gray-300'}`}
                        style={{ width: attendance ? '100%' : '0%' }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {attendance ? '参加' : '未参加'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Tier Cards */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-yellow-600" />
              <h4 className="font-semibold text-gray-900">ティアカード</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3">
                <img src="/images/tier-back-transparent/3.png" alt="Gold Tier" className="w-full h-full" />
              </div>
              <div className="text-lg font-bold text-yellow-600 mb-1">ゴールドティア</div>
              <div className="text-sm text-gray-600 mb-3">30日達成済み</div>
              
              {/* Sub Tiers */}
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-8 h-8">
                  <img src="/images/tier-back-transparent/1.png" alt="Sub Tier" className="w-full h-full opacity-50" />
                </div>
                <div className="w-8 h-8">
                  <img src="/images/tier-back-transparent/2.png" alt="Sub Tier" className="w-full h-full opacity-75" />
                </div>
                <div className="w-8 h-8">
                  <img src="/images/tier-back-transparent/3.png" alt="Sub Tier" className="w-full h-full" />
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="text-xs text-yellow-800">
                  次のプラチナまで: あと30日
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-1.5 mt-2">
                  <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '50%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Ranking */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-orange-600" />
              <h4 className="font-semibold text-gray-900">今月のランキング</h4>
            </div>
            <div className="space-y-3">
              {[
                { rank: 1, name: "@morning_hero", score: 28, tier: "プラチナ" },
                { rank: 2, name: "@early_bird", score: 26, tier: "ゴールド" },
                { rank: 3, name: "あなた", score: 18, tier: "ゴールド", isYou: true }
              ].map((user) => (
                <div key={user.rank} className={`flex items-center gap-3 p-2 rounded-lg ${
                  user.isYou ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.rank === 1 ? 'bg-yellow-500 text-white' :
                    user.rank === 2 ? 'bg-gray-400 text-white' :
                    user.rank === 3 ? 'bg-orange-500 text-white' : 'bg-gray-300'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${user.isYou ? 'text-blue-900' : 'text-gray-900'}`}>
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-600">{user.tier}</div>
                  </div>
                  <div className="text-sm font-bold text-gray-700">{user.score}日</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 mb-2">📊 詳細な分析で成長を可視化</h4>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <span>• 進捗データで継続をサポート</span>
            <span>• ランキングで競争心を刺激</span>
            <span>• ティア制で達成感を実感</span>
          </div>
        </div>
      </div>
    </div>
  );
}