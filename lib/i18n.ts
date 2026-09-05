/**
 * 다국어 설정.
 *
 * URL은 **모든 언어에 접두사를 붙인다** — `/ko/story/1`, `/en/story/1`, `/ja/story/1`.
 * 한국어만 접두사 없이 두면 `/` 하위에 두 벌의 라우트 트리를 유지해야 하고,
 * hreflang이 비대칭이 되어 색인 사고가 나기 쉽다. 접두사 없는 옛 주소
 * (`/story/1` 등)는 `next.config.js`의 영구 리다이렉트가 `/ko/...`로 넘긴다.
 */

export const locales = ['ko', 'en', 'ja'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** 잘못된 세그먼트가 들어와도 기본 언어로 떨어뜨린다. */
export function toLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

interface LocaleMeta {
  /** <html lang> 값 */
  htmlLang: string;
  /** og:locale 값 */
  ogLocale: string;
  /** 언어 전환 UI에 노출할 이름 (해당 언어로 표기) */
  label: string;
  /** hreflang 속성 값 */
  hreflang: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  ko: { htmlLang: 'ko', ogLocale: 'ko_KR', label: '한국어', hreflang: 'ko-KR' },
  en: { htmlLang: 'en', ogLocale: 'en_US', label: 'English', hreflang: 'en-US' },
  ja: { htmlLang: 'ja', ogLocale: 'ja_JP', label: '日本語', hreflang: 'ja-JP' },
};

/**
 * 언어 접두사를 붙인 경로를 만든다.
 * `localePath('en', '/story/1')` → `/en/story/1`
 */
export function localePath(locale: Locale, path = ''): string {
  const normalized = path === '/' ? '' : path;
  return `/${locale}${normalized}`;
}

/**
 * 현재 경로에서 언어 접두사를 떼어낸다.
 * `stripLocale('/en/story/1')` → `/story/1`
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/');
  if (segments.length > 1 && isLocale(segments[1])) {
    const rest = segments.slice(2).join('/');
    return rest ? `/${rest}` : '';
  }
  return pathname === '/' ? '' : pathname;
}
