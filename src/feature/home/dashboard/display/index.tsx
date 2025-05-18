
'use client';

import { ProfileSection } from './ProfileSection';
import { ActivityGraph } from './ActivityGraph';
import { StatusCard } from './StatusCard';
import { TierCard } from './TierCard';
import { TierCardList } from './TierCardList';
import { useUser } from '@clerk/nextjs';
export default function DashboardPage() {
  const { user } = useUser();
  const userId = user?.id;
  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="flex h-[400px] gap-5">
        <div className="w-[400px] h-full bg-white rounded-lg">
          {userId && <TierCard userId={userId} />}
        </div>
        <div className="flex-1 h-full">
          <ProfileSection />
        </div>
      </div>
      <div className="flex-1 flex gap-3">
        <div className="flex-1 h-full bg-white rounded-lg">
          <ActivityGraph />
        </div>
        <div className="flex-1 h-full bg-white rounded-lg">
          <StatusCard/>
        </div>
        <div className="flex-1 h-full bg-white rounded-lg">
          <ActivityGraph />
        </div>
      </div>
      <div className="bg-white rounded-lg w-full h-[120px]">
        {/* {userId && <TierCardList userId={userId} />} */}
      </div>
    </div>
  );
}