'use client';

import Image from 'next/image';

// 배경 이미지 컴포넌트 (세로 이미지, DALL-E 3 1024x1792 기반 리사이즈)
const BgImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-full h-full relative">
    <Image src={src} alt={alt} fill className="object-cover" priority />
  </div>
);

// 스토리 일러스트 매핑 (에피소드ID-스테이지ID 기준)
// 이미지 파일이 준비되면 매핑 추가
export const storyIllustrations: Record<string, React.ComponentType> = {
  // EP.1 수상한 이웃
  "1-1": () => <BgImage src="/images/story/1-1.png" alt="수상한 이웃 스테이지 1" />,
  "1-2": () => <BgImage src="/images/story/1-2.png" alt="수상한 이웃 스테이지 2" />,
  "1-3": () => <BgImage src="/images/story/1-3.png" alt="수상한 이웃 스테이지 3" />,
  "1-4": () => <BgImage src="/images/story/1-4.png" alt="수상한 이웃 스테이지 4" />,
  // EP.2 사라진 보물
  "2-1": () => <BgImage src="/images/story/2-1.png" alt="사라진 보물 스테이지 1" />,
  "2-2": () => <BgImage src="/images/story/2-2.png" alt="사라진 보물 스테이지 2" />,
  // EP.3 학교의 미스터리
  "3-1": () => <BgImage src="/images/story/3-1.png" alt="학교의 미스터리 스테이지 1" />,
  "3-2": () => <BgImage src="/images/story/3-2.png" alt="학교의 미스터리 스테이지 2" />,
  "3-3": () => <BgImage src="/images/story/3-3.png" alt="학교의 미스터리 스테이지 3" />,
  // EP.4 탐정 사무소
  "4-1": () => <BgImage src="/images/story/4-1.png" alt="탐정 사무소 스테이지 1" />,
  "4-2": () => <BgImage src="/images/story/4-2.png" alt="탐정 사무소 스테이지 2" />,
  "4-3": () => <BgImage src="/images/story/4-3.png" alt="탐정 사무소 스테이지 3" />,
  "4-4": () => <BgImage src="/images/story/4-4.png" alt="탐정 사무소 스테이지 4" />,
};
