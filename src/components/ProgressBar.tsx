interface ProgressBarProps {
  current: number
  total: number
  color?: string
}

export function ProgressBar({ current, total, color = "#FFD700" }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="w-full bg-black bg-opacity-20 rounded-full h-3 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${percentage}%`,
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
        }}
      ></div>
    </div>
  )
}
