import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Users, Sunrise, TrendingUp } from "lucide-react";
import FeatureShowcase from "@/feature/lp/display/FeatureShowcase";
export const dynamic = 'force-dynamic';

// Fetch user count from API
async function getUserCount() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/users/count`, {
      cache: 'no-store'
    });
    if (response.ok) {
      const data = await response.json();
      return data.count;
    }
  } catch (error) {
    console.error('Failed to fetch user count:', error);
  }
  return 34; // Fallback count
}

export default async function Home() {
  const { userId } = await auth();
  const userCount = await getUserCount();

  // ログイン済みの場合はダッシュボードへリダイレクト
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.15),rgba(255,255,255,0.8))]" />
      <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-12 animate-pulse animation-delay-4000" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-white to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          {/* Logo & Brand */}
          <div className="group cursor-pointer mb-8 transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img src="/svg/logo.svg" alt="Ghoona Camp" className="w-16 h-16 transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent drop-shadow-sm">
                  Ghoona Camp
                </h1>
                <p className="text-lg md:text-xl text-blue-700 font-semibold mt-1">
                  朝から今日から人生を豊かに
                </p>
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="max-w-4xl mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-6 leading-tight">
              <span className="inline-block hover:text-blue-600 transition-colors duration-300 cursor-default">早起きは三文の徳</span>を<br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">現実にする</span>コミュニティ
            </h2>
            <p className="text-lg md:text-xl text-blue-700 leading-relaxed">
              <span className="font-semibold text-blue-900">頑張りを習慣に、成長を日常に</span>するための環境がここにあります。
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-2xl">
            <div className="group bg-white/80 backdrop-blur-md border border-blue-200/50 rounded-2xl p-6 hover:bg-white/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-1">{userCount}</div>
              <div className="text-sm text-blue-600">活動中のメンバー</div>
            </div>
            <div className="group bg-white/80 backdrop-blur-md border border-blue-200/50 rounded-2xl p-6 hover:bg-white/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-center mb-2">
                <Sunrise className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-1">6:00</div>
              <div className="text-sm text-blue-600">毎朝の開始時間</div>
            </div>
            <div className="group bg-white/80 backdrop-blur-md border border-blue-200/50 rounded-2xl p-6 hover:bg-white/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-1">100%</div>
              <div className="text-sm text-blue-600">成長実感率</div>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/sign-in"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-xl font-bold px-12 py-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 hover:rotate-1"
          >
            <span>今すぐ朝活をはじめる</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </section>

        {/* Features Section */}
        <FeatureShowcase />

        {/* Community Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
              全国の若者の朝を盛り上げる<br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">オンラインコミュニティ</span>
            </h3>
            <p className="text-lg md:text-xl text-blue-700 leading-relaxed mb-12">
              それぞれが夢や目標に本気で向き合っているからこそ、<br className="hidden md:block" />
              自分も「よし、今日もがんばろう」って思える。<br />
              <span className="font-semibold text-blue-900">同じ気持ちを共有できる仲間がいる時間は、毎日の原動力になります。</span>
            </p>
            
            {/* Map & Stats */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-12">
              <div className="group cursor-pointer">
                <img 
                  src="/svg/jpmap.svg" 
                  alt="日本全国のメンバー" 
                  className="w-80 h-60 opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transform transition-transform duration-500" 
                />
                <p className="text-blue-600 mt-4 group-hover:text-blue-800 transition-colors duration-300">全国47都道府県から参加</p>
              </div>
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                  {userCount}
                </div>
                <div className="text-xl md:text-2xl text-blue-900 font-semibold mb-4">人の仲間が活動中</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/70 backdrop-blur-md border border-blue-200/50 rounded-lg p-3 shadow-sm">
                    <div className="text-2xl font-bold text-blue-700">89%</div>
                    <div className="text-blue-600">継続率</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-md border border-blue-200/50 rounded-lg p-3 shadow-sm">
                    <div className="text-2xl font-bold text-blue-700">4.8</div>
                    <div className="text-blue-600">満足度</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-white/70 to-white/80 backdrop-blur-md border border-blue-200/50 rounded-3xl p-8 hover:from-white/80 hover:to-white/90 hover:shadow-xl transition-all duration-500">
              <h4 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                Don't hold back. Give it your all.
              </h4>
              <p className="text-lg text-blue-700 mb-8">あなたも今日から、朝活で人生を変えませんか？</p>
              <Link
                href="/sign-in"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-lg font-bold px-10 py-3 rounded-full shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <span>無料で参加する</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center">
          <div className="text-blue-600/70 text-sm hover:text-blue-800 transition-colors duration-300">
            © {new Date().getFullYear()} Ghoona Camp - 朝から今日から人生を豊かに
          </div>
        </footer>
      </div>
    </div>
  );
}
