import { Target, Edit3, Calendar } from "lucide-react";

export function GoalMockScreen() {
  const months = [
    {
      period: "2024/12",
      goals: [
        { 
          text: "毎朝6時に起きて30分読書する習慣をつける", 
          feedback: "最初の2週間は辛かったが、後半は自然に起きられるようになった。読書量も月5冊達成！"
        }
      ]
    },
    {
      period: "2025/01", 
      goals: [
        { 
          text: "JavaScriptの新しいフレームワークを1つマスターする", 
          feedback: ""
        },
        {
          text: "週3回ジョギングを継続し、健康的な朝活ライフを送る",
          feedback: ""
        }
      ]
    },
    {
      period: "2025/02",
      goals: [
        { 
          text: "React Native でモバイルアプリを開発する", 
          feedback: ""
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 min-h-[400px] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-bold text-gray-900">月間目標設定</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary/80 transition-colors">
            <Edit3 className="w-4 h-4" />
            目標を追加
          </button>
          <button className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-accent/80 transition-colors">
            <Edit3 className="w-4 h-4 text-white" />
            フィードバック記入
          </button>
        </div>
      </div>

      {/* 3 Column Layout */}
      <div className="flex gap-4 h-96">
        {months.map((month, index) => (
          <div 
            key={month.period} 
            className={`flex-1 bg-white rounded-xl shadow-lg p-4 border-2 ${
              index === 1 ? "border-green-300 z-10" : "border-gray-200 opacity-75"
            }`}
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">{month.period}</h3>
            </div>
            
            <div className="space-y-4">
              {month.goals.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  目標がありません
                </div>
              ) : (
                month.goals.map((goal, goalIndex) => (
                  <div key={goalIndex} className="bg-gray-100 rounded-xl p-4">
                    <div className="font-bold text-sm mb-2 text-gray-900">
                      {goal.text}
                    </div>
                    <div className="text-gray-500 text-xs whitespace-pre-line">
                      {goal.feedback || " "}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Key Features */}
      <div className="mt-6 bg-green-50 rounded-xl p-4 border border-green-200">
        <div className="text-center">
          <h4 className="font-semibold text-green-900 mb-2">📝 シンプルな月間目標管理</h4>
          <div className="flex justify-center gap-6 text-sm text-green-700">
            <span>• 月単位でのテキスト目標設定</span>
            <span>• 振り返りフィードバック機能</span>
          </div>
        </div>
      </div>
    </div>
  );
}