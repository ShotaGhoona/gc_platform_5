import { ProfileResponse } from "../types/profile";

type Props = {
  formData: ProfileResponse | any;
};
export const ProfileDetailModal = ({ formData }: Props) => {
  return (
    <div className="px-8 flex flex-col gap-8 justify-between h-full">
      <div className="flex flex-col h-full gap-5">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">参加日：</p>
          <p className="text-sm text-gray-500">{formData.username}</p>
        </div>
        {/* 上 */}
        <div className="flex justify-between items-center gap-8">
          <img
            src={formData.avatarImageUrl}
            alt={formData.username + "のアバター"}
            className="w-[250px] h-[250px]"
          />
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-lg font-bold text-[#5D6B80]">One-Line Profile</h3>
              <p className="
              text-xl font-bold text-center rounded-lg p-5
              text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
              ">{formData.oneLineProfile}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#5D6B80]">Background</h3>
              <p className="text-sm text-gray-500">{formData.background}</p>
            </div>
          </div>
        </div>
        {/* 中 */}
        <div className="flex justify-between items-center gap-8">
          <div className="flex w-1/2 flex-col p-5 bg-gray-50 rounded-lg gap-2">
            <h3 className="text-lg font-bold text-[#5D6B80]">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest: any) => (
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
              {formData.coreSkills.map((skill: any) => (
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
          {/* <div className="flex flex-wrap gap-2">
            {formData.tiers.map((tier: any) => (
              <div className="flex flex-col items-center gap-2 rounded-lg p-2"
              style={{ backgroundColor: tier.badgeColor }}
              >
                <div className="flex items-center gap-2">
                  <img src={`/svg/tier/${tier.cardImageUrl}.png`} alt={tier.titleEn} className="w-15 h-15" />
              </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};
