import { MessageCircle, Hash, Users, Mic, Settings, Crown } from "lucide-react";

export function DiscordMockScreen() {
  const messages = [
    { user: "田中さん", time: "6:05", message: "おはようございます！今日も英語の勉強頑張ります💪", avatar: "🌟" },
    { user: "佐藤さん", time: "6:07", message: "昨日のTOEIC模試、リスニング8割超えました！", avatar: "🚀" },
    { user: "山田さん", time: "6:12", message: "朝ランニング完了🏃‍♂️ 今日は5km走れました", avatar: "⭐" },
    { user: "鈴木さん", time: "6:15", message: "副業のプログラミング、新しいライブラリ覚えました", avatar: "🔥" },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden text-white min-h-[400px]">
      {/* Discord Header */}
      <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-gray-400" />
          <span className="font-semibold text-white">朝活-general</span>
          <div className="bg-indigo-600 px-2 py-1 rounded text-xs font-medium">
            LIVE
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">34人参加中</span>
        </div>
      </div>

      {/* Server Sidebar Mock */}
      <div className="flex">
        <div className="bg-gray-900 w-16 p-2 border-r border-gray-700">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold">
              GC
            </div>
            <div className="w-12 h-12 bg-gray-700 rounded-2xl flex items-center justify-center text-gray-400">
              +
            </div>
          </div>
        </div>

        {/* Channel Sidebar */}
        <div className="bg-gray-800 w-48 p-3 border-r border-gray-700">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">朝活チャンネル</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-gray-700 text-white">
                <Hash className="w-4 h-4" />
                <span className="text-sm">general</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                <Hash className="w-4 h-4" />
                <span className="text-sm">勉強</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                <Hash className="w-4 h-4" />
                <span className="text-sm">運動</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                <Hash className="w-4 h-4" />
                <span className="text-sm">副業</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">ボイスチャンネル</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                <Mic className="w-4 h-4" />
                <span className="text-sm">もくもく部屋</span>
                <span className="text-xs bg-green-600 px-1 rounded">8</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                <Mic className="w-4 h-4" />
                <span className="text-sm">わいわい部屋</span>
                <span className="text-xs bg-green-600 px-1 rounded">5</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                <Mic className="w-4 h-4" />
                <span className="text-sm">ねえねえ部屋</span>
                <span className="text-xs bg-green-600 px-1 rounded">3</span>
              </div>
              <div className="text-xs font-semibold text-gray-400 uppercase mt-3 mb-1">ミーティングルーム</div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                <Mic className="w-4 h-4" />
                <span className="text-sm">MTG-Room 1</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                <Mic className="w-4 h-4" />
                <span className="text-sm">MTG-Room 2</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                <Mic className="w-4 h-4" />
                <span className="text-sm">MTG-Room 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start gap-3 hover:bg-gray-700/30 p-2 rounded">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-sm">
                  {msg.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-white text-sm">{msg.user}</span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-gray-200 text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
            
            {/* Live Activity Indicator */}
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>リアルタイムで活動中...</span>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gray-700 rounded-lg px-4 py-3 flex items-center gap-3">
              <span className="text-gray-400 flex-1">メッセージを入力...</span>
              <div className="flex items-center gap-2 text-gray-400">
                <MessageCircle className="w-5 h-5" />
                <Settings className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Member List */}
        <div className="bg-gray-800 w-48 p-3 border-l border-gray-700">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">メンバー - 34</h3>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1">
              <Crown className="w-3 h-3 text-yellow-500" />
              管理者 - 1
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center text-xs">👑</div>
              <span className="text-sm text-green-400">やましたさん</span>
            </div>
            
            <div className="text-xs font-semibold text-gray-400 uppercase mb-2 mt-4">オンライン - 33</div>
            {["田中さん", "佐藤さん", "山田さん", "鈴木さん"].map((name, index) => (
              <div key={index} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-xs">
                  {["🌟", "🚀", "⭐", "🔥"][index]}
                </div>
                <span className="text-sm text-green-400">{name}</span>
              </div>
            ))}
            <div className="text-center text-gray-400 text-xs mt-2">その他29人...</div>
          </div>
        </div>
      </div>
    </div>
  );
}