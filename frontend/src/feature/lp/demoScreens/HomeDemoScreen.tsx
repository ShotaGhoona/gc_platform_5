import { Card } from "@/components/ui/card";


export function HomeDemoScreen() {
  return (
    <div className="flex gap-5 h-full p-5 flex-1">
      {/* メインエリア */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Hero Section */}
        <Card className="flex-1 bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4] relative">
          <div className="p-8 flex flex-col justify-between h-full text-white">
            <div>
              <h1 className="text-2xl font-bold">Ghoona Camp</h1>
              <p className="text-sm opacity-90">朝から今日から人生を豊かに</p>
            </div>
            {/* 今日の日付 */}
            <div className="text-6xl font-bold">
            {(() => {
                    const today = new Date();
                    return `${today.getMonth() + 1}/${today.getDate()}`;
                    })()}
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="w-16 h-16 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </Card>

        {/* Member Card */}
        <Card className="h-32">
          <div className="p-6 flex items-center justify-between h-full">
            <div>
              <p className="text-lg text-[#5D6B80] font-bold">Member</p>
              <p className="text-3xl text-[#5D6B80] font-bold">1,247人</p>
            </div>
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
          </div>
        </Card>
      </div>

      {/* サイドバー */}
      <Card className="w-80 p-6">
        <h3 className="font-bold mb-4">お知らせ</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm font-medium">新機能追加</div>
            <div className="text-xs text-gray-600">ライバル機能リリース</div>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm font-medium">イベント開催</div>
            <div className="text-xs text-gray-600">朝活チャレンジ中</div>
          </div>
        </div>
      </Card>
    </div>
  );
}