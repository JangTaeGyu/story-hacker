import Link from 'next/link';
import { storyEpisodes } from '@/data/storyEpisodes';
import { deductionEpisodes } from '@/data/deductionEpisodes';
import Header from '@/components/ui/Header';

export default function ModeSelectPage() {
  return (
    <div className="min-h-screen">
      <Header backHref="/" />

      <div className="p-4 sm:p-6 pt-16">
      {/* 타이틀 */}
      <h2 className="text-xl sm:text-2xl font-bold text-hacker-emerald font-mono mb-6 tracking-wider">
        SELECT MODE
      </h2>

      {/* 모드 선택 */}
      <div className="space-y-4">
        {/* 스토리 모드 */}
        <Link
          href="/story"
          className="block w-full p-5 bg-gray-800/50 border border-hacker-emerald/50 text-left hover:border-hacker-emerald hover:bg-gray-800 transition-all duration-200 active:scale-[0.98] group rounded-lg"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">📖</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-hacker-emerald font-bold text-lg">스토리 모드</h3>
                <span className="text-xs bg-hacker-emerald/20 text-hacker-emerald px-2 py-0.5 rounded">
                  {storyEpisodes.length} EP
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                스토리 속 단서를 파악하여 비밀번호를 추리
              </p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs bg-hacker-emerald/20 text-hacker-emerald px-2 py-1 rounded">
                  독해력
                </span>
                <span className="text-xs bg-hacker-emerald/20 text-hacker-emerald px-2 py-1 rounded">
                  추론
                </span>
              </div>
            </div>
            <span className="text-hacker-emerald text-xl opacity-0 group-hover:opacity-100 transition-opacity">
              ›
            </span>
          </div>
        </Link>

        {/* 추리 모드 */}
        <Link
          href="/deduction"
          className="block w-full p-5 bg-gray-800/50 border border-hacker-cyan/50 text-left hover:border-hacker-cyan hover:bg-gray-800 transition-all duration-200 active:scale-[0.98] group rounded-lg"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔍</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-hacker-cyan font-bold text-lg">추리 모드</h3>
                <span className="text-xs bg-hacker-cyan/20 text-hacker-cyan px-2 py-0.5 rounded">
                  {deductionEpisodes.length} EP
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                턴마다 공개되는 단서를 종합하여 비밀번호 해독
              </p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs bg-hacker-cyan/20 text-hacker-cyan px-2 py-1 rounded">
                  논리
                </span>
                <span className="text-xs bg-hacker-cyan/20 text-hacker-cyan px-2 py-1 rounded">
                  수학
                </span>
              </div>
            </div>
            <span className="text-hacker-cyan text-xl opacity-0 group-hover:opacity-100 transition-opacity">
              ›
            </span>
          </div>
        </Link>
      </div>

      {/* 모드 차이 설명 */}
      <div className="mt-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
        <h4 className="text-gray-400 font-mono text-xs mb-3">💡 MODE DIFFERENCE</h4>
        <div className="space-y-2 text-xs text-gray-500">
          <p>
            <span className="text-hacker-emerald">스토리:</span> 일러스트와 함께 몰입감 있는 추리
          </p>
          <p>
            <span className="text-hacker-cyan">추리:</span> 틀릴 때마다 새 단서 공개 (빨리 맞출수록
            고득점!)
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
