// src/utils/quizReducer.ts
import { QuizState, QuizAction } from "@/types/quizState"

export const initialState: QuizState = {
  currentIndex: 0,
  score: 0,
  attempted: 0,
  selectedOptionId: null,
  showResult: false,
  loading: true,     
  error: null         
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER":
      if (state.selectedOptionId) return state
      return {
        ...state,
        selectedOptionId: action.optionId,
        attempted: state.attempted + 1,
        score: action.isCorrect ? state.score + 1 : state.score,
      }

    case "NEXT":
      return {
        ...state,
        selectedOptionId: null,
        currentIndex: state.currentIndex + 1,
        showResult: state.currentIndex + 1 >= action.total,
      }

    case "RESTART":
      return { ...initialState }

    case "HYDRATE":
      return { ...state, ...action.payload }

    case "SET_LOADING":  
      return { ...state, loading: action.loading }

    case "SET_ERROR":     
      return { ...state, error: action.error }

    default:
      return state
  }
}
