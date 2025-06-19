type Props = {
  onSelectAI: () => void;
  onSelectManual: () => void;
};

export default function VisionSettingWaySelectPopUpChildren({ onSelectAI, onSelectManual }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 w-full h-full">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-[#5D6B80]">どうやってVisionを決める？</h1>
        <p className="text-base text-gray-500">How to decide your Vision?</p>
      </div>
      <div className="flex gap-5 w-full flex-1 items-center justify-center">
        <button
          className="w-full h-full bg-gray-200 text-[#5D6B80] font-bold py-3 rounded-lg shadow hover:bg-gray-300 transition flex items-center justify-center"
          onClick={onSelectAI}
        >
          AIと一緒に考える
        </button>
        <button
          className="w-full h-full bg-gray-200 text-[#5D6B80] font-bold py-3 rounded-lg shadow hover:bg-gray-300 transition flex items-center justify-center"
          onClick={onSelectManual}
        >
          自分で入力する
        </button>
      </div>
    </div>
  );
}
