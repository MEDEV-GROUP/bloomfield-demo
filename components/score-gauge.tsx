import { cn } from "@/lib/utils"

interface ScoreGaugeProps {
  score: number
  rating: string
  size?: number
  className?: string
}

export function ScoreGauge({
  score,
  rating,
  size = 140,
  className,
}: ScoreGaugeProps) {
  const center = size / 2
  const radius = (size - 16) / 2
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference * 0.75
  const filledArc = (score / 100) * arcLength

  const color =
    score >= 80
      ? "#22c55e"
      : score >= 60
        ? "#3b82f6"
        : score >= 40
          ? "#eab308"
          : "#ef4444"

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          className="text-muted/20"
          transform={`rotate(135, ${center}, ${center})`}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${filledArc} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(135, ${center}, ${center})`}
        />
        <text
          x={center}
          y={center - 4}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-foreground font-mono text-2xl font-bold"
        >
          {score}
        </text>
        <text
          x={center}
          y={center + 20}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-muted-foreground text-xs"
        >
          {rating}
        </text>
      </svg>
    </div>
  )
}
