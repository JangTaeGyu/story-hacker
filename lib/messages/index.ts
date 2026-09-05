import type { Locale } from '@/lib/i18n';
import ko, { type Messages } from './ko';
import en from './en';
import ja from './ja';

export type { Messages };

const dictionaries: Record<Locale, Messages> = { ko, en, ja };

/**
 * 언어별 UI 문자열.
 *
 * 서버 컴포넌트는 이 함수를 직접 부르고, 클라이언트 컴포넌트는
 * `useI18n()`(components/i18n/LocaleProvider)을 통해 같은 값을 받는다.
 * 사전에 함수형 템플릿(`share.story` 등)이 들어 있어 서버→클라이언트로
 * props에 실어 보낼 수 없기 때문에, 클라이언트 쪽에서 locale만 받아
 * 여기서 다시 조회하는 구조다.
 */
export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}
