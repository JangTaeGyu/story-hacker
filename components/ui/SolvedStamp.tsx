'use client';

import { useI18n } from '@/components/i18n/LocaleProvider';

interface SolvedStampProps {
  /** 직경(px), 기본 56 */
  size?: number;
  className?: string;
}

/**
 * 사건 종결 도장 직인 — NOCTURNE: 살짝 기운 이중 링에 빛바랜 금색 인장.
 * 에피소드가 해결되면 목록 카드에 찍힌다.
 *
 * 인장 글자는 언어마다 길이가 다르다("해결" 2자 · "解決" 2자 · "SOLVED" 6자).
 * 글자 수에 따라 크기를 줄이지 않으면 영어판에서 링 밖으로 넘친다.
 */
export default function SolvedStamp({ size = 56, className = '' }: SolvedStampProps) {
  const { t } = useI18n();
  const label = t.common.solvedStamp;

  // 링 안지름의 약 78%에 글자가 들어가도록 글자 수로 나눈다 (2자 기준 0.34).
  const fontSize = Math.min(size * 0.34, (size * 0.68) / Math.max(label.length, 1) * 1.6);

  return (
    <div
      className={`relative shrink-0 -rotate-[14deg] select-none opacity-90 ${className}`}
      style={{ width: size, height: size }}
      aria-label={t.common.solvedStampAria}
    >
      {/* 바깥 링 */}
      <div className="absolute inset-0 rounded-full border-2 border-noct-gold-dim/55" />
      {/* 안쪽 링 */}
      <div className="absolute inset-[4px] rounded-full border border-noct-gold-dim/35" />
      {/* 인장 글자 */}
      <div className="absolute inset-0 flex items-center justify-center px-1">
        <span
          className="font-display leading-none tracking-tight text-noct-gold/85"
          style={{ fontSize }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
