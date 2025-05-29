"use client";
import CornerCta from "../components/cornerCta";
import Link from "next/link";
import { useUserCount } from "../hooks/useUserCount";

export default function Hero() {
  const { count, loading, error } = useUserCount();

  return (
    <div className="w-full h-full p-10 flex flex-col justify-between relative">
      <p className="text-4xl text-[#5D6B80] font-bold">Member</p>
      <p className="text-8xl text-[#5D6B80] font-bold">
        {loading ? "..." : error ? "取得失敗" : count}
        <span className="text-4xl">人</span>
      </p>
      <img
        src="/svg/jpmap.svg"
        alt="jpmap"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-h-[80%] "
      />
      <Link
        href="/dashboard"
        className="absolute -bottom-[30px] -right-[30px] flex flex-col gap-4"
      >
        <CornerCta
          color="5D6B80"
          text="Friends"
          subText="友達を招待"
          subText2="invite your"
        />
      </Link>
    </div>
  );
}
