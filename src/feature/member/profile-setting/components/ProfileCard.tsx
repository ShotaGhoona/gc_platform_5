export const ProfileCard = ({href, alt, username, bio}: {href: string, alt: string, username: string, bio: string}) => {
  return (
    <div className="w-[300px]">
      <div className="bg-[#374559] h-[50px] flex items-center justify-end pr-4 rounded-t-[20px]">
        <p className="text-white text-sm">{username}</p>
      </div>
      <div>
        <img src={href} alt={alt} className="w-full h-auto aspect-square"/>
      </div>
      <div className="bg-[#374559] h-[50px] flex items-center justify-center rounded-b-[20px]">
        <p className="text-white text-sm">{bio}</p>
      </div>
    </div>
  );
};