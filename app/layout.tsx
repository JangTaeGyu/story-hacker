import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const SITE_URL = 'https://story-hacker.vercel.app';

// 로컬스토리지 데이터 버전.
// 대규모 업데이트로 기존 진행 데이터를 일회성 초기화해야 할 때 이 값을 올린다.
// (값이 바뀐 클라이언트에서 최초 1회만 localStorage.clear() 실행)
const STORAGE_VERSION = '2';

export const metadata: Metadata = {
  title: 'Story Hacker — 추리 미스터리 퍼즐',
  description: '어둠 속 단서를 읽고, 잠긴 비밀번호를 풀어내는 추리 미스터리 게임',
  keywords: ['추리', '미스터리', '퍼즐', '게임', '스토리', '해커', 'puzzle', 'mystery', 'noir'],
  authors: [{ name: 'Story Hacker' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Story Hacker',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: 'Story Hacker',
    title: 'Story Hacker — 추리 미스터리 퍼즐',
    description: '어둠 속 단서를 읽고, 잠긴 비밀번호를 풀어내는 추리 미스터리 게임',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Story Hacker — 추리 미스터리 퍼즐',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Story Hacker — 추리 미스터리 퍼즐',
    description: '어둠 속 단서를 읽고, 잠긴 비밀번호를 풀어내는 추리 미스터리 게임',
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // 확대를 막지 않는다. 본문이 15px 명조라 확대가 필요한 사용자가 있다.
  // (maximumScale/userScalable로 핀치 줌을 잠그면 WCAG 1.4.4 위반)
  themeColor: '#0a0908',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
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

        {/* 메인 컨텐츠 */}
        <main className="relative z-10 mx-auto max-w-md min-h-screen bg-noct-black">
          {children}
        </main>

        <Analytics />
      </body>
    </html>
  );
}
