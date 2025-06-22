"use client";

import { useEffect, useRef } from "react";

export default function MemberSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);


  const members = [
    { 
      username: "@morning_hero", 
      bio: "朝活で人生変わりました！毎日6時起きで英語学習中", 
      avatar: "/images/profile.png",
      joinDate: "2024年9月",
      testimonial: "朝活を始めて人生が変わりました。仲間がいるから毎日続けられています！"
    },
    { 
      username: "@early_bird_mk", 
      bio: "早起きして副業頑張ってます💪 目標月収10万円", 
      avatar: "/images/profile.png",
      joinDate: "2024年10月",
      testimonial: "一人では絶対に続かなかった早起きが、今では自然な習慣になりました。"
    },
    { 
      username: "@sunrise_warrior", 
      bio: "朝活でTOEICスコアアップ中！仲間と切磋琢磨", 
      avatar: "/images/profile.png",
      joinDate: "2024年8月",
      testimonial: "ライバル機能のおかげで毎日が楽しくなりました。競争しながら成長できます。"
    },
    { 
      username: "@design_dreamer", 
      bio: "デザインの勉強と読書が日課です📚", 
      avatar: "/images/profile.png",
      joinDate: "2024年11月",
      testimonial: "目標管理機能で自分の成長が見える化されて、モチベーションが保てます。"
    },
    { 
      username: "@goal_getter", 
      bio: "朝活で運動と勉強を両立！健康的な生活目指してます", 
      avatar: "/images/profile.png",
      joinDate: "2024年11月",
      testimonial: "コミュニティの温かさに感動。みんなで支え合って成長していく感覚が最高です。"
    },
    { 
      username: "@freelance_king", 
      bio: "フリーランスとして朝活でスキルアップ中", 
      avatar: "/images/profile.png",
      joinDate: "2024年9月",
      testimonial: "毎朝のルーティンができて、集中力が格段に上がりました。仕事の効率も大幅アップ！"
    }
  ];



  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden" id="members">
      <div className="px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            成長し続ける<span className="text-accent">コミュニティメンバー</span>
          </h2>
          <p className="text-xl text-gray-600">
            様々な背景を持つメンバーが、朝活を通じて理想の自分に向かって成長中。あなたも仲間と一緒に人生を変えませんか？
          </p>
        </div>

        {/* Members with Testimonials Horizontal Scroll */}
        <div className="py-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">活躍中のメンバーの声</h3>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide py-8"
            style={{ width: '100%' }}
          >
            {[...members, ...members].map((member, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-96 bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group cursor-pointer relative"
              >
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mb-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-gray-200 group-hover:border-accent transition-colors duration-300 mb-3">
                    <img 
                      src={member.avatar} 
                      alt={member.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Username */}
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors duration-300 mb-1">
                    {member.username}
                  </h4>
                  
                  {/* Join Date */}
                  <p className="text-sm text-gray-600 mb-3">{member.joinDate}参加</p>
                  
                  {/* Bio */}
                  <p className="text-sm text-gray-700 leading-relaxed">{member.bio}</p>
                </div>

                {/* Speech Bubble Testimonial */}
                <div className="relative">
                  <div className="bg-accent/5 rounded-2xl p-4 border border-accent/10 relative">
                    {/* Speech bubble tail */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-accent/5"></div>
                      <div className="w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-white absolute top-1 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    
                    {/* Quote marks */}
                    <div className="text-accent/20 text-3xl font-bold absolute top-1 left-3">"</div>
                    <div className="text-accent/20 text-3xl font-bold absolute bottom-1 right-3 rotate-180">"</div>
                    
                    {/* Testimonial text */}
                    <p className="text-gray-700 text-center leading-relaxed italic px-6 py-2">
                      {member.testimonial}
                    </p>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CSS for animations and scrollbar hide */}
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
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}