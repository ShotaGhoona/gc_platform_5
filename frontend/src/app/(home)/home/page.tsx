import IndexPage from "@/feature/home/home/display/index";
import Sidebar from "@/components/display/sidebar";
import Header from "@/components/display/header";

export default function Home() {
  return (
    <div className="flex bg-background">
        <div className="transition-all duration-300">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col max-h-screen relative">
          <Header />
          <main className="flex-1 h-[calc(100vh-45px)] p-5 z-1">
            <div className="h-full">
              <IndexPage />
            </div>
          </main>
        </div>
    </div>
  );
}