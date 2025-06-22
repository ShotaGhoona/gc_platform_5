import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-200/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-20 hidden lg:block">
        <div className="relative animate-float">
          <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-purple-300/20 rounded-2xl rotate-12 shadow-lg backdrop-blur-sm"></div>
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent rounded-full shadow-md"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-400 rounded-full shadow-sm"></div>
        </div>
      </div>

      <div className="absolute top-32 left-16 hidden lg:block">
        <div className="relative animate-float-delayed">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-200/30 to-accent/30 rounded-xl -rotate-6 shadow-md backdrop-blur-sm"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full shadow-sm"></div>
        </div>
      </div>

      <div className="absolute bottom-32 left-1/4 hidden lg:block">
        <div className="relative animate-float-slow">
          <div className="w-16 h-16 bg-gradient-to-bl from-purple-200/25 to-pink-300/25 rounded-2xl rotate-45 shadow-lg backdrop-blur-sm"></div>
          <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-pink-400 rounded-full shadow-md"></div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 z-10">
        <div className="flex items-center justify-center mb-4">
          <img src="/svg/logo.svg" alt="logo" className="w-16 h-16 mr-3" />
          <div className="flex flex-col">
            <h1 className="text-lg font-medium text-gray-600">welcome to</h1>
            <p className="text-3xl font-bold text-gray-900">GhoonaCamp</p>
          </div>
        </div>
        <p className="text-gray-600 max-w-md mx-auto">朝活コミュニティへようこそ。早起きの習慣で人生を変えましょう。</p>
      </div>

      {/* Sign In Form */}
      <div className="z-10">
        <SignIn />
      </div>
    </div>
  );
} 