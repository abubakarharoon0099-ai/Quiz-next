import { QuizState, QuizAction } from "@/types/quizState"

export const initialState: QuizState = {
  currentIndex: 0,
  selectedOptionId: null,
  score: 0,
  attempted: 0,
  showResult: false,
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
      const isLast = state.currentIndex + 1 >= action.total
      return {
        ...state,
        currentIndex: isLast ? state.currentIndex : state.currentIndex + 1,
        selectedOptionId: null,
        showResult: isLast,
      }

    case "RESTART":
      return initialState

    default:
      return state
  }
}
