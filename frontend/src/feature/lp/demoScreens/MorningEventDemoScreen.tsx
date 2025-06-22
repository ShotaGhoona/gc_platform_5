import { Card } from "@/components/ui/card";

export function MorningEventDemoScreen() {
  const mockEvents = [
    { title: "朝ヨガ", joined: true },
    { title: "英語学習", joined: false },
    { title: "読書会", joined: true },
    { title: "瞑想", joined: false }
  ];

  return (
    <div className="p-5 h-full flex-1">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-[#5D6B80] text-white rounded text-sm">
            ギャラリー
          </button>
          <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-sm">
            カレンダー
          </button>
        </div>
        
        <button className="px-3 py-1 bg-[#D68897] text-white rounded text-sm">
          + 追加
        </button>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-2 gap-4 h-full max-h-[calc(100%-4rem)]">
        {mockEvents.map((event, index) => (
          <Card key={index} className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
            event.joined ? 'ring-2 ring-[#5D6B80]' : ''
          }`}>
            {/* Background */}
            <div className="h-20 bg-gradient-to-br from-gray-100 to-gray-200 relative">
              {/* Joined indicator */}
              {event.joined && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-[#5D6B80] rounded-full"></div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-3">
              <h3 className="font-bold text-gray-900 text-sm">{event.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-xs text-gray-600">主催者</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}