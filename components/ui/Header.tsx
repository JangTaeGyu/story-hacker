'use client';

import Link from 'next/link';
import { useI18n } from '@/components/i18n/LocaleProvider';

interface HeaderProps {
  backHref: string;
  backText?: string;
  center?: React.ReactNode;
  right?: React.ReactNode;
  /**
   * 본문 폭에 맞춘다. 어긋나면 데스크톱에서 헤더와 본문의 좌측이 따로 논다.
   * 'wide' = 목록·홈(max-w-6xl) · 'narrow' = 게임 화면(max-w-2xl)
   */
  width?: 'wide' | 'narrow';
}

export default function Header({
  backHref,
  backText,
  center,
  right,
  width = 'wide',
}: HeaderProps) {
  const { t } = useI18n();
  const label = backText ?? t.common.back;

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-noct-ink/10 bg-noct-black/95 backdrop-blur">
      <div
        className={`mx-auto flex w-full max-w-md items-center justify-between gap-3 px-5 py-4 lg:px-8 ${
          width === 'narrow' ? 'lg:max-w-2xl' : 'lg:max-w-6xl'
        }`}
      >
        <Link
          href={backHref}
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-faint hover:text-noct-ink transition-colors"
        >
          ‹ {label}
        </Link>
        {center && (
          <div className="text-center font-mono text-[11px] tracking-[0.18em] uppercase text-noct-ink-dim">
            {center}
          </div>
        )}
        {right && <div className="text-right">{right}</div>}
        {!center && !right && <div />}
      </div>
    </header>
  );
}
