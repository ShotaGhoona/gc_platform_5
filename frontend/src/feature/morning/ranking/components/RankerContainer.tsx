type Props = {
  name: string;
  profileIconUrl: string;
  bio: string;
  score: string | number;
  scoreSuffix?: string;
  onProfileClick: () => void;
};

export default function RankerContainer({ name, profileIconUrl, bio, score, scoreSuffix, onProfileClick }: Props) {
  return (
    <div 
      className="flex w-full gap-5 items-center p-2 justify-between hover:bg-gray-100 transition-colors cursor-pointer rounded-lg" 
      onClick={onProfileClick}
    >
      <img src={profileIconUrl} alt={name} className="size-12 rounded-full" />
      <div className="flex flex-col">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-xs text-gray-500">{bio}</p>
      </div>
      <div className="flex-1 h-[2px] bg-gray-100"></div>
      <div className="text-center flex items-center justify-center font-bold">
        {score}{scoreSuffix}
      </div>
    </div>
  );
}
