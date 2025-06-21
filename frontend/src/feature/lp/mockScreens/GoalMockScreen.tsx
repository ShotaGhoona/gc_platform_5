import { Target, Calendar, CheckCircle, Users, TrendingUp, Plus } from "lucide-react";

export function GoalMockScreen() {
  const currentGoals = [
    {
      id: 1,
      title: "毎日英語学習1時間",
      progress: 70,
      daysLeft: 16,
      category: "勉強",
      color: "from-blue-400 to-blue-600",
      completed: false
    },
    {
      id: 2, 
      title: "月間読書3冊完読",
      progress: 100,
      daysLeft: 0,
      category: "読書",
      color: "from-green-400 to-green-600", 
      completed: true
    },
    {
      id: 3,
      title: "週5回ランニング",
      progress: 85,
      daysLeft: 16,
      category: "運動",
      color: "from-orange-400 to-red-500",
      completed: false
    }
  ];

  const communityGoals = [
    { user: "田中さん", goal: "TOEIC800点突破", progress: 60 },
    { user: "佐藤さん", goal: "副業月5万円達成", progress: 80 },
    { user: "山田さん", goal: "フルマラソン完走", progress: 45 }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 min-h-[400px]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-900">月間目標</h2>
              <p className="text-green-700">12月の目標進捗</p>
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Monthly Progress Overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-green-200 text-center">
          <div className="text-lg font-bold text-green-900">3</div>
          <div className="text-xs text-green-600">設定済み目標</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-green-200 text-center">
          <div className="text-lg font-bold text-green-900">1</div>
          <div className="text-xs text-green-600">達成済み</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-green-200 text-center">
          <div className="text-lg font-bold text-green-900">16</div>
          <div className="text-xs text-green-600">残り日数</div>
        </div>
      </div>

      {/* Personal Goals */}
      <div className="mb-6">
        <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          あなたの目標
        </h3>
        
        <div className="space-y-3">
          {currentGoals.map((goal) => (
            <div
              key={goal.id}
              className={`
                bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200 transition-all duration-300
                ${goal.completed ? 'ring-2 ring-green-400' : 'hover:shadow-md'}
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    ${goal.completed ? 'bg-green-500' : `bg-gradient-to-r ${goal.color}`}
                  `}>
                    {goal.completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Target className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">{goal.title}</h4>
                    <p className="text-sm text-green-600">{goal.category}</p>
                  </div>
                </div>
                
                {goal.completed ? (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    達成！
                  </span>
                ) : (
                  <span className="text-sm text-green-700 font-medium">
                    あと{goal.daysLeft}日
                  </span>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`
                    h-2 rounded-full transition-all duration-500
                    ${goal.completed ? 'bg-green-500' : `bg-gradient-to-r ${goal.color}`}
                  `}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm font-medium text-green-800">{goal.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Goals */}
      <div>
        <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
          <Users className="w-5 h-5" />
          仲間の目標
        </h3>
        
        <div className="space-y-2">
          {communityGoals.map((member, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-medium">
                    {member.user[0]}
                  </div>
                  <div>
                    <p className="font-medium text-green-900 text-sm">{member.user}</p>
                    <p className="text-xs text-green-600">{member.goal}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-green-800 w-8">{member.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation */}
      <div className="mt-6 bg-green-500 rounded-xl p-4 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold">今月の目標達成率</span>
        </div>
        <div className="text-2xl font-bold">85%</div>
        <p className="text-sm opacity-90">仲間と一緒に頑張ろう！</p>
      </div>
    </div>
  );
}