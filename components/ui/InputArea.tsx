'use client';

import { cn } from '@/lib/utils';

interface InputAreaProps {
  onInput: (digit: string) => void;
  onDelete: () => void;
  onClear: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  disabled?: boolean;
  accentColor?: 'emerald' | 'cyan';
}

export default function InputArea({
  onInput,
  onDelete,
  onClear,
  onSubmit,
  canSubmit,
  disabled = false,
  accentColor = 'emerald',
}: InputAreaProps) {
  const buttonBaseClass = 'rounded-lg font-bold text-xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  const digitClass = 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700';

  const accentBorderClass = accentColor === 'cyan'
    ? 'border-hacker-cyan text-hacker-cyan hover:bg-hacker-cyan/10'
    : 'border-hacker-emerald text-hacker-emerald hover:bg-hacker-emerald/10';

  const submitActiveClass = accentColor === 'cyan'
    ? 'bg-hacker-cyan text-hacker-dark hover:bg-hacker-cyan/90'
    : 'bg-hacker-emerald text-hacker-dark hover:bg-hacker-emerald/90';

  const handleKeyPress = (digit: string) => {
    if (!disabled) {
      onInput(digit);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* 숫자 패드 */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button
            key={digit}
            onClick={() => handleKeyPress(digit)}
            disabled={disabled}
            className={cn(buttonBaseClass, digitClass, 'h-14')}
          >
            {digit}
          </button>
        ))}

        {/* Clear 버튼 */}
        <button
          onClick={onClear}
          disabled={disabled}
          className={cn(buttonBaseClass, 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700 h-14 text-sm')}
        >
          CLR
        </button>

        {/* 0 버튼 */}
        <button
          onClick={() => handleKeyPress('0')}
          disabled={disabled}
          className={cn(buttonBaseClass, digitClass, 'h-14')}
        >
          0
        </button>

        {/* Delete 버튼 */}
        <button
          onClick={onDelete}
          disabled={disabled}
          className={cn(buttonBaseClass, 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700 h-14 text-lg')}
        >
          ⌫
        </button>
      </div>

      {/* Submit 버튼 */}
      <button
        onClick={onSubmit}
        disabled={disabled || !canSubmit}
        className={cn(
          buttonBaseClass,
          'w-full h-12 border-2',
          canSubmit && !disabled ? submitActiveClass : accentBorderClass,
          !canSubmit && 'opacity-50'
        )}
      >
        SUBMIT
      </button>
    </div>
  );
}
