import IndexPage from "@/feature/setting/discord-setting-callback/display/index";
import Sidebar from "@/components/display/sidebar";
import Header from "@/components/display/header";
import { Suspense } from "react";

export default function DiscordCallbackPage() {
  return (
    <div className="flex bg-background">
        <div className="transition-all duration-300">
        <Sidebar />
        </div>
        <div className="flex-1 flex flex-col max-h-screen">
        <Header />
        <main className="flex-1 min-h-[calc(100vh-45px)] p-5">
            <Suspense fallback={<div>Loading...</div>}>
              <IndexPage />
            </Suspense>
        </main>
        </div>
    </div>
  );
}