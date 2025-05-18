'use client';

import { MemberContainer } from "../components/memberContainer";
import { useProfileList } from "../hooks/useProfileList";
import { PopUp } from "@/components/display/PopUp";
import { ProfileDetailModal } from "@/components/ProfileDetailModal";
import { useState } from "react";

export default function IndexPage() {
  const { profiles, loading, error } = useProfileList();
  const [showProfileDetailModal, setShowProfileDetailModal] = useState<string | null>(null);

  if (loading) {
    return <div>読み込み中...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {profiles.map((profile) => (
          <MemberContainer
            key={profile.userId}
            username={profile.username}
            avatarImageUrl={profile.avatarImageUrl}
            bio={profile.bio}
            onClick={() => setShowProfileDetailModal(profile.userId)}
          />
        ))}
      </div>
      <PopUp isOpen={!!showProfileDetailModal} onClose={() => setShowProfileDetailModal(null)}>
        {showProfileDetailModal && (
          <ProfileDetailModal
            userId={showProfileDetailModal}
          />
        )}
      </PopUp>
    </>
  );
}
