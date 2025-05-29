'use client';

import { MemberContainer } from "../components/memberContainer";
import { useProfileList } from "../hooks/useProfileList";
import { PopUp } from "@/components/display/PopUp";
import { ProfileDetailPopUpChildren } from "@/components/modal/ProfileDetailPopUpChildren";
import { usePopUp } from "@/hooks/usePopUp";

export default function IndexPage() {
  const { profiles, loading, error } = useProfileList();
  const { isOpen, selectedData, openPopUp, closePopUp } = usePopUp();

  const handleProfileClick = (userId: string) => {
    openPopUp(userId);
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {profiles.map((profile) => (
          <MemberContainer
            key={profile.userId}
            username={profile.username}
            avatarImageUrl={profile.avatarImageUrl}
            bio={profile.bio}
            personalColor={profile.personalColor}
            onClick={() => handleProfileClick(profile.userId)}
          />
        ))}
      </div>
      <PopUp isOpen={isOpen} onClose={closePopUp}>
        {selectedData && <ProfileDetailPopUpChildren userId={selectedData} />}
      </PopUp>
    </>
  );
}
