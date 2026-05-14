'use client';

interface HeartsDisplayProps {
  totalTurns: number;
  remainingTurns: number;
}

/** 남은 시도 — NOCTURNE: 작은 점(채워짐=골드, 소진=희미한 외곽선) */
export default function HeartsDisplay({ totalTurns, remainingTurns }: HeartsDisplayProps) {
  return (
    <div className="flex gap-1.5 items-center">
      {Array(totalTurns)
        .fill(0)
        .map((_, i) => {
          const remaining = i < remainingTurns;
          return (
            <span
              key={i}
              className={
                remaining
                  ? 'w-[7px] h-[7px] rounded-full bg-noct-gold border border-noct-gold transition-all duration-300'
                  : 'w-[7px] h-[7px] rounded-full border border-noct-ink-faint opacity-50 transition-all duration-300'
              }
            />
          );
        })}
    </div>
  );
}
