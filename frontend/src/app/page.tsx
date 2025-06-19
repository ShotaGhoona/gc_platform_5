import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  // ログイン済みの場合はダッシュボードへリダイレクト
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4] relative">
      {/* ロゴ＋キャッチ */}
      <div className="flex items-center gap-4 mt-12">
        <img src="/svg/logo.svg" alt="logo" className="w-14 h-14" />
        <div>
          <h1 className="text-4xl font-bold text-white drop-shadow">Ghoona Camp</h1>
          <p className="text-lg text-white font-semibold drop-shadow">朝から今日から人生を豊かに</p>
        </div>
      </div>
      {/* 公式サイト冒頭説明 */}
      <div className="mt-8 max-w-2xl text-center">
        <p className="text-white text-base md:text-lg font-semibold leading-relaxed drop-shadow">
          早起きは三文の徳<br />
          1000年前からあるこの言葉を知らない人はいません。<br />
          しかし、それを日々実現している人はほんの一握りです。<br />
          <span className="font-bold">Ghoona Campでは自己実現のための絶対的な手段</span>。<br />
          頑張りを習慣に、成長を日常にするための環境を提供します。<br />
        </p>
        <p className="text-white text-2xl md:text-3xl font-bold mt-4 drop-shadow">
          朝から、今日から、人生を豊かに。
        </p>
      </div>
      {/* heroイラスト */}
      <div className="w-full flex justify-center mt-8">
        <img src="/svg/hero.svg" alt="hero" className="w-[400px] max-w-full" />
      </div>
      {/* 特徴3つ（公式サイト準拠） */}
      <div className="flex flex-col md:flex-row gap-6 mt-10">
        <div className="flex flex-col items-center bg-white/80 rounded-xl p-6 shadow-md w-64">
          <img src="/svg/tier/sun_chaser.png" alt="朝活" className="w-16 h-16 mb-2" />
          <p className="text-lg font-bold text-[#5D6B80]">毎朝6:00-8:00の朝活</p>
          <p className="text-sm text-gray-600 text-center">朝の時間を有効活用し、やりたいことに集中できる</p>
        </div>
        <div className="flex flex-col items-center bg-white/80 rounded-xl p-6 shadow-md w-64">
          <img src="/svg/tier/horizon_seeker.png" alt="有益情報" className="w-16 h-16 mb-2" />
          <p className="text-lg font-bold text-[#5D6B80]">有益情報がたくさん</p>
          <p className="text-sm text-gray-600 text-center">勉強・副業・運動など、仲間のノウハウや経験をシェア</p>
        </div>
        <div className="flex flex-col items-center bg-white/80 rounded-xl p-6 shadow-md w-64">
          <img src="/svg/tier/solstice_staff.png" alt="仲間" className="w-16 h-16 mb-2" />
          <p className="text-lg font-bold text-[#5D6B80]">刺激し合う仲間</p>
          <p className="text-sm text-gray-600 text-center">夢や目標に本気な仲間と励まし合い、成長できる</p>
        </div>
      </div>
      {/* コミュニティの雰囲気・メリット */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <p className="text-white text-base md:text-lg leading-relaxed text-center drop-shadow">
          Ghoona Campは、<span className="font-bold">全国の若者の朝を盛り上げるために作られたオンラインコミュニティ</span>です。<br />
          みんなが自分の経験や気づきを惜しみなくシェアしてくれるから、参加しているだけでも自然と新しい知識が手に入ります。<br />
          それぞれが夢や目標に本気で向き合っているからこそ、自分も「よし、今日もがんばろう」って思える。<br />
          同じ気持ちを共有できる仲間がいる時間は、毎日の原動力になります。
        </p>
      </div>
      {/* 参加人数＋地図 */}
      <div className="flex flex-col md:flex-row items-center gap-8 mt-12">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-white drop-shadow">現在の参加者</p>
          <p className="text-6xl font-extrabold text-[#5D6B80] drop-shadow">1000<span className="text-2xl">人</span></p>
        </div>
        <img src="/svg/jpmap.svg" alt="日本地図" className="w-64 h-40" />
      </div>
      {/* CTA */}
      <a
        href="/sign-in"
        className="mt-12 bg-[#D68897] hover:bg-[#c06a7a] text-white text-2xl font-bold px-16 py-5 rounded-full shadow-lg transition-colors"
      >
        今すぐはじめる
      </a>
      {/* フッター */}
      <div className="absolute bottom-4 text-white/70 text-sm">© {new Date().getFullYear()} Ghoona Camp</div>
    </div>
  );
}
