'use client';

import { cn } from '@/lib/utils';

interface InputAreaProps {
  onInput: (digit: string) => void;
  /** 마지막 한 자리 삭제 */
  onDelete: () => void;
  /** 전체 삭제 */
  onClear: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  /** 입력된 자리가 하나라도 있는지 — 삭제 버튼 활성화에 사용 */
  hasInput?: boolean;
  disabled?: boolean;
}

export default function InputArea({
  onInput,
  onDelete,
  onClear,
  onSubmit,
  canSubmit,
  hasInput = false,
  disabled = false,
}: InputAreaProps) {
  const keyBase =
    'h-16 rounded flex items-center justify-center transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed [-webkit-tap-highlight-color:transparent]';
  const digitClass =
    'bg-noct-black-2 border border-noct-ink/[0.07] text-noct-ink font-display text-2xl active:bg-[#1f1c16]';

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* 전체 지움 — 입력이 있을 때만 보이되 자리는 유지해 레이아웃이 흔들리지 않게 한다 */}
      <div className="mb-2 flex justify-end">
        <button
          onClick={onClear}
          disabled={disabled || !hasInput}
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint transition-opacity hover:text-noct-ink-dim disabled:pointer-events-none disabled:opacity-0"
        >
          전체 지움
        </button>
      </div>

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

        {/* 한 자리 삭제 */}
        <button
          onClick={onDelete}
          disabled={disabled || !hasInput}
          aria-label="한 자리 삭제"
          className={cn(
            keyBase,
            'bg-noct-black-2 border border-noct-ink/[0.07] text-noct-ink-dim active:bg-[#1f1c16]'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 5H9l-6 7 6 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z" />
            <path d="M17 9l-5 6M12 9l5 6" />
          </svg>
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
