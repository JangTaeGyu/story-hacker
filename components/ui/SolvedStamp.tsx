interface SolvedStampProps {
  /** 인장 글자 (기본 "해결") */
  label?: string;
  /** 직경(px), 기본 56 */
  size?: number;
  className?: string;
}

/**
 * 사건 종결 도장 직인 — NOCTURNE: 살짝 기운 이중 링에 빛바랜 금색 인장.
 * 에피소드가 해결되면 목록 카드에 찍힌다.
 */
export default function SolvedStamp({
  label = '해결',
  size = 56,
  className = '',
}: SolvedStampProps) {
  return (
    <div
      className={`relative shrink-0 -rotate-[14deg] select-none opacity-90 ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${label} · 사건 종결`}
    >
      {/* 바깥 링 */}
      <div className="absolute inset-0 rounded-full border-2 border-noct-gold-dim/55" />
      {/* 안쪽 링 */}
      <div className="absolute inset-[4px] rounded-full border border-noct-gold-dim/35" />
      {/* 인장 글자 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display leading-none text-noct-gold/85"
          style={{ fontSize: size * 0.34 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
