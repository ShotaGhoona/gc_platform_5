import { ProfileResponse } from "../types/profile";
import { useInterestCoreskillTags } from "../hooks/useInterestCoreskillTags";

type Props = {
  formData: ProfileResponse | any;
};
export const ProfileDetailModal = ({ formData }: Props) => {
  const { interests: masterInterests, coreSkills: masterCoreSkills } = useInterestCoreskillTags();

  // id配列→name/color変換
  const interestList = Array.isArray(formData.interests)
    ? formData.interests.map((id: any) => {
        const tag = masterInterests.find((t) => String(t.id) === String(id));
        return tag ? { name: tag.name, color: tag.color } : { name: "-", color: "#f3f4f6" };
      })
    : [];

  const coreSkillList = Array.isArray(formData.coreSkills)
    ? formData.coreSkills.map((id: any) => {
        const tag = masterCoreSkills.find((t) => String(t.id) === String(id));
        return tag ? { name: tag.name, color: tag.color } : { name: "-", color: "#f3f4f6" };
      })
    : [];

  return (
    <div className="px-8 flex flex-col gap-8 justify-between h-full">
      <div className="flex flex-col h-full gap-5">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">参加日：</p>
          <p className="text-sm text-gray-500">{formData.username}</p>
        </div>
        {/* 上 */}
        <div className="flex justify-between items-center gap-8">
          <div className="w-[250px] h-[250px] aspect-square object-cover">
            <img
              src={formData.avatarImageUrl || "/images/profile/sampleProfileIcon.png"}
              alt={formData.username + "のアバター"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <h3 className="text-lg font-bold text-[#5D6B80]">One-Line Profile</h3>
              <p className="
              text-xl font-bold text-center rounded-lg p-5
              text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
              ">
                {formData.oneLineProfile || formData.oneLine || formData.one_line_profile || "未設定"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#5D6B80]">Background</h3>
              <p className="text-sm text-gray-500">{formData.background || "未設定"}</p>
            </div>
          </div>
        </div>
        {/* 中 */}
        <div className="flex justify-between items-center gap-8">
          <div className="flex w-1/2 flex-col p-5 bg-gray-50 rounded-lg gap-2">
            <h3 className="text-lg font-bold text-[#5D6B80]">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interestList.length > 0 ? (
                interestList.map((interest: { name: string; color: string }, idx: number) => (
                  <p
                    key={idx}
                    className="text-sm text-gray-500"
                    style={{ backgroundColor: interest.color || "#f3f4f6" }}
                  >
                    #{interest.name || "-"}
                  </p>
                ))
              ) : (
                <span className="text-xs text-gray-400">未設定</span>
              )}
            </div>
          </div>
          <div className="flex w-1/2 flex-col p-5 bg-gray-50 rounded-lg gap-2">
            <h3 className="text-lg font-bold text-[#5D6B80]">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {coreSkillList.length > 0 ? (
                coreSkillList.map((skill: { name: string; color: string }, idx: number) => (
                  <div className="flex items-center gap-2" key={idx}>
                    <p
                      className="text-sm text-gray-500"
                      style={{ backgroundColor: skill.color || "#f3f4f6" }}
                    >
                      {skill.name || "-"}
                    </p>
                  </div>
                ))
              ) : (
                <span className="text-xs text-gray-400">未設定</span>
              )}
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
