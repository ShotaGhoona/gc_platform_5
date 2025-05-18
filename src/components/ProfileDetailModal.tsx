import { useProfileDetail } from "@/hooks/useProfileDetail";
type Props = {
  userId: string;
};

export const ProfileDetailModal = ({ userId }: Props) => {
  const { profile, loading, error } = useProfileDetail(userId);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return null;

  return (
    <div className="px-8 flex flex-col gap-8 justify-between h-full">
      <div className="flex flex-col h-full gap-5">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">参加日：{profile.createdAt}</p>
          <p className="text-sm text-gray-500">{profile.username}</p>
        </div>
        {/* 上 */}
        <div className="flex justify-between items-center gap-8">
          <img
            src={profile.avatarImageUrl}
            alt={profile.username + "のアバター"}
            className="w-[250px] h-[250px]"
          />
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <h3 className="text-lg font-bold text-[#5D6B80]">One-Line Profile</h3>
              <p className="
              text-xl font-bold text-center rounded-lg p-5
              text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
              ">{profile.oneLineProfile}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#5D6B80]">Background</h3>
              <p className="text-sm text-gray-500">{profile.background}</p>
            </div>
          </div>
        </div>
        {/* 中 */}
        <div className="flex justify-between items-center gap-8">
          <div className="flex w-1/2 flex-col p-5 bg-gray-50 rounded-lg gap-2">
            <h3 className="text-lg font-bold text-[#5D6B80]">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <p 
                key={interest.id} 
                className="text-sm text-gray-500"
                style={{ backgroundColor: interest.color }}
                >#{interest.name}</p>
              ))}
            </div>
          </div>
          <div className="flex w-1/2 flex-col p-5 bg-gray-50 rounded-lg gap-2">
            <h3 className="text-lg font-bold text-[#5D6B80]">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.coreSkills.map((skill) => (
                <div className="flex items-center gap-2">
                  <p 
                  key={skill.id} 
                  className="text-sm text-gray-500"
                  style={{ backgroundColor: skill.color }}
                  >{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {/* 下 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-[#5D6B80]">獲得 Tier Cards</h3>
          <div className="flex flex-wrap gap-2">
            {profile.tiers.map((tier) => (
              <div className="flex flex-col items-center gap-2 rounded-lg p-2"
              style={{ backgroundColor: tier.badgeColor }}
              >
                <div className="flex items-center gap-2">
                  <img src={`/svg/tier/${tier.cardImageUrl}.png`} alt={tier.titleEn} className="w-15 h-15" />
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
