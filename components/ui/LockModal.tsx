'use client';

import { useEffect, useRef } from 'react';

interface LockModalProps {
  /** 헤더 라벨 — 보통 "잠금 장치" */
  label: string;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * PIN 입력 레이어.
 *
 * 하단 고정 키패드를 대체하며 모바일·데스크톱이 같은 화면을 쓴다. 본문(서사)을
 * 덮고 뜨기 때문에 **단서를 함께 담아야** 한다 — 그러지 않으면 자릿수를 누르다
 * 단서를 다시 보려고 여닫기를 반복하게 된다.
 *
 * 닫는 방법은 세 가지다: ✕ 버튼 · 배경 클릭 · Escape(`usePinKeyboard`의 `onEscape`).
 * Escape를 여기서 직접 듣지 않는 이유는 키보드 처리를 훅 한 곳에 모아두기
 * 위해서다. 두 곳에서 들으면 같은 키에 두 동작이 걸린다.
 */
export default function LockModal({ label, onClose, children }: LockModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // 열릴 때 포커스를 안으로 들여놓는다 (ResumePrompt와 같은 방식)
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lock-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-noct-black/85 px-4 py-6 backdrop-blur-sm animate-fadeIn sm:items-center"
    >
      <div
        // 안쪽 클릭이 배경까지 올라가 모달을 닫지 않게 한다
        onClick={(event) => event.stopPropagation()}
        className="my-auto w-full max-w-sm border border-noct-ink/15 bg-noct-black-2 p-5 shadow-2xl animate-fadeInUp"
      >
        <div className="flex items-center justify-between border-b border-noct-ink/10 pb-3">
          <p
            id="lock-modal-title"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-noct-gold-dim"
          >
            {label}
          </p>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="닫기"
            className="-m-2 p-2 font-mono text-sm leading-none text-noct-ink-faint transition-colors hover:text-noct-ink"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
