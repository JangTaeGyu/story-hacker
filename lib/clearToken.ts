import type { GameMode } from './types';

/**
 * 에피소드 클리어 증표.
 *
 * 완료 화면(`/{mode}/{id}/complete`)은 URL만 알면 누구나 열 수 있으므로,
 * 쿼리스트링의 `stars`를 그대로 믿고 진행도를 저장하면 게임을 하지 않고도
 * 클리어 기록이 남는다. 게임 화면이 완료 직전에 발급한 1회용 토큰을
 * 완료 화면이 소비하도록 해서, 실제로 방금 끝낸 판만 기록되게 한다.
 *
 * sessionStorage를 쓰므로 탭을 닫으면 사라지고, 뒤로가기로 완료 화면을
 * 다시 열어도 토큰이 이미 소비되어 중복 기록되지 않는다.
 *
 * 클라이언트 전용 게임이라 완벽한 위조 방지는 불가능하다. URL 공유·북마크·
 * 새로고침 같은 일상적인 경로로 기록이 오염되는 것을 막는 것이 목적이다.
 */

const TOKEN_KEY = 'story-hacker-clear-token';

/** 발급 후 이 시간이 지나면 무효 */
const MAX_AGE_MS = 5 * 60 * 1000;

interface ClearToken {
  mode: GameMode;
  episodeId: number;
  stars: number;
  at: number;
}

export function issueClearToken(
  mode: GameMode,
  episodeId: number,
  stars: number
): void {
  if (typeof window === 'undefined') return;
  try {
    const token: ClearToken = { mode, episodeId, stars, at: Date.now() };
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  } catch {
    // sessionStorage를 못 쓰는 환경(프라이빗 모드 등)에서는 조용히 넘어간다.
  }
}

/**
 * 유효한 토큰이면 별점을 돌려주고 토큰을 소비한다.
 * 직접 URL로 들어왔거나 토큰이 만료·불일치면 null.
 */
export function consumeClearToken(
  mode: GameMode,
  episodeId: number
): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(TOKEN_KEY);
    if (!raw) return null;

    // 유효하든 아니든 한 번 읽으면 버린다.
    window.sessionStorage.removeItem(TOKEN_KEY);

    const token = JSON.parse(raw) as Partial<ClearToken>;
    if (token.mode !== mode || token.episodeId !== episodeId) return null;
    if (typeof token.at !== 'number' || Date.now() - token.at > MAX_AGE_MS) {
      return null;
    }
    if (
      typeof token.stars !== 'number' ||
      !Number.isInteger(token.stars) ||
      token.stars < 1 ||
      token.stars > 3
    ) {
      return null;
    }
    return token.stars;
  } catch {
    return null;
  }
}
