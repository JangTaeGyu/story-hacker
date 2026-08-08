# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 개발 가이드입니다.

## 프로젝트 개요

Story Hacker는 두 가지 모드를 제공하는 퍼즐-추리 게임입니다:
- **스토리 모드**: 이야기 속 단서로 PIN 코드를 추리 (에피소드 20개)
- **추리 모드**: 논리적 단서로 PIN 코드를 추론, 오답 시 새 단서 공개 (에피소드 8개)

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS로 구축되었습니다. 백엔드·DB 없이 전부 클라이언트 사이드로 동작하며, 진행 상황은 localStorage에만 저장됩니다.

비주얼 테마는 **NOCTURNE** — 어두운 문학 미스터리 톤(검정 + 빛바랜 금색 + 명조 본문)입니다. 초기 버전의 사이버펑크/네온 팔레트는 더 이상 사용하지 않습니다.

## 명령어

```bash
npm run dev     # 개발 서버 시작 (localhost:3000)
npm run build   # 프로덕션 빌드
npm run lint    # ESLint 실행 (.eslintrc.json — next/core-web-vitals)
npm start       # 프로덕션 서버 시작
npm test        # Playwright E2E 실행 (dev 서버 자동 기동)
npm run test:ui # Playwright UI 모드
```

## 아키텍처

### 디렉토리 구조

```
app/                              # Next.js App Router
├── layout.tsx                   # 루트 레이아웃 (메타데이터, OG, 스토리지 버전 스크립트)
├── template.tsx                 # 라우트 전환 페이드 (opacity 전용)
├── page.tsx                     # 홈 (히어로 이미지 + 워드마크)
├── globals.css                  # CSS 변수, 폰트, 애니메이션
├── icon.svg / manifest.json     # PWA 메타
├── mode-select/page.tsx         # 모드 선택 (스토리/추리)
├── story/
│   ├── page.tsx                # 스토리 에피소드 선택 (난이도 필터)
│   └── [episodeId]/
│       ├── page.tsx            # 서버 컴포넌트 — 에피소드 조회 후 GamePlay 렌더
│       ├── complete/page.tsx   # 에피소드 클리어 (진행도 저장 + SNS 공유)
│       └── gameover/page.tsx   # 게임오버 (정답 공개)
└── deduction/                   # 추리 모드 (동일 구조 + layout.tsx)

components/
├── screens/
│   ├── StoryGamePlay.tsx       # 스토리 모드 화면 전체
│   └── DeductionGamePlay.tsx   # 추리 모드 화면 전체
├── ui/
│   ├── Header.tsx              # 고정 헤더 (뒤로가기 / 중앙 / 우측 슬롯)
│   ├── PinDisplay.tsx          # PIN 자릿수 표시 (밑줄 + 숫자)
│   ├── InputArea.tsx           # 숫자 키패드 + 지움/확인
│   └── SolvedStamp.tsx         # "해결" 도장 직인 (완료 에피소드 표시)
│   └── HeartsDisplay.tsx       # 남은 시도 — 하트가 아닌 작은 점(dot)
└── illustrations/
    ├── StoryIllustrations.tsx  # "epId-stageId" → PNG 배경 매핑
    └── DeductionIllustrations.tsx  # 현재 빈 맵 (이미지 미제작)

hooks/
├── useGameState.ts             # useStoryGameState, useDeductionGameState
├── useLocalStorage.ts          # SSR-safe 로컬스토리지 훅 (isInitialized 반환)
└── useTypingEffect.ts          # 타이핑 애니메이션 + 스킵

lib/
├── types.ts                    # 모든 TypeScript 타입/인터페이스
└── utils.ts                    # 유틸리티 함수

data/
├── storyEpisodes.ts            # 배럴: story/ep-NN.ts 20개를 storyEpisodes 배열로 export
├── story/ep-01.ts ~ ep-20.ts   # 스토리 에피소드 1개당 1파일 (satisfies StoryEpisode)
└── deductionEpisodes.ts        # 추리 에피소드 8개 (단일 파일, id 101~108)

scripts/                         # Replicate(FLUX) 이미지 생성 · 아이콘/OG 생성 · 리사이즈
public/images/story/             # ep-N.png(카드 16:9), N-M.png(스테이지 9:16)
public/images/deduction/         # 비어 있음 — 추리 모드는 아직 이미지 없음
reference/, design-samples/, tasks/   # 원본 소스·디자인 시안·작업 문서 (앱 코드 아님)
```

### 서버 / 클라이언트 경계

"모든 페이지가 클라이언트 컴포넌트"가 **아닙니다.** 현재 경계는 다음과 같습니다.

| 파일 | 종류 | 이유 |
|---|---|---|
| `app/page.tsx`, `app/mode-select/page.tsx` | 서버 | 정적 렌더 |
| `app/story/[episodeId]/page.tsx`, `app/deduction/[episodeId]/page.tsx` | 서버 | `generateStaticParams()` + `notFound()`, `params`는 `Promise`라 `await` 필요 |
| `components/screens/*GamePlay.tsx` | 클라이언트 | 게임 상태·라우팅의 실제 경계 |
| 에피소드 선택 / complete / gameover 페이지 | 클라이언트 | localStorage, `useSearchParams` 사용 |

게임 진행 상태는 화면 컴포넌트가 아니라 `hooks/useGameState.ts`에 격리되어 있고, 클리어·게임오버는 상태 전환이 아니라 **별도 라우트로 `router.push`** 하여 처리합니다.

### 게임 상태 훅 (hooks/useGameState.ts)

두 훅 모두 내부 state를 스프레드해서 반환합니다.

```typescript
// 스토리 모드
const {
  currentStageIndex, pin, turnsUsed, hintUsed, isWrong, isComplete, isGameOver, stars,
  currentStage, pinLength, remainingTurns,
  handlePinInput, handlePinDelete, handlePinClear, handleSubmit, handleUseHint, resetGame,
} = useStoryGameState(episode.stages);

// 추리 모드
const {
  currentStageIndex, pin, turnsUsed, revealedClues, isWrong, isComplete, isGameOver,
  currentStage, pinLength, stars, remainingTurns,
  handlePinInput, handlePinDelete, handlePinClear, handleSubmit, resetGame, initializeStage,
} = useDeductionGameState(episode.stages);
```

- 스테이지 이동은 훅 내부(`handleSubmit`)에서 자동 처리됩니다. 외부에 `nextStage`는 없습니다.
- `isComplete`/`isGameOver`가 되면 화면 컴포넌트의 `useEffect`가 결과 라우트로 이동시킵니다.
- `resetGame`은 두 화면 모두에서 구조 분해만 하고 실제로는 호출하지 않습니다(재시작은 라우트 재진입으로 처리).

### 타입 정의 (lib/types.ts)

```typescript
export type LockType = 'pin1' | 'pin2' | 'pin3' | 'pin4' | 'pin5' | 'pin6';

interface StoryStage {
  id: number;
  title: string;
  story: string;           // 스토리 본문 (템플릿 리터럴, 실제 줄바꿈)
  clue: string;            // 단서
  hint: string;            // 힌트 (별 1 소모)
  lockType: LockType;
  answers: string[];       // 복수 정답 허용
  maxTurns: number;
}

interface StoryEpisode {
  id: number;
  title: string;
  subtitle?: string;       // 에피소드 목록 카드에 노출
  synopsis?: string;       // 현재 UI 미노출 (데이터에는 존재)
  previousEpisode?: number;
  difficulty: 1 | 2 | 3;
  mode: 'story';
  stages: StoryStage[];
}

interface DeductionClue { turn: number; text: string; }

interface DeductionStage {
  id: number;
  title: string;
  situation: string;
  lockType: LockType;
  answer: string;          // 단일 정답
  maxTurns: number;
  clues: DeductionClue[];
}

interface GameProgress {
  completedEpisodes: Record<number, { stars: number; completed: boolean }>;
  totalStars: number;      // 타입에는 있으나 현재 어디에서도 읽거나 쓰지 않음
}
```

### 게임 메커니즘

**스토리 모드** (`turnsUsed`는 0에서 시작)
1. `story` + `\n\n🔍 ` + `clue`를 하나의 문자열로 합쳐 타이핑 효과 재생 (탭하면 스킵). 화면에서 `🔍 ` 기준으로 본문/단서 블록을 분리합니다.
2. PIN 입력 후 `stage.answers.includes(pin)`으로 판정.
3. 정답 → 다음 스테이지(턴·힌트 초기화) 또는 에피소드 완료.
4. 오답 → `turnsUsed++`, shake 애니메이션. `turnsUsed >= maxTurns`면 게임오버 (즉 시도 기회 = `maxTurns`회).
5. 힌트 → `hintUsed = true`, `stars`가 1 감소(최소 1). 스테이지가 넘어가면 다시 사용 가능하지만 `stars`는 복구되지 않습니다.
6. 별점은 힌트 사용 여부만 반영하며, 오답 횟수는 별점에 영향을 주지 않습니다.

**추리 모드** (`turnsUsed`는 **1**에서 시작)
1. 상황 설명 + 현재까지 공개된 단서 목록 표시.
2. PIN 입력 후 `pin === stage.answer`로 판정.
3. 정답 → 다음 스테이지(턴 1로 초기화, 해당 스테이지 초기 단서 세팅) 또는 완료.
4. 오답 → `turnsUsed++` 후 **새 `turnsUsed`와 `turn` 값이 같은 단서**를 추가 공개. `turnsUsed > maxTurns`면 게임오버 (시도 기회 = `maxTurns`회).
5. 별점: `turnsUsed <= 2` → 3, `<= 4` → 2, 그 외 1. (훅 내부 `calculateStars`가 계산)

> **단서 공개 순서.** 공개 순서는 `turn` **오름차순**입니다 — `turn: 1`이 시작 시점에 공개되고, 오답할 때마다 2, 3, … 순으로 열립니다. 데이터도 이에 맞춰 **배열 순서 = 공개 순서**로 정렬되어 있습니다(위에서 아래로 포괄적 → 구체적, 마지막 단서는 사실상 정답 확인). 단서를 추가·수정할 때 이 규칙을 유지하세요. `turn`이 `maxTurns`를 넘으면 그 단서는 게임오버 전에 공개되지 않습니다.

### 진행 상황 저장

- localStorage 키: `'story-hacker-progress'` (스토리·추리 모드 공용, 에피소드 ID로 구분)
- 저장 시점: **complete 페이지의 `useEffect`** (`isInitialized` 가드 뒤). 게임플레이 중에는 저장하지 않습니다.
- 기존 기록보다 별점이 높을 때만 갱신됩니다(하향 방지).
- `app/layout.tsx`의 `STORAGE_VERSION` 상수 + 인라인 `<script>`가 하이드레이션 전에 동기 실행되어, 값이 바뀐 클라이언트에서 최초 1회 `localStorage.clear()`를 수행합니다. 데이터 구조나 정답을 대규모로 바꿨을 때 이 값을 올리세요. 버전은 `'story-hacker-version'` 키에 저장됩니다.

## 스타일링 (NOCTURNE)

### 팔레트

색은 **두 곳에 정의**되어 있습니다. `tailwind.config.ts`의 `colors`(유틸리티 클래스용)와 `app/globals.css`의 `:root` CSS 변수입니다. 색을 바꿀 때는 양쪽을 함께 수정하세요.

| 토큰 | 값 | 용도 |
|---|---|---|
| `noct-black` | `#100f0d` | 기본 배경 |
| `noct-black-2` | `#15130f` | 카드·키패드 표면 |
| `noct-page` | `#0a0908` | body 배경 · 추리 모드 표면 |
| `noct-ink` | `#cfc7b8` | 본문 텍스트 |
| `noct-ink-dim` | `#837c6e` | 보조 텍스트 |
| `noct-ink-faint` | `#565045` | 라벨·비활성 |
| `noct-gold` | `#c9a86a` | 강조·별점·확인 버튼 |
| `noct-gold-dim` | `#8f7a4e` | 은은한 강조·보더 |

> 새 색을 추가할 때 한쪽만 정의하면 클래스가 조용히 생성되지 않습니다(`bg-*`가 아무 배경도 칠하지 않음). 반드시 양쪽에 함께 넣으세요. `specs/typing-skip.spec.ts`에 이를 잡는 회귀 테스트가 있습니다.

### 폰트

`globals.css`에서 Google Fonts를 `@import` 합니다.
- `font-display` — Song Myung (타이틀, PIN 숫자)
- `font-serif` — Nanum Myeongjo (본문·단서, body 기본값)
- `font-mono` — Space Mono (대문자 트래킹 라벨)

### 애니메이션

`globals.css`의 `.animate-*` 클래스와 `tailwind.config.ts`의 `animation` 키가 **각각 별도로** 정의되어 있습니다(이름 규칙이 다르니 주의).

| 사용처 | 클래스 | 출처 |
|---|---|---|
| 오답 흔들림 | `animate-shake` | 양쪽 |
| 잔잔한 등장 | `animate-fadeIn` | globals.css |
| 아래에서 떠오름 | `animate-fadeInUp` | globals.css |
| 성공 오버레이 | `animate-scaleIn` | globals.css |
| 단서 공개 | `animate-slideIn` | globals.css |
| 라우트 전환 | `animate-fade-in` | tailwind.config (`template.tsx`) |

`template.tsx`에는 **opacity 전용 애니메이션만** 넣으세요. `transform`을 쓰면 그 div가 `position: fixed` 자식(헤더·키패드 푸터)의 containing block이 되어 레이아웃이 깨집니다.

### 이미지 톤

생성 이미지는 `.noct-img` 필터(`brightness(0.6) sepia(0.16) saturate(0.84) contrast(1.03)`)로 톤을 통일합니다. 잠긴 상태용 `.noct-img-locked`도 정의되어 있으나 현재 미사용입니다.

### 레이아웃

`app/layout.tsx`의 `<main>`이 `max-w-md`(448px)로 모바일 폭을 고정합니다. 게임 화면은 하단 고정 푸터(키패드)와 상단 고정 헤더를 쓰므로, 본문 스크롤 영역에 `pb-*` 여백이 필요합니다.

## 유틸리티 함수 (lib/utils.ts)

```typescript
getDifficultyInfo(difficulty)      // { text: 'EASY'|'NORMAL'|'HARD', color, stars } — 에피소드 목록에서 사용
getPinLength(lockType)             // 'pin4' → 4 — useGameState에서 사용
cn(...classes)                     // 조건부 클래스 결합 — PinDisplay/InputArea에서 사용
getDifficultyStars(difficulty)     // 현재 미사용
calculateDeductionStars(turnsUsed) // 현재 미사용 (useDeductionGameState가 동일 로직을 자체 보유)
```

## 라우팅 구조

```
/                                    홈
├── /mode-select                     스토리 / 추리 선택
├── /story                           에피소드 선택 (난이도 필터)
│   └── /story/[episodeId]           게임 플레이
│       ├── /complete?stars=N        클리어 — 진행도 저장, SNS 공유
│       └── /gameover?stage=N        게임오버 — 해당 스테이지 정답 공개
└── /deduction                       에피소드 선택
    └── /deduction/[episodeId]       게임 플레이
        ├── /complete?stars=N&turns=M
        └── /gameover?stage=N
```

`stage` 쿼리는 스테이지 **인덱스**(0부터)입니다.

## 이미지 파이프라인

에피소드 이미지는 Replicate(FLUX Schnell)로 생성합니다. 자세한 절차는 `REPLICATE.md`를 참고하세요.

```
scripts/lib/replicate.js   # API 호출·폴링·다운로드
scripts/lib/prompt.js      # 공통 스타일 프롬프트
scripts/gen-epN-replicate.js   # 에피소드별 프롬프트 (N=1~20)
scripts/resize-images.js, gen-icons.js, gen-og-image.js
```

- 파일 규칙: 카드 배경 `public/images/story/ep-N.png`(16:9), 스테이지 배경 `public/images/story/N-M.png`(9:16)
- API 키는 `.env.local` (`.env.local.example` 참고)
- 추리 모드는 아직 이미지가 없습니다 — `public/images/deduction/`은 비어 있고 `deductionIllustrations`도 빈 맵입니다. 목록 카드의 `<img>`는 `onError`로 숨겨지고, 게임 화면은 그라데이션으로 폴백합니다.

## 테스트

설정은 `playwright.config.ts`, 테스트 파일은 `specs/`에 둡니다. `npm test`가 개발 서버를 자동으로 띄우고, 모바일 뷰포트(Pixel 7)를 기본 프로젝트로 사용합니다.

```
specs/
├── seed.spec.ts          # MCP generator용 시드 (비어 있음, 지우지 말 것)
└── typing-skip.spec.ts   # 타이핑 스킵 · noct-page 토큰 회귀 테스트
```

Playwright MCP agents도 같은 설정을 사용합니다 (`.mcp.json`의 `playwright-test` 서버).
- **playwright-test-planner**: 테스트 계획 작성 → `specs/`
- **playwright-test-generator**: 테스트 코드 생성
- **playwright-test-healer**: 실패한 테스트 디버깅 및 수정

브라우저가 없다는 오류가 나면 `npx playwright install chromium`을 먼저 실행하세요.

## 콘텐츠 추가 가이드

### 새 스토리 에피소드 추가

1. `data/story/ep-NN.ts` 생성 (NN = 2자리 zero-pad):

```typescript
import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 21,
  title: "에피소드 제목",
  subtitle: "부제 (선택)",
  difficulty: 2,            // 1-3
  mode: "story",
  synopsis: "한 줄 시놉시스 (선택)",
  stages: [
    {
      id: 1,
      title: "스테이지 제목",
      story: `스토리 텍스트...`,   // 템플릿 리터럴 + 실제 줄바꿈
      clue: `단서 텍스트`,
      hint: "힌트 텍스트",          // 답을 직접 주지 말 것 — 방향만 제시
      lockType: "pin4",
      answers: ["1234"],          // 각 정답 길이 = PIN 자릿수와 일치 필수
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;        // as const 불필요

export default episode;
```

2. `data/storyEpisodes.ts` 배럴에 `import`와 배열 등록 추가.
3. 이미지 생성 후 `components/illustrations/StoryIllustrations.tsx`에 `"에피소드ID-스테이지ID"` 키로 매핑 추가.

### 새 추리 에피소드 추가

`data/deductionEpisodes.ts` 배열에 추가합니다 (ID는 101부터, 스토리와 구분).

```typescript
{
  id: 109,
  title: "에피소드 제목",
  difficulty: 2,
  mode: "deduction",
  stages: [
    {
      id: 1,
      title: "스테이지 제목",
      situation: "상황 설명...",
      lockType: "pin4",
      answer: "1234",   // 단일 정답, 길이 = PIN 자릿수
      maxTurns: 6,
      clues: [
        { turn: 1, text: "시작 시점에 공개되는 단서" },
        { turn: 2, text: "1번 틀리면 공개" },
        { turn: 3, text: "2번 틀리면 공개" },
        // turn 오름차순으로 공개됨. maxTurns를 넘는 turn은 공개되지 않음
      ],
    },
  ],
}
```

## 주의사항

- 에피소드 ID: 스토리 1–20, 추리 101–108. 추리 모드 UI는 `episode.id - 100`으로 번호를 표시합니다.
- 스토리 EP.11–20은 "네오 시티의 그림자" 연작 — 정답이 에피소드 간 상호 참조되므로 정답 변경 시 연쇄 영향을 확인하세요.
- 각 `answers` 항목과 `answer`의 길이는 `lockType` 자릿수와 정확히 일치해야 합니다 (불일치 시 제출 자체가 막힘).
- 키패드에는 숫자·지움·확인만 있습니다. PIN은 숫자 전용이며, 한 자리 삭제(`handlePinDelete`)는 훅에 있으나 UI에 연결되어 있지 않습니다.
- `PinDisplay` / `InputArea` / `Header`의 `accentColor` prop은 단일 팔레트 전환 이후 **동작하지 않는 호환용 잔재**입니다.
- `next.config.js`는 사실상 비어 있습니다. `output: 'export'`는 주석 처리된 상태입니다.
- `reference/`, `design-samples/`, `tasks/`는 앱 번들에 포함되지 않는 참고 자료입니다. `tasks/004-features-and-fixes.md`의 효과음 시스템 등은 아직 미구현입니다.
