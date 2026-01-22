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
  totalStars: number;
}

// ============================================
// 유틸리티 타입
// ============================================

export type DifficultyLevel = 1 | 2 | 3;

export interface DifficultyInfo {
  text: 'EASY' | 'NORMAL' | 'HARD';
  color: string;
  stars: string;
}
