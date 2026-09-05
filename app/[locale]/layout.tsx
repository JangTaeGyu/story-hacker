import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { locales, localeMeta, toLocale, type Locale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { alternatesFor, openGraphLocale } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { LocaleProvider } from '@/components/i18n/LocaleProvider';
import '../globals.css';

// 로컬스토리지 데이터 버전.
// 대규모 업데이트로 기존 진행 데이터를 일회성 초기화해야 할 때 이 값을 올린다.
// (값이 바뀐 클라이언트에서 최초 1회만 localStorage.clear() 실행)
const STORAGE_VERSION = '2';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * 이 파일이 **루트 레이아웃**이다 — `app/layout.tsx`는 없다.
 *
 * `<html lang>`은 언어마다 달라야 하는데 `app/layout.tsx`는 params를 받지
 * 못한다. Next.js의 i18n 예제와 같은 구조로, 동적 세그먼트 레이아웃을
 * 루트로 올려서 lang을 params에서 받는다.
 *
 * `dynamicParams = false`와 짝지어져 있어 `/xx/...`처럼 등록되지 않은
 * 언어 코드는 여기 도달하기 전에 404가 된다.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const t = getMessages(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.site.tagline,
      // 하위 페이지가 제목만 주면 뒤에 사이트명이 붙는다.
      template: `%s — ${SITE_NAME}`,
    },
    description: t.site.description,
    keywords: t.site.keywords,
    authors: [{ name: SITE_NAME }],
    applicationName: SITE_NAME,
    manifest: '/manifest.webmanifest',
    alternates: alternatesFor(locale),
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: SITE_NAME,
    },
    formatDetection: { telephone: false },
    openGraph: {
      type: 'website',
      ...openGraphLocale(locale),
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: t.site.tagline,
      description: t.site.description,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t.site.tagline,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.site.tagline,
      description: t.site.description,
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    icons: {
      icon: '/icon.svg',
      apple: '/icons/icon-192.png',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // 확대를 막지 않는다. 본문이 15px 명조라 확대가 필요한 사용자가 있다.
  // (maximumScale/userScalable로 핀치 줌을 잠그면 WCAG 1.4.4 위반)
  themeColor: '#0a0908',
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  const locale: Locale = toLocale(raw);

  return (
    <html lang={localeMeta[locale].htmlLang}>
      <head>
        {/* 폰트 CDN 핸드셰이크를 미리 열어 둔다 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* no-page-custom-font는 Pages Router의 pages/_document를 기준으로 하는 규칙이다.
            App Router에서는 루트 레이아웃이 그 역할을 하므로 여기가 올바른 위치다. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Song+Myung&family=Nanum+Myeongjo:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-noct-black text-noct-ink antialiased">
        {/* 대규모 업데이트 시 기존 로컬스토리지 일회성 초기화 — 하이드레이션 전에 동기 실행 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var V='${STORAGE_VERSION}';if(localStorage.getItem('story-hacker-version')!==V){localStorage.clear();localStorage.setItem('story-hacker-version',V);}}catch(e){}})();`,
          }}
        />

        <LocaleProvider locale={locale}>
          {/* 메인 컨텐츠 — 폭은 각 화면이 직접 정한다.
              여기서 전역으로 max-w를 씌우면 데스크톱 2단 레이아웃이 448px에 갇힌다. */}
          <main className="relative z-10 min-h-screen bg-noct-black">
            {children}
          </main>
        </LocaleProvider>

        <Analytics />
      </body>
    </html>
  );
}
