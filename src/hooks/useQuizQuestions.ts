"use client"

import { useEffect, useState } from "react"
import { Question, PreparedQuestion } from "@/types/quiz"
import { prepareQuestions } from "@/utils/quiz"
import { QuizAction } from "@/types/quizState"

export function useQuizQuestions(dispatch: React.Dispatch<QuizAction>) {
  const [questions, setQuestions] = useState<PreparedQuestion[]>([])

  const fetchQuestions = async () => {
    dispatch({ type: "SET_LOADING", loading: true })
    dispatch({ type: "SET_ERROR", error: null })
    try {
      const res = await fetch("/api/questions")
      if (!res.ok) throw new Error("Failed to fetch questions")
      const data: Question[] = await res.json()
      setQuestions(prepareQuestions(data))
    } catch (err: unknown) {
      console.error(err)
      if (err instanceof Error) {
        dispatch({ type: "SET_ERROR", error: err.message })
      } else if (typeof err === "string") {
        dispatch({ type: "SET_ERROR", error: err })
      } else {
        dispatch({ type: "SET_ERROR", error: "Something went wrong" })
      }
    } finally {
      dispatch({ type: "SET_LOADING", loading: false })
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return { questions, fetchQuestions }
}
