'use client';

import Link from 'next/link';

interface HeaderProps {
  backHref: string;
  backText?: string;
  accentColor?: 'emerald' | 'cyan';
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export default function Header({
  backHref,
  backText = 'BACK',
  accentColor = 'emerald',
  center,
  right,
}: HeaderProps) {
  const colorClass = accentColor === 'cyan' ? 'text-hacker-cyan' : 'text-hacker-emerald';
  const hoverClass = accentColor === 'cyan' ? 'hover:text-hacker-cyan' : 'hover:text-hacker-emerald';

  return (
    <header className="p-4 border-b border-gray-800">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className={`text-gray-400 ${hoverClass} text-sm font-mono`}
        >
          {'<'} {backText}
        </Link>
        {center && (
          <div className="text-center">
            <span className={`${colorClass} font-mono text-xs`}>
              {center}
            </span>
          </div>
        )}
        {right && (
          <div className="text-right">
            {right}
          </div>
        )}
        {!center && !right && <div />}
      </div>
    </header>
  );
}
