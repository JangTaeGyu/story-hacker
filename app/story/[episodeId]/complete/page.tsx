'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { storyEpisodes } from '@/data/storyEpisodes';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface GameProgress {
  completedEpisodes: Record<number, { stars: number; completed: boolean }>;
}

export default function StoryCompletePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const episodeId = parseInt(params.episodeId as string, 10);
  const stars = parseInt(searchParams.get('stars') || '3', 10);

  const episode = storyEpisodes.find((ep) => ep.id === episodeId);
  const nextEpisode = storyEpisodes.find((ep) => ep.id === episodeId + 1);

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
        <div className="text-6xl mb-4 animate-bounce">🏆</div>

        {/* 타이틀 */}
        <h1 className="text-3xl font-bold text-hacker-emerald mb-2">
          EPISODE CLEAR!
        </h1>
        <p className="text-gray-500 font-mono text-xs mb-6">
          모든 스테이지를 해킹했습니다!
        </p>
        <p className="text-gray-400 font-mono text-sm mb-6">
          EP.{episode.id} - {episode.title}
        </p>

        {/* 별점 */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6 inline-block">
          <p className="text-gray-500 font-mono text-xs mb-2">SCORE</p>
          <div className="text-4xl text-yellow-400">
            {'★'.repeat(stars)}{'☆'.repeat(3 - stars)}
          </div>
          <p className="text-gray-400 text-sm mt-2">
            {stars === 3 && 'PERFECT!'}
            {stars === 2 && 'GREAT!'}
            {stars === 1 && 'CLEAR!'}
          </p>
        </div>

        {/* SNS 공유 */}
        <div className="mb-6 max-w-xs mx-auto">
          <p className="text-gray-500 font-mono text-xs mb-3">SHARE</p>
          <div className="flex justify-center gap-3">
            {/* X (Twitter) */}
            <button
              onClick={() => {
                const text = `Story Hacker EP.${episode.id} "${episode.title}" 클리어! ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-11 h-11 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              title="X"
            >
              <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            {/* Facebook */}
            <button
              onClick={() => {
                const text = `Story Hacker EP.${episode.id} "${episode.title}" 클리어! ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`;
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-11 h-11 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              title="Facebook"
            >
              <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.092.042 1.543.084v3.244h-1.1c-1.637 0-2.144.619-2.144 2.228v2.002h3.094l-.532 3.667h-2.562v8.08z" />
              </svg>
            </button>
            {/* Threads */}
            <button
              onClick={() => {
                const text = `Story Hacker EP.${episode.id} "${episode.title}" 클리어! ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`;
                window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-11 h-11 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              title="Threads"
            >
              <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.775.776c-1.035-3.718-3.541-5.583-7.546-5.604-2.643.018-4.631.92-5.912 2.682-1.166 1.604-1.762 3.926-1.782 6.583.02 2.656.616 4.976 1.782 6.58 1.281 1.764 3.272 2.666 5.912 2.683 1.99-.013 3.546-.474 4.651-1.394.957-.8 1.59-1.967 1.867-3.395-.726-.037-1.467-.116-2.206-.24-1.918-.32-3.56-.958-4.757-1.846-1.397-1.035-2.108-2.442-2.108-4.078 0-1.487.618-2.77 1.788-3.715 1.06-.856 2.462-1.33 3.937-1.33.975 0 1.876.2 2.654.558-.163-.86-.406-1.593-.742-2.187-.49-.867-1.205-1.516-2.123-1.93-.892-.4-1.965-.61-3.18-.623l.012-2.739c1.633.017 3.088.315 4.32.886 1.287.597 2.303 1.497 3.02 2.674.63 1.035 1.04 2.259 1.25 3.621.408.147.793.318 1.152.516 1.395.77 2.376 1.92 2.826 3.317.346 1.075.392 2.383.017 3.678-.576 1.99-2.07 3.54-4.305 4.47-1.372.57-2.985.883-4.787.927zm1.873-8.694c.357.06.707.103 1.044.13.07-1.263-.236-2.178-.904-2.684-.498-.377-1.143-.567-1.918-.567-.707 0-1.322.194-1.773.558-.455.367-.685.84-.685 1.403 0 .736.37 1.334 1.1 1.777.798.484 1.91.847 3.136 1.383z" />
              </svg>
            </button>
            {/* 텍스트 복사 */}
            <button
              onClick={() => {
                const text = `Story Hacker EP.${episode.id} "${episode.title}" 클리어! ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`;
                navigator.clipboard.writeText(text);
                alert('클립보드에 복사되었습니다!');
              }}
              className="w-11 h-11 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              title="복사"
            >
              <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="space-y-3 max-w-xs mx-auto">
          {nextEpisode && (
            <Link
              href={`/story/${nextEpisode.id}`}
              className="block w-full py-3 bg-hacker-emerald text-hacker-dark font-bold rounded-lg hover:bg-hacker-emerald/90 transition-colors"
            >
              NEXT EPISODE →
            </Link>
          )}
          <Link
            href={`/story/${episode.id}`}
            className="block w-full py-3 border-2 border-hacker-emerald text-hacker-emerald font-bold rounded-lg hover:bg-hacker-emerald/10 transition-colors"
          >
            REPLAY
          </Link>
          <Link
            href="/story"
            className="block w-full py-3 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
          >
            EPISODE SELECT
          </Link>
        </div>
      </div>
    </div>
  );
}
