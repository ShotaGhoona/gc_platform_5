import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import TransitionWrapper from "../components/transition/TransitionWrapper";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghoona Camp",
  description: "Ghoona Camp Platform",
};

// クライアントコンポーネントはimportだけでOK（"use client"は分離済み）
import TierLoginPopupTrigger from "@/feature/tier/components/TierLoginPopupTrigger";

function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body className={`${outfit.variable} antialiased bg-[#eeeeee]`}>
          {/* クライアントコンポーネントはbody内でJSXとして呼び出す */}
          <TierLoginPopupTrigger />
          <TransitionWrapper>
            {children}
          </TransitionWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
