'use client';

import { createContext, useContext, useMemo } from 'react';
import { defaultLocale, localePath, type Locale } from '@/lib/i18n';
import { getMessages, type Messages } from '@/lib/messages';

interface I18nValue {
  locale: Locale;
  /** 현재 언어의 UI 문자열 */
  t: Messages;
  /** 언어 접두사를 붙인 내부 링크 — `href('/story/1')` → `/en/story/1` */
  href: (path?: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * 클라이언트 트리 전체에 현재 언어를 흘려보낸다.
 *
 * 서버 레이아웃에서 `locale` 문자열 하나만 넘기고 사전은 여기서 조회한다.
 * 사전에는 함수형 템플릿이 있어 props로 직렬화해 보낼 수 없다.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: getMessages(locale),
      href: (path = '') => localePath(locale, path),
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * 언어·문자열·링크 헬퍼.
 *
 * Provider 밖(예: app/error.tsx는 루트 레이아웃 바깥에서도 렌더될 수 있다)에서
 * 호출되면 기본 언어로 떨어진다 — 화면이 죽는 것보다는 낫다.
 */
export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (value) return value;

  return {
    locale: defaultLocale,
    t: getMessages(defaultLocale),
    href: (path = '') => localePath(defaultLocale, path),
  };
}
