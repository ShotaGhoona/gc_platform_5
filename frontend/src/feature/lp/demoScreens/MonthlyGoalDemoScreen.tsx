import { Card } from "@/components/ui/card";

export function MonthlyGoalDemoScreen() {
  const mockGoals = [
    "毎朝6時に起きる",
    "30分の運動を続ける", 
    "英語の勉強を1時間する",
    "読書を30分する"
  ];

  return (
    <div className="p-5 h-full flex-1">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3">
          <button className="px-4 py-2 text-gray-600">← 11月</button>
          <h2 className="text-xl font-bold">12月の目標</h2>
          <button className="px-4 py-2 text-gray-600">1月 →</button>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#5F7392] text-white rounded font-medium">
            + 目標追加
          </button>
          <button className="px-4 py-2 bg-[#5F7392] text-white rounded font-medium">
            フィードバック
          </button>
        </div>
      </div>

      {/* Carousel Effect */}
      <div className="relative h-full">
        {/* Side months (faded) */}
        <div className="absolute left-0 top-0 w-1/4 h-full opacity-50 z-10">
          <Card className="h-full p-6 bg-gray-100">
            <h3 className="text-center font-bold mb-4">11月</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded shadow">
                <p className="text-sm">早起きを習慣化</p>
              </div>
              <div className="p-3 bg-white rounded shadow">
                <p className="text-sm">運動を継続</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="absolute right-0 top-0 w-1/4 h-full opacity-50 z-10">
          <Card className="h-full p-6 bg-gray-100">
            <h3 className="text-center font-bold mb-4">1月</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded shadow">
                <p className="text-sm">新年の目標設定</p>
              </div>
              <div className="p-3 bg-white rounded shadow">
                <p className="text-sm">習慣の見直し</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main month (center) */}
        <div className="mx-auto w-1/2 h-full relative z-20">
          <Card className="h-full p-6">
            <h3 className="text-center font-bold text-xl mb-6">12月の目標</h3>
            <div className="space-y-4 flex-1">
              {mockGoals.map((goal, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <p className="text-gray-800">{goal}</p>
                  <div className="mt-2 flex gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#5F7392] h-2 rounded-full" 
                        style={{ width: `${Math.random() * 70 + 30}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">進行中</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}