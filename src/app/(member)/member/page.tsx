import IndexPage from "@/feature/member/member/display/index";
import Sidebar from "@/components/display/sidebar";
import Header from "@/components/display/header";

export default function Member() {
  return (
    <div className="flex bg-[#EEEEEE] ">
        <div className="transition-all duration-300">
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