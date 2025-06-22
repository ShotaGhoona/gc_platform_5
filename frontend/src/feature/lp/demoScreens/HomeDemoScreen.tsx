import { Users, Calendar, Crown } from "lucide-react";

export function HomeDemoScreen() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 min-h-[400px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ghoona Camp</h1>
            <p className="text-lg opacity-90">朝から今日から人生を豊かに</p>
            <div className="mt-4">
              <div className="text-4xl font-bold">
                {new Date().toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' })}
              </div>
              <div className="text-sm opacity-75">今日の日付</div>
            </div>
          </div>
          
          {/* Tier Achievement */}
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <img src="/images/tier-back-transparent/3.png" alt="Tier" className="w-16 h-16" />
              <img src="/images/tier-back-transparent/2.png" alt="Tier" className="w-12 h-12 opacity-60" />
            </div>
            <div className="text-sm font-medium">ゴールドティア</div>
            <button className="mt-2 bg-white/20 px-4 py-2 rounded-full text-xs hover:bg-white/30 transition-colors">
              ダッシュボードへ →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Community Size */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">コミュニティ</h3>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-sm text-gray-600 mb-4">アクティブメンバー</div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-sm text-blue-800">
                🇯🇵 全国の仲間と一緒に朝活
              </div>
            </div>
            <button className="mt-3 text-blue-600 text-sm hover:underline">
              友達を招待 →
            </button>
          </div>
        </div>

        {/* Notice Panel */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">お知らせ</h3>
          </div>
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-3 py-2">
              <div className="text-sm font-medium text-gray-900">新機能リリース</div>
              <div className="text-xs text-gray-600">ライバル機能が追加されました！</div>
            </div>
            <div className="border-l-4 border-blue-500 pl-3 py-2">
              <div className="text-sm font-medium text-gray-900">今月のイベント</div>
              <div className="text-xs text-gray-600">朝活チャレンジ開催中</div>
            </div>
            <div className="border-l-4 border-purple-500 pl-3 py-2">
              <div className="text-sm font-medium text-gray-900">コミュニティ</div>
              <div className="text-xs text-gray-600">新メンバー歓迎週間</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mt-6 bg-white/50 rounded-xl p-4 border border-white">
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 mb-2">🌅 毎日の朝活をサポート</h4>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <span>• ティア制でモチベーション維持</span>
            <span>• 仲間と一緒だから続く</span>
            <span>• 日々の成長を実感</span>
          </div>
        </div>
      </div>
    </div>
  );
}