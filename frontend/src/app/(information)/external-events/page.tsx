import IndexPage from "@/feature/information/external-events/display/index";
import Sidebar from "@/components/display/sidebar";
import Header from "@/components/display/header";

export default function ExternalEvents() {
  return (
    <div className="flex bg-background">
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