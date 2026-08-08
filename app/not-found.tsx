import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-noct-black p-8">
      <div className="w-full max-w-xs text-center">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-noct-ink-faint">
          Not Found
        </p>
        <h1 className="mb-4 font-display text-4xl text-noct-ink">기록 없음</h1>

        <div className="mx-auto mb-8 h-px w-24 bg-noct-ink/10" />

        <p className="mb-10 font-serif text-sm leading-relaxed text-noct-ink-dim">
          찾으시는 사건 파일이 존재하지 않습니다.
        </p>

        <Link
          href="/"
          className="block w-full border border-noct-ink/15 py-3.5 font-mono text-[11px] uppercase tracking-[0.3em] text-noct-ink transition-colors hover:border-noct-ink/30"
        >
          처음으로
        </Link>
      </div>
    </div>
  );
}
