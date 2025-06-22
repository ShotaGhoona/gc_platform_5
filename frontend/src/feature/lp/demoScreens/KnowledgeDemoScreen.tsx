import { Card } from "@/components/ui/card";

export function KnowledgeDemoScreen() {
  const knowledgeItems = [
    { title: "効果的な朝活の始め方", category: "基本", author: "運営チーム", views: 128 },
    { title: "継続するための5つのコツ", category: "継続", author: "田中", views: 89 },
    { title: "朝の運動メニュー", category: "運動", author: "佐藤", views: 67 },
    { title: "時間管理術", category: "効率", author: "山田", views: 45 }
  ];

  const categoryColors = {
    "基本": "bg-blue-100 text-blue-800",
    "継続": "bg-green-100 text-green-800",
    "運動": "bg-orange-100 text-orange-800",
    "効率": "bg-purple-100 text-purple-800"
  };

  return (
    <div className="p-5 h-full flex-1">
      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="ナレッジを検索..." 
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button className="px-4 py-2 border border-gray-300 rounded text-gray-600">
            カテゴリ
          </button>
        </div>
        
        <button className="px-4 py-2 bg-[#5D6B80] text-white rounded font-medium">
          + 投稿する
        </button>
      </div>

      {/* Knowledge Grid */}
      <div className="grid grid-cols-2 gap-4 h-full">
        {knowledgeItems.map((item, index) => (
          <Card key={index} className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>
                {item.category}
              </span>
              <span className="text-xs text-gray-500">{item.views} views</span>
            </div>
            
            <h3 className="font-bold text-gray-900 mb-3 leading-tight">{item.title}</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">{item.author}</span>
              </div>
              <span className="text-xs text-gray-500">2日前</span>
            </div>
            
            {/* Content preview */}
            <div className="mt-3 text-sm text-gray-600 line-clamp-2">
              朝活を成功させるためのポイントについて詳しく解説します。継続的な習慣形成に役立つ情報をお届け...
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}