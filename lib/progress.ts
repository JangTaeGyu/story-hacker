'use client';

import { useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { GameMode, GameProgress } from './types';

/**
 * 진행 상황 저장소.
 *
 * 두 종류를 분리해 둔다.
 * - 최고 기록(`story-hacker-progress`): 에피소드를 끝냈을 때의 별점. 하향되지 않는다.
 * - 진행 중인 판(`story-hacker-run`): 에피소드를 끝내기 전에 이탈했을 때
 *   이어하기 위한 임시 상태. 완료하거나 게임오버되면 지운다.
 */

export const PROGRESS_KEY = 'story-hacker-progress';
export const RUN_KEY = 'story-hacker-run';

export const EMPTY_PROGRESS: GameProgress = { completedEpisodes: {} };

// ============================================
// 최고 기록
// ============================================

export function getTotalStars(progress: GameProgress): number {
  return Object.values(progress.completedEpisodes).reduce(
    (sum, record) => sum + (record?.stars ?? 0),
    0
  );
}

export function useProgress() {
  const [progress, setProgress, isInitialized] = useLocalStorage<GameProgress>(
    PROGRESS_KEY,
    EMPTY_PROGRESS
  );

  /** 에피소드 클리어 기록. 기존보다 별점이 높을 때만 갱신된다. */
  const recordClear = useCallback(
    (episodeId: number, stars: number) => {
      setProgress((prev) => {
        const existing = prev.completedEpisodes[episodeId];
        if (existing && existing.stars >= stars) return prev;
        return {
          ...prev,
          completedEpisodes: {
            ...prev.completedEpisodes,
            [episodeId]: { stars, completed: true },
          },
        };
      });
    },
    [setProgress]
  );

  return {
    progress,
    recordClear,
    isInitialized,
    totalStars: getTotalStars(progress),
  };
}

// ============================================
// 진행 중인 판 (이어하기)
// ============================================

export interface RunState {
  /** 다음에 풀어야 할 스테이지 인덱스 */
  stageIndex: number;
  /** 스토리 모드의 현재 별점 (힌트 소모가 반영된 값) */
  stars: number;
  savedAt: number;
}

type RunStore = Record<string, RunState | undefined>;

function runId(mode: GameMode, episodeId: number): string {
  return `${mode}-${episodeId}`;
}

function readRunStore(): RunStore {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(RUN_KEY);
    return raw ? (JSON.parse(raw) as RunStore) : {};
  } catch {
    return {};
  }
}

function writeRunStore(store: RunStore): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(RUN_KEY, JSON.stringify(store));
  } catch {
    // 저장 실패는 조용히 넘어간다 — 이어하기는 부가 기능이다.
  }
}

export function readRun(mode: GameMode, episodeId: number): RunState | null {
  const run = readRunStore()[runId(mode, episodeId)];
  if (!run || typeof run.stageIndex !== 'number' || run.stageIndex <= 0) {
    return null;
  }
  return run;
}

export function saveRun(
  mode: GameMode,
  episodeId: number,
  run: { stageIndex: number; stars: number }
): void {
  const store = readRunStore();
  store[runId(mode, episodeId)] = { ...run, savedAt: Date.now() };
  writeRunStore(store);
}

export function clearRun(mode: GameMode, episodeId: number): void {
  const store = readRunStore();
  delete store[runId(mode, episodeId)];
  writeRunStore(store);
}

/** 에피소드 선택 화면에서 "진행 중" 배지를 그리기 위한 조회 */
export function readAllRuns(mode: GameMode): Record<number, RunState> {
  const store = readRunStore();
  const prefix = `${mode}-`;
  const result: Record<number, RunState> = {};
  for (const [key, run] of Object.entries(store)) {
    if (!run || !key.startsWith(prefix)) continue;
    const episodeId = Number(key.slice(prefix.length));
    if (Number.isInteger(episodeId)) result[episodeId] = run;
  }
  return result;
}
