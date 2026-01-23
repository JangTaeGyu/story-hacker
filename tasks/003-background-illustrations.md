# 배경 일러스트 이미지 작업

## 개요

두 가지 종류의 배경 이미지를 사용:
1. **에피소드 목록 카드 배경** — 에피소드당 1개, 가로 이미지 (opacity-10)
2. **게임 플레이 스테이지 배경** — 스테이지별 1개, 세로 이미지 (opacity-15)

## 이미지 생성

### DALL-E 3 설정

| 용도 | 사이즈 | 방향 |
|------|--------|------|
| 에피소드 카드 배경 | 1792x1024 | 가로 (landscape) |
| 스테이지 플레이 배경 | 1024x1792 | 세로 (portrait) |

### 1. 에피소드 카드 배경 (가로) — 총 28개

#### 스토리 모드 (20개)
| 파일명 | 에피소드 | 프롬프트 키워드 |
|--------|----------|-----------------|
| ep-1.png | EP.1 수상한 이웃 | 스마트폰, 미스터리, 어두운 골목 |
| ep-2.png | EP.2 할아버지의 금고 | 오래된 금고, 추억, 빈티지 |
| ep-3.png | EP.3 학교의 비밀 | 학교 건물, 밤, 미스터리 |
| ep-4.png | EP.4 탐정 사무소 | 돋보기, 서류, 탐정 분위기 |
| ep-5.png | EP.5 게임 속 게임 | 게임 컨트롤러, 네온, 사이버펑크 |
| ep-6.png | EP.6 카페의 비밀 | 카페, 커피, 은밀한 분위기 |
| ep-7.png | EP.7 병원의 미스터리 | 병원, 복도, 긴장감 |
| ep-8.png | EP.8 우주 정거장 | 우주, 정거장, SF |
| ep-9.png | EP.9 마법의 탑 | 마법, 탑, 판타지 |
| ep-10.png | EP.10 타임캡슐 | 타임캡슐, 과거와 현재 |
| ep-11.png | EP.11 | TBD |
| ep-12.png | EP.12 | TBD |
| ep-13.png | EP.13 | TBD |
| ep-14.png | EP.14 | TBD |
| ep-15.png | EP.15 | TBD |
| ep-16.png | EP.16 | TBD |
| ep-17.png | EP.17 | TBD |
| ep-18.png | EP.18 | TBD |
| ep-19.png | EP.19 | TBD |
| ep-20.png | EP.20 | TBD |

#### 추론 모드 (8개)
| 파일명 | 에피소드 | 프롬프트 키워드 |
|--------|----------|-----------------|
| ep-101.png | EP.1 숫자 추리 | 숫자, 코드, 해킹 분위기 |
| ep-102.png | EP.2 논리 게이트 | 논리 회로, 디지털 |
| ep-103.png | EP.3 수학 퍼즐 | 수학 기호, 칠판 |
| ep-104.png | EP.4 시간 퍼즐 | 시계, 시간 |
| ep-105.png | EP.5 색상 코드 | 무지개, RGB, 색상 |
| ep-106.png | EP.6 음악 퍼즐 | 음표, 오선지, 악기 |
| ep-107.png | EP.7 지리 퍼즐 | 지구, 지도, 좌표 |
| ep-108.png | EP.8 과학 퍼즐 | 원자, 주기율표 |

### 2. 스테이지 플레이 배경 (세로) — 총 96개

#### 스토리 모드 (75개)
| EP | 스테이지 수 | 파일명 |
|----|------------|--------|
| 1 | 4 | 1-1.png, 1-2.png, 1-3.png, 1-4.png |
| 2 | 2 | 2-1.png, 2-2.png |
| 3 | 3 | 3-1.png, 3-2.png, 3-3.png |
| 4 | 4 | 4-1.png, 4-2.png, 4-3.png, 4-4.png |
| 5 | 4 | 5-1.png, 5-2.png, 5-3.png, 5-4.png |
| 6 | 3 | 6-1.png, 6-2.png, 6-3.png |
| 7 | 4 | 7-1.png, 7-2.png, 7-3.png, 7-4.png |
| 8 | 4 | 8-1.png, 8-2.png, 8-3.png, 8-4.png |
| 9 | 4 | 9-1.png, 9-2.png, 9-3.png, 9-4.png |
| 10 | 3 | 10-1.png, 10-2.png, 10-3.png |
| 11 | 3 | 11-1.png, 11-2.png, 11-3.png |
| 12 | 4 | 12-1.png, 12-2.png, 12-3.png, 12-4.png |
| 13 | 3 | 13-1.png, 13-2.png, 13-3.png |
| 14 | 4 | 14-1.png, 14-2.png, 14-3.png, 14-4.png |
| 15 | 5 | 15-1.png, 15-2.png, 15-3.png, 15-4.png, 15-5.png |
| 16 | 4 | 16-1.png, 16-2.png, 16-3.png, 16-4.png |
| 17 | 4 | 17-1.png, 17-2.png, 17-3.png, 17-4.png |
| 18 | 5 | 18-1.png, 18-2.png, 18-3.png, 18-4.png, 18-5.png |
| 19 | 4 | 19-1.png, 19-2.png, 19-3.png, 19-4.png |
| 20 | 4 | 20-1.png, 20-2.png, 20-3.png, 20-4.png |

#### 추론 모드 (21개)
| EP | 스테이지 수 | 파일명 |
|----|------------|--------|
| 101 | 3 | 101-1.png, 101-2.png, 101-3.png |
| 102 | 3 | 102-1.png, 102-2.png, 102-3.png |
| 103 | 3 | 103-1.png, 103-2.png, 103-3.png |
| 104 | 3 | 104-1.png, 104-2.png, 104-3.png |
| 105 | 2 | 105-1.png, 105-2.png |
| 106 | 2 | 106-1.png, 106-2.png |
| 107 | 2 | 107-1.png, 107-2.png |
| 108 | 3 | 108-1.png, 108-2.png, 108-3.png |

## 리사이즈

| 용도 | 원본 | 리사이즈 추천 |
|------|------|---------------|
| 에피소드 카드 | 1792x1024 | 896x512 |
| 스테이지 배경 | 1024x1792 | 512x896 |

포맷: PNG

## 파일 경로

```
public/images/
├── story/
│   ├── ep-1.png ~ ep-20.png      (에피소드 카드 배경, 가로)
│   ├── 1-1.png ~ 1-4.png         (스테이지 배경, 세로)
│   ├── 2-1.png ~ 2-2.png
│   ├── ...
│   └── 20-1.png ~ 20-4.png
└── deduction/
    ├── ep-101.png ~ ep-108.png   (에피소드 카드 배경, 가로)
    ├── 101-1.png ~ 101-3.png     (스테이지 배경, 세로)
    ├── ...
    └── 108-1.png ~ 108-3.png
```

## 코드 구조

### 스테이지 배경 (GamePlay 컴포넌트)

일러스트 키: `episode.id-stage.id` (예: "1-1", "101-2")

```tsx
// components/illustrations/StoryIllustrations.tsx
export const storyIllustrations: Record<string, React.ComponentType> = {
  "1-1": () => <BgImage src="/images/story/1-1.png" alt="..." />,
  ...
};

// GamePlay 렌더링
const illustrationKey = `${episode.id}-${currentStage.id}`;
const IllustrationComponent = storyIllustrations[illustrationKey];

{IllustrationComponent && (
  <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <IllustrationComponent />
    </div>
  </div>
)}
```

### 에피소드 카드 배경 (목록 페이지)

```tsx
// app/story/page.tsx, app/deduction/page.tsx
<Link className="... relative overflow-hidden">
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <img src={`/images/story/ep-${episode.id}.png`} alt="" className="w-full h-full object-cover" />
  </div>
  ...
</Link>
```

## 체크리스트

- [x] 코드 구조 변경 (SVG → PNG 이미지 기반)
- [x] 배경 렌더링 방식 적용
- [x] 파일 경로 설정
- [ ] DALL-E 3로 에피소드 카드 이미지 생성 (가로 28개)
- [ ] DALL-E 3로 스테이지 배경 이미지 생성 (세로 96개)
- [ ] 이미지 리사이즈
- [ ] public/images/ 경로에 파일 배치
- [ ] 일러스트 컴포넌트에 스테이지별 매핑 추가
- [ ] 에피소드 목록에 카드 배경 적용
- [ ] 개발 서버에서 확인
