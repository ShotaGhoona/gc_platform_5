"use client";
import { useTierGrantAndPopup } from "@/feature/tier/hooks/useTierGrantAndPopup";
import { PopUp } from "@/components/display/PopUp";
import TierPopUpContent from "@/feature/tier/components/TierPopUpContent";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function TierLoginPopupTrigger() {
  const { user } = useUser();
  const { isOpen, selectedData, closePopUp, grantAndShowTier } = useTierGrantAndPopup();

  useEffect(() => {
    if (!user?.id) return;
    grantAndShowTier(user.id, "login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <PopUp isOpen={isOpen} onClose={closePopUp}>
      {selectedData && (
        <TierPopUpContent
          card_image_url={selectedData.card_image_url}
          title_en={selectedData.title_en}
          title_ja={selectedData.title_ja}
          short_description={selectedData.short_description}
          long_description={selectedData.long_description}
        />
      )}
    </PopUp>
  );
}
