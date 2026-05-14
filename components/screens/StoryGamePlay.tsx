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

  // 스테이지 변경 시 타이핑 리셋 및 키패드 닫기
  useEffect(() => {
    setStageKey((prev) => prev + 1);
    setShowKeypad(false);
  }, [currentStageIndex]);

  // 정답 시 성공 애니메이션 후 다음 스테이지로
  useEffect(() => {
    if (isComplete) {
      setShowKeypad(false);
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

  // 타이핑된 텍스트를 본문과 단서로 분리
  const [storyText, ...clueParts] = displayedText.split('🔍 ');
  const clueText = clueParts.join('🔍 ');

  return (
    <div className="min-h-screen flex flex-col relative bg-noct-black">
      {/* 성공 오버레이 — 잔잔한 페이드 */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-noct-black/95 animate-fadeIn">
          <div className="text-center animate-scaleIn px-8">
            <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-noct-gold to-transparent" />
            <h2 className="font-display text-4xl text-noct-gold">잠금 해제</h2>
            <p className="mt-3 font-mono text-[11px] tracking-[0.3em] uppercase text-noct-ink-dim">
              Access Granted
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-noct-gold to-transparent" />
          </div>
        </div>
      )}

      {/* 헤더 — 뒤로가기 */}
      <Header
        backHref="/story"
        backText="EXIT"
        center={`EP.${String(episode.id).padStart(2, '0')} · STAGE ${currentStageIndex + 1} / ${episode.stages.length}`}
        right={
          <span className="font-mono text-[11px] tracking-[0.2em] text-noct-gold">
            {'★'.repeat(stars)}
            {'☆'.repeat(3 - stars)}
          </span>
        }
      />

      {/* 메인 컨텐츠 */}
      <main className={`flex-1 overflow-y-auto ${showKeypad ? 'pb-96' : 'pb-24'}`}>
        {/* 스테이지 전환 — currentStageIndex 변경 시 페이드업 재생 */}
        <div key={currentStageIndex} className="animate-fadeInUp">
        {/* 히어로 이미지 밴드 */}
        <div className="relative h-56 w-full overflow-hidden">
          {IllustrationComponent ? (
            <div className="absolute inset-0">
              <IllustrationComponent />
            </div>
          ) : (
            <div className="absolute inset-0 bg-noct-black-2" />
          )}
          {/* 하단으로 가라앉히는 그라데이션 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noct-black/70 via-noct-black/10 to-noct-black" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-noct-black to-transparent" />

          {/* 이미지 상단: 턴 표시 */}
          <div className="absolute inset-x-0 top-16 px-5 flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-dim">
              Turns {turnsUsed} / {currentStage.maxTurns}
            </p>
            <HeartsDisplay
              totalTurns={currentStage.maxTurns}
              remainingTurns={remainingTurns}
            />
          </div>

          {/* 이미지 하단: 스테이지 타이틀 */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-gold-dim">
              Stage {currentStageIndex + 1}
            </p>
            <h1 className="mt-1.5 font-display text-3xl leading-tight text-noct-ink">
              {currentStage.title}
            </h1>
          </div>
        </div>

        {/* 다크 본문 */}
        <div className="px-5 pt-6">
          {/* 스토리 프로즈 — 타이핑 효과 + 탭하여 스킵 */}
          <div key={stageKey} className="cursor-pointer" onClick={skipTyping}>
            <p className="whitespace-pre-wrap font-serif text-[15px] leading-[1.9] text-noct-ink">
              {storyText.trimEnd()}
              {isTyping && clueParts.length === 0 && (
                <span className="text-noct-gold">▌</span>
              )}
            </p>

            {/* 단서 — 좌측 액센트 블록 */}
            {clueParts.length > 0 && (
              <div className="mt-6 border-l border-noct-gold-dim pl-4">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-gold-dim">
                  단서
                </p>
                <p className="mt-1.5 font-serif text-[15px] leading-[1.8] text-noct-ink-dim">
                  {clueText}
                  {isTyping && <span className="text-noct-gold">▌</span>}
                </p>
              </div>
            )}

            {isTyping && (
              <p className="mt-3 text-right font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
                탭하여 스킵
              </p>
            )}
          </div>

          {/* 힌트 — 잔잔한 인라인 토글 */}
          {!hintUsed ? (
            <button
              onClick={handleUseHint}
              className="mt-8 flex w-full items-center justify-between border-t border-noct-ink/10 pt-4 text-left transition-colors hover:border-noct-ink/20"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-dim">
                힌트 보기
              </span>
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-noct-gold-dim">
                별 1 소모
              </span>
            </button>
          ) : (
            <div className="mt-8 animate-fadeIn border-l border-noct-gold-dim pl-4">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-gold-dim">
                힌트
              </p>
              <p className="mt-1.5 font-serif text-[15px] leading-[1.8] text-noct-ink-dim">
                {currentStage.hint}
              </p>
            </div>
          )}

          {/* 오답 피드백 */}
          {isWrong && (
            <p className="mt-6 animate-fadeIn text-center font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-dim">
              일치하지 않습니다 · 다시 시도하세요
            </p>
          )}
        </div>
        </div>
      </main>

      {/* 입력 영역 (하단 고정) */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-noct-ink/10 bg-noct-black/95 backdrop-blur">
        <div className="mx-auto max-w-md px-5">
          {/* 토글 버튼 */}
          <button
            onClick={() => setShowKeypad(!showKeypad)}
            className="flex w-full items-center justify-center gap-2 py-4 font-mono text-[11px] tracking-[0.25em] uppercase text-noct-ink-dim transition-colors hover:text-noct-ink"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3.5 w-3.5 transition-transform duration-300 ${showKeypad ? 'rotate-180' : ''}`}
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
                  accentColor="emerald"
                />
              </div>

              {/* 키패드 */}
              <InputArea
                onInput={handlePinInput}
                onClear={handlePinClear}
                onSubmit={handleSubmit}
                canSubmit={pin.length === pinLength}
                accentColor="emerald"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
