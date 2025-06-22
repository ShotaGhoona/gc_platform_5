"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/svg/logo.svg" alt="Ghoona Camp" className="w-10 h-10" />
            <span className="text-xl font-bold text-black">Ghoona Camp</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('problems')}
              className="text-gray-600 hover:text-accent transition-colors"
            >
              悩み
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className="text-gray-600 hover:text-accent transition-colors"
            >
              解決方法
            </button>
            <button 
              onClick={() => scrollToSection('members')}
              className="text-gray-600 hover:text-accent transition-colors"
            >
              コミュニティ
            </button>
            <button 
              onClick={() => scrollToSection('pages')}
              className="text-gray-600 hover:text-accent transition-colors"
            >
              機能紹介
            </button>
          </nav>

          {/* CTA Button */}
          {isSignedIn ? (
            <Link 
              href="/dashboard"
              className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent/90 transition-colors text-sm font-medium"
            >
              ダッシュボードへ
            </Link>
          ) : (
            <Link 
              href="/sign-in"
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              今すぐ始める
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}