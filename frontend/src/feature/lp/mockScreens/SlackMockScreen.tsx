import { Hash, Users, Bell, Search } from "lucide-react";

export function SlackMockScreen() {
  const messages = [
    { user: "田中", time: "6:02", message: "おはようございます！今日の目標は英語学習1時間です📚", avatar: "🌟" },
    { user: "佐藤", time: "6:05", message: "昨日は副業で2万円稼げました💰 今日も頑張ります", avatar: "💼" },
    { user: "山田", time: "6:08", message: "ランニング5km完了！朝から気持ちいいです🏃‍♂️", avatar: "🏃" },
    { user: "鈴木", time: "6:12", message: "読書30分終了📖 今月10冊目標まであと3冊", avatar: "📚" },
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 min-h-[400px]">
      {/* Slack Header */}
      <div className="bg-purple-700 px-4 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white rounded text-purple-700 font-bold text-sm flex items-center justify-center">
            G
          </div>
          <span className="font-bold">Ghoona Camp</span>
        </div>
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4" />
          <Bell className="w-4 h-4" />
          <div className="w-6 h-6 bg-white rounded text-purple-700 text-xs font-bold flex items-center justify-center">
            山
          </div>
        </div>
      </div>

      <div className="flex h-[360px]">
        {/* Sidebar */}
        <div className="bg-purple-800 w-56 p-3 text-white">
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 text-purple-200">チャンネル</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-purple-600 text-white">
                <Hash className="w-4 h-4" />
                <span className="text-sm">朝活-general</span>
                <span className="bg-red-500 text-xs px-1 rounded-full ml-auto">3</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-purple-200 hover:bg-purple-700 cursor-pointer">
                <Hash className="w-4 h-4" />
                <span className="text-sm">目標-共有</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-purple-200 hover:bg-purple-700 cursor-pointer">
                <Hash className="w-4 h-4" />
                <span className="text-sm">成果報告</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-purple-200 hover:bg-purple-700 cursor-pointer">
                <Hash className="w-4 h-4" />
                <span className="text-sm">質問・相談</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2 text-purple-200">ダイレクトメッセージ</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1 rounded text-purple-200 hover:bg-purple-700 cursor-pointer">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">田中さん</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-purple-200 hover:bg-purple-700 cursor-pointer">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">佐藤さん</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-200 px-4 py-3 bg-white">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">朝活-general</span>
              <div className="flex items-center gap-1 text-gray-500 text-sm ml-auto">
                <Users className="w-4 h-4" />
                <span>28人</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-white">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded">
                <div className="w-9 h-9 rounded bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                  {msg.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-gray-900 text-sm">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}
            
            {/* Activity indicator */}
            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>28人がアクティブです</span>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="border border-gray-300 rounded-lg px-4 py-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
              <span className="text-gray-500">メッセージを #朝活-general に送信</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}