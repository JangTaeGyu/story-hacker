'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { storyEpisodes } from '@/data/storyEpisodes';
import { deductionEpisodes } from '@/data/deductionEpisodes';

export default function HomePage() {
  const [glitch, setGlitch] = useState(false);

  // 글리치 효과 (400ms 간격으로 3% 확률)
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.97) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 80);
      }
    }, 400);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {/* 타이틀 */}
      <div className={`mb-8 transition-transform ${glitch ? 'animate-glitch' : ''}`}>
        <h1
          className="text-4xl sm:text-5xl font-bold mb-1 tracking-widest text-hacker-emerald text-glow-emerald"
          style={{ fontFamily: 'monospace' }}
        >
          STORY
        </h1>
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-widest text-hacker-rose text-glow-rose"
          style={{ fontFamily: 'monospace' }}
        >
          HACKER
        </h1>
      </div>

      {/* 서브타이틀 */}
      <p className="text-gray-500 mb-10 font-mono text-xs sm:text-sm tracking-wide">
        [ 단서를 읽고, 추리하고, 잠금을 해제하라 ]
      </p>

      {/* 시작 버튼 */}
      <div className="space-y-3 w-full max-w-xs">
        <Link
          href="/mode-select"
          className="block w-full py-4 px-6 bg-hacker-emerald/10 border-2 border-hacker-emerald text-hacker-emerald font-mono text-base tracking-wider hover:bg-hacker-emerald hover:text-gray-900 transition-all duration-300 active:scale-95 text-center"
        >
          {'>'} START GAME
        </Link>
      </div>

      {/* 통계 */}
      <div className="mt-8 grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-800/50 p-3 rounded-lg">
          <p className="text-hacker-emerald font-mono text-2xl font-bold">{storyEpisodes.length}</p>
          <p className="text-gray-500 font-mono text-xs">STORY</p>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg">
          <p className="text-hacker-cyan font-mono text-2xl font-bold">{deductionEpisodes.length}</p>
          <p className="text-gray-500 font-mono text-xs">DEDUCTION</p>
        </div>
      </div>

      {/* 버전 */}
      <div className="mt-12 font-mono text-xs text-gray-700">
        <p>v3.0.0 // NEXT.JS</p>
      </div>
    </div>
  );
}
