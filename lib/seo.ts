import type { Metadata } from 'next';
import { defaultLocale, localeMeta, localePath, locales, type Locale } from './i18n';
import { SITE_NAME, SITE_URL } from './site';

/**
 * canonical + hreflang.
 *
 * 언어판이 셋이므로 **모든 페이지가 자기 canonical과 3개 언어의 alternate를
 * 함께 내야 한다.** 한쪽만 빠지면 검색엔진이 언어판을 중복 문서로 보고
 * 하나만 색인한다. `x-default`는 기본 언어(한국어)를 가리킨다.
 *
 * @param path 언어 접두사를 뺀 경로. 홈은 `''`, 목록은 `/story` 같은 식.
 */
export function alternatesFor(locale: Locale, path = ''): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const code of locales) {
    languages[localeMeta[code].hreflang] = `${SITE_URL}${localePath(code, path)}`;
  }
  languages['x-default'] = `${SITE_URL}${localePath(defaultLocale, path)}`;

  return {
    canonical: `${SITE_URL}${localePath(locale, path)}`,
    languages,
  };
}

/** og:locale + og:locale:alternate 한 쌍. */
export function openGraphLocale(locale: Locale) {
  return {
    locale: localeMeta[locale].ogLocale,
    alternateLocale: locales
      .filter((code) => code !== locale)
      .map((code) => localeMeta[code].ogLocale),
  };
}

export function absoluteUrl(locale: Locale, path = ''): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

// ============================================
// 구조화 데이터 (JSON-LD)
// ============================================

/**
 * 사이트 전체를 설명하는 WebSite + VideoGame 그래프.
 * 홈에만 한 번 넣는다 — 페이지마다 반복하면 중복 엔티티가 된다.
 */
export function websiteJsonLd(locale: Locale, description: string, name = SITE_NAME) {
  const url = absoluteUrl(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url,
        name,
        description,
        inLanguage: localeMeta[locale].htmlLang,
      },
      {
        '@type': 'VideoGame',
        '@id': `${SITE_URL}/#game`,
        name,
        url,
        description,
        inLanguage: locales.map((code) => localeMeta[code].htmlLang),
        applicationCategory: 'GameApplication',
        genre: ['Puzzle', 'Mystery', 'Detective'],
        gamePlatform: 'Web browser',
        operatingSystem: 'Any',
        playMode: 'SinglePlayer',
        image: `${SITE_URL}/og-image.png`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  };
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(locale: Locale, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

interface ListedEpisode {
  id: number;
  title: string;
  path: string;
}

/** 에피소드 선택 화면 — 목록 자체를 하나의 ItemList로 낸다. */
export function episodeListJsonLd(
  locale: Locale,
  name: string,
  description: string,
  episodes: ListedEpisode[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    inLanguage: localeMeta[locale].htmlLang,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: episodes.length,
      itemListElement: episodes.map((episode, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: episode.title,
        url: absoluteUrl(locale, episode.path),
      })),
    },
  };
}

/** 개별 에피소드 — 게임 안의 한 편이므로 VideoGame의 part로 표현한다. */
export function episodeJsonLd(
  locale: Locale,
  options: {
    name: string;
    description: string;
    path: string;
    image: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: options.name,
    description: options.description,
    url: absoluteUrl(locale, options.path),
    image: `${SITE_URL}${options.image}`,
    inLanguage: localeMeta[locale].htmlLang,
    isPartOf: { '@id': `${SITE_URL}/#game` },
    applicationCategory: 'GameApplication',
    genre: ['Puzzle', 'Mystery'],
    gamePlatform: 'Web browser',
    playMode: 'SinglePlayer',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}
