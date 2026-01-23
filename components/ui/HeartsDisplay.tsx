'use client';

interface HeartsDisplayProps {
  totalTurns: number;
  remainingTurns: number;
}

export default function HeartsDisplay({ totalTurns, remainingTurns }: HeartsDisplayProps) {
  return (
    <div className="flex gap-0.5">
      {Array(totalTurns)
        .fill(0)
        .map((_, i) => (
          <span
            key={i}
            className={`text-lg sm:text-xl transition-all duration-200 ${
              i < remainingTurns
                ? 'text-hacker-rose scale-100'
                : 'text-gray-700 scale-75'
            }`}
          >
            ♥
          </span>
        ))}
    </div>
  );
}
