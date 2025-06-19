
// コンポーネント
import Hero from "./hero";
import Member from "./member";
import LeftNotice from "./leftNotice";


export default function IndexPage() {
  return (
    <div className="flex gap-5 h-full">
      <div className="flex-1 flex flex-col gap-20 h-full rounded-lg p-15">
        <div className="flex-1 flex flex-col bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4] rounded-lg shadow-md">
          <Hero />
        </div>
        <div className="w-full h-[30%] bg-white rounded-lg shadow-md z-1">
          <Member />
        </div>
      </div>
      <LeftNotice />
    </div>
    
  );
}