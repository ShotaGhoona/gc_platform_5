import { useTodayLiveProfiles } from "../hooks/useDashboardMainContnts";

type Props = {
  onProfileClick: (userId: string) => void;
};

export default function TodayLive({ onProfileClick }: Props) {
  const { profiles, loading, error } = useTodayLiveProfiles();

  return (
    <div className="w-full h-full min-h-0 flex flex-col items-center justify-center">
      <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-wrap items-center justify-center gap-4 p-4">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && Array.isArray(profiles) && profiles.length === 0 && <div>参加者なし</div>}
        {(Array.isArray(profiles) ? profiles : []).map((profile) => (
          <div 
            key={profile.user_id} 
            className="flex flex-col items-center gap-1 cursor-pointer hover:bg-gray-100 rounded-lg p-2" 
            onClick={() => onProfileClick(profile.user_id)}
          >
            <img
              src={profile.avatar_image_url || "images/profile/sampleProfileIcon.png"}
              alt={profile.username}
              className="w-20 h-20 rounded-full object-cover bg-gray-200"
            />
            <p className="text-sm">{profile.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
