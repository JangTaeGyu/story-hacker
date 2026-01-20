import type { DifficultyLevel, DifficultyInfo } from './types';

/**
 * 난이도 정보 반환
 */
export function getDifficultyInfo(difficulty: DifficultyLevel): DifficultyInfo {
  switch (difficulty) {
    case 1:
      return { text: 'EASY', color: 'text-green-400', stars: '★☆☆' };
    case 2:
      return { text: 'NORMAL', color: 'text-yellow-400', stars: '★★☆' };
    case 3:
      return { text: 'HARD', color: 'text-red-400', stars: '★★★' };
  }
}

/**
 * 난이도 별 문자열 생성
 */
export function getDifficultyStars(difficulty: DifficultyLevel): string {
  return '★'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
}

/**
 * 추리 모드 별점 계산
 */
export function calculateDeductionStars(turnsUsed: number): number {
  if (turnsUsed <= 2) return 3;
  if (turnsUsed <= 4) return 2;
  return 1;
}

/**
 * PIN 길이 반환
 */
export function getPinLength(lockType: 'pin4' | 'pin6'): number {
  return lockType === 'pin6' ? 6 : 4;
}

/**
 * 클래스 조건부 결합
 */
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
