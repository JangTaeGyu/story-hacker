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

/** 본문과 단서를 한 줄기로 잇는 구분자 — 타이핑도 이 문자열을 그대로 지나간다. */
const CLUE_SEPARATOR = '\n\n🔍 ';

/**
 * 타이핑 커서.
 *
 * **글의 흐름에서 완전히 빠져 있어야 한다.** 커서 뒤에는 아직 타이핑되지 않은
 * 투명한 본문이 이어지는데, 커서가 자리를 조금이라도 차지하면 글자 하나가 줄
 * 끝을 넘길 때마다 줄바꿈이 다시 계산되어 아래 문단이 한 줄씩 밀린다. 실제로
 * 그 때문에 CLS가 1.33까지 올라갔다(기준 0.1).
 *
 * `inline-block w-0`으로는 부족하다 — 폭이 0이어도 원자적 인라인이라 줄바꿈
 * 기회를 만든다. 그래서 **빈 인라인 span을 기준점 삼아 커서를 absolute로 띄운다.**
 * 내용 없는 인라인 상자는 줄바꿈에 관여하지 않고, absolute 자식은 흐름 밖이다.
 */
function Caret() {
  return (
    <span className="relative" aria-hidden="true">
      <span className="absolute left-0 top-0 text-noct-gold">▌</span>
    </span>
  );
}

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
  const fullText = currentStage
    ? `${currentStage.story}${CLUE_SEPARATOR}${currentStage.clue}`
    : '';
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

  // 본문과 단서는 **처음부터 통째로 DOM에 있다.** 타이핑은 글자를 만들어내는 게
  // 아니라 "어디까지 보이는가"만 정하고, 아직 닿지 않은 뒷부분은 투명하게 둔다.
  //
  // 예전에는 displayedText(빈 문자열에서 자라나는 값)를 그대로 그렸다. 그래서
  // 서버가 내려주는 HTML에는 스테이지 제목만 있고 본문이 없었고, 에피소드
  // 페이지의 크롤 가능한 텍스트가 120자 남짓이었다. 사이트에서 검색에 걸릴
  // 글이 있는 곳은 여기뿐인데 그게 전부 빈 페이지로 취급됐다.
  //
  // 덤으로 문단이 자라며 아래를 밀어내지 않으니 레이아웃 이동(CLS)도 없어진다.
  const storyFull = currentStage.story;
  const clueFull = currentStage.clue;
  const revealedCount = displayedText.length;
  const storyRevealed = Math.min(revealedCount, storyFull.length);
  // fullText는 `${story}${CLUE_SEPARATOR}${clue}` 형태로 이어 붙여 타이핑된다.
  const clueRevealed = Math.min(
    Math.max(revealedCount - storyFull.length - CLUE_SEPARATOR.length, 0),
    clueFull.length
  );

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
                {storyFull.slice(0, storyRevealed)}
                {isTyping && storyRevealed < storyFull.length && <Caret />}
                {/* 아직 타이핑이 닿지 않은 뒷부분 — 자리는 잡되 보이지 않는다.
                    `invisible`(visibility:hidden)이어야 한다. `text-transparent`로 두면
                    경계가 앞으로 밀릴 때마다 이 span의 rect가 움직여 CLS가 1.0까지 뛴다
                    (글자는 실제로 안 움직이지만 Layout Instability API가 그렇게 센다).
                    visibility:hidden은 시각적 표현이 없어 계산에서 빠진다. */}
                <span className="invisible">{storyFull.slice(storyRevealed)}</span>
              </p>

              {/* 단서 — 좌측 액센트 블록.
                  블록 자체는 계속 자리를 지키고, 본문이 끝나야 모습을 드러낸다. */}
              <div
                className={`mt-6 border-l border-noct-gold-dim pl-4 transition-opacity duration-500 motion-reduce:transition-none ${
                  clueRevealed > 0 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-noct-gold-dim">
                  {t.game.clue}
                </p>
                <p className="mt-1.5 whitespace-pre-wrap font-serif text-[15px] leading-[1.8] text-noct-ink-dim">
                  {clueFull.slice(0, clueRevealed)}
                  {isTyping && clueRevealed > 0 && clueRevealed < clueFull.length && <Caret />}
                  <span className="invisible">{clueFull.slice(clueRevealed)}</span>
                </p>
              </div>

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
            <p className="mt-1.5 whitespace-pre-wrap font-serif text-[14px] leading-[1.7] text-noct-ink-dim">
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
