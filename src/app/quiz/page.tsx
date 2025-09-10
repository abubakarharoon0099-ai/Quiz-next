"use client"
import { useEffect, useState } from "react"
import { useQuizState } from "@/hooks/useQuizState"
import { useQuizQuestions } from "@/hooks/useQuizQuestions"
import { useQuizDerived } from "@/hooks/useQuizDerived"
import QuestionCard from "@/components/QuestionCard"
import ResultScreen from "@/components/ResultScreen"
import ProgressBar from "@/components/ProgressBar"
import RetryButton from "@/components/RetryButton"
import FullScreenSpinner from "@/components/FullScreenSpinner"

export default function QuizPage() {
  const [pageLoading, setPageLoading] = useState(true)
  const { state, dispatch } = useQuizState()
  const { questions, fetchQuestions } = useQuizQuestions(dispatch)
  const { quizData, progressData } = useQuizDerived(state, questions, dispatch)
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 800) 
    return () => clearTimeout(timer)
  }, [])

  if (pageLoading || state.loading) {
    return <FullScreenSpinner />
  }
  if (state.error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-600 font-semibold text-lg">{state.error}</p>
        <RetryButton onClick={fetchQuestions} />
      </div>
    )
  }
  return (
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center p-12">
      <div className="relative flex flex-col justify-between gap-8 md:w-2xl max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-gray-400 shadow-2xl overflow-y-auto">
        {state.showResult ? (
          <ResultScreen score={state.score} total={questions.length} />
        ) : (
          quizData.question && <QuestionCard quizData={quizData} />
        )}

        {!state.showResult && questions.length > 0 && (
          <ProgressBar progressData={progressData} />
        )}
      </div>
    </div>
  )
}
