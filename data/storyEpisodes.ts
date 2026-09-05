import type { Locale } from '@/lib/i18n';
import type { StoryEpisode } from '@/lib/types';

import ko from './story/ko';
import en from './story/en';
import ja from './story/ja';

/**
 * 언어별 스토리 에피소드.
 *
 * **에피소드 id와 `answers`는 세 언어가 동일하다.** 진행도·클리어 증표·
 * 에피소드 간 정답 상호참조(EP.11–20)가 전부 id와 정답에 묶여 있어서,
 * 언어를 바꿔도 같은 판으로 취급되어야 한다. 그래서 한글 자모에 의존하던
 * 퍼즐(EP.13 스테이지 2)은 번역판에서 **같은 정답이 나오는 다른 장치**로
 * 바꿔 두었다. `specs/episode-parity.spec.ts`가 이를 검증한다.
 */
const byLocale: Record<Locale, StoryEpisode[]> = { ko, en, ja };

export function getStoryEpisodes(locale: Locale): StoryEpisode[] {
  return byLocale[locale];
}

export function findStoryEpisode(
  locale: Locale,
  episodeId: number
): StoryEpisode | undefined {
  return byLocale[locale].find((episode) => episode.id === episodeId);
}

/** 라우트 생성용 — 어느 언어를 써도 id 집합은 같다. */
export const storyEpisodeIds: number[] = ko.map((episode) => episode.id);
