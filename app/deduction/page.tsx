'use client';

import Link from 'next/link';
import { deductionEpisodes } from '@/data/deductionEpisodes';
import { getDifficultyInfo, getDifficultyStars } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface GameProgress {
  completedEpisodes: Record<number, { stars: number; completed: boolean }>;
}

export default function DeductionEpisodeSelectPage() {
  const [progress] = useLocalStorage<GameProgress>('story-hacker-progress', {
    completedEpisodes: {},
  });

  return (
    <div className="min-h-screen p-4 sm:p-6 pb-20">
      {/* 뒤로가기 */}
      <Link
        href="/mode-select"
        className="text-hacker-cyan font-mono mb-6 hover:opacity-80 text-sm inline-block"
      >
        {'<'} BACK
      </Link>

      {/* 타이틀 */}
      <h2 className="text-xl sm:text-2xl font-bold text-hacker-cyan font-mono mb-2 tracking-wider">
        DEDUCTION MODE
      </h2>
      <p className="text-gray-500 font-mono text-xs mb-4">
        {deductionEpisodes.length} EPISODES AVAILABLE
      </p>

      {/* 에피소드 목록 */}
      <div className="space-y-3">
        {deductionEpisodes.map((episode) => {
          const diffInfo = getDifficultyInfo(episode.difficulty);
          const completedInfo = progress.completedEpisodes[episode.id];
          const isCompleted = completedInfo?.completed;
          return (
            <Link
              key={episode.id}
              href={`/deduction/${episode.id}`}
              className={`block w-full p-4 bg-gray-800/50 border text-left transition-all duration-200 active:scale-[0.98] group rounded hover:border-hacker-cyan hover:bg-gray-800 ${
                isCompleted ? 'border-yellow-500/50' : 'border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-hacker-cyan font-mono text-xs">
                      EP.{episode.id - 100}
                    </span>
                    <span className={`text-xs ${diffInfo.color}`}>{diffInfo.text}</span>
                    {isCompleted && (
                      <span className="text-yellow-400 text-xs font-mono">✓ CLEAR</span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-base">{episode.title}</h3>
                  <p className="text-gray-500 text-xs font-mono mt-1">
                    {episode.stages.length} STAGES • {isCompleted
                      ? `${'★'.repeat(completedInfo.stars)}${'☆'.repeat(3 - completedInfo.stars)}`
                      : getDifficultyStars(episode.difficulty)
                    }
                  </p>
                </div>
                <span className="text-hacker-cyan text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  ›
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
