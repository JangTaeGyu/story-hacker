# 배경 일러스트 이미지 작업

## 개요

게임 플레이 화면에 에피소드별 배경 일러스트를 세로 이미지로 적용하는 작업.
이미지는 `opacity-15`로 전체 화면 배경에 깔림.

## 이미지 생성

### DALL-E 3 설정
- **모델**: DALL-E 3
- **사이즈**: 1024x1792 (세로, portrait)
- **스타일**: 에피소드 분위기에 맞는 일러스트

### 생성할 이미지 목록

#### 스토리 모드 (10개)
| 파일명 | 에피소드 | 프롬프트 키워드 |
|--------|----------|-----------------|
| bg-1.png | EP.1 수상한 이웃 | 스마트폰, 미스터리, 어두운 골목 |
| bg-2.png | EP.2 할아버지의 금고 | 오래된 금고, 추억, 빈티지 |
| bg-3.png | EP.3 학교의 비밀 | 학교 건물, 밤, 미스터리 |
| bg-4.png | EP.4 탐정 사무소 | 돋보기, 서류, 탐정 분위기 |
| bg-5.png | EP.5 게임 속 게임 | 게임 컨트롤러, 네온, 사이버펑크 |
| bg-6.png | EP.6 카페의 비밀 | 카페, 커피, 은밀한 분위기 |
| bg-7.png | EP.7 병원의 미스터리 | 병원, 복도, 긴장감 |
| bg-8.png | EP.8 우주 정거장 | 우주, 정거장, SF |
| bg-9.png | EP.9 마법의 탑 | 마법, 탑, 판타지 |
| bg-10.png | EP.10 타임캡슐 | 타임캡슐, 과거와 현재 |

#### 추론 모드 (8개)
| 파일명 | 에피소드 | 프롬프트 키워드 |
|--------|----------|-----------------|
| bg-101.png | EP.1 숫자 추리 | 숫자, 코드, 해킹 분위기 |
| bg-102.png | EP.2 논리 게이트 | 논리 회로, 디지털 |
| bg-103.png | EP.3 수학 퍼즐 | 수학 기호, 칠판 |
| bg-104.png | EP.4 시간 퍼즐 | 시계, 시간 |
| bg-105.png | EP.5 색상 코드 | 무지개, RGB, 색상 |
| bg-106.png | EP.6 음악 퍼즐 | 음표, 오선지, 악기 |
| bg-107.png | EP.7 지리 퍼즐 | 지구, 지도, 좌표 |
| bg-108.png | EP.8 과학 퍼즐 | 원자, 주기율표 |

## 리사이즈 & 적용

### 리사이즈
- 원본: 1024x1792 (DALL-E 3 출력)
- 리사이즈 추천: 가로 512px 기준 (512x896) — 모바일 화면에 충분한 해상도
- 포맷: PNG

### 파일 경로
```
public/images/
├── story/
│   ├── bg-1.png
│   ├── bg-2.png
│   ├── bg-3.png
│   ├── bg-4.png
│   ├── bg-5.png
│   ├── bg-6.png
│   ├── bg-7.png
│   ├── bg-8.png
│   ├── bg-9.png
│   └── bg-10.png
└── deduction/
    ├── bg-101.png
    ├── bg-102.png
    ├── bg-103.png
    ├── bg-104.png
    ├── bg-105.png
    ├── bg-106.png
    ├── bg-107.png
    └── bg-108.png
```

## 코드 구조

### 일러스트 컴포넌트
- `components/illustrations/StoryIllustrations.tsx` — 에피소드 ID로 매핑
- `components/illustrations/DeductionIllustrations.tsx` — 에피소드 ID로 매핑

### 배경 렌더링 (GamePlay 컴포넌트)
```tsx
{IllustrationComponent && (
  <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <IllustrationComponent />
    </div>
  </div>
)}
```

### 일러스트 키
- 스토리: `episode.id.toString()` (예: "1", "2", ...)
- 추론: `episode.id.toString()` (예: "101", "102", ...)

## 체크리스트

- [x] 코드 구조 변경 (SVG → PNG 이미지 기반)
- [x] 배경 렌더링 방식 적용 (opacity-15, absolute)
- [x] 파일 경로 설정
- [ ] DALL-E 3로 스토리 모드 이미지 10개 생성
- [ ] DALL-E 3로 추론 모드 이미지 8개 생성
- [ ] 이미지 리사이즈 (512x896 추천)
- [ ] public/images/ 경로에 파일 배치
- [ ] 개발 서버에서 확인
