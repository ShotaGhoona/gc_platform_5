"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VisionSentence() {
  const { user } = useUser();
  const [vision, setVision] = useState<string>("");

  useEffect(() => {
    const fetchVision = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/vision/${user.id}`);
        if (!res.ok) throw new Error("Vision取得失敗");
        const data = await res.json();
        setVision(data.vision || "");
      } catch {
        setVision("");
      }
    };
    fetchVision();
  }, [user?.id]);

  return (
    <>
      {vision ? (
        <p className="flex-1 text-3xl font-bold text-center flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]">
          {vision}
        </p>
      ) : (
        <Link href="/vision-setting" className="text-gray-300 text-center underline">ビジョンを設定する</Link>
      )}
    </>
  );
}
