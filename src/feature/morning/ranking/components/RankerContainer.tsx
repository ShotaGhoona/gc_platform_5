export default function RankerContainer() {
  return (
    <div className="flex w-full gap-2 items-center p-2 justify-between">
        <img src="/images/profile/sampleProfile.png" alt="member.name" className="size-15 rounded-lg" />
        <div className="flex flex-col flex-1">
            <p className="text-[10px]">朝は負けません</p>
            <p className="text-lg font-bold">_syotaY0000</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-2 text-center w-10 h-10 flex items-center justify-center">1</div>
    </div>
  );
}