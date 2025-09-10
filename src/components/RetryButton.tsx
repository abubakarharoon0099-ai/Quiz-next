import React from "react"

type RetryButtonProps = {
  onClick: () => void
  label?: string
}

export default function RetryButton({ onClick, label = "Retry" }: RetryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
    >
      {label}
    </button>
  )
}
