"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { HomeDemoScreen } from "../demoScreens/HomeDemoScreen";
import { DashboardDemoScreen } from "../demoScreens/DashboardDemoScreen";
import { IoHome } from "react-icons/io5";
import { MdSpaceDashboard, MdCalendarMonth, MdEmojiEvents } from "react-icons/md";
import { PiRankingFill, PiCardholderFill } from "react-icons/pi";
import { BiSolidParty } from "react-icons/bi";
import { GiGoalKeeper } from "react-icons/gi";
import { BsFire } from "react-icons/bs";
import { FaLightbulb } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";

export default function PageSection() {
  const [activePage, setActivePage] = useState<string | null>(null);

  const iconMap: Record<string, React.ReactElement> = {
    IoHome: <IoHome size={16} />,
    MdSpaceDashboard: <MdSpaceDashboard size={16} />,
    PiRankingFill: <PiRankingFill size={16} />,
    MdCalendarMonth: <MdCalendarMonth size={16} />,
    BiSolidParty: <BiSolidParty size={16} />,
    GiGoalKeeper: <GiGoalKeeper size={16} />,
    PiCardholderFill: <PiCardholderFill size={16} />,
    BsFire: <BsFire size={16} />,
    FaLightbulb: <FaLightbulb size={16} />,
    MdEmojiEvents: <MdEmojiEvents size={16} />,
    RiTeamFill: <RiTeamFill size={16} />,
  };

  const pageGroups = [
    {
      id: "home",
      title: "Home",
      links: [
        { href: "/home", label: "Home", icon: "IoHome", subTitle: "メインダッシュボード" },
        { href: "/dashboard", label: "Dashboard", icon: "MdSpaceDashboard", subTitle: "進捗管理" },
      ],
    },
    {
      id: "morning",
      title: "Morning",
      links: [
        { href: "/ranking", label: "Ranking", icon: "PiRankingFill", subTitle: "ランキング表示" },
        { href: "/month-analysis", label: "Attendance", icon: "MdCalendarMonth", subTitle: "出席分析" },
        { href: "/morning-event", label: "Morning Event", icon: "BiSolidParty", subTitle: "朝活イベント" },
        { href: "/monthly-goal", label: "Goal", icon: "GiGoalKeeper", subTitle: "目標設定" },
        { href: "/tier-card", label: "Tier Card", icon: "PiCardholderFill", subTitle: "ティアカード" },
        { href: "/rival", label: "Rival", icon: "BsFire", subTitle: "ライバル機能" },
      ],
    },
    {
      id: "information",
      title: "Information",
      links: [
        { href: "/external-events", label: "External Events", icon: "MdEmojiEvents", subTitle: "外部イベント" },
        { href: "/knowledge", label: "Knowledge", icon: "FaLightbulb", subTitle: "ナレッジベース" },
        { href: "/member", label: "GhoonaCamper", icon: "RiTeamFill", subTitle: "メンバー一覧" },
      ],
    },
  ];

  return (
    <section className="py-24 px-6 bg-gray-50" id="pages">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            <span className="text-accent">豊富な機能</span>を体験
          </h2>
          <p className="text-xl text-gray-600">
            朝活をサポートする充実した機能群。実際の画面で使いやすさを確認してください
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Demo Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
                {/* Demo Sidebar Header */}
                <div className="bg-gray-900 text-white p-4">
                  <div className="flex items-center gap-3">
                    <img src="/svg/logo.svg" alt="Ghoona Camp" className="w-6 h-6" />
                    <span className="font-bold text-sm">Ghoona Camp</span>
                  </div>
                </div>

                {/* Demo Navigation */}
                <nav className="p-2">
                  {pageGroups.map((group) => (
                    <div key={group.id} className="border-b border-gray-100 pb-2 mb-2 last:border-b-0">
                      <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase tracking-wide">
                        {group.title}
                      </div>
                      {group.links.map((link) => (
                        <button
                          key={link.href}
                          onClick={() => setActivePage(link.href)}
                          className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-all duration-200 hover:bg-gray-100 ${
                            activePage === link.href ? "bg-accent/10 text-accent" : "text-gray-700"
                          }`}
                        >
                          <div className={activePage === link.href ? "text-accent" : "text-gray-600"}>
                            {iconMap[link.icon]}
                          </div>
                          <span className="truncate">{link.label}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[500px]">
                {activePage ? (
                  <div>
                    {/* Page Header */}
                    <div className="bg-gray-50 border-b border-gray-200 p-4">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const allLinks = pageGroups.flatMap(g => g.links);
                          const currentPage = allLinks.find(l => l.href === activePage);
                          if (!currentPage) return null;
                          return (
                            <>
                              <div className="text-accent">
                                {iconMap[currentPage.icon]}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{currentPage.label}</h3>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Page Content - Demo Screens */}
                    <div className="p-6">
                      {activePage === "/home" && <HomeDemoScreen />}
                      {activePage === "/dashboard" && <DashboardDemoScreen />}
                      {activePage && !activePage.includes("/home") && !activePage.includes("/dashboard") && (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🚧</span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-4">デモページ準備中</h4>
                          <p className="text-gray-600 max-w-md mx-auto">
                            この機能のデモページは現在準備中です。実際のアプリケーションではここに詳細な画面が表示されます。
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-8">
                    <div className="text-center">
                      <div className="mb-8">
                        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MdSpaceDashboard className="w-10 h-10 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">アプリの機能を確認</h3>
                        <p className="text-gray-600">
                          左のサイドバーから気になる機能をクリックして、実際の画面を確認してください
                        </p>
                      </div>

                      {/* Feature Highlights */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {[
                          { title: "直感的操作", desc: "使いやすいインターフェース", icon: "🎯" },
                          { title: "豊富な機能", desc: "朝活に必要な機能を網羅", icon: "🚀" },
                          { title: "データ可視化", desc: "進捗が一目で分かる", icon: "📊" }
                        ].map((feature, index) => (
                          <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}