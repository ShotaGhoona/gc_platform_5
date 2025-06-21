import { Calendar, Clock, TrendingUp, Users, Target } from "lucide-react";

export function DashboardMockScreen() {
  const today = new Date();
  const timeSlots = ["6:00", "6:30", "7:00", "7:30", "8:00"];
  const attendanceData = [85, 92, 88, 95, 78]; // Mock attendance percentages

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 min-h-[400px]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-orange-900">朝活ダッシュボード</h2>
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            LIVE
          </div>
        </div>
        <p className="text-orange-700">今日も一緒に頑張りましょう！</p>
      </div>

      {/* Time Status */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-orange-600">現在時刻</p>
              <p className="text-lg font-bold text-orange-900">6:23 AM</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-orange-600">参加者</p>
              <p className="text-lg font-bold text-orange-900">34人</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-orange-200">
        <h3 className="font-semibold text-orange-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          朝活タイムライン
        </h3>
        
        <div className="space-y-3">
          {timeSlots.map((time, index) => {
            const isActive = index === 1; // 6:30 is currently active
            const isPast = index < 1;
            
            return (
              <div key={time} className="flex items-center gap-4">
                <div className={`
                  w-12 h-8 rounded-lg flex items-center justify-center text-sm font-medium
                  ${isActive ? 'bg-orange-500 text-white' : 
                    isPast ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {time}
                </div>
                
                <div className="flex-1">
                  <div className={`
                    h-2 rounded-full 
                    ${isActive ? 'bg-orange-300' : 
                      isPast ? 'bg-green-300' : 'bg-gray-200'}
                  `}>
                    <div className={`
                      h-full rounded-full transition-all duration-500
                      ${isActive ? 'bg-orange-500 w-3/4' : 
                        isPast ? 'bg-green-500 w-full' : 'bg-gray-300 w-0'}
                    `} />
                  </div>
                </div>
                
                <div className="text-sm font-medium text-orange-800">
                  {attendanceData[index]}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Activities */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              📚
            </div>
            <span className="font-semibold text-orange-900">勉強</span>
          </div>
          <div className="text-sm text-orange-700">
            <p>• TOEIC対策</p>
            <p>• プログラミング</p>
            <p>• 読書</p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              🏃‍♂️
            </div>
            <span className="font-semibold text-orange-900">運動</span>
          </div>
          <div className="text-sm text-orange-700">
            <p>• ランニング</p>
            <p>• ヨガ</p>
            <p>• 筋トレ</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          今日の朝活 進行中...
        </div>
      </div>
    </div>
  );
}