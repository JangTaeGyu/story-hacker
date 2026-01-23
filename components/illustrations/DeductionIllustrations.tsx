'use client';

import Image from 'next/image';

// 배경 이미지 컴포넌트 (세로 이미지, DALL-E 3 1024x1792 기반 리사이즈)
const BgImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-full h-full relative">
    <Image src={src} alt={alt} fill className="object-cover" priority />
  </div>
);

// 추론 일러스트 매핑 (에피소드 ID 기준)
export const deductionIllustrations: Record<string, React.ComponentType> = {
  "101": () => <BgImage src="/images/deduction/bg-101.png" alt="숫자 추리" />,
  "102": () => <BgImage src="/images/deduction/bg-102.png" alt="논리 게이트" />,
  "103": () => <BgImage src="/images/deduction/bg-103.png" alt="수학 퍼즐" />,
  "104": () => <BgImage src="/images/deduction/bg-104.png" alt="시간 퍼즐" />,
  "105": () => <BgImage src="/images/deduction/bg-105.png" alt="색상 코드" />,
  "106": () => <BgImage src="/images/deduction/bg-106.png" alt="음악 퍼즐" />,
  "107": () => <BgImage src="/images/deduction/bg-107.png" alt="지리 퍼즐" />,
  "108": () => <BgImage src="/images/deduction/bg-108.png" alt="과학 퍼즐" />,
};
