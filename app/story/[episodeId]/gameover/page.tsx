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
        {/* 실패 아이콘 */}
        <div className="text-6xl mb-4">🔒</div>

        {/* 타이틀 */}
        <h1 className="text-3xl font-bold text-hacker-rose mb-2">
          ACCESS DENIED
        </h1>
        <p className="text-gray-400 font-mono text-sm mb-6">
          EP.{episode.id} - {episode.title}
        </p>

        {/* 메시지 */}
        <div className="bg-hacker-rose/10 border border-hacker-rose/30 rounded-lg p-6 mb-6 max-w-sm">
          <p className="text-hacker-rose text-sm">
            시도 횟수를 모두 소진했습니다.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            다시 도전하거나 다른 에피소드를 선택하세요.
          </p>
          {stage && (
            <p className="text-gray-600 text-xs mt-4 font-mono">
              정답: <span className="text-hacker-emerald">{stage.answers[0]}</span>
            </p>
          )}
        </div>

        {/* 버튼들 */}
        <div className="space-y-3 max-w-xs mx-auto">
          <Link
            href={`/story/${episode.id}`}
            className="block w-full py-3 bg-hacker-emerald text-hacker-dark font-bold rounded-lg hover:bg-hacker-emerald/90 transition-colors"
          >
            TRY AGAIN
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
