import type { MetadataRoute } from 'next';
import { defaultLocale, localeMeta } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { SITE_NAME } from '@/lib/site';

/**
 * PWA 매니페스트는 사이트에 하나뿐이라 기본 언어(한국어)를 기준으로 낸다.
 * `start_url`은 `/`로 두고 리다이렉트가 언어를 정하게 한다 — 설치한 사용자가
 * 나중에 언어를 바꿔도 홈이 어긋나지 않는다.
 */
export default function manifest(): MetadataRoute.Manifest {
  const t = getMessages(defaultLocale);

  return {
    name: t.site.tagline,
    short_name: SITE_NAME,
    description: t.site.shortDescription,
    lang: localeMeta[defaultLocale].htmlLang,
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0a0908',
    theme_color: '#c9a86a',
    orientation: 'portrait',
    categories: ['games', 'puzzle', 'entertainment'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
