'use client';

import { cn } from '@/lib/utils';

interface InputAreaProps {
  onInput: (digit: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  disabled?: boolean;
  /** 호환용 — NOCTURNE은 단일 팔레트 */
  accentColor?: 'emerald' | 'cyan';
}

export default function InputArea({
  onInput,
  onClear,
  onSubmit,
  canSubmit,
  disabled = false,
}: InputAreaProps) {
  const keyBase =
    'h-16 rounded flex items-center justify-center transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed [-webkit-tap-highlight-color:transparent]';
  const digitClass =
    'bg-noct-black-2 border border-noct-ink/[0.07] text-noct-ink font-display text-2xl active:bg-[#1f1c16]';

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="grid grid-cols-3 gap-3">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button
            key={digit}
            onClick={() => !disabled && onInput(digit)}
            disabled={disabled}
            className={cn(keyBase, digitClass)}
          >
            {digit}
          </button>
        ))}

        {/* 지움 */}
        <button
          onClick={onClear}
          disabled={disabled}
          className={cn(
            keyBase,
            'bg-noct-black-2 border border-noct-ink/[0.07] text-noct-ink-dim font-mono text-xs tracking-[0.08em] active:bg-[#1f1c16]'
          )}
        >
          지움
        </button>

        {/* 0 */}
        <button
          onClick={() => !disabled && onInput('0')}
          disabled={disabled}
          className={cn(keyBase, digitClass)}
        >
          0
        </button>

        {/* 확인 */}
        <button
          onClick={onSubmit}
          disabled={disabled || !canSubmit}
          className={cn(
            keyBase,
            'font-mono text-xs tracking-[0.08em] border',
            canSubmit && !disabled
              ? 'bg-noct-gold/[0.07] border-noct-gold/30 text-noct-gold active:bg-noct-gold/15'
              : 'bg-noct-black-2 border-noct-ink/[0.07] text-noct-ink-faint'
          )}
        >
          확인
        </button>
      </div>
    </div>
  );
}
