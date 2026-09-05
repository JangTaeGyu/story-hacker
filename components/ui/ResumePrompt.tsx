'use client';

import { useEffect, useRef } from 'react';

interface ResumePromptProps {
  /** 이어서 시작할 스테이지 인덱스 (0-based) */
  stageIndex: number;
  totalStages: number;
  stageTitle?: string;
  onResume: () => void;
  onRestart: () => void;
}

/**
 * 이어하기 확인 화면.
 * 진행 중이던 판이 남아 있을 때 게임 위에 덮어 띄운다.
 */
export default function ResumePrompt({
  stageIndex,
  totalStages,
  stageTitle,
  onResume,
  onRestart,
}: ResumePromptProps) {
  // 오버레이가 뜨면 기본 동작에 포커스를 준다 (키보드 사용자가 바로 조작 가능)
  const resumeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    resumeButtonRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-prompt-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-noct-black/95 px-8 animate-fadeIn"
    >
      <div className="w-full max-w-xs lg:max-w-sm text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint">
          Resume
        </p>
        <h2 id="resume-prompt-title" className="mt-3 font-display text-3xl text-noct-ink">
          이어하기
        </h2>

        <div className="mx-auto my-7 h-px w-16 bg-gradient-to-r from-transparent via-noct-gold-dim to-transparent" />

        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-gold-dim">
          Stage {stageIndex + 1} / {totalStages}
        </p>
        {stageTitle && (
          <p className="mt-2 font-serif text-[15px] leading-relaxed text-noct-ink-dim">
            {stageTitle}
          </p>
        )}

        <div className="mt-10 space-y-4">
          <button
            ref={resumeButtonRef}
            onClick={onResume}
            className="block w-full border border-noct-gold-dim py-3.5 font-mono text-[11px] tracking-[0.3em] uppercase text-noct-gold transition-colors hover:bg-noct-gold/5"
          >
            이어서 시작
          </button>
          <button
            onClick={onRestart}
            className="block w-full font-mono text-[11px] tracking-[0.3em] uppercase text-noct-ink-dim transition-colors hover:text-noct-ink"
          >
            <span className="border-b border-noct-ink/20 pb-1">처음부터</span>
          </button>
        </div>
      </div>
    </div>
  );
}
