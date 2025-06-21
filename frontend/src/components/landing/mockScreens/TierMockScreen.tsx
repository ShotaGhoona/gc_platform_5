import { Trophy, Star, Crown, Flame, Zap, Target } from "lucide-react";

export function TierMockScreen() {
  const tiers = [
    {
      id: 1,
      name: "Sun Chaser",
      nameJa: "太陽の追跡者",
      level: "Lv.1",
      color: "from-orange-400 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      icon: "🌅",
      progress: 100,
      description: "朝活をスタート！",
      unlocked: true,
      current: false
    },
    {
      id: 2,
      name: "Horizon Seeker",
      nameJa: "地平線の探求者", 
      level: "Lv.2",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      icon: "🌄",
      progress: 75,
      description: "7日間連続達成",
      unlocked: true,
      current: true
    },
    {
      id: 3,
      name: "Dawn Master",
      nameJa: "黎明の達人",
      level: "Lv.3", 
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      icon: "🌟",
      progress: 25,
      description: "30日間連続達成",
      unlocked: false,
      current: false
    },
    {
      id: 4,
      name: "Solstice Staff",
      nameJa: "至点の杖",
      level: "Lv.4",
      color: "from-blue-400 to-indigo-500", 
      bgColor: "from-blue-50 to-indigo-50",
      icon: "✨",
      progress: 0,
      description: "100日間連続達成",
      unlocked: false,
      current: false
    },
    {
      id: 5,
      name: "Legend",
      nameJa: "伝説",
      level: "Lv.MAX",
      color: "from-indigo-500 to-purple-600",
      bgColor: "from-indigo-50 to-purple-50", 
      icon: "👑",
      progress: 0,
      description: "365日間連続達成",
      unlocked: false,
      current: false
    }
  ];

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 min-h-[400px]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-900">ティアシステム</h2>
            <p className="text-orange-700">あなたの成長を可視化</p>
          </div>
        </div>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-200 text-center">
          <div className="text-lg font-bold text-orange-900">15</div>
          <div className="text-xs text-orange-600">連続日数</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-200 text-center">
          <div className="text-lg font-bold text-orange-900">23</div>
          <div className="text-xs text-orange-600">総参加日</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-200 text-center">
          <div className="text-lg font-bold text-orange-900">89%</div>
          <div className="text-xs text-orange-600">達成率</div>
        </div>
      </div>

      {/* Tier Progress */}
      <div className="space-y-3">
        {tiers.map((tier, index) => {
          return (
            <div
              key={tier.id}
              className={`
                relative rounded-xl p-4 border-2 transition-all duration-300
                ${tier.current 
                  ? `bg-gradient-to-r ${tier.bgColor} border-transparent shadow-lg scale-105` 
                  : tier.unlocked
                    ? 'bg-white/70 border-orange-200 hover:shadow-md'
                    : 'bg-gray-100/50 border-gray-200'
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* Tier Icon */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300
                  ${tier.unlocked 
                    ? `bg-gradient-to-r ${tier.color} shadow-lg` 
                    : 'bg-gray-300'
                  }
                  ${tier.current ? 'animate-pulse' : ''}
                `}>
                  {tier.unlocked ? tier.icon : '🔒'}
                </div>

                {/* Tier Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold ${tier.unlocked ? 'text-orange-900' : 'text-gray-500'}`}>
                      {tier.nameJa}
                    </h3>
                    <span className={`
                      px-2 py-1 rounded text-xs font-medium
                      ${tier.unlocked ? 'bg-orange-500 text-white' : 'bg-gray-400 text-white'}
                    `}>
                      {tier.level}
                    </span>
                    {tier.current && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium animate-pulse">
                        現在
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-2 ${tier.unlocked ? 'text-orange-700' : 'text-gray-500'}`}>
                    {tier.description}
                  </p>

                  {/* Progress Bar */}
                  {(tier.unlocked || tier.current) && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${tier.color}`}
                        style={{ width: `${tier.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Achievement Badge */}
                {tier.unlocked && (
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full
                    ${tier.current ? 'bg-green-500' : 'bg-orange-500'}
                  `}>
                    {tier.current ? (
                      <Zap className="w-4 h-4 text-white" />
                    ) : (
                      <Star className="w-4 h-4 text-white" />
                    )}
                  </div>
                )}
              </div>

              {/* Current Tier Glow Effect */}
              {tier.current && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 animate-pulse -z-10" />
              )}
            </div>
          );
        })}
      </div>

      {/* Next Goal */}
      <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-orange-900">次の目標まで</p>
            <p className="text-sm text-orange-700">あと15日で「黎明の達人」達成！</p>
          </div>
        </div>
      </div>
    </div>
  );
}