"use client"

import { useEffect, useReducer, useState } from "react"
import { Question, PreparedQuestion, Option } from "@/types/quiz"
import { prepareQuestions } from "@/utils/quiz"
import { quizReducer, initialState } from "@/utils/quizReducer"
import QuestionCard from "@/components/QuestionCard"
import ResultScreen from "@/components/ResultScreen"
import ProgressBar from "@/components/ProgressBar"


export default function QuizPage() {
  const [questions, setQuestions] = useState<PreparedQuestion[]>([])
  const [state, dispatch] = useReducer(quizReducer, initialState)

useEffect(() => {
  const savedState = localStorage.getItem("quizState")

  if (savedState) {
    dispatch({ type: "HYDRATE", payload: JSON.parse(savedState) })
  } else {
   
    dispatch({ type: "RESTART" })
  }
}, [])

  useEffect(() => {
    if (state.attempted > 0 || state.currentIndex > 0) {
      localStorage.setItem("quizState", JSON.stringify(state))
    }
  }, [state])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions")
        if (!res.ok) throw new Error("Failed to fetch questions")
        const data: Question[] = await res.json()
        setQuestions(prepareQuestions(data))
      } catch (err) {
        console.error(err)
      }
    }
    fetchQuestions()
  }, [])

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }

  const current = questions[state.currentIndex]

  const progress = ((state.currentIndex + 1) / questions.length) * 100
  const scorePercent = (state.score / questions.length) * 100
  const maxScorePercent =
    ((state.score + (questions.length - state.attempted)) / questions.length) *
    100
  const averageScorePercent =
    state.attempted > 0 ? (state.score / state.attempted) * 100 : 0

  const handleAnswer = (opt: Option) => {
    dispatch({ type: "ANSWER", optionId: opt.id, isCorrect: opt.isCorrect })
  }

  const handleNext = () => {
    dispatch({ type: "NEXT", total: questions.length })
  }

  return (
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center p-12">
      <div className="relative flex flex-col justify-between gap-8 md:w-2xl max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-gray-400 shadow-2xl overflow-y-auto">
     {state.showResult ? (
  <ResultScreen
    score={state.score}
    total={questions.length}
    
  /> 
) : (
  <QuestionCard
    question={current}
    currentIndex={state.currentIndex}
    total={questions.length}
    selectedOptionId={state.selectedOptionId}
    handleAnswer={handleAnswer}
    handleNext={handleNext}
  />
)}


        {!state.showResult && (
          <ProgressBar
            progress={progress}
            scorePercent={scorePercent}
            maxScorePercent={maxScorePercent}
            averageScorePercent={averageScorePercent}
          />
        )}
      </div>
    </div>
  )
}
