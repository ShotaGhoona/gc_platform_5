import { ReactNode } from 'react';

type PopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const PopUp = ({ isOpen, onClose, children }: PopUpProps) => {
  return (
    <div className='z-10'>
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div className={`flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      w-[60%] min-h-[70%] h-[70%] max-h-[90%] rounded-lg shadow-xl transition-all duration-300 gap-10 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`}
      >
        {/* ポップアップパネル */}
        <div
            className={`flex-1 h-[100%] bg-white rounded-lg shadow-xl transition-all duration-300`}
        >
            <div className="flex flex-col h-[100%]">
              {/* ヘッダー */}
              <div className="flex justify-end px-2 pt-2">
                  <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-bold"
                  >
                  ×
                  </button>
              </div>

              {/* コンテンツエリア */}
              <div className="flex-1 px-6 pb-6 min-h-0 flex flex-col">
                  {children}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
