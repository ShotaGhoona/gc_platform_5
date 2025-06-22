"use client";

import { useState } from "react";
import { DiscordMockScreen } from "../mockScreens/DiscordMockScreen";
import { SlackMockScreen } from "../mockScreens/SlackMockScreen";
import { GoalMockScreen } from "../mockScreens/GoalMockScreen";
import { RivalMockScreen } from "../mockScreens/RivalMockScreen";
import { TierMockScreen } from "../mockScreens/TierMockScreen";
import { MessageCircle, Users, Target, TrendingUp, Crown, X } from "lucide-react";

export default function SolutionSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const solutions = [
    {
      id: "discord",
      title: "リアルタイム朝活コミュニティ",
      description: "毎朝6:00から始まる生の朝活体験。音声・テキストで仲間と一緒に目覚める特別な時間を共有",
      icon: MessageCircle,
      color: "from-indigo-500 to-purple-600",
      span: 3,
      component: DiscordMockScreen
    },
    {
      id: "slack",
      title: "24時間つながるコミュニティ",
      description: "朝活以外の時間も仲間と繋がり続ける。目標宣言から成果報告まで、いつでも励まし合える環境",
      icon: Users,
      color: "from-purple-500 to-pink-600",
      span: 3,
      component: SlackMockScreen
    },
    {
      id: "goal",
      title: "科学的目標達成システム",
      description: "曖昧な目標を具体的な行動に変換。データ可視化と進捗追跡で確実に理想の自分へ導く",
      icon: Target,
      color: "from-blue-500 to-cyan-600",
      span: 2,
      component: GoalMockScreen
    },
    {
      id: "rival",
      title: "切磋琢磨ライバルシステム",
      description: "一人では限界のある努力も、ライバルがいれば無限大。健全な競争で互いを高め合う関係を構築",
      icon: TrendingUp, 
      color: "from-green-500 to-teal-600",
      span: 2,
      component: RivalMockScreen
    },
    {
      id: "tier",
      title: "成長実感ティアシステム",
      description: "継続日数に応じて昇格するゲーム要素。ブロンズからマスターまで、努力が可視化される達成感を体験",
      icon: Crown,
      color: "from-yellow-500 to-orange-600",
      span: 2,
      component: TierMockScreen
    }
  ];

  return (
    <section className="py-24 px-6 bg-white" id="solutions">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
          <span className="text-accent">Ghoona Camp</span>の解決方法
        </h2>
        <p className="text-xl text-gray-600">
          問題を解決するために設計された5つの機能で、あなたの朝活習慣化を完全サポートします
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div
              key={solution.id}
              className="group relative cursor-pointer"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: `slideInUp 0.8s ease-out ${index * 150}ms both`,
                gridColumn: `span ${solution.span}`,
              }}
              onClick={() => setActiveModal(solution.id)}
            >
              {/* Card */}
              <div className="bg-white border border-gray-200 rounded-3xl p-8 h-full hover:border-accent/20 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2" style={{ background: `linear-gradient(to right, ${solution.color}, ${solution.color})` }}>
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-accent transition-colors duration-300">
                  {solution.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {solution.description}
                </p>

                {/* Click indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-accent">詳細を見る</span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-3xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-accent to-accent/80 text-white px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer group">
            <span className="text-lg font-semibold mr-3">今すぐ体験してみる</span>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {(() => {
                  const solution = solutions.find(s => s.id === activeModal);
                  if (!solution) return null;
                  return (
                    <>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center`}>
                        <solution.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{solution.title}</h3>
                    </>
                  );
                })()}
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {(() => {
                const solution = solutions.find(s => s.id === activeModal);
                if (!solution) return null;
                const Component = solution.component;
                return <Component />;
              })()}
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}