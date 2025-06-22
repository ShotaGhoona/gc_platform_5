"use client";

import { ArrowRight, Star, Users, Clock, Zap } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  const features = [
    { icon: Users, text: "仲間と一緒に", color: "text-blue-600" },
    { icon: Star, text: "継続しやすい", color: "text-yellow-600" },
    { icon: Clock, text: "毎朝6時開始", color: "text-green-600" },
    { icon: Zap, text: "今すぐ開始", color: "text-purple-600" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-accent to-accent/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
      </div>

      <div className="px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              今すぐ朝活を始めて<br />
              <span className="text-white/90">人生を変えませんか？</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              一人では続かない朝活も、仲間がいれば必ず続く。<br />
              あなたの理想の人生への第一歩を、今日から始めましょう。
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: `slideInUp 0.8s ease-out ${index * 100}ms both`
                }}
              >
                <feature.icon className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-semibold text-sm">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Main CTA Button */}
          <div className="mb-8">
            <Link href="/sign-up" className="group inline-flex items-center bg-white text-accent px-12 py-6 rounded-full text-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20">
              <span className="mr-4">Ghoona Campに参加する</span>
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>

          {/* Secondary Info */}
          <div className="space-y-4">
            <p className="text-white/70 text-lg">
              🌅 朝活コミュニティ | 🤝 仲間と一緒に | 📱 すぐに開始
            </p>
          </div>
        </div>
      </div>

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