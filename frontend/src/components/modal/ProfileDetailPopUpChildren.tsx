import { useProfileDetail } from "@/hooks/useProfileDetail";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { AiFillTikTok, AiOutlineGlobal } from "react-icons/ai";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { PiXLogoBold } from "react-icons/pi";
import CommonButton from "../common/commonButton";
import { BsFire } from "react-icons/bs";
import { MdWaterDrop } from "react-icons/md";

type Props = {
  userId: string;
};

export const ProfileDetailPopUpChildren = ({ userId }: Props) => {
  const { user } = useUser();
  const viewerId = user?.id ?? "";
  const { profile, loading, error } = useProfileDetail(userId, viewerId);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return null;

  return (
    <div className="px-8 flex flex-col gap-8 justify-between h-full">
      <div className="flex flex-col h-full gap-5">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <p className="text-center text-sm font-bold text-gray-500">{profile.username}</p>
            <p className="flex-1 text-sm text-gray-500"><span className="text-gray-500 text-xs">since</span> {profile.createdAt}</p>
          </div>
          
          <div className="flex-1 flex justify-end items-center gap-2">
            {profile.sns.map((sns) => {
              let Icon = null;
              switch (sns.name.toLowerCase()) {
                case "instagram":
                case "insta":
                  Icon = GrInstagram;
                  break;
                case "facebook":
                  Icon = FaFacebookSquare;
                  break;
                case "x":
                case "twitter":
                  Icon = PiXLogoBold;
                  break;
                case "github":
                  Icon = FaGithub;
                  break;
                case "linkedin":
                  Icon = FaLinkedin;
                  break;
                case "website":
                case "web":
                  Icon = AiOutlineGlobal;
                  break;
                case "tiktok":
                  Icon = AiFillTikTok;
                  break;
                default:
                  Icon = AiOutlineGlobal;
              }
              return (
                <Link
                  key={sns.name}
                  href={sns.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={sns.description || sns.name}
                  className="group relative"
                >
                  <Icon className="text-gray-200 text-xl group-hover:text-[#5F7392] transition-all duration-300" />
                  {sns.description && (
                    <span className="absolute top-[-2.2rem] left-1/2 -translate-x-1/2 z-10 whitespace-nowrap bg-gray-200 text-gray-800 text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition">
                      {sns.description}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
        {/* 上 */}
        <div className="flex justify-between items-center gap-8 w-full">
          <div className="w-[200px] h-[200px] flex items-center justify-center rounded-lg shadow-md">
            <img
              src={profile.avatarImageUrl}
              alt={profile.username + "のアバター"}
              className="aspect-square object-cover rounded-lg shadow-md"
            />
          </div>
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
          <div className="flex w-1/2 h-full flex-col p-5 bg-gray-50 rounded-lg gap-2 shadow-md">
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
          <div className="flex w-1/2 h-full flex-col p-5 bg-gray-50 rounded-lg gap-2 shadow-md">
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
        <div className="flex justify-between gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-[#5D6B80]">獲得 Tier Cards</h3>
            <div className="flex flex-wrap gap-2">
              {profile.tiers.map((tier) => (
                <div className="flex flex-col items-center gap-2 rounded-lg p-2"
                style={{ backgroundColor: tier.badgeColor }}
                >
                  <div className="flex items-center gap-2">
                    <img src={`/images/tier-back-transparent/${tier.id}.png`} alt={tier.titleEn} className="size-10" />
                </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end justify-end">
            {viewerId !== userId && (
              <>
                {profile.isRival ? (
                  <CommonButton
                    onClick={async () => {
                      try {
                        await import("@/feature/morning/rival/services/rivalService").then(({ removeRival }) =>
                          removeRival(viewerId, userId)
                        );
                        window.location.reload();
                      } catch (e: any) {
                        alert(e.message || "ライバル解除に失敗しました");
                      }
                    }}
                    icon={<MdWaterDrop />}
                    label="ライバル解除"
                    className="bg-gray-200 text-gray-500"
                  />
                ) : (
                  <CommonButton
                    onClick={async () => {
                      try {
                        await import("@/feature/morning/rival/services/rivalService").then(({ addRival }) =>
                          addRival(viewerId, userId)
                        );
                        window.location.reload();
                      } catch (e: any) {
                        alert(e.message || "ライバル追加に失敗しました");
                      }
                    }}
                    icon={<BsFire />}
                    label="ライバルに設定"
                    className="bg-[#D68897] text-white"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
