export default function ProgressBar({
  progress,
  scorePercent,
  maxScorePercent,
  averageScorePercent
}: {
  progress: number
  scorePercent: number
  maxScorePercent: number
  averageScorePercent: number
}) {
  return (
    <>
      
      <div className="fixed top-0 left-0 w-full bg-white h-4 z-50">
        <div
          className="bg-gray-500 h-4 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

    
      <div className="w-full mx-auto mt-4">
        <div className="flex justify-between mb-1 font-semibold">
          <span>Score: {scorePercent.toFixed(0)}%</span>
          <span>Max Score: {maxScorePercent.toFixed(0)}%</span>
        </div>
        <div className="w-full   bg-white h-8 relative rounded-md border overflow-hidden border-black">
          <div
            className="bg-gray-200  rounded-tl-md rounded-bl-md h-full absolute top-0 left-0"
            style={{ width: `${maxScorePercent}%` }}
          />
          <div
            className="bg-gray-400 h-full absolute rounded-tl-md rounded-bl-md top-0  left-0"
            style={{ width: `${averageScorePercent}%` }}
          />
          <div
            className="bg-gray-800 h-full absolute rounded-tl-md rounded-bl-md   top-0 left-0"
            style={{ width: `${scorePercent}%` }}
          />
        </div>
      </div>
    </>
  )
}
