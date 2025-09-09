import { Option } from "./quiz"

export type QuizState = {
  currentIndex: number
  selectedOptionId: Option['id'] | null
  score: number
  attempted: number
  showResult: boolean
}

export type QuizAction =
  | { type: "ANSWER"; optionId: Option['id']; isCorrect: boolean }
  | { type: "NEXT"; total: number }
  | { type: "RESTART" }
