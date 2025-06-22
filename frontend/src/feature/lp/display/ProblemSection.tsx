export default function ProblemSection() {
  // Add CSS animation styles
  if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    if (!document.head.querySelector('style[data-problem-section]')) {
      style.setAttribute('data-problem-section', 'true');
      document.head.appendChild(style);
    }
  }

  const problems = [
    {
      id: 1,
      title: "早起きできない",
      description: "アラームを止めてまた寝てしまう。意志が弱いのか、やる気が続かない。",
      image: "/images/tier-back-transparent/1.png",
      stats: "85%の人が経験"
    },
    {
      id: 2,
      title: "続かない",
      description: "最初は頑張るけど、3日坊主。習慣化がどうしてもできない。",
      image: "/images/tier-back-transparent/2.png",
      stats: "平均継続期間：5日"
    },
    {
      id: 3,
      title: "一人では限界がある",
      description: "孤独感で挫折。周りに理解者がいない。サボっても誰にも迷惑をかけない。",
      image: "/images/tier-back-transparent/3.png",
      stats: "70%が孤独感を感じる"
    },
    {
      id: 4,
      title: "モチベーションが維持できない",
      description: "なぜ早起きするのかわからなくなる。目標が曖昧で達成感がない。",
      image: "/images/tier-back-transparent/4.png",
      stats: "60%がモチベーション低下"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gray-50" id="problems">
      {/* Section Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
          こんな<span className="text-accent">悩み</span>、ありませんか？
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          早起きを始めたいと思っても、多くの人が同じような壁にぶつかります。
        </p>
      </div>
      <div className="max-w-7xl mx-auto">

        {/* Problems Grid - Revolutionary Tier-Based Design */}
        <div className="relative mb-16">
          {/* Central connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent transform -translate-y-1/2 hidden lg:block" />
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 relative">
            {problems.map((problem, index) => (
              <div
                key={problem.id}
                className="group relative"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: `slideInUp 1s ease-out ${index * 200}ms both`
                }}
              >
                {/* Floating tier card container */}
                <div className="relative transform group-hover:-translate-y-2 transition-all duration-500">
                  {/* Tier image as main visual */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full scale-75 group-hover:scale-90 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                    
                    {/* Main tier image */}
                    <div className="relative w-full h-full">
                      <img 
                        src={problem.image} 
                        alt={problem.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                      />
                    </div>
                    
                    {/* Floating problem indicator */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold group-hover:scale-125 transition-transform duration-300 shadow-lg">
                      !
                    </div>
                  </div>

                  {/* Problem content card */}
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 group-hover:bg-white group-hover:border-accent/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    {/* Problem title */}
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-accent transition-colors duration-300 text-center">
                      {problem.title}
                    </h3>

                    {/* Problem description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      {problem.description}
                    </p>

                    {/* Stats with visual impact */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      </div>
                      
                      {/* Hover indicator */}
                      <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-accent flex items-center justify-center group-hover:rotate-90 transition-all duration-300">
                        <svg className="w-3 h-3 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Connection point to center line */}
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block shadow-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* Central solution indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <div className="w-12 h-12 bg-white border-2 border-accent rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Empathy Statement - Left/Right Transformation Design */}
        <div className="relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left - Dark problem state */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 lg:p-12 relative h-full">
              {/* Scattered problem tier images in background */}
              <div className="absolute inset-0 opacity-10">
                <img src="/images/tier-back-transparent/1.png" className="absolute top-4 left-4 w-12 h-12 rotate-12" />
                <img src="/images/tier-back-transparent/2.png" className="absolute top-8 right-8 w-16 h-16 -rotate-6" />
                <img src="/images/tier-back-transparent/3.png" className="absolute bottom-8 left-8 w-14 h-14 rotate-45" />
                <img src="/images/tier-back-transparent/4.png" className="absolute bottom-4 right-12 w-12 h-12 -rotate-12" />
              </div>
              
              {/* Problem state content */}
              <div className="relative text-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                  「また明日から<span className="text-accent">頑張ろう</span>...」
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  そう思って何度も挫折を繰り返していませんか？<br />
                  でも、それはあなたの意志が弱いからではありません。
                </p>
              </div>
            </div>

            {/* Center - Transformation arrow */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
              <div className="bg-accent text-white p-3 rounded-full shadow-xl animate-pulse">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </div>
            </div>

            {/* Mobile arrow (vertical) */}
            <div className="flex justify-center lg:hidden -my-4">
              <div className="bg-accent text-white p-3 rounded-full shadow-xl animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Right - Bright solution state */}
            <div className="bg-gradient-to-br from-white via-accent/5 to-accent/10 rounded-3xl p-8 lg:p-12 border border-accent/20 relative overflow-hidden h-full">
              {/* Success tier images */}
              <div className="absolute inset-0 opacity-20">
                <img src="/images/tier-back-transparent/5.png" className="absolute top-4 left-4 w-12 h-12 rotate-12" />
                <img src="/images/tier-back-transparent/6.png" className="absolute top-8 right-8 w-16 h-16 -rotate-6" />
                <img src="/images/tier-back-transparent/7.png" className="absolute bottom-8 left-8 w-14 h-14 rotate-45" />
                <img src="/images/tier-back-transparent/8.png" className="absolute bottom-4 right-12 w-12 h-12 -rotate-12" />
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/40 rounded-full animate-ping delay-100" />
                <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-accent/30 rounded-full animate-pulse delay-300" />
                <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-accent/50 rounded-full animate-bounce delay-500" />
              </div>

              <div className="relative text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4 leading-tight">
                  <span className="text-accent">Ghoona Camp</span>がその<span className="text-accent">環境</span>を提供します
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  正しい<span className="text-accent">環境</span>と<span className="text-accent">仲間</span>がいれば<br />
                  誰でも朝活を習慣にできるのです。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Element */}
        <div className="flex items-center justify-center mt-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}