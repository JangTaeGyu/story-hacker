'use client';

import { cn } from '@/lib/utils';

interface PinDisplayProps {
  pin: string;
  pinLength: number;
  isWrong?: boolean;
  /** 호환용 — NOCTURNE은 단일 팔레트 */
  accentColor?: 'emerald' | 'cyan';
}

export default function PinDisplay({
  pin,
  pinLength,
  isWrong = false,
}: PinDisplayProps) {
  return (
    <div data-testid="pin-display" className="flex justify-center gap-3 sm:gap-4">
      {Array.from({ length: pinLength }).map((_, i) => {
        const isFilled = i < pin.length;
        const isActive = i === pin.length;
        return (
          <div
            key={i}
            className={cn(
              'w-9 h-12 flex items-end justify-center pb-1 border-b transition-colors duration-300',
              isWrong
                ? 'border-noct-gold/30'
                : isFilled
                ? 'border-noct-gold-dim'
                : isActive
                ? 'border-noct-gold'
                : 'border-noct-ink-faint'
            )}
          >
            {isFilled && (
              <span
                className={cn(
                  'font-display text-[28px] leading-none',
                  isWrong ? 'text-noct-ink-dim' : 'text-noct-ink'
                )}
              >
                {pin[i]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
