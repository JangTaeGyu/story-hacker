'use client';

import Image from 'next/image';

// 배경 이미지 컴포넌트 (세로 이미지, DALL-E 3 1024x1792 기반 리사이즈)
const BgImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-full h-full relative">
    <Image src={src} alt={alt} fill className="object-cover" priority />
  </div>
);

// 스토리 일러스트 매핑 (에피소드 ID 기준)
export const storyIllustrations: Record<string, React.ComponentType> = {
  "1": () => <BgImage src="/images/story/bg-1.png" alt="수상한 이웃" />,
  "2": () => <BgImage src="/images/story/bg-2.png" alt="할아버지의 금고" />,
  "3": () => <BgImage src="/images/story/bg-3.png" alt="학교의 비밀" />,
  "4": () => <BgImage src="/images/story/bg-4.png" alt="탐정 사무소" />,
  "5": () => <BgImage src="/images/story/bg-5.png" alt="게임 속 게임" />,
  "6": () => <BgImage src="/images/story/bg-6.png" alt="카페의 비밀" />,
  "7": () => <BgImage src="/images/story/bg-7.png" alt="병원의 미스터리" />,
  "8": () => <BgImage src="/images/story/bg-8.png" alt="우주 정거장" />,
  "9": () => <BgImage src="/images/story/bg-9.png" alt="마법의 탑" />,
  "10": () => <BgImage src="/images/story/bg-10.png" alt="타임캡슐" />,
};
