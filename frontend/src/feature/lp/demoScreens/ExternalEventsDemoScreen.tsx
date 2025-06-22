import { Card } from "@/components/ui/card";

export function ExternalEventsDemoScreen() {
  const mockEvents = [
    { title: "朝活セミナー", location: "東京" },
    { title: "ヨガ体験会", location: "大阪" },
    { title: "読書会", location: "オンライン" },
    { title: "朝食会", location: "福岡" }
  ];

  return (
    <div className="p-5 h-full flex-1">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">セミナー</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">運動</span>
        </div>
        
        <button className="px-3 py-1 bg-[#5D6B80] text-white rounded text-sm">
          + 追加
        </button>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-2 gap-4 h-full max-h-[calc(100%-4rem)]">
        {mockEvents.map((event, index) => (
          <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            {/* Background gradient */}
            <div className="h-16 bg-gradient-to-br from-blue-400 to-purple-500"></div>
            
            {/* Content */}
            <div className="p-3">
              <h3 className="font-bold text-gray-900 text-sm mb-1">{event.title}</h3>
              <div className="text-xs text-gray-600">
                📍 {event.location}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}