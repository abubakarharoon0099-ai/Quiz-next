import { Question, Option, PreparedQuestion } from "@/types/quiz"

export function decodeSafe(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}
export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
export function prepareQuestions(raw: Question[]): PreparedQuestion[] {
  return raw.map((q, qi) => {
    const options: Option[] = [
      { id: `q${qi}-c`, label: decodeSafe(q.correct_answer), isCorrect: true },
      ...q.incorrect_answers.map((a, i) => ({
        id: `q${qi}-i${i}`,
        label: decodeSafe(a),
        isCorrect: false
      }))
    ]
    return {
      category: decodeSafe(q.category),
      type: q.type,
      difficulty: q.difficulty,
      question: decodeSafe(q.question),
      options: shuffle(options)
    }
  })
}
