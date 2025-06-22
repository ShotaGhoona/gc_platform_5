import { Card } from "@/components/ui/card";

export function MemberDemoScreen() {
  const members = [
    { name: "田中", color: "#5F7392" },
    { name: "佐藤", color: "#D68897" },
    { name: "山田", color: "#7BA05B" },
    { name: "鈴木", color: "#B8860B" },
    { name: "高橋", color: "#8B4513" },
    { name: "伊藤", color: "#DC143C" }
  ];

  return (
    <div className="p-5 h-full flex-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">メンバー</h2>
          <p className="text-xs text-gray-600">{members.length}名</p>
        </div>
        
        <input 
          type="text" 
          placeholder="検索..." 
          className="px-3 py-1 border rounded text-sm w-32"
        />
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-3 gap-3 h-full max-h-[calc(100%-4rem)]">
        {members.map((member, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
            {/* Header with personal color */}
            <div 
              className="h-8 flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: member.color }}
            >
              {member.name}
            </div>
            
            {/* Avatar section */}
            <div className="p-3 text-center">
              <div className="w-10 h-10 bg-gray-200 rounded mx-auto"></div>
            </div>
            
            {/* Bio section */}
            <div className="bg-[#5D6B80] text-white p-2 text-center">
              <p className="text-xs">朝活メンバー</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}