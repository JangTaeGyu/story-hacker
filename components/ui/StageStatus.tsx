'use client';

import HeartsDisplay from './HeartsDisplay';

interface StageStatusProps {
  /** 화면에 표시할 "사용한 시도 횟수" — 추리 모드는 turnsSpent를 넘긴다 */
  turns: number;
  maxTurns: number;
  remainingTurns: number;
  /** 모드별 라벨 톤 차이를 유지하기 위한 클래스 */
  labelClassName?: string;
}

/**
 * 남은 시도 상태 한 줄 — "Turns n / m" + 점 표시.
 *
 * 모바일에서는 히어로 이미지 위에, 데스크톱에서는 키패드 위 우측 컬럼에
 * 놓이므로 배치는 부모(flex 컨테이너)가 정하고 여기서는 내용만 낸다.
 */
export default function StageStatus({
  turns,
  maxTurns,
  remainingTurns,
  labelClassName = 'tracking-[0.25em] text-noct-ink-dim',
}: StageStatusProps) {
  return (
    <>
      <span className={`font-mono text-[10px] uppercase ${labelClassName}`}>
        Turns {turns} / {maxTurns}
      </span>
      <HeartsDisplay totalTurns={maxTurns} remainingTurns={remainingTurns} />
    </>
  );
}
