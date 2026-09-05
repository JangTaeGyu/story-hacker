'use client';

import { useEffect } from 'react';

interface UsePinKeyboardOptions {
  onInput: (digit: string) => void;
  onDelete: () => void;
  onClear: () => void;
  onSubmit: () => void;
  /** 입력이 들어왔을 때 호출 — 닫혀 있는 입력 레이어를 여는 용도 */
  onActivate?: () => void;
  /**
   * Escape 동작. 기본값은 전체 삭제지만, 입력이 레이어 안에 있으면
   * 레이어 닫기가 맞다 — 다이얼로그의 Escape는 닫기가 관례다.
   */
  onEscape?: () => void;
  enabled?: boolean;
}

/**
 * 물리 키보드로 PIN을 입력할 수 있게 한다 (데스크톱 대응).
 * 숫자 = 입력, Backspace = 한 자리 삭제, Escape = 전체 삭제, Enter = 제출.
 */
export function usePinKeyboard({
  onInput,
  onDelete,
  onClear,
  onSubmit,
  onActivate,
  onEscape,
  enabled = true,
}: UsePinKeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // 브라우저 단축키는 건드리지 않는다.
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (/^[0-9]$/.test(event.key)) {
        onInput(event.key);
        onActivate?.();
      } else if (event.key === 'Backspace') {
        // 뒤로가기로 동작하는 브라우저가 있어 기본 동작을 막는다.
        event.preventDefault();
        onDelete();
        onActivate?.();
      } else if (event.key === 'Enter') {
        onSubmit();
      } else if (event.key === 'Escape') {
        (onEscape ?? onClear)();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onInput, onDelete, onClear, onSubmit, onActivate, onEscape, enabled]);
}
