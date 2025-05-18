type Props = {
  username: string;
  avatarImageUrl: string;
  bio: string;
  onClick?: () => void;
};

export const MemberContainer = ({ username, avatarImageUrl, bio, onClick }: Props) => {
  return (
    <div className="shadow-lg rounded-[20px]" onClick={onClick}>
      <div className="bg-[#5D6B80] h-[30px] flex items-center justify-end pr-4 rounded-t-[20px]">
        <p className="text-white text-xs font-bold">{username}</p>
      </div>
      <div>
        <img
          src={avatarImageUrl}
          className="w-full h-auto aspect-square"
          alt={username + "のアバター"}
        />
      </div>
      <div className="bg-[#5D6B80] h-[30px] flex items-center justify-center pr-4 rounded-b-[20px]">
        <p className="text-white text-[10px] font-bold">{bio}</p>
      </div>
    </div>
  );
};
