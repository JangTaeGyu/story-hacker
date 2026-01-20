'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { DeductionEpisode } from '@/lib/types';
import { useDeductionGameState } from '@/hooks/useGameState';
import PinDisplay from '@/components/ui/PinDisplay';
import InputArea from '@/components/ui/InputArea';
import HeartsDisplay from '@/components/ui/HeartsDisplay';
import { deductionIllustrations } from '@/components/illustrations/DeductionIllustrations';

interface DeductionGamePlayProps {
  episode: DeductionEpisode;
}

export default function DeductionGamePlay({ episode }: DeductionGamePlayProps) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    currentStageIndex,
    pin,
    turnsUsed,
    revealedClues,
    isWrong,
    isComplete,
    isGameOver,
    currentStage,
    pinLength,
    stars,
    remainingTurns,
    handlePinInput,
    handlePinDelete,
    handlePinClear,
    handleSubmit,
    resetGame,
    initializeStage,
  } = useDeductionGameState(episode.stages);

  // 스테이지 시작 시 초기 단서 설정
  useEffect(() => {
    initializeStage();
  }, [initializeStage]);

  // 완료 또는 게임오버 시 리다이렉트
  useEffect(() => {
    if (isComplete) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        router.push(`/deduction/${episode.id}/complete?stars=${stars}&turns=${turnsUsed}`);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isGameOver) {
      router.push(`/deduction/${episode.id}/gameover?stage=${currentStageIndex}`);
    }
  }, [isComplete, isGameOver, router, episode.id, stars]);

  if (!currentStage) return null;

  // 일러스트 컴포넌트 가져오기
  const IllustrationComponent = deductionIllustrations[episode.id.toString()];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 성공 애니메이션 오버레이 */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/90 animate-fadeIn">
          <div className="text-center animate-pulse">
            <div className="text-6xl mb-4">🔓</div>
            <p className="text-hacker-cyan font-mono text-xl font-bold text-glow-cyan">
              CRACKED!
            </p>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <header className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <Link
            href="/deduction"
            className="text-gray-400 hover:text-hacker-cyan text-sm font-mono"
          >
            {'<'} EXIT
          </Link>
          <div className="text-center">
            <span className="text-hacker-cyan font-mono text-xs">
              EP.{episode.id - 100} - STAGE {currentStageIndex + 1}/{episode.stages.length}
            </span>
          </div>
          <div className="text-right">
            <span className="text-yellow-400 text-sm">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</span>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-4 overflow-y-auto pb-72">
        {/* 스테이지 타이틀 */}
        <div className="mb-4">
          <h2 className="text-hacker-cyan font-bold text-lg">{currentStage.title}</h2>
          <p className="text-gray-500 font-mono text-xs mt-1">
            TURN: {turnsUsed}/{currentStage.maxTurns} • REMAINING: {remainingTurns}
          </p>
        </div>

        {/* 일러스트 */}
        {IllustrationComponent && (
          <div className="mb-4 bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800">
            <IllustrationComponent />
          </div>
        )}

        {/* 상황 설명 */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-4">
          <h3 className="text-gray-400 font-mono text-xs mb-2">📋 SITUATION</h3>
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
            {currentStage.situation}
          </p>
        </div>

        {/* 공개된 단서들 */}
        <div className="space-y-2 mb-4">
          <h3 className="text-hacker-cyan font-mono text-xs flex items-center gap-2">
            <span>🔍</span> REVEALED CLUES ({revealedClues.length})
          </h3>
          {revealedClues.length > 0 ? (
            revealedClues.map((clue, index) => (
              <div
                key={`${clue.turn}-${index}`}
                className="bg-hacker-cyan/5 border border-hacker-cyan/30 rounded-lg p-3 animate-slideIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-hacker-cyan font-mono text-xs bg-hacker-cyan/20 px-2 py-0.5 rounded">
                    T{clue.turn}
                  </span>
                  <p className="text-hacker-cyan text-sm flex-1">
                    {clue.text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm text-center py-4">
              아직 공개된 단서가 없습니다.
            </div>
          )}
        </div>

        {/* 게임 규칙 안내 */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3 mb-4">
          <p className="text-gray-500 text-xs text-center">
            💡 오답 시 새로운 단서가 공개됩니다. 빨리 맞출수록 높은 별점!
          </p>
        </div>

        {/* 오답 피드백 */}
        {isWrong && (
          <div className="bg-hacker-rose/10 border border-hacker-rose/30 rounded-lg p-3 mb-4 animate-shake">
            <p className="text-hacker-rose text-sm text-center">
              ❌ 오답입니다. 새로운 단서가 공개되었습니다!
            </p>
          </div>
        )}
      </main>

      {/* 입력 영역 (하단 고정) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-hacker-dark/95 backdrop-blur border-t border-gray-800 p-4">
        <div className="max-w-md mx-auto">
          {/* PIN 디스플레이 */}
          <div className={`mb-2 ${isWrong ? 'animate-shake' : ''}`}>
            <PinDisplay
              pin={pin}
              pinLength={pinLength}
              isWrong={isWrong}
              accentColor="cyan"
            />
          </div>

          {/* 남은 턴 (하트) */}
          <HeartsDisplay
            totalTurns={currentStage.maxTurns}
            remainingTurns={remainingTurns}
          />

          {/* 키패드 */}
          <InputArea
            onInput={handlePinInput}
            onDelete={handlePinDelete}
            onClear={handlePinClear}
            onSubmit={handleSubmit}
            canSubmit={pin.length === pinLength}
            accentColor="cyan"
          />
        </div>
      </footer>
    </div>
  );
}
