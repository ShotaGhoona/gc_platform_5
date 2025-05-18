// コンポーネント
import Hero from "./hero";
import Member from "./member";
import LeftNotice from "./leftNotice";
export default function IndexPage() {
  return (
    <div className="flex gap-10 h-full">
      <div className="flex-1 flex flex-col gap-10 h-full rounded-lg">
        <div className="flex-1 flex flex-col bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4] rounded-lg">
          <Hero />
        </div>
        <div className="w-full h-[30%] bg-white rounded-lg">
          <Member />
        </div>
      </div>
      <div className="w-[400px] h-full bg-white rounded-lg">
        <LeftNotice />
      </div>
    </div>
  );
}