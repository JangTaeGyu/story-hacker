'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { StoryEpisode } from '@/lib/types';
import { useStoryGameState } from '@/hooks/useGameState';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import PinDisplay from '@/components/ui/PinDisplay';
import InputArea from '@/components/ui/InputArea';
import HeartsDisplay from '@/components/ui/HeartsDisplay';
import Header from '@/components/ui/Header';
import { storyIllustrations } from '@/components/illustrations/StoryIllustrations';

interface StoryGamePlayProps {
  episode: StoryEpisode;
}

export default function StoryGamePlay({ episode }: StoryGamePlayProps) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [stageKey, setStageKey] = useState(0);
  const [showKeypad, setShowKeypad] = useState(false);

  const {
    currentStageIndex,
    pin,
    turnsUsed,
    hintUsed,
    isWrong,
    isComplete,
    isGameOver,
    stars,
    currentStage,
    pinLength,
    remainingTurns,
    handlePinInput,
    handlePinDelete,
    handlePinClear,
    handleSubmit,
    handleUseHint,
    resetGame,
  } = useStoryGameState(episode.stages);

  // 스토리 + 단서 텍스트 타이핑 효과
  const fullText = currentStage ? `${currentStage.story}\n\n🔍 ${currentStage.clue}` : '';
  const { displayedText, isTyping, skipTyping } = useTypingEffect(fullText, {
    speed: 25,
    delay: 300,
  });

  // 스테이지 변경 시 타이핑 리셋을 위한 key 업데이트
  useEffect(() => {
    setStageKey((prev) => prev + 1);
  }, [currentStageIndex]);

  // 정답 시 성공 애니메이션 후 다음 스테이지로
  useEffect(() => {
    if (isComplete) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        router.push(`/story/${episode.id}/complete?stars=${stars}`);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isGameOver) {
      router.push(`/story/${episode.id}/gameover?stage=${currentStageIndex}`);
    }
  }, [isComplete, isGameOver, router, episode.id, stars]);

  if (!currentStage) return null;

  // 일러스트 컴포넌트 가져오기
  const illustrationKey = `${episode.id}-${currentStage.id}`;
  const IllustrationComponent = storyIllustrations[illustrationKey];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 성공 애니메이션 오버레이 */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/90 animate-fadeIn">
          <div className="text-center animate-pulse">
            <div className="text-6xl mb-4">🔓</div>
            <p className="text-hacker-emerald font-mono text-xl font-bold text-glow-emerald">
              ACCESS GRANTED
            </p>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <Header
        backHref="/story"
        backText="EXIT"
        center={`EP.${episode.id} - STAGE ${currentStageIndex + 1}/${episode.stages.length}`}
        right={<span className="text-yellow-400 text-sm">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</span>}
      />

      {/* 메인 컨텐츠 */}
      <main className={`flex-1 p-4 overflow-y-auto ${showKeypad ? 'pb-96' : 'pb-24'}`}>
        {/* 스테이지 타이틀 */}
        <div className="mb-4">
          <h2 className="text-hacker-emerald font-bold text-lg flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-hacker-emerald rounded-full animate-pulse"></span>
            {currentStage.title}
          </h2>
          <p className="text-gray-500 font-mono text-xs mt-1">
            TURNS: {turnsUsed}/{currentStage.maxTurns} • REMAINING: {remainingTurns}
          </p>
        </div>

        {/* 일러스트 */}
        {IllustrationComponent && (
          <div className="mb-4 bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800">
            <IllustrationComponent />
          </div>
        )}

        {/* 스토리 + 단서 영역 (타이핑 효과) */}
        <div
          key={stageKey}
          className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 mb-4 cursor-pointer"
          onClick={skipTyping}
        >
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
            {displayedText}
            {isTyping && <span className="text-hacker-emerald animate-pulse">▌</span>}
          </p>
          {isTyping && (
            <p className="text-gray-600 text-xs mt-2 text-right">탭하여 스킵</p>
          )}
        </div>

        {/* 힌트 영역 */}
        {!hintUsed ? (
          <button
            onClick={handleUseHint}
            className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-left hover:border-yellow-500 transition-colors mb-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>💡</span>
                <span className="text-gray-400 text-sm">힌트 보기</span>
              </div>
              <span className="text-yellow-500 text-xs">-1 ★</span>
            </div>
          </button>
        ) : (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4 animate-fadeIn">
            <h3 className="text-yellow-500 font-mono text-xs mb-2 flex items-center gap-2">
              <span>💡</span> HINT
            </h3>
            <p className="text-yellow-400 text-sm">
              {currentStage.hint}
            </p>
          </div>
        )}

        {/* 오답 피드백 */}
        {isWrong && (
          <div className="bg-hacker-rose/10 border border-hacker-rose/30 rounded-lg p-3 mb-4">
            <p className="text-hacker-rose text-sm text-center">
              ❌ 오답입니다. 다시 시도하세요.
            </p>
          </div>
        )}
      </main>

      {/* 입력 영역 (하단 고정) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-hacker-dark/95 backdrop-blur border-t border-gray-800 p-4">
        <div className="max-w-md mx-auto">
          {showKeypad ? (
            <>
              {/* 키패드 닫기 버튼 */}
              <button
                onClick={() => setShowKeypad(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* PIN 디스플레이 */}
              <div className={`mb-2 ${isWrong ? 'animate-shake' : ''}`}>
                <PinDisplay
                  pin={pin}
                  pinLength={pinLength}
                  isWrong={isWrong}
                  accentColor="emerald"
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
                accentColor="emerald"
              />
            </>
          ) : (
            /* 키패드 열기 버튼 */
            <button
              onClick={() => setShowKeypad(true)}
              className="w-full py-3 bg-hacker-emerald/20 border border-hacker-emerald/50 rounded-lg text-hacker-emerald font-mono text-sm hover:bg-hacker-emerald/30 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              PIN 입력
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
