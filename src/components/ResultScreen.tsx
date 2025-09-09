import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ResultScreen({ score, total }: { score: number; total: number }) {
  const router = useRouter()
  const scorePercent = (score / total) * 100

  return (
    <div className="flex flex-col gap-4 items-center my-auto">
      <h2 className="text-5xl font-semibold text-gray-700">Quiz Completed!</h2>
      <p className="text-gray-600 font-semibold text-2xl">
        You answered {score} out of {total} questions correctly.
      </p>
      {scorePercent >= 50 ? (
        <p className="text-xl text-green-600">🎉 Congratulations! You Passed the Quiz!</p>
      ) : (
        <p className="text-xl text-red-500">Sorry! You Failed. Better luck next time 😊</p>
      )}
      <div className="flex flex-col items-center gap-8">
       <Link
  href="/"
  className="text-xl font-[400] px-4 py-2 bg-[#dcdedc] border border-black rounded-md hover:bg-[#9f9f9f] transition-colors cursor-pointer w-[200px] text-center"
>
  Go to Home
</Link>

      </div>
    </div>
  )
}
