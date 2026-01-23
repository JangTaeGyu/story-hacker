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
  { value: 1, label: 'EASY', color: 'text-green-400', activeClass: 'border-green-400 bg-green-400/10 text-green-400' },
  { value: 2, label: 'NORMAL', color: 'text-yellow-400', activeClass: 'border-yellow-400 bg-yellow-400/10 text-yellow-400' },
  { value: 3, label: 'HARD', color: 'text-red-400', activeClass: 'border-red-400 bg-red-400/10 text-red-400' },
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
    <div className="min-h-screen pb-20">
      <Header backHref="/mode-select" />

      <div className="p-4 sm:p-6 pt-16">
      {/* 타이틀 + 필터 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-hacker-emerald font-mono tracking-wider">
            STORY MODE
          </h2>
          <p className="text-gray-500 font-mono text-xs mt-1">
            {filteredEpisodes.length} EPISODES
          </p>
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
                filter === f.value
                  ? f.value === 0
                    ? 'border-hacker-emerald bg-hacker-emerald/10 text-hacker-emerald'
                    : f.activeClass
                  : 'border-gray-700 text-gray-500 hover:border-gray-500'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 에피소드 목록 */}
      <div className="space-y-3">
        {filteredEpisodes.map((episode) => {
          const diffInfo = getDifficultyInfo(episode.difficulty);
          const completedInfo = progress.completedEpisodes[episode.id];
          const isCompleted = completedInfo?.completed;
          return (
            <Link
              key={episode.id}
              href={`/story/${episode.id}`}
              className={`block w-full p-4 bg-gray-800/50 border text-left transition-all duration-200 active:scale-[0.98] group rounded hover:border-hacker-emerald hover:bg-gray-800 relative overflow-hidden ${
                isCompleted ? 'border-yellow-500/50' : 'border-gray-700'
              }`}
            >
              {/* 에피소드 카드 배경 이미지 */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src={`/images/story/ep-${episode.id}.png`} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-hacker-emerald font-mono text-xs">
                      EP.{episode.id}
                    </span>
                    <span className={`text-xs ${diffInfo.color}`}>{diffInfo.text}</span>
                  </div>
                  <h3 className="text-white font-bold text-base">{episode.title}</h3>
                  <p className="text-gray-500 text-xs font-mono mt-1">
                    {episode.stages.length} STAGES
                  </p>
                </div>
                {isCompleted ? (
                  <div className="w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center rotate-[-12deg]">
                    <span className="text-yellow-400 font-mono text-[10px] font-bold leading-tight text-center">
                      CLEAR
                    </span>
                  </div>
                ) : (
                  <span className="text-hacker-emerald text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      </div>
    </div>
  );
}
