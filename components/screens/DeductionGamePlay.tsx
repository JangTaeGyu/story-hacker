'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DeductionEpisode } from '@/lib/types';
import { useDeductionGameState } from '@/hooks/useGameState';
import { usePinKeyboard } from '@/hooks/usePinKeyboard';
import { issueClearToken } from '@/lib/clearToken';
import { clearRun, readRun, saveRun, type RunState } from '@/lib/progress';
import ResumePrompt from '@/components/ui/ResumePrompt';
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
    turnsSpent,
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
    initializeStage,
    startFrom,
  } = useDeductionGameState(episode.stages);

  // 진행 중이던 판이 있으면 이어하기를 먼저 묻는다.
  const [pendingRun, setPendingRun] = useState<RunState | null>(null);
  useEffect(() => {
    const run = readRun('deduction', episode.id);
    if (run && run.stageIndex < episode.stages.length) {
      setPendingRun(run);
    }
  }, [episode.id, episode.stages.length]);

  // 물리 키보드 입력 (데스크톱)
  const openKeypad = useCallback(() => setShowKeypad(true), []);
  usePinKeyboard({
    onInput: handlePinInput,
    onDelete: handlePinDelete,
    onClear: handlePinClear,
    onSubmit: handleSubmit,
    onActivate: openKeypad,
    enabled: !isComplete && !isGameOver && pendingRun === null,
  });

  // 스테이지를 하나 넘길 때마다 이어하기 지점을 저장한다.
  useEffect(() => {
    if (pendingRun !== null) return;
    if (isComplete || isGameOver) return;
    if (currentStageIndex === 0) return;
    saveRun('deduction', episode.id, { stageIndex: currentStageIndex, stars });
  }, [currentStageIndex, stars, isComplete, isGameOver, episode.id, pendingRun]);

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
      clearRun('deduction', episode.id);
      const timer = setTimeout(() => {
        // 완료 화면이 진행도를 기록해도 되는지 판별할 1회용 증표
        issueClearToken('deduction', episode.id, stars);
        router.push(`/deduction/${episode.id}/complete?stars=${stars}&turns=${turnsUsed}`);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isGameOver) {
      // 게임오버는 처음부터 다시 — 이어하기 지점을 남기지 않는다.
      clearRun('deduction', episode.id);
      router.push(`/deduction/${episode.id}/gameover?stage=${currentStageIndex}`);
    }
  }, [isComplete, isGameOver, router, episode.id, stars, turnsUsed, currentStageIndex]);

  if (!currentStage) return null;

  // 일러스트 컴포넌트 가져오기
  const illustrationKey = `${episode.id}-${currentStage.id}`;
  const IllustrationComponent = deductionIllustrations[illustrationKey];

  return (
    <div className="min-h-screen flex flex-col relative bg-noct-page text-noct-ink">
      {/* 이어하기 확인 */}
      {pendingRun && (
        <ResumePrompt
          stageIndex={pendingRun.stageIndex}
          totalStages={episode.stages.length}
          stageTitle={episode.stages[pendingRun.stageIndex]?.title}
          onResume={() => {
            startFrom(pendingRun.stageIndex);
            setPendingRun(null);
          }}
          onRestart={() => {
            clearRun('deduction', episode.id);
            setPendingRun(null);
          }}
        />
      )}

      {/* 성공 오버레이 — 느린 NOCTURNE 페이드 */}
      {showSuccess && (
        <div role="status" className="absolute inset-0 z-50 flex items-center justify-center bg-noct-page/95 animate-fadeIn">
          <div className="text-center animate-scaleIn">
            <p className="font-display text-3xl text-noct-gold">잠금 해제</p>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-noct-gold-dim mt-3">
              Access Granted
            </p>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <Header
        backHref="/deduction"
        backText="EXIT"
        center={`EP.${episode.id - 100} · STAGE ${currentStageIndex + 1}/${episode.stages.length}`}
        right={
          <span className="text-noct-gold text-sm tracking-[0.1em]">
            {'★'.repeat(stars)}
            <span className="text-noct-ink-faint">{'☆'.repeat(3 - stars)}</span>
          </span>
        }
      />

      {/* 메인 컨텐츠 */}
      <main className={`flex-1 overflow-y-auto ${showKeypad ? 'pb-[30rem]' : 'pb-28'}`}>
        {/* 스테이지 전환 — currentStageIndex 변경 시 페이드업 재생 */}
        <div key={currentStageIndex} className="animate-fadeInUp">
        {/* 히어로 밴드 — 일러스트(있을 경우) + 검정 그라데이션 페이드 */}
        <div className="relative h-56 w-full overflow-hidden">
          {IllustrationComponent ? (
            <div className="absolute inset-0">
              <IllustrationComponent />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-noct-black-2 to-noct-page" />
          )}
          {/* 검정으로 가라앉히는 그라데이션 — 하드 프레임 없음 */}
          <div className="absolute inset-0 bg-gradient-to-t from-noct-page via-noct-page/55 to-noct-page/30" />

          {/* 크럼 + 남은 시도 오버레이 */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
            <div className="mx-auto max-w-md">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
                  Turns {turnsSpent}/{currentStage.maxTurns}
                </span>
                <HeartsDisplay
                  totalTurns={currentStage.maxTurns}
                  remainingTurns={remainingTurns}
                />
              </div>
              <h2 className="font-display text-2xl text-noct-ink leading-snug">
                {currentStage.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-md px-5 pt-6">
          {/* 상황 설명 */}
          <section className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-faint mb-3">
              Situation
            </p>
            <p className="font-serif text-[15px] leading-relaxed text-noct-ink-dim whitespace-pre-wrap">
              {currentStage.situation}
            </p>
          </section>

          {/* 공개된 단서들 — 왼쪽 골드 보더 블록 */}
          <section className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-faint mb-4">
              Revealed Clues · {revealedClues.length}
            </p>
            {revealedClues.length > 0 ? (
              <div className="space-y-4">
                {revealedClues.map((clue, index) => {
                  // 마지막으로 공개된 단서를 은은하게 강조
                  const isNewest = index === revealedClues.length - 1;
                  return (
                    <div
                      key={`${clue.turn}-${index}`}
                      className={`border-l pl-4 ${
                        isNewest
                          ? 'border-noct-gold animate-slideIn'
                          : 'border-noct-gold-dim/50'
                      }`}
                    >
                      <p
                        className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-1.5 ${
                          isNewest ? 'text-noct-gold' : 'text-noct-ink-faint'
                        }`}
                      >
                        Clue · T{clue.turn}
                      </p>
                      <p
                        className={`font-serif text-[15px] leading-relaxed ${
                          isNewest ? 'text-noct-ink' : 'text-noct-ink-dim'
                        }`}
                      >
                        {clue.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="font-serif text-sm text-noct-ink-faint italic">
                아직 공개된 단서가 없습니다.
              </p>
            )}
          </section>

          {/* 게임 규칙 안내 */}
          <p className="font-serif text-[13px] leading-relaxed text-noct-ink-faint border-t border-noct-ink/10 pt-5">
            오답 시 새로운 단서가 공개됩니다. 빨리 맞출수록 높은 평가를 받습니다.
          </p>

          {/* 오답 피드백 */}
          {isWrong && (
            <p role="status" className="font-serif text-[13px] text-noct-ink-dim mt-5 animate-shake">
              오답입니다. 새로운 단서가 공개되었습니다.
            </p>
          )}
        </div>
        </div>
      </main>

      {/* 입력 영역 (하단 고정) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-noct-black/95 backdrop-blur border-t border-noct-ink/10">
        <div className="max-w-md mx-auto px-5">
          {/* 토글 버튼 */}
          <button
            onClick={() => setShowKeypad(!showKeypad)}
            className="w-full py-4 font-mono text-[11px] tracking-[0.25em] uppercase text-noct-ink-dim hover:text-noct-ink transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3.5 w-3.5 transition-transform duration-300 ${showKeypad ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Enter PIN
          </button>

          {/* 키패드 영역 (슬라이드 애니메이션) */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              showKeypad ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              {/* PIN 디스플레이 */}
              <div className={`mb-3 ${isWrong ? 'animate-shake' : ''}`}>
                <PinDisplay
                  pin={pin}
                  pinLength={pinLength}
                  isWrong={isWrong}
                />
              </div>

              {/* 키패드 */}
              <InputArea
                onInput={handlePinInput}
                onDelete={handlePinDelete}
                onClear={handlePinClear}
                onSubmit={handleSubmit}
                canSubmit={pin.length === pinLength}
                hasInput={pin.length > 0}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
