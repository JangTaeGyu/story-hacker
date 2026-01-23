'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DeductionEpisode } from '@/lib/types';
import { useDeductionGameState } from '@/hooks/useGameState';
import PinDisplay from '@/components/ui/PinDisplay';
import InputArea from '@/components/ui/InputArea';
import HeartsDisplay from '@/components/ui/HeartsDisplay';
import Header from '@/components/ui/Header';
import { deductionIllustrations } from '@/components/illustrations/DeductionIllustrations';

interface DeductionGamePlayProps {
  episode: DeductionEpisode;
}

export default function DeductionGamePlay({ episode }: DeductionGamePlayProps) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
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

  // 스테이지 변경 시 키패드 닫기
  useEffect(() => {
    setShowKeypad(false);
  }, [currentStageIndex]);

  // 스테이지 시작 시 초기 단서 설정
  useEffect(() => {
    initializeStage();
  }, [initializeStage]);

  // 완료 또는 게임오버 시 리다이렉트
  useEffect(() => {
    if (isComplete) {
      setShowKeypad(false);
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
  const illustrationKey = `${episode.id}-${currentStage.id}`;
  const IllustrationComponent = deductionIllustrations[illustrationKey];

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
      <Header
        backHref="/deduction"
        backText="EXIT"
        accentColor="cyan"
        center={`EP.${episode.id - 100} - STAGE ${currentStageIndex + 1}/${episode.stages.length}`}
        right={<span className="text-yellow-400 text-sm">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</span>}
      />

      {/* 메인 컨텐츠 */}
      <main className={`flex-1 p-4 pt-16 overflow-y-auto ${showKeypad ? 'pb-96' : 'pb-24'}`}>
        {/* 스테이지 타이틀 */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-hacker-cyan font-bold text-lg">{currentStage.title}</h2>
            <p className="text-gray-500 font-mono text-xs mt-1">
              TURNS: {turnsUsed}/{currentStage.maxTurns}
            </p>
          </div>
          <HeartsDisplay
            totalTurns={currentStage.maxTurns}
            remainingTurns={remainingTurns}
          />
        </div>

        {/* 일러스트 (배경) */}
        {IllustrationComponent && (
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <IllustrationComponent />
            </div>
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
      <footer className="fixed bottom-0 left-0 right-0 bg-hacker-dark/95 backdrop-blur border-t border-gray-800">
        <div className="max-w-md mx-auto px-4">
          {/* 토글 버튼 */}
          <button
            onClick={() => setShowKeypad(!showKeypad)}
            className="w-full py-3 text-hacker-cyan font-mono text-sm flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-300 ${showKeypad ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            PIN 입력
          </button>

          {/* 키패드 영역 (슬라이드 애니메이션) */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              showKeypad ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              {/* PIN 디스플레이 */}
              <div className={`mb-3 ${isWrong ? 'animate-shake' : ''}`}>
                <PinDisplay
                  pin={pin}
                  pinLength={pinLength}
                  isWrong={isWrong}
                  accentColor="cyan"
                />
              </div>

              {/* 키패드 */}
              <InputArea
                onInput={handlePinInput}
                onClear={handlePinClear}
                onSubmit={handleSubmit}
                canSubmit={pin.length === pinLength}
                accentColor="cyan"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
