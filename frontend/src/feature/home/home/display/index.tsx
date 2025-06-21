
// コンポーネント
import Hero from "./hero";
import Member from "./member";
import LeftNotice from "./leftNotice";
import { Card } from "@/components/ui/card";


export default function IndexPage() {
  return (
    <div className="flex gap-5 h-full">
      <div className="flex-1 flex flex-col gap-20 h-full rounded-lg p-20">
        <Card className="flex-1 flex flex-col bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4]">
          <Hero />
        </Card>
        <Card className="w-full h-[30%] z-20">
          <Member />
        </Card>
      </div>
      <LeftNotice />
    </div>
    
  );
}