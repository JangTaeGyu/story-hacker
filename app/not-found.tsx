'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localePath, toLocale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import './globals.css';

/**
 * 전역 404.
 *
 * **`app/[locale]/not-found.tsx`가 아니라 여기가 쓰인다.** 루트 레이아웃이
 * 동적 세그먼트(`app/[locale]/layout.tsx`) 안에 있으면 Next는 `notFound()`를
 * 세그먼트 not-found로 보내지 못하고 전역 not-found로 떨어뜨린다. 그래서
 * 브랜드 404는 이 파일 하나로 유지한다.
 *
 * 루트 레이아웃 바깥이라 레이아웃이 적용되지 않는다 —— Next가 최소한의
 * html/body 셸만 합성하므로, 스타일은 여기서 직접 `globals.css`를 불러온다.
 * 폰트 링크도 레이아웃에서 오지 않으니 이 화면은 시스템 폰트로 떨어질 수
 * 있는데, 오류 화면 한 장을 위해 폰트를 더 받는 것보다 낫다.
 *
 * 언어는 경로에서 읽는다. params가 없는 자리라 서버에서는 기본 언어로 그리고,
 * 하이드레이션 후 `/en/...`이면 영어로 바뀐다. 404는 색인 대상이 아니므로
 * 이 지연이 SEO에 영향을 주지 않는다.
 */
export default function NotFound() {
  const pathname = usePathname() ?? '';
  const locale = toLocale(pathname.split('/')[1]);
  const t = getMessages(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-noct-black p-8">
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
    </div>
  );
}
