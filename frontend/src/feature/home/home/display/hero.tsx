'use client';

import CornerCta from "../components/cornerCta";
import Link from "next/link";
import { useMainSubTierThumbnails } from "@/hooks/useTier";
import { useUser } from "@clerk/nextjs";

export default function Hero() {
    const { user } = useUser();
    const userId = user?.id || "";
    const { data, loading, error } = useMainSubTierThumbnails(userId);
    console.log(data);
    return (
        <div className="w-full h-full p-10 flex flex-col justify-between relative">
            <div className="flex items-center gap-5">
                <img src="/svg/logo.svg" alt="logo" className="w-10 h-10" />
                <div className="flex flex-col">
                    <p className="text-xl font-bold text-white">Ghoona Camp</p>
                    <p className="text-base text-white font-bold">朝から今日から人生を豊かに</p>
                </div>
            </div>
        
            <div className="flex-1 text-white mt-10 flex items-end">
                <p className="text-9xl font-bold">
                {(() => {
                    const today = new Date();
                    return `${today.getMonth() + 1}/${today.getDate()}`;
                    })()}
                </p>
            </div>
            <div className="absolute bottom-0 right-0 -translate-y-3/5 -translate-x-1/2 h-[60%]">
                {data?.sub?.[2]?.id && (
                    <img 
                        src={`/images/tier-back-transparent/${data.sub[2].id}.png`}
                        alt="tier1"
                        className="w-full h-full" 
                    />
                )}
            </div>
            <div className="absolute bottom-0 translate-y-1/3 -translate-x-1/5 right-0 h-[150%]">
                {data?.main?.id && (
                    <img 
                        src={`/images/tier-back-transparent/${data.main.id}.png`}
                        alt="tier1" 
                        className="w-full h-full" 
                    />
                )}
            </div>
            <div className="absolute bottom-0 right-0 -translate-y-1/6 h-[70%]">
                {data?.sub?.[1]?.id && (
                    <img 
                        src={`/images/tier-back-transparent/${data.sub[1].id}.png`}
                        alt="tier1" 
                        className="w-full h-full" 
                    />
                )}
            </div>
            <div className="absolute bottom-0 translate-y-1/3 -translate-x-1/4 right-0 h-[80%]">
                {data?.sub?.[0]?.id && (
                    <img 
                        src={`/images/tier-back-transparent/${data.sub[0].id}.png`}
                        alt="tier1" 
                        className="w-full h-full" 
                    />
                )}
            </div>
            <Link href="/dashboard" className="absolute -bottom-[30px] -right-[30px] flex flex-col gap-4">
                <CornerCta  color="D68897"  text="Dashboard"  subText="ダッシュボードへ" subText2="visit your" />
            </Link>
        </div>
    );
}
