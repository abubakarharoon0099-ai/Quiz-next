import { PreparedQuestion, Option } from "@/types/quiz"
import DifficultyStars from "./DifficultyStars"

type QuizData = {
  question: PreparedQuestion | null
  currentIndex: number
  total: number
  selectedOptionId: string | null
  handleAnswer: (opt: Option) => void
  handleNext: () => void
}

export default function QuestionCard({ quizData }: { quizData: QuizData }) {
  if (!quizData.question) return null

  let decodedCategory = decodeURIComponent(quizData.question.category)
  if (!decodedCategory.toLowerCase().includes("entertainment")) {
    decodedCategory = `Entertainment: ${decodedCategory} `
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
          Question {quizData.currentIndex + 1} of {quizData.total}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-gray-600">
          {decodedCategory}
        </p>
        <DifficultyStars level={quizData.question.difficulty} />
      </div>

      <div className="mb-8">
        <h3 className="text-lg md:text-xl lg:text-2xl">{quizData.question.question}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {quizData.question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => quizData.handleAnswer(opt)}
            disabled={!!quizData.selectedOptionId}
            className={`px-4 py-2 border rounded-lg 
              text-base md:text-lg lg:text-xl 
              font-[400] transition-colors cursor-pointer
              ${
                quizData.selectedOptionId
                  ? opt.isCorrect
                    ? "bg-black text-white"
                    : quizData.selectedOptionId === opt.id
                    ? "bg-red-500 text-white"
                    : "bg-[#dcdedc]"
                  : "bg-[#dcdedc] hover:bg-[#9f9f9f]"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {quizData.selectedOptionId && (
        <div className="flex flex-col items-center gap-8">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold">
            {quizData.question.options.find((o) => o.id === quizData.selectedOptionId)?.isCorrect
              ? "Correct!"
              : "Sorry!"}
          </p>
          <button
            onClick={quizData.handleNext}
            className="text-base md:text-lg lg:text-xl font-[400] 
              px-4 py-2 bg-[#dcdedc] border border-black rounded-md 
              hover:bg-[#9f9f9f] transition-colors cursor-pointer w-[200px]"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  )
}
