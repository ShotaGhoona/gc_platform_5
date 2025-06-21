'use client';

import { ProfileCard } from './ProfileCard';
import { ProfileResponse } from '../types/profile';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProfileDetailModal } from "./ProfileDetailModal";
import { PiCursorClickFill } from "react-icons/pi";
import RankerContainer from "@/feature/morning/ranking/components/RankerContainer";

type Props = {
  formData: ProfileResponse | any;
};

export const ProfilePreview = ({ formData }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-10 relative">
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-[300px] top-0 left-0 relative group cursor-pointer">
            <ProfileCard
              href={formData?.avatarImageUrl || ''}
              alt={formData?.username || ''}
              username={formData?.username || ''}
              bio={formData?.bio || ''}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="opacity-80 flex items-center gap-2 group-hover:opacity-100 transition bg-[#5D6B80] text-white text-xs px-4 py-1 rounded-full shadow-lg animate-bounce">
                クリックで詳細表示
                <PiCursorClickFill className="text-2xl" />
              </span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="min-w-[300px] md:min-w-[1000px]">
          <ProfileDetailModal formData={formData} />
        </DialogContent>
      </Dialog>
      <div className="w-[400px]">
        <RankerContainer
          name={formData?.username || ''}
          profileIconUrl={formData?.avatarImageUrl || ''}
          bio={formData?.bio || ''}
          score={'20'}
          onProfileClick={() => {}}
          scoreSuffix={`回`}
        />
        <RankerContainer
          name={formData?.username || ''}
          profileIconUrl={formData?.avatarImageUrl || ''}
          bio={formData?.bio || ''}
          score={'16'}
          onProfileClick={() => {}}
          scoreSuffix={`回`}
        />
      </div>
    </div>
  );
};
