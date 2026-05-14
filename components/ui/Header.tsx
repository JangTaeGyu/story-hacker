'use client';

import Link from 'next/link';

interface HeaderProps {
  backHref: string;
  backText?: string;
  /** 호환용 — NOCTURNE은 단일 팔레트라 시각엔 영향 없음 */
  accentColor?: 'emerald' | 'cyan';
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export default function Header({
  backHref,
  backText = 'BACK',
  center,
  right,
}: HeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-noct-ink/10 bg-noct-black/95 backdrop-blur">
      <div className="mx-auto max-w-md px-5 py-4 flex items-center justify-between gap-3">
        <Link
          href={backHref}
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-noct-ink-faint hover:text-noct-ink transition-colors"
        >
          ‹ {backText}
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
