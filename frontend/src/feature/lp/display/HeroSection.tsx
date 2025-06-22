"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToNext = () => {
    const element = document.getElementById('problems');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-200/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      {/* Top Right - Main floating element */}
      <div className="absolute top-1/4 right-20 hidden lg:block">
        <div className="relative animate-float">
          <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-purple-300/20 rounded-2xl rotate-12 shadow-lg backdrop-blur-sm"></div>
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent rounded-full shadow-md"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-400 rounded-full shadow-sm"></div>
        </div>
      </div>
      
      {/* Bottom Left - Secondary floating element */}
      <div className="absolute bottom-1/4 left-20 hidden lg:block">
        <div className="relative animate-float-delayed">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full shadow-lg backdrop-blur-sm"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
        </div>
      </div>

      {/* Top Left - Triangle cluster */}
      <div className="absolute top-32 left-16 hidden lg:block">
        <div className="relative animate-float-slow">
          <div className="w-0 h-0 border-l-12 border-r-12 border-b-16 border-l-transparent border-r-transparent border-b-accent/15 shadow-md"></div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent rounded-full"></div>
        </div>
      </div>

      {/* Top Center - Hexagon */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 translate-x-32 hidden lg:block">
        <div className="relative animate-float">
          <div className="w-12 h-12 bg-gradient-to-br from-green-200/20 to-blue-200/20 transform rotate-45 shadow-lg backdrop-blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-400/60 rounded-full"></div>
        </div>
      </div>

      {/* Right Center - Vertical bars */}
      <div className="absolute top-1/2 right-32 transform -translate-y-1/2 hidden lg:block">
        <div className="relative animate-float-delayed">
          <div className="flex gap-1">
            <div className="w-1 h-8 bg-gradient-to-t from-accent/30 to-accent/60 rounded-full"></div>
            <div className="w-1 h-12 bg-gradient-to-t from-purple-300/30 to-purple-400/60 rounded-full"></div>
            <div className="w-1 h-6 bg-gradient-to-t from-blue-300/30 to-blue-400/60 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Right - Complex shape */}
      <div className="absolute bottom-20 right-32 hidden lg:block">
        <div className="relative animate-float-slow">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-200/20 to-red-200/20 rounded-tl-2xl rounded-br-2xl shadow-lg backdrop-blur-sm"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-pink-400 rounded-full shadow-sm"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
        </div>
      </div>

      {/* Left Center - Stacked circles */}
      <div className="absolute top-1/2 left-24 transform -translate-y-1/2 hidden lg:block">
        <div className="relative animate-float">
          <div className="flex flex-col gap-1">
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full shadow-md"></div>
            <div className="w-4 h-4 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full shadow-md ml-2"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-red-200/30 to-pink-200/30 rounded-full shadow-md ml-1"></div>
          </div>
        </div>
      </div>

      {/* Top Right Far - Small cluster */}
      <div className="absolute top-16 right-8 hidden xl:block">
        <div className="relative animate-float-delayed">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-3 h-3 bg-accent/40 rounded-sm shadow-sm"></div>
            <div className="w-2 h-2 bg-purple-400/40 rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-blue-400/40 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-green-400/40 rounded-sm shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Bottom Left Far - Wave pattern */}
      <div className="absolute bottom-32 left-8 hidden xl:block">
        <div className="relative animate-float-slow">
          <div className="flex items-end gap-1">
            <div className="w-1 h-4 bg-gradient-to-t from-cyan-300/40 to-cyan-400/60 rounded-full"></div>
            <div className="w-1 h-6 bg-gradient-to-t from-cyan-300/40 to-cyan-400/60 rounded-full"></div>
            <div className="w-1 h-3 bg-gradient-to-t from-cyan-300/40 to-cyan-400/60 rounded-full"></div>
            <div className="w-1 h-5 bg-gradient-to-t from-cyan-300/40 to-cyan-400/60 rounded-full"></div>
            <div className="w-1 h-2 bg-gradient-to-t from-cyan-300/40 to-cyan-400/60 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Elements */}
      <div className="absolute top-24 right-4 lg:hidden">
        <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-purple-300/20 rounded-full shadow-md animate-pulse"></div>
      </div>
      
      <div className="absolute bottom-32 left-4 lg:hidden">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full shadow-md animate-pulse delay-500"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-5 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight mt-24">
          朝から、今日から、<span className="text-accent">人生を豊かに。</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
          早起きを通じた自己実現と成長を支援する朝活コミュニティプラットフォーム
        </p>
      </div>

      {/* CTA Buttons with enhanced animations */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8 relative z-10">
        <Link 
          href="/sign-in"
          className="group inline-flex items-center border border-gray-300 text-black px-8 py-4 rounded-full hover:border-gray-400 hover:shadow-lg transition-all duration-300 text-lg font-medium min-w-[200px] hover:scale-105"
        >
          <span className="mr-2">今すぐ始める</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
        <button 
          onClick={scrollToNext}
          className="group border border-gray-300 text-black px-8 py-4 rounded-full hover:border-gray-400 hover:shadow-lg transition-all duration-300 text-lg font-medium min-w-[200px] hover:scale-105"
        >
          詳しく見る
        </button>
      </div>

      {/* Enhanced Minimal Visual Element */}
      <div className="pt-16 relative z-10">
        <button 
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-accent transition-colors duration-300 group"
        >
          <div className="w-2 h-2 bg-black rounded-full mx-auto animate-pulse group-hover:bg-accent transition-colors duration-300"></div>
          <div className="w-px h-16 bg-gradient-to-b from-black to-transparent mx-auto mt-2 group-hover:from-accent transition-colors duration-300"></div>
        </button>
      </div>
    </section>
  );
}

// Add custom CSS animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 5s ease-in-out infinite 1s;
  }
  
  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite 2s;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}