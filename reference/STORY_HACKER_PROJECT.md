# Story Hacker - 프로젝트 문서

> Claude Code에서 이어서 작업하기 위한 프로젝트 가이드

## 📋 프로젝트 개요

**Story Hacker**는 스토리 속 단서를 읽고 비밀번호를 추리하는 퍼즐 게임입니다.

- **타겟**: 10세 이상
- **플랫폼**: 모바일 웹 (반응형)
- **테마**: 사이버펑크 / 해커 다크 모드
- **기술 스택**: Next.js 14+ (App Router) + Tailwind CSS
- **원본 소스**: `reference/StoryHackerWithIllust.jsx`

---

## 🎮 게임 모드

### 1. 스토리 모드 (Story Mode)
- 스토리와 단서가 처음부터 모두 제공됨
- 일러스트와 함께 몰입감 있는 추리
- 힌트 사용 시 별점 1개 감소
- 에피소드: 10개 / 스테이지: 35개

### 2. 추리 모드 (Deduction Mode)
- 턴마다 단서가 하나씩 공개됨
- 틀리면 자동으로 다음 단서 공개
- 빨리 맞출수록 높은 별점
- 에피소드: 8개 / 스테이지: 24개

---

## 📁 파일 구조

```
story-hacker/
├── app/
│   ├── layout.tsx                 # 루트 레이아웃
│   ├── page.tsx                   # 메인 메뉴 (/)
│   ├── globals.css                # 글로벌 스타일
│   ├── mode-select/
│   │   └── page.tsx               # 모드 선택 (/mode-select)
│   ├── story/
│   │   ├── page.tsx               # 스토리 에피소드 선택 (/story)
│   │   └── [episodeId]/
│   │       ├── page.tsx           # 스토리 게임플레이 (/story/1)
│   │       ├── complete/
│   │       │   └── page.tsx       # 에피소드 완료 (/story/1/complete)
│   │       └── gameover/
│   │           └── page.tsx       # 게임오버 (/story/1/gameover)
│   └── deduction/
│       ├── page.tsx               # 추리 에피소드 선택 (/deduction)
│       └── [episodeId]/
│           ├── page.tsx           # 추리 게임플레이 (/deduction/101)
│           ├── complete/
│           │   └── page.tsx       # 에피소드 완료 (/deduction/101/complete)
│           └── gameover/
│               └── page.tsx       # 게임오버 (/deduction/101/gameover)
├── components/
│   ├── illustrations/
│   │   ├── index.ts               # 일러스트 export
│   │   ├── story/                 # 스토리 모드 일러스트 (14개)
│   │   │   ├── IllustSmartphone.tsx
│   │   │   ├── IllustCat.tsx
│   │   │   ├── IllustGallery.tsx
│   │   │   ├── IllustCode.tsx
│   │   │   ├── IllustGrandpa.tsx
│   │   │   ├── IllustSafe.tsx
│   │   │   ├── IllustSchool.tsx
│   │   │   ├── IllustDetective.tsx
│   │   │   ├── IllustGame.tsx
│   │   │   ├── IllustCafe.tsx
│   │   │   ├── IllustHospital.tsx
│   │   │   ├── IllustSpace.tsx
│   │   │   ├── IllustMagicTower.tsx
│   │   │   └── IllustTimeCapsule.tsx
│   │   └── deduction/             # 추리 모드 일러스트 (8개)
│   │       ├── IllustNumbers.tsx
│   │       ├── IllustLogic.tsx
│   │       ├── IllustMath.tsx
│   │       ├── IllustClock.tsx
│   │       ├── IllustColor.tsx
│   │       ├── IllustMusic.tsx
│   │       ├── IllustGeo.tsx
│   │       └── IllustScience.tsx
│   ├── screens/
│   │   ├── MainMenu.tsx           # 메인 메뉴 화면
│   │   ├── ModeSelect.tsx         # 모드 선택 화면
│   │   ├── EpisodeSelect.tsx      # 에피소드 선택 (공용)
│   │   ├── StoryGamePlay.tsx      # 스토리 게임플레이
│   │   ├── DeductionGamePlay.tsx  # 추리 게임플레이
│   │   ├── EpisodeComplete.tsx    # 에피소드 완료
│   │   └── GameOver.tsx           # 게임오버
│   └── ui/
│       ├── InputArea.tsx          # PIN 입력 + 키패드
│       ├── PinDisplay.tsx         # PIN 표시 (●●●●)
│       ├── StarRating.tsx         # 별점 표시
│       ├── HeartsDisplay.tsx      # 남은 턴 (하트)
│       └── GlitchText.tsx         # 글리치 텍스트 효과
├── data/
│   ├── storyEpisodes.ts           # 스토리 모드 에피소드 데이터
│   └── deductionEpisodes.ts       # 추리 모드 에피소드 데이터
├── hooks/
│   ├── useGameState.ts            # 게임 상태 관리 훅
│   ├── useLocalStorage.ts         # 로컬스토리지 훅
│   └── useTypingEffect.ts         # 타이핑 애니메이션 훅
├── lib/
│   ├── types.ts                   # TypeScript 타입 정의
│   ├── utils.ts                   # 유틸리티 함수
│   └── illustrations.ts           # 일러스트 매핑
├── public/
│   └── sounds/                    # 효과음
├── reference/
│   ├── STORY_HACKER_PROJECT.md    # 이 문서
│   └── StoryHackerWithIllust.jsx  # 원본 소스 (참조용)
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## 🎨 디자인 시스템

### 색상 팔레트

```css
/* 메인 색상 */
--emerald: #00FF88;      /* 스토리 모드 강조색 */
--rose: #FF3366;         /* 경고/실패 */
--cyan: #22d3ee;         /* 추리 모드 강조색 */
--gold: #ffd700;         /* 별점/보상 */

/* 배경 */
--bg-dark: #0D1117;
--bg-card: #161B22;
--bg-input: #1f2937;

/* 텍스트 */
--text-primary: #ffffff;
--text-secondary: #9ca3af;
--text-muted: #4b5563;
```

### 폰트

```css
font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace;
```

### 효과

- **Glitch Effect**: 400ms 간격으로 랜덤 화면 흔들림 (3% 확률)
- **Scanline Overlay**: CRT 모니터 느낌의 가로줄
- **Typing Animation**: 25ms/글자 타이핑 효과
- **Shake Animation**: 오답 시 입력창 흔들림 (0.3s)
- **Success Animation**: 정답 시 ACCESS GRANTED 표시 (1.2s)

---

## 📊 에피소드 데이터 구조

### 스토리 모드

```typescript
// lib/types.ts
export interface StoryStage {
  id: number;
  title: string;
  story: string;           // 스토리 텍스트
  clue: string;            // 단서 텍스트
  hint: string;            // 힌트 (별 1개 소모)
  lockType: 'pin4' | 'pin6';
  answers: string[];       // 복수 정답 가능
  maxTurns: number;
}

export interface StoryEpisode {
  id: number;              // 1~10
  title: string;
  difficulty: 1 | 2 | 3;   // EASY | NORMAL | HARD
  mode: 'story';
  stages: StoryStage[];
}

// data/storyEpisodes.ts
export const storyEpisodes: StoryEpisode[] = [
  {
    id: 1,
    title: "수상한 이웃",
    difficulty: 1,
    mode: "story",
    stages: [
      {
        id: 1,
        title: "떨어진 스마트폰",
        story: `공원 벤치에서 스마트폰을 발견했다.\n주인에게 돌려주려면 연락처를 찾아야 한다.`,
        clue: `📎 폰 뒷면 스티커:\n"우리 첫 만남 💕 2019.07.23"`,
        hint: "특별한 날짜의 월과 일을 생각해보세요.",
        lockType: "pin4",
        answers: ["0723", "7232"],
        maxTurns: 5,
      },
      // ... 나머지 스테이지
    ]
  },
  // ... 나머지 에피소드 (총 10개)
];
```

### 추리 모드

```typescript
// lib/types.ts
export interface DeductionClue {
  turn: number;            // 공개되는 턴 (maxTurns에서 시작, 감소)
  text: string;
}

export interface DeductionStage {
  id: number;
  title: string;
  situation: string;       // 상황 설명
  lockType: 'pin4' | 'pin6';
  answer: string;          // 단일 정답
  maxTurns: number;
  clues: DeductionClue[];  // 턴마다 공개되는 단서들
}

export interface DeductionEpisode {
  id: number;              // 101~108
  title: string;
  difficulty: 1 | 2 | 3;
  mode: 'deduction';
  stages: DeductionStage[];
}

// data/deductionEpisodes.ts
export const deductionEpisodes: DeductionEpisode[] = [
  {
    id: 101,
    title: "숫자 추리",
    difficulty: 1,
    mode: "deduction",
    stages: [
      {
        id: 1,
        title: "기초 추리",
        situation: "4자리 비밀번호를 추리하세요.",
        lockType: "pin4",
        answer: "3726",
        maxTurns: 6,
        clues: [
          { turn: 6, text: "모든 숫자는 서로 다릅니다." },
          { turn: 5, text: "첫 번째 숫자는 홀수입니다." },
          { turn: 4, text: "네 숫자의 합은 18입니다." },
          { turn: 3, text: "두 번째 숫자는 7입니다." },
          { turn: 2, text: "마지막 숫자는 첫 번째 숫자의 2배입니다." },
          { turn: 1, text: "세 번째 숫자는 2입니다." },
        ],
      },
      // ... 나머지 스테이지
    ]
  },
  // ... 나머지 에피소드 (총 8개)
];
```

---

## 🖼️ 일러스트 매핑

### 스토리 모드 일러스트 (14개)

| 컴포넌트 | 사용처 | 설명 |
|----------|--------|------|
| `IllustSmartphone` | 1-1 | 잠긴 스마트폰 |
| `IllustCat` | 1-2 | 고양이 (나비) |
| `IllustGallery` | 1-3 | 사진 갤러리 |
| `IllustCode` | 1-4, 3-3 | 알파벳-숫자 변환 |
| `IllustGrandpa` | 2-1 | 할아버지의 오래된 폰 |
| `IllustSafe` | 2-2, 6-3 | 금고 |
| `IllustSchool` | 3-1, 3-2 | 학교 건물 |
| `IllustDetective` | 4-1~4-4 | 탐정 돋보기 |
| `IllustGame` | 5-1~5-4 | 게임 컨트롤러 |
| `IllustCafe` | 6-1, 6-2 | 카페 커피 |
| `IllustHospital` | 7-1~7-4 | 병원 건물 |
| `IllustSpace` | 8-1~8-4 | 우주 정거장 |
| `IllustMagicTower` | 9-1~9-4 | 마법사의 탑 |
| `IllustTimeCapsule` | 10-1~10-3 | 타임캡슐 |

### 추리 모드 일러스트 (8개)

| 컴포넌트 | 에피소드 ID | 설명 |
|----------|-------------|------|
| `IllustNumbers` | 101 | 숫자들과 물음표 |
| `IllustLogic` | 102 | 논리 게이트 회로 |
| `IllustMath` | 103 | 수학 기호들 |
| `IllustClock` | 104 | 아날로그 시계 |
| `IllustColor` | 105 | 무지개 색상환 |
| `IllustMusic` | 106 | 오선지와 음표 |
| `IllustGeo` | 107 | 지구본과 좌표 |
| `IllustScience` | 108 | 원자 모델 |

### 일러스트 매핑 코드

```typescript
// lib/illustrations.ts
import { FC } from 'react';
import {
  IllustSmartphone, IllustCat, IllustGallery, IllustCode,
  IllustGrandpa, IllustSafe, IllustSchool, IllustDetective,
  IllustGame, IllustCafe, IllustHospital, IllustSpace,
  IllustMagicTower, IllustTimeCapsule
} from '@/components/illustrations/story';
import {
  IllustNumbers, IllustLogic, IllustMath, IllustClock,
  IllustColor, IllustMusic, IllustGeo, IllustScience
} from '@/components/illustrations/deduction';

// 스토리 모드: "에피소드ID-스테이지ID" 형식
export const storyIllustrations: Record<string, FC> = {
  "1-1": IllustSmartphone,
  "1-2": IllustCat,
  "1-3": IllustGallery,
  "1-4": IllustCode,
  "2-1": IllustGrandpa,
  "2-2": IllustSafe,
  "3-1": IllustSchool,
  "3-2": IllustSchool,
  "3-3": IllustCode,
  "4-1": IllustDetective,
  "4-2": IllustDetective,
  "4-3": IllustDetective,
  "4-4": IllustDetective,
  "5-1": IllustGame,
  "5-2": IllustGame,
  "5-3": IllustGame,
  "5-4": IllustGame,
  "6-1": IllustCafe,
  "6-2": IllustCafe,
  "6-3": IllustSafe,
  "7-1": IllustHospital,
  "7-2": IllustHospital,
  "7-3": IllustHospital,
  "7-4": IllustHospital,
  "8-1": IllustSpace,
  "8-2": IllustSpace,
  "8-3": IllustSpace,
  "8-4": IllustSpace,
  "9-1": IllustMagicTower,
  "9-2": IllustMagicTower,
  "9-3": IllustMagicTower,
  "9-4": IllustMagicTower,
  "10-1": IllustTimeCapsule,
  "10-2": IllustTimeCapsule,
  "10-3": IllustTimeCapsule,
};

// 추리 모드: "에피소드ID" 형식
export const deductionIllustrations: Record<string, FC> = {
  "101": IllustNumbers,
  "102": IllustLogic,
  "103": IllustMath,
  "104": IllustClock,
  "105": IllustColor,
  "106": IllustMusic,
  "107": IllustGeo,
  "108": IllustScience,
};

// 헬퍼 함수
export function getStoryIllustration(episodeId: number, stageId: number): FC {
  const key = `${episodeId}-${stageId}`;
  return storyIllustrations[key] || IllustSmartphone;
}

export function getDeductionIllustration(episodeId: number): FC {
  return deductionIllustrations[String(episodeId)] || IllustNumbers;
}
```

---

## 🔄 게임 상태 흐름

### 상태 vs 라우트 매핑

| 기존 gameState | Next.js 라우트 | 컴포넌트 |
|----------------|----------------|----------|
| `'menu'` | `/` | MainMenu |
| `'modeSelect'` | `/mode-select` | ModeSelect |
| `'storyEpisodeSelect'` | `/story` | EpisodeSelect |
| `'deductionEpisodeSelect'` | `/deduction` | EpisodeSelect |
| `'playing'` (story) | `/story/[id]` | StoryGamePlay |
| `'playing'` (deduction) | `/deduction/[id]` | DeductionGamePlay |
| `'success'` | `/story/[id]/complete` | EpisodeComplete |
| `'success'` | `/deduction/[id]/complete` | EpisodeComplete |
| `'gameover'` | `/story/[id]/gameover` | GameOver |
| `'gameover'` | `/deduction/[id]/gameover` | GameOver |

### 게임 상태 훅

```typescript
// hooks/useGameState.ts
'use client';

import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { StoryEpisode, DeductionEpisode, StoryStage, DeductionStage } from '@/lib/types';

export type GameMode = 'story' | 'deduction';

export interface GameProgress {
  completedEpisodes: Record<number, { stars: number; completed: boolean }>;
  totalStars: number;
}

export function useGameState() {
  // 현재 게임 상태
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [input, setInput] = useState('');
  const [turnsLeft, setTurnsLeft] = useState(5);
  const [initialTurns, setInitialTurns] = useState(5);
  const [stars, setStars] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [revealedClues, setRevealedClues] = useState<number[]>([]);
  const [shake, setShake] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  // 진행 상황 저장
  const [progress, setProgress] = useLocalStorage<GameProgress>(
    'story-hacker-progress',
    { completedEpisodes: {}, totalStars: 0 }
  );

  // 에피소드 시작
  const startEpisode = useCallback((episode: StoryEpisode | DeductionEpisode) => {
    const firstStage = episode.stages[0];
    setCurrentStageIndex(0);
    setInput('');
    setTurnsLeft(firstStage.maxTurns);
    setInitialTurns(firstStage.maxTurns);
    setStars(3);
    setShowHint(false);
    setRevealedClues([]);
  }, []);

  // 정답 확인
  const checkAnswer = useCallback((
    currentStage: StoryStage | DeductionStage,
    mode: GameMode
  ) => {
    const pinLength = currentStage.lockType === 'pin6' ? 6 : 4;
    if (input.length !== pinLength) return null;

    const isCorrect = mode === 'story'
      ? (currentStage as StoryStage).answers.includes(input)
      : input === (currentStage as DeductionStage).answer;

    return isCorrect;
  }, [input]);

  // 힌트 사용 (스토리 모드)
  const useHint = useCallback(() => {
    if (!showHint && stars > 1) {
      setShowHint(true);
      setStars(prev => prev - 1);
    }
  }, [showHint, stars]);

  // 다음 단서 공개 (추리 모드)
  const revealNextClue = useCallback((
    currentStage: DeductionStage
  ) => {
    if (turnsLeft > 1) {
      const newTurns = turnsLeft - 1;
      setTurnsLeft(newTurns);
      const newClueIndex = currentStage.clues.findIndex(c => c.turn === newTurns);
      if (newClueIndex !== -1) {
        setRevealedClues(prev => [...prev, newClueIndex]);
      }
    }
  }, [turnsLeft]);

  // 리셋
  const resetGame = useCallback(() => {
    setCurrentStageIndex(0);
    setInput('');
    setRevealedClues([]);
    setShowHint(false);
  }, []);

  return {
    // 상태
    currentStageIndex,
    input,
    turnsLeft,
    initialTurns,
    stars,
    showHint,
    revealedClues,
    shake,
    successAnim,
    progress,
    // 액션
    setCurrentStageIndex,
    setInput,
    setTurnsLeft,
    setInitialTurns,
    setStars,
    setShowHint,
    setRevealedClues,
    setShake,
    setSuccessAnim,
    setProgress,
    startEpisode,
    checkAnswer,
    useHint,
    revealNextClue,
    resetGame,
  };
}
```

---

## ⭐ 별점 시스템

### 스토리 모드
- 기본 3개
- 힌트 사용 시 -1개
- 최소 1개 보장

### 추리 모드
- 1~2턴 성공: ★★★
- 3~4턴 성공: ★★
- 5턴 이상: ★

```typescript
// 추리 모드 별점 계산
function calculateDeductionStars(turnsUsed: number): number {
  if (turnsUsed <= 2) return 3;
  if (turnsUsed <= 4) return 2;
  return 1;
}
```

---

## 📝 현재 에피소드 목록

### 스토리 모드 (10개)

| ID | 제목 | 난이도 | 스테이지 | 테마 |
|----|------|--------|----------|------|
| 1 | 수상한 이웃 | ★☆☆ | 4 | 일상 미스터리 |
| 2 | 사라진 보물 | ★☆☆ | 2 | 가족 |
| 3 | 학교의 미스터리 | ★☆☆ | 3 | 학교 |
| 4 | 탐정 사무소 | ★★☆ | 4 | 추리 |
| 5 | 게이머의 비밀 | ★★☆ | 4 | 게임 |
| 6 | 카페 미스터리 | ★★☆ | 3 | 일상 |
| 7 | 병원 탈출 | ★★★ | 4 | 서스펜스 |
| 8 | 우주 정거장 | ★★★ | 4 | SF |
| 9 | 마법사의 탑 | ★★☆ | 4 | 판타지 |
| 10 | 타임캡슐 | ★☆☆ | 3 | 감성 |

### 추리 모드 (8개)

| ID | 제목 | 난이도 | 스테이지 | 분야 |
|----|------|--------|----------|------|
| 101 | 숫자 추리 | ★☆☆ | 3 | 기초 논리 |
| 102 | 논리 퍼즐 | ★★☆ | 3 | 논리 |
| 103 | 수학 챌린지 | ★★☆ | 3 | 수학 |
| 104 | 시간 퍼즐 | ★★☆ | 3 | 시간/날짜 |
| 105 | 색깔 코드 | ★☆☆ | 2 | 색상/RGB |
| 106 | 음악 퍼즐 | ★★☆ | 2 | 음악 |
| 107 | 지리 퀴즈 | ★★★ | 2 | 지리 |
| 108 | 과학 상식 | ★★★ | 3 | 과학 |

---

## 🚀 다음 작업 (TODO)

### 우선순위 높음
- [ ] Next.js 프로젝트 초기 설정
- [ ] App Router 기반 라우팅 구현
- [ ] 원본 소스에서 컴포넌트 분리
- [ ] TypeScript 타입 정의
- [ ] LocalStorage 진행상황 저장

### 우선순위 중간
- [ ] 효과음 추가 (성공, 실패, 키패드)
- [ ] 튜토리얼 모드 추가
- [ ] 에피소드 잠금 해제 시스템
- [ ] 업적/도전과제 시스템
- [ ] 다국어 지원 (next-intl)

### 우선순위 낮음
- [ ] 패턴 잠금 UI (3x3 그리드)
- [ ] 알파벳 비밀번호 지원
- [ ] 유저 생성 스테이지
- [ ] 리더보드

---

## 🔧 개발 환경 설정

### 프로젝트 생성

```bash
# Next.js 프로젝트 생성
npx create-next-app@latest story-hacker --typescript --tailwind --eslint --app --src-dir=false

cd story-hacker

# 추가 의존성 설치 (선택)
npm install zustand                    # 상태 관리
npm install framer-motion              # 애니메이션
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hacker-emerald': '#00FF88',
        'hacker-rose': '#FF3366',
        'hacker-cyan': '#22d3ee',
        'hacker-gold': '#ffd700',
        'hacker-dark': '#0D1117',
        'hacker-card': '#161B22',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 400ms infinite',
        'shake': 'shake 0.3s ease-in-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.2' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

:root {
  --emerald: #00FF88;
  --rose: #FF3366;
  --cyan: #22d3ee;
  --gold: #ffd700;
  --bg-dark: #0D1117;
  --bg-card: #161B22;
}

body {
  background: linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%);
  font-family: 'JetBrains Mono', monospace;
  min-height: 100vh;
}

/* Scanline 효과 */
.scanline::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  );
  pointer-events: none;
  z-index: 40;
  opacity: 0.3;
}

/* 배경 글로우 효과 */
.bg-glow-emerald {
  position: fixed;
  top: -12rem;
  left: -12rem;
  width: 24rem;
  height: 24rem;
  background: rgba(0, 255, 136, 0.08);
  border-radius: 50%;
  filter: blur(48px);
  pointer-events: none;
}

.bg-glow-rose {
  position: fixed;
  bottom: -12rem;
  right: -12rem;
  width: 24rem;
  height: 24rem;
  background: rgba(255, 51, 102, 0.08);
  border-radius: 50%;
  filter: blur(48px);
  pointer-events: none;
}
```

### app/layout.tsx

```tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Story Hacker - 추리 퍼즐 게임',
  description: '스토리 속 단서를 읽고 비밀번호를 추리하는 퍼즐 게임',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0D1117',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen text-white antialiased scanline">
        {/* 배경 글로우 효과 */}
        <div className="bg-glow-emerald" />
        <div className="bg-glow-rose" />

        {/* 메인 컨텐츠 */}
        <main className="relative z-10 mx-auto max-w-md min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
```

---

## 🔌 Next.js 특화 기능

### 클라이언트 컴포넌트 마킹

게임 로직이 포함된 컴포넌트는 반드시 `'use client'` 지시문 필요:

```tsx
// components/screens/StoryGamePlay.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/useGameState';

export function StoryGamePlay({ episode }: { episode: StoryEpisode }) {
  const router = useRouter();
  const { input, turnsLeft, stars, ... } = useGameState();
  // ...
}
```

### 동적 라우트

```tsx
// app/story/[episodeId]/page.tsx
import { StoryGamePlay } from '@/components/screens/StoryGamePlay';
import { storyEpisodes } from '@/data/storyEpisodes';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ episodeId: string }>;
}

export default async function StoryGamePage({ params }: PageProps) {
  const { episodeId } = await params;
  const episode = storyEpisodes.find(e => e.id === Number(episodeId));

  if (!episode) {
    notFound();
  }

  return <StoryGamePlay episode={episode} />;
}

export function generateStaticParams() {
  return storyEpisodes.map(episode => ({
    episodeId: String(episode.id),
  }));
}
```

### 로딩 상태

```tsx
// app/story/[episodeId]/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-hacker-emerald animate-pulse font-mono">
        Loading...
      </div>
    </div>
  );
}
```

### 에러 처리

```tsx
// app/story/[episodeId]/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-hacker-rose font-mono">오류가 발생했습니다</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-hacker-card rounded hover:bg-gray-700 font-mono"
      >
        다시 시도
      </button>
    </div>
  );
}
```

---

## 🎯 마이그레이션 가이드

### 원본 소스에서 분리할 코드 영역

| 줄 번호 | 내용 | 분리 위치 |
|---------|------|-----------|
| 1~636 | SVG 일러스트 컴포넌트 | `components/illustrations/` |
| 638~686 | 일러스트 매핑 객체 | `lib/illustrations.ts` |
| 691~1017 | storyEpisodes 데이터 | `data/storyEpisodes.ts` |
| 1019~1254 | deductionEpisodes 데이터 | `data/deductionEpisodes.ts` |
| 1259~1433 | 게임 상태 및 로직 | `hooks/useGameState.ts` |
| 1439~1472 | MainMenu | `components/screens/MainMenu.tsx` |
| 1474~1524 | ModeSelect | `components/screens/ModeSelect.tsx` |
| 1526~1566 | EpisodeSelect | `components/screens/EpisodeSelect.tsx` |
| 1568~1608 | StoryGamePlay | `components/screens/StoryGamePlay.tsx` |
| 1610~1662 | DeductionGamePlay | `components/screens/DeductionGamePlay.tsx` |
| 1664~1717 | InputArea | `components/ui/InputArea.tsx` |
| 1719~1742 | EpisodeComplete | `components/screens/EpisodeComplete.tsx` |
| 1744~1769 | GameOver | `components/screens/GameOver.tsx` |

### 페이지 네비게이션

```typescript
// Next.js App Router 네비게이션
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 프로그래매틱 네비게이션
const router = useRouter();
router.push('/story/1');
router.push('/story/1/complete');
router.push('/story/1/gameover');
router.back();

// 선언적 네비게이션
<Link href="/mode-select">모드 선택</Link>
<Link href={`/story/${episodeId}`}>에피소드 시작</Link>
```

---

## 📦 주요 라우트 구조

| 경로 | 설명 | 컴포넌트 |
|------|------|----------|
| `/` | 메인 메뉴 | MainMenu |
| `/mode-select` | 모드 선택 | ModeSelect |
| `/story` | 스토리 에피소드 목록 | EpisodeSelect |
| `/story/[id]` | 스토리 게임플레이 | StoryGamePlay |
| `/story/[id]/complete` | 스토리 에피소드 완료 | EpisodeComplete |
| `/story/[id]/gameover` | 스토리 게임오버 | GameOver |
| `/deduction` | 추리 에피소드 목록 | EpisodeSelect |
| `/deduction/[id]` | 추리 게임플레이 | DeductionGamePlay |
| `/deduction/[id]/complete` | 추리 에피소드 완료 | EpisodeComplete |
| `/deduction/[id]/gameover` | 추리 게임오버 | GameOver |

---

## 📞 참고 사항

- 현재 버전: v3.0.0 (Next.js Migration)
- 원본 버전: v2.1.0 (React SPA)
- Next.js 14+ (App Router)
- React 18+
- TypeScript 권장
- 모바일 최적화 (max-width: 448px 기준)
- SVG 애니메이션은 CSS/SMIL 혼용

---

*마지막 업데이트: 2025년 1월*
