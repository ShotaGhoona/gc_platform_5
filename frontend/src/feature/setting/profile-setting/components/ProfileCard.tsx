export const ProfileCard = ({
  href, alt, username, bio
}: {
  href: string;
  alt: string;
  username: string;
  bio: string;
}) => {
  return (
    <div className="w-[300px]">
      <div className="h-[50px] flex items-center justify-end pr-4 rounded-t-[20px] bg-primary"
      >
        <p className="text-white text-sm font-bold">{username}</p>
      </div>
      <div>
        <img src={href} alt={alt} className="w-full h-auto aspect-square object-cover"/>
      </div>
      <div className="h-[50px] flex items-center justify-center rounded-b-[20px] bg-primary"
      >
        <p className="text-white text-sm font-bold">{bio}</p>
      </div>
    </div>
  );
};