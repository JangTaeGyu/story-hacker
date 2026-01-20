'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { deductionEpisodes } from '@/data/deductionEpisodes';

export default function DeductionGameOverPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const episodeId = parseInt(params.episodeId as string, 10);
  const stageIndex = parseInt(searchParams.get('stage') || '0', 10);

  const episode = deductionEpisodes.find((ep) => ep.id === episodeId);
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
          DECRYPTION FAILED
        </h1>
        <p className="text-gray-400 font-mono text-sm mb-6">
          EP.{episode.id - 100} - {episode.title}
        </p>

        {/* 메시지 */}
        <div className="bg-hacker-rose/10 border border-hacker-rose/30 rounded-lg p-6 mb-6 max-w-sm">
          <p className="text-hacker-rose text-sm">
            모든 단서를 사용했지만 해독에 실패했습니다.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            다시 도전하여 더 빨리 정답을 찾아보세요!
          </p>
          {stage && (
            <p className="text-gray-600 text-xs mt-4 font-mono">
              정답: <span className="text-hacker-cyan">{stage.answer}</span>
            </p>
          )}
        </div>

        {/* 버튼들 */}
        <div className="space-y-3 max-w-xs mx-auto">
          <Link
            href={`/deduction/${episode.id}`}
            className="block w-full py-3 bg-hacker-cyan text-hacker-dark font-bold rounded-lg hover:bg-hacker-cyan/90 transition-colors"
          >
            TRY AGAIN
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
