'use client';

import { MemberContainer } from "../components/memberContainer";
import { useProfileList } from "../hooks/useProfileList";
import { ProfileDetailPopUpChildren } from "@/components/modal/ProfileDetailPopUpChildren";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default function IndexPage() {
  const { profiles, loading, error } = useProfileList();

  if (loading) {
    return <div>読み込み中...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
      {/* オリジナルのポップアップコンポーネントではなくshadcnuiのdialogを使用する */}
      {profiles.map((profile) => (
        <Dialog key={profile.userId}>
          <DialogTrigger>
            <MemberContainer
              key={profile.userId}
              username={profile.username}
              avatarImageUrl={profile.avatarImageUrl}
              bio={profile.bio}
              personalColor={profile.personalColor}
            />
          </DialogTrigger>
            <DialogContent className="min-w-[300px] md:min-w-[1000px]">
              <ProfileDetailPopUpChildren userId={profile.userId} />
          </DialogContent>
        </Dialog>

      ))}
    </div>
  );
}
