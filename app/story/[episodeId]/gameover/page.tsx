'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { storyEpisodes } from '@/data/storyEpisodes';

export default function StoryGameOverPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const episodeId = parseInt(params.episodeId as string, 10);
  const stageIndex = parseInt(searchParams.get('stage') || '0', 10);

  const episode = storyEpisodes.find((ep) => ep.id === episodeId);
  const stage = episode?.stages[stageIndex];

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-noct-black">
        <p className="font-serif text-noct-ink-dim">에피소드를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-noct-black">
      <div
        className={`w-full max-w-xs text-center ${
          showContent ? 'animate-fadeIn' : 'opacity-0'
        }`}
      >
        {/* 서브라인 */}
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint mb-5">
          Access Denied
        </p>

        {/* 타이틀 */}
        <h1 className="font-display text-4xl text-noct-ink mb-4">
          수사 실패
        </h1>

        {/* 에피소드 */}
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-dim mb-8">
          EP.{episode.id} — {episode.title}
        </p>

        {/* 디바이더 */}
        <div className="h-px w-24 mx-auto mb-8 bg-noct-ink/10" />

        {/* 메시지 */}
        <p className="font-serif text-sm text-noct-ink-dim leading-relaxed mb-2">
          시도 횟수를 모두 소진했습니다.
        </p>
        <p className="font-serif text-xs text-noct-ink-faint leading-relaxed mb-6">
          다시 도전하거나 다른 에피소드를 선택하세요.
        </p>
        {stage && (
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-faint mb-10">
            Stage {stageIndex + 1}
            <span className="mx-2 text-noct-ink-faint/50">·</span>
            <span className="text-noct-ink-dim normal-case tracking-normal font-serif">
              {stage.title}
            </span>
          </p>
        )}

        {/* 버튼들 */}
        <div className="space-y-4">
          <Link
            href={`/story/${episode.id}`}
            className="block w-full py-3.5 border border-noct-ink/15 text-noct-ink font-mono text-[11px] tracking-[0.3em] uppercase hover:border-noct-ink/30 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/story"
            className="block font-mono text-[11px] tracking-[0.3em] uppercase text-noct-ink-dim hover:text-noct-ink transition-colors"
          >
            <span className="border-b border-noct-ink/20 pb-1">Episode Select</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
