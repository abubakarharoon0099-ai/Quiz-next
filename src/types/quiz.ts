export type Question = {
  category: string
  type: string
  difficulty: "easy" | "medium" | "hard"
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type Option = {
  id: string
  label: string
  isCorrect: boolean
}

export type PreparedQuestion = Omit<Question, "correct_answer" | "incorrect_answers"> & {
  options: Option[]
}
