import { currentUser } from "@clerk/nextjs/server";

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="w-full h-[45px] flex items-center justify-between px-4 bg-white shadow-lg">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">GhoonaCamp</h1>
      </div>
      <div className="flex items-center gap-4">
      <p className="text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
        <div className="w-[20px] h-[20px] bg-[#5D6B80] rounded-full"></div>
      </div>
    </header>
  );
}
