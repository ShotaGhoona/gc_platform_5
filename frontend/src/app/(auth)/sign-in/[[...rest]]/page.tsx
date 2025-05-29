import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <img src="/images/sign-in-bg.jpg" alt="sign-in-bg" className="absolute top-0 left-0 w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="w-1/2 h-full flex justify-center items-center z-10">
        <div className="flex items-center justify-center">
          <img src="/svg/logo.svg" alt="logo" className="w-30 h-30" />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-white">welcome to</h1>
            <p className="text-4xl font-bold text-white">GhoonaCamp</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center">
        <SignIn />
      </div>
    </div>
  );
} 