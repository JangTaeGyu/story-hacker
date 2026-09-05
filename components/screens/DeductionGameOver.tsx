'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface DeductionGameOverProps {
  episodeId: number;
  episodeTitle: string;
  /** 스테이지 제목만 넘긴다 — 정답·단서는 클라이언트로 내려보내지 않는다 */
  stageTitles: string[];
}

export default function DeductionGameOver({
  episodeId,
  episodeTitle,
  stageTitles,
}: DeductionGameOverProps) {
  const searchParams = useSearchParams();
  const stageIndex = parseInt(searchParams.get('stage') || '0', 10);
  const stageTitle = stageTitles[stageIndex];

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-noct-black">
      <div
        className={`w-full max-w-xs lg:max-w-sm text-center ${
          showContent ? 'animate-fadeIn' : 'opacity-0'
        }`}
      >
        {/* 서브라인 */}
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint mb-5">
          Decode Failed
        </p>

        {/* 타이틀 */}
        <h1 className="font-display text-4xl text-noct-ink mb-4">
          미해결
        </h1>

        {/* 에피소드 */}
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-dim mb-8">
          EP.{episodeId - 100} — {episodeTitle}
        </p>

        {/* 디바이더 */}
        <div className="h-px w-24 mx-auto mb-8 bg-noct-ink/10" />

        {/* 메시지 */}
        <p className="font-serif text-sm text-noct-ink-dim leading-relaxed mb-2">
          모든 단서를 사용했지만 해독에 실패했습니다.
        </p>
        <p className="font-serif text-xs text-noct-ink-faint leading-relaxed mb-6">
          다시 도전하여 더 빨리 정답을 찾아보세요.
        </p>
        {stageTitle && (
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-faint mb-10">
            Stage {stageIndex + 1}
            <span className="mx-2 text-noct-ink-faint/50">·</span>
            <span className="text-noct-ink-dim normal-case tracking-normal font-serif">
              {stageTitle}
            </span>
          </p>
        )}

        {/* 버튼들 */}
        <div className="space-y-4">
          <Link
            href={`/deduction/${episodeId}`}
            className="block w-full py-3.5 border border-noct-ink/15 text-noct-ink font-mono text-[11px] tracking-[0.3em] uppercase hover:border-noct-ink/30 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/deduction"
            className="block font-mono text-[11px] tracking-[0.3em] uppercase text-noct-ink-dim hover:text-noct-ink transition-colors"
          >
            <span className="border-b border-noct-ink/20 pb-1">Episode Select</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
