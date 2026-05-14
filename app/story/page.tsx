'use client';

import { useState } from 'react';
import Link from 'next/link';
import { storyEpisodes } from '@/data/storyEpisodes';
import { getDifficultyInfo } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Header from '@/components/ui/Header';

interface GameProgress {
  completedEpisodes: Record<number, { stars: number; completed: boolean }>;
}

const FILTERS = [
  { value: 0, label: 'ALL' },
  { value: 1, label: 'EASY' },
  { value: 2, label: 'NORMAL' },
  { value: 3, label: 'HARD' },
] as const;

export default function StoryEpisodeSelectPage() {
  const [progress] = useLocalStorage<GameProgress>('story-hacker-progress', {
    completedEpisodes: {},
  });
  const [filter, setFilter] = useState<number>(0);

  const filteredEpisodes = filter === 0
    ? storyEpisodes
    : storyEpisodes.filter((ep) => ep.difficulty === filter);

  return (
    <div className="min-h-screen bg-noct-black pb-24">
      <Header backHref="/mode-select" />

      <div className="mx-auto max-w-md px-5 pt-24">
        {/* 타이틀 */}
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint">
            Story Mode
          </p>
          <h2 className="mt-2 font-display text-3xl text-noct-ink">
            사건 기록
          </h2>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
            {filteredEpisodes.length} Episodes
          </p>
        </div>

        {/* 난이도 필터 */}
        <div className="mb-8 flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                filter === f.value
                  ? 'border-noct-gold/60 text-noct-gold'
                  : 'border-noct-ink/10 text-noct-ink-faint hover:text-noct-ink-dim hover:border-noct-ink/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 에피소드 목록 */}
        <div className="space-y-10">
          {filteredEpisodes.map((episode) => {
            const diffInfo = getDifficultyInfo(episode.difficulty);
            const completedInfo = progress.completedEpisodes[episode.id];
            const isCompleted = completedInfo?.completed;
            return (
              <Link
                key={episode.id}
                href={`/story/${episode.id}`}
                className="group block transition-opacity duration-300 active:opacity-80"
              >
                {/* 에피소드 이미지 — 와이드 스트립, 가장자리 페이드 */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={`/images/story/ep-${episode.id}.png`}
                    alt=""
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                      isCompleted ? 'noct-img' : 'noct-img'
                    }`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* 사방 그라데이션 페이드 */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noct-black via-noct-black/20 to-noct-black/60" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noct-black/80 via-transparent to-noct-black/80" />

                  {/* EP 메타 — 좌상단 */}
                  <div className="absolute left-0 top-3 flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-gold-dim">
                      EP.{String(episode.id).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-faint">
                      {diffInfo.text}
                    </span>
                  </div>

                  {/* 상태 — 우상단 */}
                  <div className="absolute right-0 top-3 text-right">
                    {isCompleted ? (
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-noct-gold">
                        {'★'.repeat(completedInfo.stars)}
                        {'☆'.repeat(3 - completedInfo.stars)} 해결
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
                        미해결
                      </span>
                    )}
                  </div>
                </div>

                {/* 텍스트 — 이미지 아래 */}
                <div className="relative z-10 -mt-2">
                  <h3 className="font-display text-2xl leading-snug text-noct-ink transition-colors group-hover:text-noct-gold">
                    {episode.title}
                  </h3>
                  {episode.subtitle && (
                    <p className="mt-1 font-serif text-sm leading-relaxed text-noct-ink-dim">
                      {episode.subtitle}
                    </p>
                  )}
                  <p className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
                    {episode.stages.length} Stages
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
