'use client';

import { useState, useCallback } from 'react';
import type { StoryStage, DeductionStage, DeductionClue } from '@/lib/types';
import { calculateDeductionStars, getPinLength } from '@/lib/utils';

// ============================================
// 스토리 모드 게임 상태
// ============================================

interface StoryGameState {
  currentStageIndex: number;
  pin: string;
  turnsUsed: number;
  hintUsed: boolean;
  isWrong: boolean;
  isComplete: boolean;
  isGameOver: boolean;
  stars: number;
}

export function useStoryGameState(stages: StoryStage[]) {
  const [state, setState] = useState<StoryGameState>({
    currentStageIndex: 0,
    pin: '',
    turnsUsed: 0,
    hintUsed: false,
    isWrong: false,
    isComplete: false,
    isGameOver: false,
    stars: 3,
  });

  const currentStage = stages[state.currentStageIndex];
  const pinLength = currentStage ? getPinLength(currentStage.lockType) : 4;

  // PIN 입력
  const handlePinInput = useCallback((digit: string) => {
    setState((prev) => {
      if (prev.isComplete || prev.isGameOver) return prev;
      if (prev.pin.length >= pinLength) return prev;
      return { ...prev, pin: prev.pin + digit, isWrong: false };
    });
  }, [pinLength]);

  // PIN 삭제
  const handlePinDelete = useCallback(() => {
    setState((prev) => {
      if (prev.isComplete || prev.isGameOver) return prev;
      return { ...prev, pin: prev.pin.slice(0, -1), isWrong: false };
    });
  }, []);

  // PIN 전체 삭제
  const handlePinClear = useCallback(() => {
    setState((prev) => {
      if (prev.isComplete || prev.isGameOver) return prev;
      return { ...prev, pin: '', isWrong: false };
    });
  }, []);

  // 답안 제출
  const handleSubmit = useCallback(() => {
    setState((prev) => {
      if (prev.isComplete || prev.isGameOver) return prev;
      if (prev.pin.length !== pinLength) return prev;

      const stage = stages[prev.currentStageIndex];
      const isCorrect = stage.answers.includes(prev.pin);

      if (isCorrect) {
        // 다음 스테이지로 이동 또는 완료
        const isLastStage = prev.currentStageIndex >= stages.length - 1;
        if (isLastStage) {
          return {
            ...prev,
            isComplete: true,
          };
        } else {
          return {
            ...prev,
            currentStageIndex: prev.currentStageIndex + 1,
            pin: '',
            turnsUsed: 0,
            hintUsed: false,
            isWrong: false,
          };
        }
      } else {
        // 오답 처리
        const newTurns = prev.turnsUsed + 1;
        const maxTurns = stage.maxTurns;
        const isGameOver = newTurns >= maxTurns;

        return {
          ...prev,
          pin: '',
          turnsUsed: newTurns,
          isWrong: true,
          isGameOver,
        };
      }
    });
  }, [pinLength, stages]);

  // 힌트 사용
  const handleUseHint = useCallback(() => {
    setState((prev) => {
      if (prev.hintUsed || prev.isComplete || prev.isGameOver) return prev;
      return {
        ...prev,
        hintUsed: true,
        stars: Math.max(1, prev.stars - 1),
      };
    });
  }, []);

  // 이어하기 — 저장된 스테이지·별점에서 다시 시작한다.
  const startFrom = useCallback((stageIndex: number, stars: number) => {
    setState({
      currentStageIndex: stageIndex,
      pin: '',
      turnsUsed: 0,
      hintUsed: false,
      isWrong: false,
      isComplete: false,
      isGameOver: false,
      stars,
    });
  }, []);

  return {
    ...state,
    currentStage,
    pinLength,
    remainingTurns: currentStage ? currentStage.maxTurns - state.turnsUsed : 0,
    handlePinInput,
    handlePinDelete,
    handlePinClear,
    handleSubmit,
    handleUseHint,
    startFrom,
  };
}

// ============================================
// 추리 모드 게임 상태
// ============================================

interface DeductionGameState {
  currentStageIndex: number;
  pin: string;
  turnsUsed: number;
  revealedClues: DeductionClue[];
  isWrong: boolean;
  isComplete: boolean;
  isGameOver: boolean;
}

/** 턴 1에 해당하는 단서 — 스테이지에 들어서는 순간 공개되어 있다. */
function initialCluesOf(stage: DeductionStage | undefined): DeductionClue[] {
  return stage ? stage.clues.filter((clue) => clue.turn === 1) : [];
}

export function useDeductionGameState(stages: DeductionStage[]) {
  const [state, setState] = useState<DeductionGameState>(() => ({
    currentStageIndex: 0,
    pin: '',
    turnsUsed: 1,
    // 빈 배열로 시작한 뒤 effect에서 채우면 **서버가 내려주는 HTML에 첫 단서가
    // 없다.** 추리 모드에서 검색에 걸릴 글은 상황 설명과 단서뿐이라, 그만큼이
    // 통째로 크롤러에게 보이지 않게 된다. 처음부터 채워서 내려보낸다.
    revealedClues: initialCluesOf(stages[0]),
    isWrong: false,
    isComplete: false,
    isGameOver: false,
  }));

  const currentStage = stages[state.currentStageIndex];
  const pinLength = currentStage ? getPinLength(currentStage.lockType) : 4;

  // 초기 단서 설정 (턴 1에 해당하는 단서)
  const getInitialClues = useCallback(
    (stage: DeductionStage) => initialCluesOf(stage),
    []
  );

  // PIN 입력
  const handlePinInput = useCallback((digit: string) => {
    setState((prev) => {
      if (prev.isComplete || prev.isGameOver) return prev;
      if (prev.pin.length >= pinLength) return prev;
      return { ...prev, pin: prev.pin + digit, isWrong: false };
    });
  }, [pinLength]);

  // PIN 삭제
  const handlePinDelete = useCallback(() => {
    setState((prev) => {
      if (prev.isComplete || prev.isGameOver) return prev;
      return { ...prev, pin: prev.pin.slice(0, -1), isWrong: false };
    });
  }, []);

  // PIN 전체 삭제
  const handlePinClear = useCallback(() => {
    setState((prev) => {
      if (prev.isComplete || prev.isGameOver) return prev;
      return { ...prev, pin: '', isWrong: false };
    });
  }, []);

  // 답안 제출
  const handleSubmit = useCallback(() => {
    setState((prev) => {
      if (prev.isComplete || prev.isGameOver) return prev;
      if (prev.pin.length !== pinLength) return prev;

      const stage = stages[prev.currentStageIndex];
      const isCorrect = prev.pin === stage.answer;

      if (isCorrect) {
        // 다음 스테이지로 이동 또는 완료
        const isLastStage = prev.currentStageIndex >= stages.length - 1;
        if (isLastStage) {
          return {
            ...prev,
            isComplete: true,
          };
        } else {
          const nextStage = stages[prev.currentStageIndex + 1];
          return {
            ...prev,
            currentStageIndex: prev.currentStageIndex + 1,
            pin: '',
            turnsUsed: 1,
            revealedClues: getInitialClues(nextStage),
            isWrong: false,
          };
        }
      } else {
        // 오답 처리 - 새로운 단서 공개
        const newTurns = prev.turnsUsed + 1;
        const maxTurns = stage.maxTurns;
        const isGameOver = newTurns > maxTurns;

        // 새로운 턴에 해당하는 단서 추가
        const newClues = stage.clues.filter((clue) => clue.turn === newTurns);
        const allRevealedClues = [...prev.revealedClues, ...newClues];

        return {
          ...prev,
          pin: '',
          turnsUsed: newTurns,
          revealedClues: allRevealedClues,
          isWrong: true,
          isGameOver,
        };
      }
    });
  }, [pinLength, stages, getInitialClues]);

  // 스테이지 시작 시 초기 단서 설정
  const initializeStage = useCallback(() => {
    if (currentStage && state.revealedClues.length === 0) {
      setState((prev) => ({
        ...prev,
        revealedClues: getInitialClues(currentStage),
      }));
    }
  }, [currentStage, state.revealedClues.length, getInitialClues]);

  // 이어하기 — 저장된 스테이지에서 다시 시작한다.
  const startFrom = useCallback(
    (stageIndex: number) => {
      const stage = stages[stageIndex];
      if (!stage) return;
      setState({
        currentStageIndex: stageIndex,
        pin: '',
        turnsUsed: 1,
        revealedClues: getInitialClues(stage),
        isWrong: false,
        isComplete: false,
        isGameOver: false,
      });
    },
    [stages, getInitialClues]
  );

  return {
    ...state,
    currentStage,
    pinLength,
    stars: calculateDeductionStars(state.turnsUsed),
    // turnsUsed는 1부터 시작하므로 실제 사용한 시도 횟수는 하나 적다.
    turnsSpent: state.turnsUsed - 1,
    remainingTurns: currentStage ? currentStage.maxTurns - state.turnsUsed + 1 : 0,
    handlePinInput,
    handlePinDelete,
    handlePinClear,
    handleSubmit,
    initializeStage,
    startFrom,
  };
}
