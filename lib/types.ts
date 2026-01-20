// ============================================
// 스토리 모드 타입
// ============================================

export interface StoryStage {
  id: number;
  title: string;
  story: string;
  clue: string;
  hint: string;
  lockType: 'pin4' | 'pin6';
  answers: string[];
  maxTurns: number;
}

export interface StoryEpisode {
  id: number;
  title: string;
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
  lockType: 'pin4' | 'pin6';
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
