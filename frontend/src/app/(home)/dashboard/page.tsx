import IndexPage from "@/feature/home/dashboard/display/index";
import Sidebar from "@/components/display/sidebar";
import Header from "@/components/display/header";

export default function Dashboard() {
  return (
    <div className="flex bg-background">
        <div className="transition-all duration-300">
        <Sidebar />
        </div>
        <div className="flex-1 flex flex-col max-h-screen">
        <Header />
        <main className="flex-1 min-h-[calc(100vh-45px)] p-5">
            <IndexPage />
        </main>
        </div>
    </div>
  );
}