const AttendanceCountThisMonth = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
        <p className="text-xs font-bold text-gray-500">5月の出席日数</p>
        <div className="flex-1 flex items-center justify-center">
            <h2 className="text-8xl font-bold text-gray-500">8<span className="text-2xl">回</span></h2>
        </div>
    </div>
  );
}

const AttendanceCountTotal = () => {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
          <p className="text-xs font-bold text-gray-500">総出席日数</p>
          <div className="flex-1 flex items-center justify-center">
              <h2 className="text-8xl font-bold text-gray-500">120<span className="text-2xl">回</span></h2>
          </div>
      </div>
    );
  }

const MorningEventCountHost = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <p className="text-xs font-bold text-gray-500">5月(総)イベント開催回数</p>
            <div className="flex-1 flex items-center justify-center">
                <h2 className="text-8xl font-bold text-gray-500">
                1
                <span className="text-2xl">
                    (4)
                </span>
                </h2>
            </div>
        </div>
    );
}

const MorningEventCountParticipate = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <p className="text-xs font-bold text-gray-500">5月(総)イベント参加回数</p>
            <div className="flex-1 flex items-center justify-center">
                <h2 className="text-8xl font-bold text-gray-500">
                    5
                    <span className="text-2xl">
                        (10)
                    </span>
                </h2>
            </div>
        </div>
    );
}
export { AttendanceCountThisMonth, AttendanceCountTotal, MorningEventCountHost, MorningEventCountParticipate };