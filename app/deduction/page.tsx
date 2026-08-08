'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deductionEpisodes } from '@/data/deductionEpisodes';
import { getDifficultyInfo } from '@/lib/utils';
import { readAllRuns, useProgress, type RunState } from '@/lib/progress';
import Header from '@/components/ui/Header';
import SolvedStamp from '@/components/ui/SolvedStamp';

const FILTERS = [
  { value: 0, label: 'ALL' },
  { value: 1, label: 'EASY' },
  { value: 2, label: 'NORMAL' },
  { value: 3, label: 'HARD' },
] as const;

export default function DeductionEpisodeSelectPage() {
  const { progress, totalStars } = useProgress();
  const [filter, setFilter] = useState<number>(0);

  // 진행 중인 판 (localStorage 직접 조회이므로 마운트 후에 읽는다)
  const [runs, setRuns] = useState<Record<number, RunState>>({});
  useEffect(() => {
    setRuns(readAllRuns('deduction'));
  }, []);

  const filteredEpisodes = filter === 0
    ? deductionEpisodes
    : deductionEpisodes.filter((ep) => ep.difficulty === filter);

  return (
    <div className="min-h-screen pb-24">
      <Header backHref="/mode-select" />

      <div className="mx-auto max-w-md px-5 pt-24">
        {/* 타이틀 + 필터 */}
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint mb-3">
            Deduction Mode
          </p>
          <h2 className="font-display text-3xl text-noct-ink leading-tight">
            추론의 방
          </h2>
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-noct-ink-dim mt-2">
            {filteredEpisodes.length} Episodes
            <span className="mx-2 text-noct-ink-faint/50">·</span>
            <span className="text-noct-gold-dim">★ {totalStars}</span>
            <span className="text-noct-ink-faint"> / {deductionEpisodes.length * 3}</span>
          </p>

          <div className="flex gap-2 mt-5">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase border transition-colors duration-300 ${
                  filter === f.value
                    ? 'border-noct-gold-dim text-noct-gold'
                    : 'border-noct-ink/10 text-noct-ink-faint hover:text-noct-ink-dim hover:border-noct-ink/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 에피소드 목록 */}
        <div className="space-y-px">
          {filteredEpisodes.map((episode) => {
            const diffInfo = getDifficultyInfo(episode.difficulty);
            const completedInfo = progress.completedEpisodes[episode.id];
            const isCompleted = completedInfo?.completed;
            const stars = completedInfo?.stars ?? 0;
            const run = runs[episode.id];
            return (
              <Link
                key={episode.id}
                href={`/deduction/${episode.id}`}
                className="group relative block overflow-hidden border-b border-noct-ink/10 transition-colors duration-300 hover:bg-noct-black-2/60"
              >
                {/* 에피소드 이미지 스트립 (검정으로 그라데이션 페이드) */}
                <div className="absolute inset-y-0 right-0 w-2/5 pointer-events-none">
                  <img
                    src={`/images/deduction/ep-${episode.id}.png`}
                    alt=""
                    className="h-full w-full object-cover noct-img"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-noct-page via-noct-page/80 to-transparent" />
                </div>

                <div className="relative flex items-stretch justify-between gap-4 px-1 py-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-noct-gold-dim">
                        EP.{episode.id - 100}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-noct-ink-faint">
                        {diffInfo.text}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-noct-ink leading-snug truncate">
                      {episode.title}
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-noct-ink-faint mt-1.5">
                      {episode.stages.length} Stages
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col items-end justify-between">
                    {isCompleted ? (
                      <>
                        <span className="text-sm tracking-[0.2em] text-noct-gold">
                          {'★'.repeat(stars)}
                          <span className="text-noct-ink-faint">
                            {'☆'.repeat(3 - stars)}
                          </span>
                        </span>
                        <SolvedStamp />
                      </>
                    ) : run ? (
                      <span className="mt-auto font-mono text-[10px] tracking-[0.2em] uppercase text-noct-gold-dim">
                        Stage {run.stageIndex + 1} 진행 중
                      </span>
                    ) : (
                      <span className="mt-auto font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint group-hover:text-noct-ink-dim transition-colors">
                        미해결
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
