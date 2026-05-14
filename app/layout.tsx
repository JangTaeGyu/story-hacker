import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const SITE_URL = 'https://story-hacker.vercel.app';

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
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0908',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-noct-black text-noct-ink antialiased">
        {/* 메인 컨텐츠 */}
        <main className="relative z-10 mx-auto max-w-md min-h-screen bg-noct-black">
          {children}
        </main>

        <Analytics />
      </body>
    </html>
  );
}
