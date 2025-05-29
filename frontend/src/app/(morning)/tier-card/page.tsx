import IndexPage from "@/feature/morning/tier-card/display/index";
import Sidebar from "@/components/display/sidebar";
import Header from "@/components/display/header";

export default function TierCard() {
  return (
    <div className="flex bg-[#EEEEEE] ">
        <div className="transition-all duration-300 z-10">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col main-content transition-all duration-300">
          <Header />
          <main className="p-5">
              <IndexPage />
          </main>
        </div>
    </div>
  );
}