"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  category: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type Option = {
  id: string;          // stable id for keying / selection
  label: string;       // decoded text shown to user
  isCorrect: boolean;  // ground-truth flag
};

type PreparedQuestion = {
  category: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: Option[];
};

// ---------- helpers ----------
const decodeSafe = (s: string) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

// Fisher–Yates shuffle (pure, stable input -> random output, called once)
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prepareQuestions(raw: Question[]): PreparedQuestion[] {
  return raw.map((q, qi) => {
    const options: Option[] = [
      { id: `q${qi}-c`, label: decodeSafe(q.correct_answer), isCorrect: true },
      ...q.incorrect_answers.map((a, i) => ({
        id: `q${qi}-i${i}`,
        label: decodeSafe(a),
        isCorrect: false,
      })),
    ];
    return {
      category: decodeSafe(q.category),
      type: q.type,
      difficulty: q.difficulty,
      question: decodeSafe(q.question),
      options: shuffle(options), // shuffle ONCE per question
    };
  });
}

// stars under the category (easy=1, medium=2, hard=3)
function DifficultyStars({ level }: { level: "easy" | "medium" | "hard" }) {
  const count = level === "hard" ? 3 : level === "medium" ? 2 : 1;
  return (
    <div className="flex gap-1 text-black mt-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"></path>
        </svg>
      ))}
    </div>
  );
}

// ---------- page ----------
export default function QuizPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data: Question[]) => setQuestions(prepareQuestions(data)));
  }, []);

  if (questions.length === 0) {
    return <p className="text-center mt-10">Loading questions...</p>;
  }

  const current = questions[currentIndex];

  // progress
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const scorePercent = (score / questions.length) * 100;
  const maxScorePercent =
    ((score + (questions.length - attempted)) / questions.length) * 100;
  const averageScorePercent = attempted > 0 ? (score / attempted) * 100 : 0;

  const handleAnswer = (opt: Option) => {
    if (selectedOptionId) return; // already answered
    setSelectedOptionId(opt.id);
    setAttempted((a) => a + 1);
    if (opt.isCorrect) setScore((s) => s + 1); // **truth-based, no string compare**
  };

  const handleNext = () => {
    setSelectedOptionId(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center p-4">
      {/* top progress (always) */}
      <div className="absolute top-0 w-full bg-white h-4 mb-8">
        <div
          className="bg-gray-500 h-4 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* card */}
      <div className="relative flex flex-col justify-between gap-8 md:w-2xl max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-gray-400 shadow-2xl h-[80vh] overflow-y-auto">
        {showResult ? (
          <div className="flex flex-col gap-4 items-center my-auto">
            <h2 className="text-5xl font-semibold text-gray-700">
              Quiz Completed!
            </h2>
            <p className="text-gray-600 font-semibold text-2xl">
              You answered {score} out of {questions.length} questions correctly.
            </p>
            {scorePercent >= 50 ? (
              <p className="text-xl text-green-600">
                🎉 Congratulations! You Passed the Quiz!
              </p>
            ) : (
              <p className="text-xl text-red-500">
                Sorry! You Failed. Better luck next time 😊
              </p>
            )}
            <div className="flex flex-col items-center gap-8">
              <button
                onClick={() => router.push("/")}
                className="text-xl font-[400] px-4 py-2 bg-[#dcdedc] border border-black rounded-md hover:bg-[#9f9f9f] transition-colors cursor-pointer w-[200px]"
              >
                Go to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* header */}
            <div className="mb-4">
              <h2 className="text-3xl font-semibold text-gray-700">
                Question {currentIndex + 1} of {questions.length}
              </h2>
              <p className="text-gray-600">{current.category}</p>
              <DifficultyStars level={current.difficulty} />
            </div>

            {/* question */}
            <div className="mb-8">
              <h3 className="text-2xl">{current.question}</h3>
            </div>

            {/* options 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {current.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selectedOptionId}
                  className={`px-4 py-2 border rounded-lg text-xl font-[400] transition-colors cursor-pointer
                    ${
                      selectedOptionId
                        ? opt.isCorrect
                          ? "bg-black text-white"
                          : selectedOptionId === opt.id
                          ? "bg-red-500 text-white"
                          : "bg-[#dcdedc]"
                        : "bg-[#dcdedc] hover:bg-[#9f9f9f]"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* feedback + next */}
            {selectedOptionId && (
              <div className="flex flex-col items-center gap-8">
                <p className="text-3xl font-semibold">
                  {
                    current.options.find((o) => o.id === selectedOptionId)
                      ?.isCorrect
                      ? "Correct!"
                      : "Sorry!"
                  }
                </p>
                <button
                  onClick={handleNext}
                  className="text-xl font-[400] px-4 py-2 bg-[#dcdedc] border border-black rounded-md hover:bg-[#9f9f9f] transition-colors cursor-pointer w-[200px]"
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        )}

        {/* bottom progress (hidden on result) */}
        {!showResult && (
          <div className="w-full mx-auto">
            <div className="flex justify-between mb-1 font-semibold">
              <span>Score: {scorePercent.toFixed(0)}%</span>
              {/* <span>Average: {averageScorePercent.toFixed(0)}%</span> */}
              <span>Max Score: {maxScorePercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white h-8 relative rounded-md border border-black">
              {/* Max (light) */}
              <div
                className="bg-gray-200 h-full absolute top-0 left-0"
                style={{ width: `${maxScorePercent}%` }}
              />
              {/* Average (medium) */}
              <div
                className="bg-gray-400 h-full absolute top-0 left-0"
                style={{ width: `${averageScorePercent}%` }}
              />
              {/* Actual (dark) */}
              <div
                className="bg-gray-800 h-full absolute top-0 left-0"
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
