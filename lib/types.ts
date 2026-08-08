// ============================================
// 스토리 모드 타입
// ============================================

export type LockType = 'pin1' | 'pin2' | 'pin3' | 'pin4' | 'pin5' | 'pin6';

export interface StoryStage {
  id: number;
  title: string;
  story: string;
  clue: string;
  hint: string;
  lockType: LockType;
  answers: string[];
  maxTurns: number;
}

export interface StoryEpisode {
  id: number;
  title: string;
  subtitle?: string;
  synopsis?: string;
  previousEpisode?: number;
  difficulty: 1 | 2 | 3;
  mode: 'story';
  stages: StoryStage[];
}

// ============================================
// 추리 모드 타입
// ============================================

export interface DeductionClue {
  turn: number;
  text: string;
}

export interface DeductionStage {
  id: number;
  title: string;
  situation: string;
  lockType: LockType;
  answer: string;
  maxTurns: number;
  clues: DeductionClue[];
}

export interface DeductionEpisode {
  id: number;
  title: string;
  difficulty: 1 | 2 | 3;
  mode: 'deduction';
  stages: DeductionStage[];
}

// ============================================
// 게임 상태 타입
// ============================================

export type GameMode = 'story' | 'deduction';

export type Episode = StoryEpisode | DeductionEpisode;
export type Stage = StoryStage | DeductionStage;

export interface EpisodeProgress {
  stars: number;
  completed: boolean;
}

export interface GameProgress {
  completedEpisodes: Record<number, EpisodeProgress>;
}

// ============================================
// 유틸리티 타입
// ============================================

export type DifficultyLevel = 1 | 2 | 3;

/**
 * 에피소드 목록·결과 화면에 필요한 최소 정보.
 *
 * 이 화면들은 클라이언트 컴포넌트라, 에피소드 배열을 직접 import하면
 * 본문·단서·정답까지 전부 클라이언트 번들에 실린다. 서버 컴포넌트에서
 * 요약만 뽑아 넘기기 위한 타입.
 */
export interface EpisodeSummary {
  id: number;
  title: string;
  subtitle?: string;
  difficulty: DifficultyLevel;
  stageCount: number;
}

export interface DifficultyInfo {
  text: 'EASY' | 'NORMAL' | 'HARD';
  color: string;
  stars: string;
}
