import { useState } from 'react';

type UseSidePeakReturn = {
  isOpen: boolean;
  selectedData: any | null;
  openSidePeak: (data: any) => void;
  closeSidePeak: () => void;
};

export const useSidePeak = (): UseSidePeakReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const openSidePeak = (data: any) => {
    setSelectedData(data);
    setIsOpen(true);
  };

  const closeSidePeak = () => {
    setIsOpen(false);
    setSelectedData(null);
  };

  return {
    isOpen,
    selectedData,
    openSidePeak,
    closeSidePeak,
  };
};
