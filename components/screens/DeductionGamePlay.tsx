'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DeductionEpisode } from '@/lib/types';
import { useDeductionGameState } from '@/hooks/useGameState';
import { usePinKeyboard } from '@/hooks/usePinKeyboard';
import { issueClearToken } from '@/lib/clearToken';
import { clearRun, readRun, saveRun, type RunState } from '@/lib/progress';
import ResumePrompt from '@/components/ui/ResumePrompt';
import LockModal from '@/components/ui/LockModal';
import PinDisplay from '@/components/ui/PinDisplay';
import InputArea from '@/components/ui/InputArea';
import StageStatus from '@/components/ui/StageStatus';
import Header from '@/components/ui/Header';
import { deductionIllustrations } from '@/components/illustrations/DeductionIllustrations';

interface DeductionGamePlayProps {
  episode: DeductionEpisode;
}

export default function DeductionGamePlay({ episode }: DeductionGamePlayProps) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  // PIN 입력 레이어. 본문을 덮으므로 열려 있는 동안이 곧 "입력 중"이다.
  const [lockOpen, setLockOpen] = useState(false);
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

  const openLock = useCallback(() => setLockOpen(true), []);
  const closeLock = useCallback(() => setLockOpen(false), []);

  // 물리 키보드 입력 (데스크톱). 숫자를 누르면 레이어가 열린다.
  usePinKeyboard({
    onInput: handlePinInput,
    onDelete: handlePinDelete,
    onClear: handlePinClear,
    onSubmit: handleSubmit,
    onActivate: openLock,
    onEscape: closeLock,
    enabled: !isComplete && !isGameOver && pendingRun === null,
  });

  // 스테이지를 하나 넘길 때마다 이어하기 지점을 저장한다.
  useEffect(() => {
    if (pendingRun !== null) return;
    if (isComplete || isGameOver) return;
    if (currentStageIndex === 0) return;
    saveRun('deduction', episode.id, { stageIndex: currentStageIndex, stars });
  }, [currentStageIndex, stars, isComplete, isGameOver, episode.id, pendingRun]);

  // 스테이지가 넘어가면 레이어를 닫는다
  useEffect(() => {
    setLockOpen(false);
  }, [currentStageIndex]);

  // 스테이지 시작 시 초기 단서 설정
  useEffect(() => {
    initializeStage();
  }, [initializeStage]);

  // 완료 또는 게임오버 시 리다이렉트
  useEffect(() => {
    if (isComplete) {
      setLockOpen(false);
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
        width="narrow"
        center={`EP.${episode.id - 100} · STAGE ${currentStageIndex + 1}/${episode.stages.length}`}
        right={
          <span className="text-noct-gold text-sm tracking-[0.1em]">
            {'★'.repeat(stars)}
            <span className="text-noct-ink-faint">{'☆'.repeat(3 - stars)}</span>
          </span>
        }
      />

      {/* 본문 — 단일 컬럼. 입력은 레이어로 뜨므로 폭을 나눠 쓰지 않는다.
          main 랜드마크는 app/layout.tsx에 하나만 두므로 여기서는 div다. */}
      <div className="mx-auto w-full max-w-md pb-20 lg:max-w-2xl lg:pt-20">
        {/* 스테이지 전환 — currentStageIndex 변경 시 페이드업 재생 */}
        <div key={currentStageIndex} className="animate-fadeInUp">
        {/* 히어로 밴드 — 일러스트(있을 경우) + 검정 그라데이션 페이드 */}
        <div className="relative h-56 lg:h-[24rem] w-full overflow-hidden">
          {IllustrationComponent ? (
            <div className="absolute inset-0">
              <IllustrationComponent />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-noct-black-2 to-noct-page" />
          )}
          {/* 검정으로 가라앉히는 그라데이션 — 하드 프레임 없음 */}
          <div className="absolute inset-0 bg-gradient-to-t from-noct-page via-noct-page/55 to-noct-page/30" />
          {/* 데스크톱에서는 이미지가 화면 폭을 채우지 않아 좌우가 하드컷으로 보인다 */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-noct-page to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-noct-page to-transparent lg:block" />

          {/* 크럼 + 남은 시도 오버레이 */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
            <div className="mx-auto max-w-md lg:max-w-none">
              {/* 턴 표시 */}
              <div className="flex items-center justify-between mb-3">
                <StageStatus
                  turns={turnsSpent}
                  maxTurns={currentStage.maxTurns}
                  remainingTurns={remainingTurns}
                  labelClassName="tracking-[0.2em] text-noct-ink-faint"
                />
              </div>
              <h2 className="font-display text-2xl text-noct-ink leading-snug">
                {currentStage.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-md lg:max-w-none px-5 lg:px-0 pt-6">
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

          <button
            onClick={openLock}
            className="mt-8 block w-full border border-noct-gold-dim py-3.5 font-mono text-[11px] tracking-[0.3em] uppercase text-noct-gold transition-colors hover:bg-noct-gold/5"
          >
            Enter PIN
          </button>
        </div>
        </div>
      </div>

      {/* PIN 입력 레이어 — 공개된 단서를 함께 담는다 */}
      {lockOpen && (
        <LockModal label="잠금 장치" onClose={closeLock}>
          <div className="mt-4 flex items-center justify-between">
            <StageStatus
              turns={turnsSpent}
              maxTurns={currentStage.maxTurns}
              remainingTurns={remainingTurns}
              labelClassName="tracking-[0.2em] text-noct-ink-faint"
            />
          </div>

          {/* 공개된 단서 — 본문이 가려지므로 여기서 다시 읽을 수 있어야 한다 */}
          <div className="mt-4 max-h-48 overflow-y-auto border-t border-noct-ink/10 pt-4">
            <p className="mb-3 font-mono text-[10px] tracking-[0.25em] uppercase text-noct-ink-faint">
              Revealed Clues · {revealedClues.length}
            </p>
            <div className="space-y-3">
              {revealedClues.map((clue, index) => (
                <div
                  key={`${clue.turn}-${index}`}
                  className={`border-l pl-3 ${
                    index === revealedClues.length - 1
                      ? 'border-noct-gold'
                      : 'border-noct-gold-dim/50'
                  }`}
                >
                  <p className="mb-1 font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
                    Clue · T{clue.turn}
                  </p>
                  <p className="font-serif text-[14px] leading-[1.7] text-noct-ink-dim">
                    {clue.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PIN 디스플레이 */}
          <div className={`mt-6 ${isWrong ? 'animate-shake' : ''}`}>
            <PinDisplay pin={pin} pinLength={pinLength} isWrong={isWrong} />
          </div>

          {/* 키패드 */}
          <div className="mt-3">
            <InputArea
              onInput={handlePinInput}
              onDelete={handlePinDelete}
              onClear={handlePinClear}
              onSubmit={handleSubmit}
              canSubmit={pin.length === pinLength}
              hasInput={pin.length > 0}
            />
          </div>

          {/* 오답 피드백 — 제출한 자리에서 바로 보여준다 */}
          {isWrong && (
            <p
              role="status"
              className="mt-4 animate-fadeIn border-t border-noct-ink/10 pt-4 font-serif text-[13px] leading-relaxed text-noct-ink-dim"
            >
              오답입니다. 새로운 단서가 공개되었습니다.
            </p>
          )}
        </LockModal>
      )}
    </div>
  );
}
