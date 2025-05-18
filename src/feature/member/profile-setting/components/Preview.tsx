'use client';

import { ProfileCard } from './ProfileCard';
import { ProfileResponse } from '../types/profile';
import { useState } from 'react';
import { PopUp } from "@/components/display/PopUp";
import { ProfileDetailModal } from "./ProfileDetailModal";
type Props = {
  formData: ProfileResponse | any;
};

export const ProfilePreview = ({ formData }: Props) => {
  const [showProfileDetailModal, setShowProfileDetailModal] = useState<string | null>(null);
  return (
    <div className="flex justify-center items-center w-full gap-4 relative">
      <div 
        className="w-[300px] top-0 left-0"
        onClick={() => setShowProfileDetailModal(formData?.userId || '')}
      >
        <ProfileCard
          href={formData?.avatarImageUrl || ''}
          alt={formData?.username || ''}
          username={formData?.username || ''}
          bio={formData?.bio || ''}
        />
      </div>
      <PopUp isOpen={!!showProfileDetailModal} onClose={() => setShowProfileDetailModal(null)}>
        {showProfileDetailModal && (
          <ProfileDetailModal
            formData={formData}
          />
        )}
      </PopUp>
    </div>
  );
};
