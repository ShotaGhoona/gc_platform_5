type Props = {
  username: string;
  avatarImageUrl: string;
  bio: string;
  personalColor: string;
};
// shadcnのdialogを使用するため、onClickを削除
export const MemberContainer = ({ username, avatarImageUrl, bio, personalColor }: Props) => {
  return (
    <div className="shadow-lg rounded-[20px]">
      <div
        className={`h-[30px] flex items-center justify-end pr-4 rounded-t-[20px]`}
        style={{ backgroundColor: personalColor || "#5D6B80" }}
      >
        <p className="text-white text-xs font-bold">{username}</p>
      </div>
      <div>
        <img
          src={avatarImageUrl}
          className="w-full h-auto aspect-square object-cover"
          alt={username + "のアバター"}
        />
      </div>
      <div className="bg-[#5D6B80] h-[30px] flex items-center justify-center rounded-b-[20px]">
        <p className="text-white text-[10px] font-bold">{bio}</p>
      </div>
    </div>
  );
};
