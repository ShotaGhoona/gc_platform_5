import { useState } from 'react';

type UsePopUpReturn = {
  isOpen: boolean;
  selectedData: any | null;
  openPopUp: (data?: any) => void;
  closePopUp: () => void;
};

export const usePopUp = (): UsePopUpReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const openPopUp = (data: any = null) => {
    setSelectedData(data);
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
    setSelectedData(null);
  };

  return {
    isOpen,
    selectedData,
    openPopUp,
    closePopUp,
  };
};
