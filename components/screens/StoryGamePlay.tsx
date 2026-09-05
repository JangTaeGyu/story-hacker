'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { StoryEpisode } from '@/lib/types';
import { useStoryGameState } from '@/hooks/useGameState';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { usePinKeyboard } from '@/hooks/usePinKeyboard';
import { issueClearToken } from '@/lib/clearToken';
import { clearRun, readRun, saveRun, type RunState } from '@/lib/progress';
import ResumePrompt from '@/components/ui/ResumePrompt';
import LockModal from '@/components/ui/LockModal';
import PinDisplay from '@/components/ui/PinDisplay';
import InputArea from '@/components/ui/InputArea';
import StageStatus from '@/components/ui/StageStatus';
import Header from '@/components/ui/Header';
import { storyIllustrations } from '@/components/illustrations/StoryIllustrations';
import { useI18n } from '@/components/i18n/LocaleProvider';

interface StoryGamePlayProps {
  episode: StoryEpisode;
}

export default function StoryGamePlay({ episode }: StoryGamePlayProps) {
  const { t, href } = useI18n();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [stageKey, setStageKey] = useState(0);
  // PIN 입력 레이어. 본문을 덮으므로 열려 있는 동안이 곧 "입력 중"이다.
  const [lockOpen, setLockOpen] = useState(false);

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
    startFrom,
  } = useStoryGameState(episode.stages);

  // 진행 중이던 판이 있으면 이어하기를 먼저 묻는다.
  const [pendingRun, setPendingRun] = useState<RunState | null>(null);
  useEffect(() => {
    const run = readRun('story', episode.id);
    if (run && run.stageIndex < episode.stages.length) {
      setPendingRun(run);
    }
  }, [episode.id, episode.stages.length]);

  // 스토리 + 단서 텍스트 타이핑 효과
  const fullText = currentStage ? `${currentStage.story}\n\n🔍 ${currentStage.clue}` : '';
  // isComplete는 게임 상태에도 있으므로 이름을 나눠 받는다.
  const {
    displayedText,
    isTyping,
    isComplete: isTypingDone,
    skipTyping,
  } = useTypingEffect(fullText, { speed: 25, delay: 300 });

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
  // (완료·게임오버 시에는 아래 effect에서 지운다)
  useEffect(() => {
    if (pendingRun !== null) return;
    if (isComplete || isGameOver) return;
    if (currentStageIndex === 0) return;
    saveRun('story', episode.id, { stageIndex: currentStageIndex, stars });
  }, [currentStageIndex, stars, isComplete, isGameOver, episode.id, pendingRun]);

  // 스테이지가 넘어가면 타이핑을 다시 재생하고 레이어를 닫는다.
  useEffect(() => {
    setStageKey((prev) => prev + 1);
    setLockOpen(false);
  }, [currentStageIndex]);

  // 정답 시 성공 애니메이션 후 다음 스테이지로
  useEffect(() => {
    if (isComplete) {
      setLockOpen(false);
      setShowSuccess(true);
      clearRun('story', episode.id);
      const timer = setTimeout(() => {
        // 완료 화면이 진행도를 기록해도 되는지 판별할 1회용 증표
        issueClearToken('story', episode.id, stars);
        router.push(href(`/story/${episode.id}/complete?stars=${stars}`));
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isGameOver) {
      // 게임오버는 처음부터 다시 — 이어하기 지점을 남기지 않는다.
      clearRun('story', episode.id);
      router.push(href(`/story/${episode.id}/gameover?stage=${currentStageIndex}`));
    }
  }, [isComplete, isGameOver, router, href, episode.id, stars, currentStageIndex]);

  if (!currentStage) return null;

  // 일러스트 컴포넌트 가져오기
  const illustrationKey = `${episode.id}-${currentStage.id}`;
  const IllustrationComponent = storyIllustrations[illustrationKey];

  // 타이핑된 텍스트를 본문과 단서로 분리
  const [storyText, ...clueParts] = displayedText.split('🔍 ');
  const clueText = clueParts.join('🔍 ');

  return (
    <div className="relative flex min-h-screen flex-col bg-noct-black">
      {/* 이어하기 확인 */}
      {pendingRun && (
        <ResumePrompt
          stageIndex={pendingRun.stageIndex}
          totalStages={episode.stages.length}
          stageTitle={episode.stages[pendingRun.stageIndex]?.title}
          onResume={() => {
            startFrom(pendingRun.stageIndex, pendingRun.stars);
            setPendingRun(null);
          }}
          onRestart={() => {
            clearRun('story', episode.id);
            setPendingRun(null);
          }}
        />
      )}

      {/* 성공 오버레이 — 잔잔한 페이드 */}
      {showSuccess && (
        <div role="status" className="absolute inset-0 z-50 flex items-center justify-center bg-noct-black/95 animate-fadeIn">
          <div className="text-center animate-scaleIn px-8">
            <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-noct-gold to-transparent" />
            <h2 className="font-display text-4xl text-noct-gold">{t.game.unlocked}</h2>
            <p className="mt-3 font-mono text-[11px] tracking-[0.3em] uppercase text-noct-ink-dim">
              {t.game.accessGranted}
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-noct-gold to-transparent" />
          </div>
        </div>
      )}

      {/* 헤더 — 뒤로가기 */}
      <Header
        backHref={href('/story')}
        backText={t.common.exit}
        width="narrow"
        center={`EP.${String(episode.id).padStart(2, '0')} · STAGE ${currentStageIndex + 1} / ${episode.stages.length}`}
        right={
          <span className="font-mono text-[11px] tracking-[0.2em] text-noct-gold">
            {'★'.repeat(stars)}
            {'☆'.repeat(3 - stars)}
          </span>
        }
      />

      {/* 본문 — 단일 컬럼. 입력은 레이어로 뜨므로 폭을 나눠 쓰지 않는다.
          main 랜드마크는 app/layout.tsx에 하나만 두므로 여기서는 div다. */}
      <div className="mx-auto w-full max-w-md pb-20 lg:max-w-2xl lg:pt-20">
        {/* 스테이지 전환 — currentStageIndex 변경 시 페이드업 재생 */}
        <div key={currentStageIndex} className="animate-fadeInUp">
          {/* 히어로 이미지 밴드 */}
          <div className="relative h-72 w-full overflow-hidden lg:h-[24rem]">
            {IllustrationComponent ? (
              <div className="absolute inset-0">
                <IllustrationComponent />
              </div>
            ) : (
              <div className="absolute inset-0 bg-noct-black-2" />
            )}
            {/* 하단으로 가라앉히는 그라데이션 */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noct-black/55 via-noct-black/5 to-noct-black" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-noct-black to-transparent" />
            {/* 데스크톱에서는 이미지가 화면 폭을 채우지 않아 좌우가 하드컷으로 보인다 */}
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-noct-black to-transparent lg:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-noct-black to-transparent lg:block" />

            {/* 이미지 상단: 턴 표시 */}
            <div className="absolute inset-x-0 top-16 flex items-center justify-between px-5">
              <StageStatus
                turns={turnsUsed}
                maxTurns={currentStage.maxTurns}
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
                    {t.game.clue}
                  </p>
                  <p className="mt-1.5 font-serif text-[15px] leading-[1.8] text-noct-ink-dim">
                    {clueText}
                    {isTyping && <span className="text-noct-gold">▌</span>}
                  </p>
                </div>
              )}

              {isTyping && (
                <p className="mt-3 text-right font-mono text-[10px] tracking-[0.2em] uppercase text-noct-ink-faint">
                  {t.game.tapToSkip}
                </p>
              )}
            </div>

            {/* 글을 다 읽은 뒤에야 잠금 장치가 열린다.
                (타이핑을 스킵하면 곧바로 나타난다) */}
            {isTypingDone && (
              <button
                onClick={openLock}
                className="mt-9 block w-full animate-fadeIn border border-noct-gold-dim py-3.5 font-mono text-[11px] tracking-[0.3em] uppercase text-noct-gold transition-colors hover:bg-noct-gold/5"
              >
                {t.game.enterPin}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PIN 입력 레이어 — 단서와 힌트를 함께 담는다 */}
      {lockOpen && (
        <LockModal label={t.game.lockLabel} onClose={closeLock}>
          <div className="mt-4 flex items-center justify-between">
            <StageStatus
              turns={turnsUsed}
              maxTurns={currentStage.maxTurns}
              remainingTurns={remainingTurns}
            />
          </div>

          {/* 단서 — 본문이 가려지므로 여기서 다시 읽을 수 있어야 한다 */}
          <div className="mt-4 border-l border-noct-gold-dim pl-4">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-gold-dim">
              {t.game.clue}
            </p>
            <p className="mt-1.5 font-serif text-[14px] leading-[1.7] text-noct-ink-dim">
              {currentStage.clue}
            </p>
          </div>

          {/* 힌트 — 막히는 순간이 곧 입력 중이므로 레이어 안에 둔다 */}
          {!hintUsed ? (
            <button
              onClick={handleUseHint}
              className="mt-4 flex w-full items-center justify-between border-t border-noct-ink/10 pt-4 text-left transition-colors hover:border-noct-ink/20"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-dim">
                {t.game.showHint}
              </span>
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-noct-gold-dim">
                {t.game.hintCost}
              </span>
            </button>
          ) : (
            <div className="mt-4 animate-fadeIn border-l border-noct-gold-dim pl-4">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-gold-dim">
                {t.game.hint}
              </p>
              <p className="mt-1.5 font-serif text-[14px] leading-[1.7] text-noct-ink-dim">
                {currentStage.hint}
              </p>
            </div>
          )}

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
              className="mt-4 animate-fadeIn border-t border-noct-ink/10 pt-4 text-center font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-dim"
            >
              {t.game.wrongPin}
            </p>
          )}
        </LockModal>
      )}
    </div>
  );
}
