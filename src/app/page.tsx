"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 gap-6">
      <img
        src="/Expertizo-logo.png"
        alt="Expertizo Logo"
        width={300}
        height={100}
        className="w-auto h-auto max-w-[300px]"
      />

      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome to Expertizo Quiz Challenge
      </h1>

      <button
        onClick={() => router.push("/quiz")}
        className="text-xl font-[400] px-4 py-2 bg-[#dcdedc] border border-black rounded-md hover:bg-[#9f9f9f] transition-colors cursor-pointer w-[200px]"
      >
        Get Started
      </button>
    </div>
  );
}
