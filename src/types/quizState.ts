import { Option } from "./quiz"

export type QuizState = {
  currentIndex: number
  score: number
  attempted: number
  selectedOptionId: Option["id"] | null
  showResult: boolean
  loading: boolean       // ✅ add
  error: string | null   // ✅ add
}

export type QuizAction =
  | { type: "ANSWER"; optionId: Option["id"]; isCorrect: boolean }
  | { type: "NEXT"; total: number }
  | { type: "RESTART" }
  | { type: "HYDRATE"; payload: QuizState }
  | { type: "SET_LOADING"; loading: boolean }  // ✅ add
  | { type: "SET_ERROR"; error: string | null } // ✅ add
