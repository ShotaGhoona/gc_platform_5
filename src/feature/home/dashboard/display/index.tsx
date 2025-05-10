'use client';

import { ProfileSection } from './ProfileSection';
import { ActivityGraph } from './ActivityGraph';
import { StatusCard } from './StatusCard';
import { TierCard } from './TierCard';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex h-[400px] gap-5">
        <div className="w-[400px] h-full bg-white rounded-lg">
          <TierCard />
        </div>
        <div className="flex-1 h-full">
          <ProfileSection />
        </div>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-3">
        <div className="flex-1 h-full bg-white rounded-lg">
          <ActivityGraph />
        </div>
        <div className="flex-1 h-full bg-white rounded-lg">
          <StatusCard/>
        </div>
        <div className="flex-1 h-full bg-white rounded-lg">
          <ActivityGraph />
        </div>
        <div className="flex-1 h-full bg-white rounded-lg">
          <StatusCard/>
        </div>
        <div className="flex-1 h-full bg-white rounded-lg">
          <ActivityGraph />
        </div>
        <div className="flex-1 h-full bg-white rounded-lg">
          <StatusCard/>
        </div>
      </div>
    </div>
  );
} 