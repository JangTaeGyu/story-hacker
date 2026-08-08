'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-noct-black p-8">
      <div className="w-full max-w-xs text-center">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-noct-ink-faint">
          Error
        </p>
        <h1 className="mb-4 font-display text-4xl text-noct-ink">수사 중단</h1>

        <div className="mx-auto mb-8 h-px w-24 bg-noct-ink/10" />

        <p className="mb-10 font-serif text-sm leading-relaxed text-noct-ink-dim">
          예기치 못한 문제가 발생했습니다.
        </p>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="block w-full border border-noct-gold-dim py-3.5 font-mono text-[11px] uppercase tracking-[0.3em] text-noct-gold transition-colors hover:bg-noct-gold/5"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="block font-mono text-[11px] uppercase tracking-[0.3em] text-noct-ink-dim transition-colors hover:text-noct-ink"
          >
            <span className="border-b border-noct-ink/20 pb-1">처음으로</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
