"use client"

import { Option } from "@/types/quiz"
import { QuizState, QuizAction } from "@/types/quizState"
import { PreparedQuestion } from "@/types/quiz"

export function useQuizDerived(
  state: QuizState,
  questions: PreparedQuestion[],
  dispatch: React.Dispatch<QuizAction>
) {
  const current = questions.length > 0 ? questions[state.currentIndex] : null

  const progress = questions.length
    ? ((state.currentIndex + 1) / questions.length) * 100
    : 0

  const scorePercent = questions.length
    ? (state.score / questions.length) * 100
    : 0

  const maxScorePercent = questions.length
    ? ((state.score + (questions.length - state.attempted)) / questions.length) * 100
    : 0

  const averageScorePercent =
    state.attempted > 0 ? (state.score / state.attempted) * 100 : 0

  const handleAnswer = (opt: Option) => {
    dispatch({ type: "ANSWER", optionId: opt.id, isCorrect: opt.isCorrect })
  }

  const handleNext = () => {
    dispatch({ type: "NEXT", total: questions.length })
  }

  // 🔹 Bundle everything into one object
  const quizData = {
    question: current,
    currentIndex: state.currentIndex,
    total: questions.length,
    selectedOptionId: state.selectedOptionId,
    handleAnswer,
    handleNext,
  }

  const progressData = {
    progress,
    scorePercent,
    maxScorePercent,
    averageScorePercent,
  }

  return { quizData, progressData }
}
