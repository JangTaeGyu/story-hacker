'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeMeta, localePath, toLocale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import './globals.css';

/**
 * 전역 404.
 *
 * **`app/[locale]/not-found.tsx`가 아니라 여기가 쓰인다.** 루트 레이아웃이
 * 동적 세그먼트(`app/[locale]/layout.tsx`) 안에 있으면 Next는 `notFound()`를
 * 세그먼트 not-found로 보내지 못하고 전역 not-found로 떨어뜨린다. 세그먼트별
 * not-found를 만들어도 쓰이지 않는다.
 *
 * **`<html>`과 `<body>`를 여기서 직접 그린다.** 이 화면만 `app/layout.tsx`
 * (children을 그대로 반환하는 통과 레이아웃) 아래에 놓이는데, 셸을 아무도
 * 그리지 않으면 Next가 SSR에서 임의로 끼워 넣는다. 그러면 클라이언트가
 * 하이드레이션할 트리에는 없는 요소가 DOM에는 있어 트리가 어긋나고,
 * React가 전체를 버려 **화면이 통째로 빈다.** (실제로 그렇게 배포된 적이 있다.)
 *
 * 루트 레이아웃 바깥이라 레이아웃의 스타일·폰트가 오지 않으므로 `globals.css`를
 * 직접 부르고 폰트 링크도 여기서 건다.
 *
 * 언어는 경로에서 읽는다. params가 없는 자리라 정적 생성 시점에는 기본 언어로
 * 그려지고, 하이드레이션 후 `/en/...`이면 영어로 바뀐다. 404는 색인 대상이
 * 아니므로 이 지연이 SEO에 영향을 주지 않는다.
 */
export default function NotFound() {
  const pathname = usePathname() ?? '';
  const locale = toLocale(pathname.split('/')[1]);
  const t = getMessages(locale);

  return (
    <html lang={localeMeta[locale].htmlLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t.notFound.title}</title>
        <link rel="icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Song+Myung&family=Nanum+Myeongjo:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-noct-black text-noct-ink antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center bg-noct-black p-8">
          <div className="w-full max-w-xs lg:max-w-sm text-center">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-noct-ink-faint">
              {t.notFound.eyebrow}
            </p>
            <h1 className="mb-4 font-display text-4xl text-noct-ink">{t.notFound.title}</h1>

            <div className="mx-auto mb-8 h-px w-24 bg-noct-ink/10" />

            <p className="mb-10 font-serif text-sm leading-relaxed text-noct-ink-dim">
              {t.notFound.message}
            </p>

            <Link
              href={localePath(locale)}
              className="block w-full border border-noct-ink/15 py-3.5 font-mono text-[11px] uppercase tracking-[0.3em] text-noct-ink transition-colors hover:border-noct-ink/30"
            >
              {t.common.home}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
