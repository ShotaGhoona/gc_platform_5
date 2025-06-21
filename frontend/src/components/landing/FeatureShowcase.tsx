"use client";

import { useState } from "react";
import { Calendar, MessageCircle, Trophy, Target, Users } from "lucide-react";
import { DiscordMockScreen } from "./mockScreens/DiscordMockScreen";
import { DashboardMockScreen } from "./mockScreens/DashboardMockScreen";
import { TierMockScreen } from "./mockScreens/TierMockScreen";
import { GoalMockScreen } from "./mockScreens/GoalMockScreen";
// import { RivalMockScreen } from "./mockScreens/RivalMockScreen";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  mockScreen: React.ComponentType;
}

const features: Feature[] = [
  {
    id: "morning",
    title: "毎朝6:00-8:00の朝活",
    description: "朝の黄金時間を最大活用。集中力が最も高い時間帯に、仲間と共に目標に向かって取り組めます。",
    icon: Calendar,
    color: "from-orange-400 to-red-500",
    gradient: "from-orange-50 to-red-50",
    mockScreen: DashboardMockScreen,
  },
  {
    id: "discord",
    title: "Discordでリアルタイム交流",
    description: "勉強・副業・運動など、様々な分野で頑張る仲間のノウハウや経験をリアルタイムでシェア。",
    icon: MessageCircle,
    color: "from-purple-400 to-indigo-500",
    gradient: "from-purple-50 to-indigo-50",
    mockScreen: DiscordMockScreen,
  },
  {
    id: "tier",
    title: "ティアシステムで成長実感",
    description: "継続日数や活動に応じてティアが上昇。達成感と共に自分の成長を可視化できます。",
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
    gradient: "from-yellow-50 to-orange-50",
    mockScreen: TierMockScreen,
  },
  {
    id: "goal",
    title: "月間目標で継続力アップ",
    description: "個人の月間目標を設定し、コミュニティメンバーと進捗をシェア。相互励ましで継続力を向上。",
    icon: Target,
    color: "from-green-400 to-emerald-500",
    gradient: "from-green-50 to-emerald-50",
    mockScreen: GoalMockScreen,
  },
  {
    id: "rival",
    title: "本気の仲間とライバル機能",
    description: "同じ志を持つ仲間とライバル関係を構築。切磋琢磨しながら共に成長していけます。",
    icon: Users,
    color: "from-pink-400 to-rose-500",
    gradient: "from-pink-50 to-rose-50",
    mockScreen: GoalMockScreen,
  },
];

export default function FeatureShowcase() {
  const [selectedFeature, setSelectedFeature] = useState<Feature>(features[0]);

  return (
    <section className="py-20 px-20">
      <div className="">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-16">
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            なぜGhoona Camp？
          </span>
        </h3>
        
        <div className="flex lg:flex-col flex-row gap-12 items-start">
          {/* Left Side - Feature List */}
          <div className="flex gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isSelected = selectedFeature.id === feature.id;
              
              return (
                <div
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature)}
                  className={`
                    group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-500 transform
                    ${isSelected 
                      ? `bg-gradient-to-r ${feature.gradient} border-transparent shadow-xl scale-105` 
                      : 'bg-white/60 border-blue-200/50 hover:bg-white/80 hover:border-blue-300 hover:scale-102'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className={`
                      flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 shadow-lg
                      ${isSelected 
                        ? `bg-gradient-to-r ${feature.color} rotate-12` 
                        : 'bg-gradient-to-r from-blue-500 to-blue-700 group-hover:rotate-12'
                      }
                    `}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`
                        text-xl font-bold mb-3 transition-colors duration-300
                        ${isSelected ? 'text-gray-800' : 'text-blue-900 group-hover:text-blue-700'}
                      `}>
                        {feature.title}
                      </h4>
                      
                      <p className={`
                        leading-relaxed transition-colors duration-300
                        ${isSelected ? 'text-gray-700' : 'text-blue-700'}
                      `}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Mock Screen Display */}
          <div className="lg:sticky lg:top-8 w-full">
            <div className={`
              relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 transform
              bg-gradient-to-br ${selectedFeature.gradient} border border-gray-200
            `}>
              {/* Mock Screen Header */}
              <div className="bg-white/80 backdrop-blur-sm px-6 py-4 border-b border-gray-200/50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {selectedFeature.title}
                  </div>
                </div>
              </div>
              
              {/* Mock Screen Content */}
              <div className="p-6">
                <selectedFeature.mockScreen />
              </div>
              
              {/* Floating Badge */}
              <div className={`
                absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white
                bg-gradient-to-r ${selectedFeature.color} shadow-lg
              `}>
                機能紹介
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}