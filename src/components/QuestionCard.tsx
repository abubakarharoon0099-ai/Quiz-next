import { PreparedQuestion, Option } from "@/types/quiz"
import DifficultyStars from "./DifficultyStars"
export default function QuestionCard({
  question,
  currentIndex,
  total,
  selectedOptionId,
  handleAnswer,
  handleNext
}: {
  question: PreparedQuestion
  currentIndex: number
  total: number
  selectedOptionId: string | null
  handleAnswer: (opt: Option) => void
  handleNext: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
          Question {currentIndex + 1} of {total}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-gray-600">
          {question.category}
        </p>
        <DifficultyStars level={question.difficulty} />
      </div>

      <div className="mb-8">
        <h3 className="text-lg md:text-xl lg:text-2xl">{question.question}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleAnswer(opt)}
            disabled={!!selectedOptionId}
            className={`px-4 py-2 border rounded-lg 
              text-base md:text-lg lg:text-xl 
              font-[400] transition-colors cursor-pointer
              ${
                selectedOptionId
                  ? opt.isCorrect
                    ? "bg-black text-white"
                    : selectedOptionId === opt.id
                    ? "bg-red-500 text-white"
                    : "bg-[#dcdedc]"
                  : "bg-[#dcdedc] hover:bg-[#9f9f9f]"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {selectedOptionId && (
        <div className="flex flex-col items-center gap-8">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold">
            {question.options.find((o) => o.id === selectedOptionId)?.isCorrect
              ? "Correct!"
              : "Sorry!"}
          </p>
          <button
            onClick={handleNext}
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
