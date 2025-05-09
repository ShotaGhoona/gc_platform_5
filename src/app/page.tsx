import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  // ログインしていない場合はサインインページにリダイレクト
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">プロフィール</h1>
          <SignOutButton>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
              ログアウト
            </button>
          </SignOutButton>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">ユーザー情報</h2>
              <p className="text-gray-600">メールアドレス: {user?.emailAddresses[0]?.emailAddress}</p>
              <p className="text-gray-600">ユーザー名: {user?.username || "未設定"}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">アカウント情報</h2>
              <p className="text-gray-600">アカウント作成日: {new Date(user?.createdAt || 0).toLocaleString()}</p>
              <p className="text-gray-600">最終更新日: {new Date(user?.updatedAt || 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
