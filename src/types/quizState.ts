import { Option } from "./quiz"

export type QuizState = {
  currentIndex: number
  score: number
  attempted: number
  selectedOptionId: Option["id"] | null
  showResult: boolean
  loading: boolean      
  error: string | null   
}

export type QuizAction =
  | { type: "ANSWER"; optionId: Option["id"]; isCorrect: boolean }
  | { type: "NEXT"; total: number }
  | { type: "RESTART" }
  | { type: "HYDRATE"; payload: QuizState }
  | { type: "SET_LOADING"; loading: boolean }  
  | { type: "SET_ERROR"; error: string | null } 
