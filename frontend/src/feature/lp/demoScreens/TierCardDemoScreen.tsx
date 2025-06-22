import { Card } from "@/components/ui/card";

export function TierCardDemoScreen() {
  const tiers = [
    { name: "ブロンズ", unlocked: true, bgColor: "bg-orange-100", textColor: "text-orange-800" },
    { name: "シルバー", unlocked: true, bgColor: "bg-gray-100", textColor: "text-gray-800" },
    { name: "ゴールド", unlocked: true, bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
    { name: "プラチナ", unlocked: false, bgColor: "bg-blue-100", textColor: "text-blue-800" },
    { name: "ダイヤ", unlocked: false, bgColor: "bg-purple-100", textColor: "text-purple-800" },
    { name: "マスター", unlocked: false, bgColor: "bg-red-100", textColor: "text-red-800" }
  ];

  return (
    <div className="p-5 h-full flex-1">
      <div className="grid grid-cols-3 gap-6 h-full">
        {tiers.map((tier, index) => (
          <Card 
            key={index} 
            className={`aspect-square cursor-pointer hover:shadow-lg transition-all duration-200 ${
              tier.unlocked ? '' : 'opacity-50 filter blur-sm grayscale'
            }`}
          >
            <div className={`h-full p-6 flex flex-col items-center justify-center ${tier.bgColor}`}>
              {/* Tier Icon/Image placeholder */}
              <div className={`w-20 h-20 rounded-full ${tier.unlocked ? 'bg-white' : 'bg-gray-300'} mb-4 flex items-center justify-center`}>
                <div className={`w-12 h-12 rounded-full ${tier.unlocked ? tier.bgColor : 'bg-gray-400'}`}></div>
              </div>
              
              {/* Tier Name */}
              <h3 className={`text-lg font-bold ${tier.textColor} mb-2`}>
                {tier.name}
              </h3>
              
              {/* Status */}
              <div className="text-center">
                {tier.unlocked ? (
                  <div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${tier.bgColor} ${tier.textColor}`}>
                      達成済み
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {30 + index * 30}日達成
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                      未達成
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      あと{(index - 2) * 30}日
                    </p>
                  </div>
                )}
              </div>
              
              {/* Lock indicator for locked tiers */}
              {!tier.unlocked && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}