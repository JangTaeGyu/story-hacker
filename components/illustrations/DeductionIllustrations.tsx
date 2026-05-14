'use client';

import Image from 'next/image';

// 배경 이미지 컴포넌트 (세로 이미지, 생성 이미지 기반)
// NOCTURNE: noct-img 필터로 어둠에 가라앉힌 톤 적용
const BgImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-full h-full relative">
    <Image src={src} alt={alt} fill className="object-cover noct-img" priority />
  </div>
);

// 추론 일러스트 매핑 (에피소드ID-스테이지ID 기준)
// 이미지 파일이 준비되면 매핑 추가
export const deductionIllustrations: Record<string, React.ComponentType> = {
};
