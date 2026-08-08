'use client';

import Image from 'next/image';

// 배경 이미지 컴포넌트 (세로 이미지, 생성 이미지 기반)
// NOCTURNE: noct-img 필터로 어둠에 가라앉힌 톤 적용
const BgImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-full h-full relative">
    <Image src={src} alt={alt} fill className="object-cover noct-img" priority />
  </div>
);

// 추리 일러스트 매핑 (에피소드ID-스테이지ID 기준)
// 이미지 생성: node scripts/gen-deduction-replicate.js
export const deductionIllustrations: Record<string, React.ComponentType> = {
  // EP.1 숫자 추리
  '101-1': () => <BgImage src="/images/deduction/101-1.png" alt="숫자 추리 스테이지 1" />,
  '101-2': () => <BgImage src="/images/deduction/101-2.png" alt="숫자 추리 스테이지 2" />,
  '101-3': () => <BgImage src="/images/deduction/101-3.png" alt="숫자 추리 스테이지 3" />,
  // EP.2 논리 퍼즐
  '102-1': () => <BgImage src="/images/deduction/102-1.png" alt="논리 퍼즐 스테이지 1" />,
  '102-2': () => <BgImage src="/images/deduction/102-2.png" alt="논리 퍼즐 스테이지 2" />,
  '102-3': () => <BgImage src="/images/deduction/102-3.png" alt="논리 퍼즐 스테이지 3" />,
  // EP.3 수학 챌린지
  '103-1': () => <BgImage src="/images/deduction/103-1.png" alt="수학 챌린지 스테이지 1" />,
  '103-2': () => <BgImage src="/images/deduction/103-2.png" alt="수학 챌린지 스테이지 2" />,
  '103-3': () => <BgImage src="/images/deduction/103-3.png" alt="수학 챌린지 스테이지 3" />,
  // EP.4 시간 퍼즐
  '104-1': () => <BgImage src="/images/deduction/104-1.png" alt="시간 퍼즐 스테이지 1" />,
  '104-2': () => <BgImage src="/images/deduction/104-2.png" alt="시간 퍼즐 스테이지 2" />,
  '104-3': () => <BgImage src="/images/deduction/104-3.png" alt="시간 퍼즐 스테이지 3" />,
  // EP.5 색깔 코드
  '105-1': () => <BgImage src="/images/deduction/105-1.png" alt="색깔 코드 스테이지 1" />,
  '105-2': () => <BgImage src="/images/deduction/105-2.png" alt="색깔 코드 스테이지 2" />,
  // EP.6 음악 퍼즐
  '106-1': () => <BgImage src="/images/deduction/106-1.png" alt="음악 퍼즐 스테이지 1" />,
  '106-2': () => <BgImage src="/images/deduction/106-2.png" alt="음악 퍼즐 스테이지 2" />,
  // EP.7 지리 퀴즈
  '107-1': () => <BgImage src="/images/deduction/107-1.png" alt="지리 퀴즈 스테이지 1" />,
  '107-2': () => <BgImage src="/images/deduction/107-2.png" alt="지리 퀴즈 스테이지 2" />,
  // EP.8 과학 상식
  '108-1': () => <BgImage src="/images/deduction/108-1.png" alt="과학 상식 스테이지 1" />,
  '108-2': () => <BgImage src="/images/deduction/108-2.png" alt="과학 상식 스테이지 2" />,
  '108-3': () => <BgImage src="/images/deduction/108-3.png" alt="과학 상식 스테이지 3" />,
};
