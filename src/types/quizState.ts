// src/types/quizState.ts
import { Option } from "./quiz"

export type QuizState = {
  currentIndex: number
  score: number
  attempted: number
  selectedOptionId: Option["id"] | null
  showResult: boolean
}

export type QuizAction =
  | { type: "ANSWER"; optionId: Option["id"]; isCorrect: boolean }
  | { type: "NEXT"; total: number }
  | { type: "RESTART" }
  | { type: "HYDRATE"; payload: QuizState }  
