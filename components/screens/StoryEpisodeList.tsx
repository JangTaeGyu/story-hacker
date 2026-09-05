'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { EpisodeSummary } from '@/lib/types';
import { getDifficultyInfo } from '@/lib/utils';
import { readAllRuns, useProgress, type RunState } from '@/lib/progress';
import Header from '@/components/ui/Header';
import SolvedStamp from '@/components/ui/SolvedStamp';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { useI18n } from '@/components/i18n/LocaleProvider';

const FILTER_VALUES = [0, 1, 2, 3] as const;

interface StoryEpisodeListProps {
  episodes: EpisodeSummary[];
}

export default function StoryEpisodeList({ episodes }: StoryEpisodeListProps) {
  const { t, href } = useI18n();
  const { progress, totalStars } = useProgress();
  const filterLabels = [t.filters.all, t.filters.easy, t.filters.normal, t.filters.hard];
  const [filter, setFilter] = useState<number>(0);

  // 진행 중인 판 (localStorage 직접 조회이므로 마운트 후에 읽는다)
  const [runs, setRuns] = useState<Record<number, RunState>>({});
  useEffect(() => {
    setRuns(readAllRuns('story'));
  }, []);

  const filteredEpisodes =
    filter === 0 ? episodes : episodes.filter((ep) => ep.difficulty === filter);

  return (
    <div className="min-h-screen bg-noct-black pb-24">
      <Header backHref={href('/mode-select')} right={<LanguageSwitcher />} />

      <div className="mx-auto max-w-md lg:max-w-6xl px-5 lg:px-8 pt-24">
        {/* 타이틀 */}
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-ink-faint">
            {t.storyList.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl text-noct-ink">
            {t.storyList.title}
          </h1>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
            {t.episodeList.episodes(filteredEpisodes.length)}
            <span className="mx-2 text-noct-ink-faint/50">·</span>
            <span className="text-noct-gold-dim">★ {totalStars}</span>
            <span className="text-noct-ink-faint"> / {episodes.length * 3}</span>
          </p>
        </div>

        {/* 난이도 필터 */}
        <div className="mb-8 flex gap-2">
          {FILTER_VALUES.map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
                filter === value
                  ? 'border-noct-gold/60 text-noct-gold'
                  : 'border-noct-ink/10 text-noct-ink-faint hover:text-noct-ink-dim hover:border-noct-ink/20'
              }`}
            >
              {filterLabels[value]}
            </button>
          ))}
        </div>

        {/* 에피소드 목록 — 데스크톱에서는 카드 그리드 */}
        <div className="space-y-10 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
          {filteredEpisodes.map((episode, index) => {
            const diffInfo = getDifficultyInfo(episode.difficulty);
            const completedInfo = progress.completedEpisodes[episode.id];
            const isCompleted = completedInfo?.completed;
            const run = runs[episode.id];
            return (
              <Link
                key={episode.id}
                href={href(`/story/${episode.id}`)}
                className="group block transition-opacity duration-300 active:opacity-80"
              >
                {/* 에피소드 이미지 — 와이드 스트립, 가장자리 페이드 */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={`/images/story/ep-${episode.id}.png`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 380px, 448px"
                    // 첫 화면에 보이는 두 장만 우선 로드한다
                    priority={index < 2}
                    className="noct-img object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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

                  {/* 별점 — 우상단 (완료 시) */}
                  {isCompleted && (
                    <span className="absolute right-2 top-3 text-sm tracking-[0.2em] text-noct-gold">
                      {'★'.repeat(completedInfo.stars)}
                      <span className="text-noct-ink-faint">
                        {'☆'.repeat(3 - completedInfo.stars)}
                      </span>
                    </span>
                  )}

                  {/* 상태 — 우하단 */}
                  <div className="absolute right-2 bottom-3">
                    {isCompleted ? (
                      <SolvedStamp />
                    ) : run ? (
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-noct-gold-dim">
                        {t.episodeList.inProgress(run.stageIndex + 1)}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
                        {t.episodeList.unsolved}
                      </span>
                    )}
                  </div>
                </div>

                {/* 텍스트 — 이미지 아래 */}
                <div className="relative z-10 -mt-2">
                  <h2 className="font-display text-2xl leading-snug text-noct-ink transition-colors group-hover:text-noct-gold">
                    {episode.title}
                  </h2>
                  {episode.subtitle && (
                    <p className="mt-1 font-serif text-sm leading-relaxed text-noct-ink-dim">
                      {episode.subtitle}
                    </p>
                  )}
                  <p className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
                    {t.episodeList.stages(episode.stageCount)}
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
