"use client"

import { useRouter } from "next/navigation"

export default function ResultScreen({
  score,
  total,
}: {
  score: number
  total: number
}) {
  const router = useRouter()
  const scorePercent = (score / total) * 100

  const handleGoHome = () => {
    // Clear saved quiz state
    localStorage.removeItem("quizState")

    // Navigate directly home
    router.push("/")
  }

  return (
  
      <div className="flex flex-col gap-6 items-center text-center bg-white ">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700">
          Quiz Completed!
        </h2>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-semibold">
          You answered {score} out of {total} questions correctly.
        </p>

        {scorePercent >= 50 ? (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-green-600">
            🎉 Congratulations! You Passed the Quiz!
          </p>
        ) : (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-red-500">
            Sorry! You Failed. Better luck next time 😊
          </p>
        )}

        <button
          onClick={handleGoHome}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-[400] 
          px-4 py-2 bg-[#dcdedc] border border-black rounded-md 
          hover:bg-[#9f9f9f] transition-colors cursor-pointer w-[200px]"
        >
          Go to Home
        </button>
      </div>
    
  )
}
