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
  // EP.5 게이머의 비밀
  "5-1": () => <BgImage src="/images/story/5-1.png" alt="게이머의 비밀 스테이지 1" />,
  "5-2": () => <BgImage src="/images/story/5-2.png" alt="게이머의 비밀 스테이지 2" />,
  "5-3": () => <BgImage src="/images/story/5-3.png" alt="게이머의 비밀 스테이지 3" />,
  "5-4": () => <BgImage src="/images/story/5-4.png" alt="게이머의 비밀 스테이지 4" />,
  // EP.6 카페 미스터리
  "6-1": () => <BgImage src="/images/story/6-1.png" alt="카페 미스터리 스테이지 1" />,
  "6-2": () => <BgImage src="/images/story/6-2.png" alt="카페 미스터리 스테이지 2" />,
  "6-3": () => <BgImage src="/images/story/6-3.png" alt="카페 미스터리 스테이지 3" />,
  // EP.7 병원 탈출
  "7-1": () => <BgImage src="/images/story/7-1.png" alt="병원 탈출 스테이지 1" />,
  "7-2": () => <BgImage src="/images/story/7-2.png" alt="병원 탈출 스테이지 2" />,
  "7-3": () => <BgImage src="/images/story/7-3.png" alt="병원 탈출 스테이지 3" />,
  "7-4": () => <BgImage src="/images/story/7-4.png" alt="병원 탈출 스테이지 4" />,
  // EP.8 우주 정거장
  "8-1": () => <BgImage src="/images/story/8-1.png" alt="우주 정거장 스테이지 1" />,
  "8-2": () => <BgImage src="/images/story/8-2.png" alt="우주 정거장 스테이지 2" />,
  "8-3": () => <BgImage src="/images/story/8-3.png" alt="우주 정거장 스테이지 3" />,
  "8-4": () => <BgImage src="/images/story/8-4.png" alt="우주 정거장 스테이지 4" />,
  // EP.9 마법사의 탑
  "9-1": () => <BgImage src="/images/story/9-1.png" alt="마법사의 탑 스테이지 1" />,
  "9-2": () => <BgImage src="/images/story/9-2.png" alt="마법사의 탑 스테이지 2" />,
  "9-3": () => <BgImage src="/images/story/9-3.png" alt="마법사의 탑 스테이지 3" />,
  "9-4": () => <BgImage src="/images/story/9-4.png" alt="마법사의 탑 스테이지 4" />,
  // EP.10 타임캡슐
  "10-1": () => <BgImage src="/images/story/10-1.png" alt="타임캡슐 스테이지 1" />,
  "10-2": () => <BgImage src="/images/story/10-2.png" alt="타임캡슐 스테이지 2" />,
  "10-3": () => <BgImage src="/images/story/10-3.png" alt="타임캡슐 스테이지 3" />,
  // EP.11 첫 번째 임무
  "11-1": () => <BgImage src="/images/story/11-1.png" alt="첫 번째 임무 스테이지 1" />,
  "11-2": () => <BgImage src="/images/story/11-2.png" alt="첫 번째 임무 스테이지 2" />,
  "11-3": () => <BgImage src="/images/story/11-3.png" alt="첫 번째 임무 스테이지 3" />,
  // EP.12 기업 정찰
  "12-1": () => <BgImage src="/images/story/12-1.png" alt="기업 정찰 스테이지 1" />,
  "12-2": () => <BgImage src="/images/story/12-2.png" alt="기업 정찰 스테이지 2" />,
  "12-3": () => <BgImage src="/images/story/12-3.png" alt="기업 정찰 스테이지 3" />,
  "12-4": () => <BgImage src="/images/story/12-4.png" alt="기업 정찰 스테이지 4" />,
  // EP.13 추적자
  "13-1": () => <BgImage src="/images/story/13-1.png" alt="추적자 스테이지 1" />,
  "13-2": () => <BgImage src="/images/story/13-2.png" alt="추적자 스테이지 2" />,
  "13-3": () => <BgImage src="/images/story/13-3.png" alt="추적자 스테이지 3" />,
  // EP.14 내부자
  "14-1": () => <BgImage src="/images/story/14-1.png" alt="내부자 스테이지 1" />,
  "14-2": () => <BgImage src="/images/story/14-2.png" alt="내부자 스테이지 2" />,
  "14-3": () => <BgImage src="/images/story/14-3.png" alt="내부자 스테이지 3" />,
  "14-4": () => <BgImage src="/images/story/14-4.png" alt="내부자 스테이지 4" />,
  // EP.15 옴니코프의 심장
  "15-1": () => <BgImage src="/images/story/15-1.png" alt="옴니코프의 심장 스테이지 1" />,
  "15-2": () => <BgImage src="/images/story/15-2.png" alt="옴니코프의 심장 스테이지 2" />,
  "15-3": () => <BgImage src="/images/story/15-3.png" alt="옴니코프의 심장 스테이지 3" />,
  "15-4": () => <BgImage src="/images/story/15-4.png" alt="옴니코프의 심장 스테이지 4" />,
  "15-5": () => <BgImage src="/images/story/15-5.png" alt="옴니코프의 심장 스테이지 5" />,
};
