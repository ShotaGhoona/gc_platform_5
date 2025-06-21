import IndexPage from "@/feature/home/home/display/index";
import Sidebar from "@/components/display/sidebar";
import Header from "@/components/display/header";

export default function Home() {
  return (
    <div className="flex bg-background">
        {/* <img
          src="/images/sign-in-bg.jpg"
          alt="home"
          className="absolute top-0 left-0 w-full h-full object-cover"
        /> */}
        {/* <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div> */}
        <div className="transition-all duration-300">
        <Sidebar />
        </div>
        <div className="flex-1 flex flex-col max-h-screen relative">
        <Header />
        <main className="flex-1 min-h-[calc(100vh-45px)] p-5 z-1">
            <IndexPage />
        </main>
        </div>
    </div>
  );
}