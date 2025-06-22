import { Crown, Star, Lock } from "lucide-react";

export function TierMockScreen() {
  const tiers = [
    { 
      id: 1, 
      titleEn: "Sleeper", 
      titleJa: "まどろみ見習い", 
      image: "/images/tier-back-transparent/1.png",
      earned: true,
      current: false,
      color: "#C4B5FD",
      role: null
    },
    { 
      id: 2, 
      titleEn: "Dawn Wanderer", 
      titleJa: "夜明けの旅人", 
      image: "/images/tier-back-transparent/2.png",
      earned: true,
      current: false,
      color: "#A5F3FC",
      role: "sub"
    },
    { 
      id: 3, 
      titleEn: "Aurora Scout", 
      titleJa: "朝焼け探検家", 
      image: "/images/tier-back-transparent/3.png",
      earned: true,
      current: true,
      color: "#FDE68A",
      role: "main"
    },
    { 
      id: 4, 
      titleEn: "Sunrise Crafter", 
      titleJa: "サンライズ職人", 
      image: "/images/tier-back-transparent/4.png",
      earned: false,
      current: false,
      color: "#5EEAD4",
      role: null
    },
    { 
      id: 5, 
      titleEn: "Sun Chaser", 
      titleJa: "太陽追い", 
      image: "/images/tier-back-transparent/5.png",
      earned: false,
      current: false,
      color: "#F43F5E",
      role: null
    },
    { 
      id: 6, 
      titleEn: "Daybreak Master", 
      titleJa: "暁の達人", 
      image: "/images/tier-back-transparent/6.png",
      earned: false,
      current: false,
      color: "#2563EB",
      role: null
    }
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 min-h-[400px] p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier Cards Grid */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ティア進捗</h3>
          <div className="grid grid-cols-2 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  tier.current
                    ? "border-yellow-400 bg-yellow-50 shadow-lg"
                    : tier.earned
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
                style={{
                  filter: tier.earned ? "none" : "blur(2px) grayscale(50%) opacity(0.6)"
                }}
              >
                {/* Role Badge */}
                {tier.role && (
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    tier.role === "main" ? "bg-yellow-500 text-white" : "bg-blue-500 text-white"
                  }`}>
                    {tier.role === "main" ? "M" : "S"}
                  </div>
                )}

                {/* Lock Icon for unearned tiers */}
                {!tier.earned && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                )}

                {/* Tier Image */}
                <div className="flex justify-center mb-3">
                  <img 
                    src={tier.image} 
                    alt={tier.titleEn}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {/* Tier Info */}
                <div className="text-center">
                  <h4 className={`font-semibold text-sm mb-1 ${
                    tier.current ? "text-yellow-800" : 
                    tier.earned ? "text-green-800" : "text-gray-600"
                  }`}>
                    {tier.earned ? tier.titleJa : "???"}
                  </h4>
                  <p className={`text-xs ${
                    tier.current ? "text-yellow-600" :
                    tier.earned ? "text-green-600" : "text-gray-500"
                  }`}>
                    {tier.earned ? tier.titleEn : "未取得"}
                  </p>
                </div>

                {/* Current tier indicator */}
                {tier.current && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tier Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">現在のティア詳細</h3>
          
          {/* Current Tier Card */}
          <div 
            className="rounded-xl p-6 mb-6"
            style={{ backgroundColor: "#FDE68A" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/images/tier-back-transparent/3.png" 
                alt="Aurora Scout"
                className="w-20 h-20 object-contain"
              />
              <div>
                <h4 className="text-xl font-bold text-gray-900">朝焼け探検家</h4>
                <p className="text-lg font-semibold text-gray-700">Aurora Scout</p>
                <p className="text-sm text-gray-600">朝の魅力を採集し共有する探検家</p>
              </div>
            </div>
            
            {/* Story Preview */}
            <div className="bg-white/50 rounded-lg p-3">
              <h5 className="font-semibold text-gray-800 mb-2">Story</h5>
              <p className="text-sm text-gray-700 line-clamp-3">
                東の空を赤金に染める光が広がる頃、君の好奇心はもう地図の外側を指していた。カーキのワークベストに三色のマーカーを差し...
              </p>
            </div>
          </div>

          {/* Tier Settings */}
          <div className="space-y-3">
            <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
              メインカードに設定中
            </button>
            <button className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-500 transition-colors">
              サブカードから解除
            </button>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-6 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <div className="text-center">
          <h4 className="font-semibold text-yellow-900 mb-2">👑 8段階のティア進行システム</h4>
          <div className="flex justify-center gap-6 text-sm text-yellow-700">
            <span>• 物語付きのティアカード</span>
            <span>• メイン・サブカード設定</span>
            <span>• 朝活継続で自動昇格</span>
          </div>
        </div>
      </div>
    </div>
  );
}