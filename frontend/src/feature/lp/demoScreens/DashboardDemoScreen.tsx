import { Card } from "@/components/ui/card";

export function DashboardDemoScreen() {
  return (
    <div className="flex gap-5 h-full p-5 flex-1">
      {/* メインエリア */}
      <div className="flex-1 flex flex-col gap-5">
        {/* ビジョン */}
        <Card className="p-6">
          <p className="text-sm text-gray-400 mb-3">将来の夢・ビジョン</p>
          <p className="text-lg text-gray-700">"毎朝6時に起きて英語学習を習慣化する"</p>
        </Card>

        {/* ダッシュボードカード */}
        <div className="flex gap-5">
          <Card className="flex-1 p-4 text-center">
            <p className="text-xs text-gray-500 mb-2">今月出席</p>
            <p className="text-3xl font-bold text-gray-600">18回</p>
          </Card>
          <Card className="flex-1 p-4 text-center">
            <p className="text-xs text-gray-500 mb-2">総出席</p>
            <p className="text-3xl font-bold text-gray-600">142回</p>
          </Card>
          <Card className="flex-1 p-4 text-center">
            <p className="text-xs text-gray-500 mb-2">連続</p>
            <p className="text-3xl font-bold text-gray-600">12回</p>
          </Card>
        </div>

        {/* 分析エリア */}
        <Card className="flex-1 p-6">
          <h4 className="font-bold mb-4">週間分析</h4>
          <div className="space-y-3">
            {['月', '火', '水', '木', '金'].map((day, index) => (
              <div key={day} className="flex items-center gap-3">
                <span className="w-4 text-sm">{day}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* サイドバー */}
      <div className="w-80 flex flex-col gap-5">
        {/* ティアカード */}
        <Card className="p-6 text-center">
          <h4 className="font-bold mb-4">ティア</h4>
          <div className="w-16 h-16 bg-yellow-200 rounded-full mx-auto mb-3"></div>
          <p className="font-bold text-yellow-600">ゴールド</p>
        </Card>

        {/* ランキング */}
        <Card className="flex-1 p-6">
          <h4 className="font-bold mb-4">ランキング</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full text-white text-xs flex items-center justify-center font-bold">1</div>
              <span className="text-sm">@hero</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-400 rounded-full text-white text-xs flex items-center justify-center font-bold">2</div>
              <span className="text-sm">@bird</span>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 p-2 rounded">
              <div className="w-6 h-6 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center font-bold">3</div>
              <span className="text-sm font-medium">あなた</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}