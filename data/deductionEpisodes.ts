import type { Locale } from '@/lib/i18n';
import type { DeductionEpisode } from '@/lib/types';

import ko from './deduction/ko';
import en from './deduction/en';
import ja from './deduction/ja';

/** 언어별 추리 에피소드. id와 `answer`는 세 언어가 동일하다. */
const byLocale: Record<Locale, DeductionEpisode[]> = { ko, en, ja };

export function getDeductionEpisodes(locale: Locale): DeductionEpisode[] {
  return byLocale[locale];
}

export function findDeductionEpisode(
  locale: Locale,
  episodeId: number
): DeductionEpisode | undefined {
  return byLocale[locale].find((episode) => episode.id === episodeId);
}

/** 라우트 생성용 — 어느 언어를 써도 id 집합은 같다. */
export const deductionEpisodeIds: number[] = ko.map((episode) => episode.id);
