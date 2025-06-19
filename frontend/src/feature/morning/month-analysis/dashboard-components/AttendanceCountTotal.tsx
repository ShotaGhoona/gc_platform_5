export default function AttendanceCountTotal() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
        <p className="text-xs font-bold text-gray-500">総出席日数</p>
        <div className="flex-1 flex items-center justify-center">
            <h2 className="text-8xl font-bold text-gray-500">120<span className="text-2xl">回</span></h2>
        </div>
    </div>
  );
}
