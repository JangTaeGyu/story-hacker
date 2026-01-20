'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { deductionEpisodes } from '@/data/deductionEpisodes';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface GameProgress {
  completedEpisodes: Record<number, { stars: number; completed: boolean }>;
}

export default function DeductionCompletePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const episodeId = parseInt(params.episodeId as string, 10);
  const stars = parseInt(searchParams.get('stars') || '3', 10);
  const turnsUsed = parseInt(searchParams.get('turns') || '1', 10);

  const episode = deductionEpisodes.find((ep) => ep.id === episodeId);
  const nextEpisode = deductionEpisodes.find((ep) => ep.id === episodeId + 1);

  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useLocalStorage<GameProgress>('story-hacker-progress', {
    completedEpisodes: {},
  });

  // 에피소드 완료 저장
  useEffect(() => {
    const existingRecord = progress.completedEpisodes[episodeId];
    // 더 높은 별점이거나 처음 완료한 경우에만 저장
    if (!existingRecord || existingRecord.stars < stars) {
      setProgress({
        ...progress,
        completedEpisodes: {
          ...progress.completedEpisodes,
          [episodeId]: { stars, completed: true },
        },
      });
    }
  }, [episodeId, stars]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">에피소드를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div
        className={`text-center transition-all duration-500 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 성공 아이콘 */}
        <div className="text-6xl mb-4">🔓</div>

        {/* 타이틀 */}
        <h1 className="text-3xl font-bold text-hacker-cyan mb-2">
          CODE CRACKED
        </h1>
        <p className="text-gray-400 font-mono text-sm mb-6">
          EP.{episode.id - 100} - {episode.title}
        </p>

        {/* 별점 */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6 inline-block">
          <p className="text-gray-500 font-mono text-xs mb-2">SCORE</p>
          <div className="text-4xl text-yellow-400">
            {'★'.repeat(stars)}{'☆'.repeat(3 - stars)}
          </div>
          <p className="text-gray-400 text-sm mt-2">
            {stars === 3 && 'GENIUS!'}
            {stars === 2 && 'SMART!'}
            {stars === 1 && 'SOLVED!'}
          </p>
          <p className="text-hacker-cyan text-xs mt-2 font-mono">
            {turnsUsed}번째 시도에 성공!
          </p>
        </div>

        {/* 버튼들 */}
        <div className="space-y-3 max-w-xs mx-auto">
          {nextEpisode && (
            <Link
              href={`/deduction/${nextEpisode.id}`}
              className="block w-full py-3 bg-hacker-cyan text-hacker-dark font-bold rounded-lg hover:bg-hacker-cyan/90 transition-colors"
            >
              NEXT EPISODE →
            </Link>
          )}
          <Link
            href={`/deduction/${episode.id}`}
            className="block w-full py-3 border-2 border-hacker-cyan text-hacker-cyan font-bold rounded-lg hover:bg-hacker-cyan/10 transition-colors"
          >
            REPLAY
          </Link>
          <Link
            href="/deduction"
            className="block w-full py-3 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
          >
            EPISODE SELECT
          </Link>
        </div>
      </div>
    </div>
  );
}
