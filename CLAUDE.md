# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 개발 가이드입니다.

## 프로젝트 개요

Story Hacker는 두 가지 모드를 제공하는 퍼즐-추리 게임입니다:
- **스토리 모드**: 이야기 속 단서로 PIN 코드를 추리
- **추론 모드**: 논리적 단서로 PIN 코드를 추론 (오답 시 점진적 힌트 공개)

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS로 구축되었습니다.

## 명령어

```bash
npm run dev     # 개발 서버 시작 (localhost:3000)
npm run build   # 프로덕션 빌드
npm run lint    # ESLint 실행
npm start       # 프로덕션 서버 시작
```

## 아키텍처

### 디렉토리 구조

```
app/                              # Next.js App Router
├── layout.tsx                   # 루트 레이아웃 (메타데이터, 배경효과)
├── page.tsx                     # 홈 페이지 (글리치 효과, 시작 버튼)
├── globals.css                  # 전역 스타일, 애니메이션
├── mode-select/page.tsx         # 모드 선택 (스토리/추론)
├── story/
│   ├── page.tsx                # 스토리 에피소드 선택
│   └── [episodeId]/
│       ├── page.tsx            # 스토리 게임 플레이
│       ├── complete/page.tsx   # 에피소드 클리어
│       └── gameover/page.tsx   # 게임오버
└── deduction/                   # 추론 모드 (동일 구조)

components/
├── screens/
│   ├── StoryGamePlay.tsx       # 스토리 모드 전체 게임 로직
│   └── DeductionGamePlay.tsx   # 추론 모드 전체 게임 로직
├── ui/
│   ├── PinDisplay.tsx          # PIN 숫자 표시 (4/6자리)
│   ├── InputArea.tsx           # 숫자 키패드 + 제출 버튼
│   └── HeartsDisplay.tsx       # 남은 턴 하트 표시
└── illustrations/
    ├── StoryIllustrations.tsx  # 스토리 모드 SVG 일러스트
    └── DeductionIllustrations.tsx

hooks/
├── useGameState.ts             # useStoryGameState, useDeductionGameState
├── useLocalStorage.ts          # SSR-safe 로컬스토리지 훅
└── useTypingEffect.ts          # 타이핑 애니메이션 훅

lib/
├── types.ts                    # 모든 TypeScript 타입/인터페이스
└── utils.ts                    # 유틸리티 함수

data/
├── storyEpisodes.ts            # 스토리 에피소드 데이터 (10개)
└── deductionEpisodes.ts        # 추론 에피소드 데이터 (8개)
```

### 핵심 패턴

**게임 상태 관리**: `hooks/useGameState.ts`에 두 개의 훅 존재

```typescript
// 스토리 모드
useStoryGameState(stages: StoryStage[])
// 반환: { state, handleInput, handleDelete, handleClear, handleSubmit, handleHint, nextStage }

// 추론 모드
useDeductionGameState(stages: DeductionStage[])
// 반환: { state, handleInput, handleDelete, handleClear, handleSubmit, nextStage, initializeStage }
```

**클라이언트 컴포넌트**: 모든 페이지에 `'use client'` 지시어 사용 - 순수 클라이언트 사이드 렌더링

**로컬스토리지**: `useLocalStorage` 훅으로 진행 상황 저장 (SSR-safe 초기화 가드 포함)

**일러스트레이션**: `episodeId-stageId` 키로 동적 렌더링

### 타입 정의 (lib/types.ts)

```typescript
// 스토리 모드 타입
interface StoryStage {
  id: number;
  title: string;
  story: string;           // 스토리 텍스트
  clue: string;            // 단서 (이모지 포함)
  hint: string;            // 힌트 (별점 소모)
  lockType: 'pin4' | 'pin6';
  answers: string[];       // 복수 정답 허용
  maxTurns: number;
}

interface StoryEpisode {
  id: number;
  title: string;
  difficulty: 1 | 2 | 3;
  mode: 'story';
  stages: StoryStage[];
}

// 추론 모드 타입
interface DeductionClue {
  turn: number;            // 공개되는 턴 번호
  text: string;
}

interface DeductionStage {
  id: number;
  title: string;
  situation: string;       // 상황 설명
  lockType: 'pin4' | 'pin6';
  answer: string;          // 단일 정답
  maxTurns: number;
  clues: DeductionClue[];  // 점진적 공개 단서
}

// 진행 상황
interface GameProgress {
  completedEpisodes: Record<number, { stars: number; completed: boolean }>;
  totalStars: number;
}
```

### 게임 메커니즘

**스토리 모드**
1. 스토리와 단서가 타이핑 효과로 표시
2. PIN 입력 후 `stage.answers[]` 배열과 비교
3. 정답: 다음 스테이지 또는 에피소드 완료
4. 오답: `turnsUsed++`, shake 애니메이션, maxTurns 초과 시 게임오버
5. 힌트: `hintUsed=true`, 별점 1점 감소
6. 별점: 기본 3점, 힌트 사용 시 감소

**추론 모드**
1. 상황 설명 + 현재 턴에 해당하는 단서만 표시
2. PIN 입력 후 `stage.answer`와 비교
3. 정답: 다음 스테이지 또는 에피소드 완료
4. 오답: `turnsUsed++`, 새로운 단서 공개, maxTurns 초과 시 게임오버
5. 별점: 2턴 이내 3점, 4턴 이내 2점, 그 외 1점

## 스타일링

### Tailwind 커스텀 테마

```javascript
// tailwind.config.ts
colors: {
  'hacker-emerald': '#00FF88',   // 스토리 모드 메인
  'hacker-rose': '#FF3366',      // 위험/하트
  'hacker-cyan': '#22d3ee',      // 추론 모드 메인
  'hacker-gold': '#ffd700',      // 별점/성공
  'hacker-dark': '#0D1117',      // 배경
  'hacker-card': '#161B22',      // 카드 배경
}
```

### 커스텀 애니메이션

- `glitch`: 홈 화면 텍스트 글리치 효과
- `shake`: 오답 시 흔들림 효과
- `pulse-glow`: 배경 글로우 효과
- `fade-in`: 페이지 전환 효과
- `scaleIn`: 성공 오버레이 효과
- `slideIn`: 단서 공개 슬라이드 효과

### 전역 CSS 효과 (globals.css)

- **Scanline**: CRT 모니터 스캔라인 오버레이
- **Background Glow**: 3개의 원형 블러 배경 (emerald, rose, cyan)
- **Text Glow**: 컬러 텍스트 섀도우
- **Mobile-first**: max-width 448px 제약

## 유틸리티 함수 (lib/utils.ts)

```typescript
getDifficultyInfo(difficulty)      // 난이도 텍스트, 컬러, 별 정보
getDifficultyStars(difficulty)     // "★★☆" 형식 문자열
calculateDeductionStars(turnsUsed) // 추론 모드 별점 계산
getPinLength(lockType)             // 'pin4' → 4, 'pin6' → 6
cn(...classes)                     // 조건부 클래스 결합
```

## 테스트

E2E 테스트는 Playwright MCP agents를 사용합니다:
- **playwright-test-planner**: 테스트 계획 작성
- **playwright-test-generator**: 테스트 코드 생성
- **playwright-test-healer**: 실패한 테스트 디버깅 및 수정

테스트 파일은 `specs/` 디렉토리에 저장됩니다.

## 콘텐츠 추가 가이드

### 새 스토리 에피소드 추가

1. `data/storyEpisodes.ts`에 에피소드 추가:

```typescript
{
  id: 11,  // 고유 ID
  title: "에피소드 제목",
  difficulty: 2,  // 1-3
  mode: 'story' as const,
  stages: [
    {
      id: 1,
      title: "스테이지 제목",
      story: "스토리 텍스트...",
      clue: "📎 단서 텍스트",
      hint: "힌트 텍스트",
      lockType: "pin4",
      answers: ["1234", "4321"],  // 복수 정답 가능
      maxTurns: 5
    }
  ]
}
```

2. `components/illustrations/StoryIllustrations.tsx`에 일러스트 추가:

```typescript
// 키: "episodeId-stageId"
'11-1': () => <YourIllustration />
```

### 새 추론 에피소드 추가

1. `data/deductionEpisodes.ts`에 에피소드 추가:

```typescript
{
  id: 109,  // 101부터 시작 (스토리와 구분)
  title: "에피소드 제목",
  difficulty: 2,
  mode: 'deduction' as const,
  stages: [
    {
      id: 1,
      title: "스테이지 제목",
      situation: "상황 설명...",
      lockType: "pin4",
      answer: "1234",  // 단일 정답
      maxTurns: 6,
      clues: [
        { turn: 6, text: "첫 번째 단서 (처음부터 공개)" },
        { turn: 5, text: "두 번째 단서 (1번 틀리면 공개)" },
        { turn: 4, text: "세 번째 단서 (2번 틀리면 공개)" },
        // turn 숫자가 작을수록 나중에 공개
      ]
    }
  ]
}
```

## 라우팅 구조

```
/ (홈)
├── /mode-select           → 스토리/추론 선택
├── /story
│   ├── /story            → 에피소드 선택
│   └── /story/[episodeId]
│       ├── (게임 플레이)
│       ├── /complete     → ?stars=X&stage=Y
│       └── /gameover     → ?stage=Y&turns=Z
└── /deduction            → (동일 구조)
```

## 주의사항

- 모든 페이지는 `'use client'` 지시어 사용
- `generateStaticParams()`로 정적 생성 지원
- 로컬스토리지 키: `'story-hacker-progress'`
- 에피소드 ID: 스토리 1-10, 추론 101-108
- PIN 길이: `pin4` (4자리) 또는 `pin6` (6자리)
- 별점은 기존보다 높을 때만 업데이트됨 (하향 방지)