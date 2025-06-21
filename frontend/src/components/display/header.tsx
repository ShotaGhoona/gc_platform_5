"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { groups } from "@/components/constants/routes";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type Profile = {
  username: string;
  avatar_image_url: string;
};

function getPageTitleandSubTitle(pathname: string): { title: string, subTitle: string } {
  for (const group of groups) {
    for (const link of group.links) {
      if (link.href === pathname) return { title: link.label, subTitle: link.subTitle };
    }
  }
  return { title: "GhoonaCamp", subTitle: "" };
}

export default function Header() {
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const pathname = usePathname();
  const { title, subTitle } = getPageTitleandSubTitle(pathname);
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/detail/${user.id}`);
        if (!res.ok) throw new Error("プロフィール取得失敗");
        const data = await res.json();
        setProfile({
          username: data.username || "User",
          avatar_image_url:
            data.avatar_image_url && data.avatar_image_url !== "null"
              ? data.avatar_image_url
              : "/images/profile/sampleProfileIcon.png",
        });
      } catch {
        setProfile({
          username: "User",
          avatar_image_url: "/images/profile/sampleProfileIcon.png",
        });
      }
    };
    fetchProfile();
  }, [user?.id]);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // クリック外で閉じる
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full h-[45px] flex items-center justify-between px-4 bg-header-bg shadow-lg z-10 border-b border-header-border">
      <div className="flex gap-4 items-end">
        <h1 className="text-xl text-header-text font-bold">{title}</h1>
        <span className="text-header-text-muted text-sm font-bold">{subTitle}</span>
      </div>
      <div className="flex items-center gap-4 relative">
        <ThemeToggle />
        <span className="text-header-text-secondary font-bold">{profile?.username}</span>
        <img
          src={
            profile?.avatar_image_url && profile.avatar_image_url !== "null"
              ? profile.avatar_image_url
              : "/images/profile/sampleProfileIcon.png"
          }
          alt={profile?.username}
          className="w-[32px] h-[32px] rounded-full border border-header-avatar-border object-cover cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        />
        {open && (
          <>
            <div
              className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-50 ${
                open ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setOpen(false)}
            />
            <div
              ref={ref}
              className="absolute right-0 top-10 w-64 bg-card rounded-lg shadow-lg z-50 p-4 flex flex-col gap-2 z-50 border border-border"
            >
              <div className="flex flex-col items-center gap-2 mb-4">
                <img
                  src={
                    profile?.avatar_image_url && profile.avatar_image_url !== "null"
                      ? profile.avatar_image_url
                      : "/images/profile/sampleProfileIcon.png"
                  }
                  alt={profile?.username}
                  className="w-16 h-16 rounded-full border border-header-avatar-border object-cover"
                />
                <span className="font-bold text-card-foreground">{profile?.username}</span>
                {/* ここにOne-Line Profileやメールアドレスなど追加可 */}
              </div>
              <Link href="/profile-setting" className="btn bg-primary rounded text-primary-foreground font-bold text-center text-sm px-3 py-2 hover:bg-primary/90 transition-colors">プロフィール編集</Link>
              <Link href="/vision-setting" className="btn bg-primary rounded text-primary-foreground font-bold text-center text-sm px-3 py-2 hover:bg-primary/90 transition-colors">ビジョン設定</Link>
              <SignOutButton>
                <button className="btn text-destructive rounded px-3 py-1 w-full text-center hover:bg-destructive/10 transition-colors">
                  ログアウト
                </button>
              </SignOutButton>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
