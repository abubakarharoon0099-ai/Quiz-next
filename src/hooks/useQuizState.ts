"use client"

import { useEffect, useReducer } from "react"
import { quizReducer, initialState } from "@/utils/quizReducer"
import { QuizState } from "@/types/quizState"

export function useQuizState() {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("quizState")
      if (savedState) {
        const parsed = JSON.parse(savedState)
        if (parsed && typeof parsed === "object") {
          dispatch({ type: "HYDRATE", payload: parsed as QuizState })
          return
        }
      }
      dispatch({ type: "RESTART" })
    } catch (err) {
      console.error("Failed to restore quiz state:", err)
      dispatch({ type: "RESTART" })
    }
  }, [])

  useEffect(() => {
    if (state.attempted > 0 || state.currentIndex > 0) {
      localStorage.setItem("quizState", JSON.stringify(state))
    }
  }, [state])

  return { state, dispatch }
}
