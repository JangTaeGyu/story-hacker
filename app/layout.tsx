import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Story Hacker - 추리 퍼즐 게임',
  description: '스토리 속 단서를 읽고 비밀번호를 추리하는 퍼즐 게임',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0D1117',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen text-white antialiased scanline">
        {/* 배경 글로우 효과 */}
        <div className="bg-glow-emerald" />
        <div className="bg-glow-rose" />

        {/* 메인 컨텐츠 */}
        <main className="relative z-10 mx-auto max-w-md min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
