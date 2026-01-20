'use client';

import { cn } from '@/lib/utils';

interface PinDisplayProps {
  pin: string;
  pinLength: number;
  isWrong?: boolean;
  accentColor?: 'emerald' | 'cyan';
}

export default function PinDisplay({
  pin,
  pinLength,
  isWrong = false,
  accentColor = 'emerald',
}: PinDisplayProps) {
  const colorClass = accentColor === 'cyan' ? 'border-hacker-cyan' : 'border-hacker-emerald';
  const filledClass = accentColor === 'cyan' ? 'bg-hacker-cyan' : 'bg-hacker-emerald';
  const wrongClass = 'border-hacker-rose bg-hacker-rose/20';

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length: pinLength }).map((_, i) => {
        const isFilled = i < pin.length;
        return (
          <div
            key={i}
            className={cn(
              'w-10 h-12 sm:w-12 sm:h-14 rounded-lg border-2 flex items-center justify-center transition-all duration-200',
              isWrong ? wrongClass : colorClass,
              isFilled && !isWrong && filledClass,
              isWrong && 'animate-shake'
            )}
          >
            {isFilled && (
              <span className={cn(
                'text-2xl font-bold',
                isWrong ? 'text-hacker-rose' : 'text-hacker-dark'
              )}>
                {pin[i]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
