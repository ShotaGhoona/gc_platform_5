import IndexPage from "@/feature/morning/rival/display/index";
import Sidebar from "@/components/display/sidebar";
import Header from "@/components/display/header";

export default function Rival() {
  return (
    <div className="flex bg-[#EEEEEE] ">
        <div className="transition-all duration-300">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col h-screen">
        <Header />
        <main className="flex-1 h-[calc(100vh-45px)] p-5">
            <IndexPage />
        </main>
        </div>
    </div>
  );
}