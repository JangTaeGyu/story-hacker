# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 개발 가이드입니다.

## 프로젝트 개요

Story Hacker는 두 가지 모드를 제공하는 퍼즐-추리 게임입니다:
- **스토리 모드**: 이야기 속 단서로 PIN 코드를 추리 (에피소드 20개)
- **추리 모드**: 논리적 단서로 PIN 코드를 추론, 오답 시 새 단서 공개 (에피소드 8개)

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS로 구축되었습니다. 백엔드·DB 없이 전부 클라이언트 사이드로 동작하며, 진행 상황은 localStorage에만 저장됩니다.

**한국어·영어·일본어 3개 언어**를 지원합니다. 모든 라우트에 언어 접두사가 붙습니다(`/ko/story/1`, `/en/story/1`, `/ja/story/1`).

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
├── layout.tsx                   # 통과 전용 루트 레이아웃 (아래 "다국어" 참고)
├── not-found.tsx                # 전역 404 — 브랜드 404는 여기 하나뿐이다
├── globals.css                  # CSS 변수, 폰트, 애니메이션
├── icon.svg / manifest.ts       # PWA 메타 (매니페스트는 /manifest.webmanifest 로 생성)
├── sitemap.ts / robots.ts       # 색인 대상 · 언어별 hreflang (결과 화면 제외)
└── [locale]/                    # ko · en · ja — 실질적인 루트
    ├── layout.tsx              # <html lang> · 메타데이터 · OG · LocaleProvider
    ├── template.tsx            # 라우트 전환 페이드 (opacity 전용)
    ├── page.tsx                # 홈 (히어로 이미지 + 워드마크)
    ├── error.tsx               # 런타임 오류 화면
    ├── mode-select/page.tsx    # 모드 선택 (스토리/추리)
    ├── story/
    │   ├── page.tsx            # 스토리 에피소드 선택 (난이도 필터)
    │   └── [episodeId]/
    │       ├── page.tsx        # 서버 컴포넌트 — 에피소드 조회 후 GamePlay 렌더
    │       ├── complete/page.tsx   # 에피소드 클리어 (진행도 저장 + SNS 공유)
    │       └── gameover/page.tsx   # 게임오버 (정답 공개)
    └── deduction/               # 추리 모드 (동일 구조 + layout.tsx)

components/
├── screens/                    # 각 라우트의 클라이언트 컴포넌트
│   ├── StoryGamePlay.tsx       # 스토리 모드 게임 화면
│   ├── DeductionGamePlay.tsx   # 추리 모드 게임 화면
│   ├── StoryEpisodeList.tsx    # 스토리 에피소드 선택 (요약만 받음)
│   ├── DeductionEpisodeList.tsx
│   ├── StoryComplete.tsx       # 클리어 화면
│   ├── DeductionComplete.tsx
│   ├── StoryGameOver.tsx       # 게임오버 화면
│   └── DeductionGameOver.tsx
├── ui/
│   ├── Header.tsx              # 고정 헤더 (뒤로가기 / 중앙 / 우측 슬롯)
│   ├── PinDisplay.tsx          # PIN 자릿수 표시 (밑줄 + 숫자)
│   ├── InputArea.tsx           # 숫자 키패드 + 백스페이스/확인
│   ├── ResumePrompt.tsx        # 이어하기 확인 오버레이
│   ├── LockModal.tsx           # PIN 입력 레이어 (단서·힌트 포함)
│   ├── SolvedStamp.tsx         # 사건 종결 도장 직인 (글자 수에 맞춰 크기 조정)
│   ├── HeartsDisplay.tsx       # 남은 시도 — 하트가 아닌 작은 점(dot)
│   └── StageStatus.tsx         # "Turns n/m" + 점 — 모바일·데스크톱 두 자리에 렌더
├── i18n/
│   ├── LocaleProvider.tsx      # 클라이언트 트리에 locale·문자열·href 헬퍼 공급
│   └── LanguageSwitcher.tsx    # KO · EN · JA — 보던 화면의 같은 위치로 이동
├── seo/JsonLd.tsx              # 구조화 데이터 삽입 (서버 전용)
└── illustrations/
    ├── StoryIllustrations.tsx  # "epId-stageId" → PNG 배경 매핑
    └── DeductionIllustrations.tsx  # "epId-stageId" → PNG 배경 매핑

hooks/
├── useGameState.ts             # useStoryGameState, useDeductionGameState
├── useLocalStorage.ts          # SSR-safe 로컬스토리지 훅 (isInitialized 반환)
├── usePinKeyboard.ts           # 물리 키보드로 PIN 입력 (데스크톱)
└── useTypingEffect.ts          # 타이핑 애니메이션 + 스킵

lib/
├── types.ts                    # 모든 TypeScript 타입/인터페이스
├── i18n.ts                     # 지원 언어·기본 언어·경로 헬퍼(localePath/stripLocale)
├── messages/{ko,en,ja}.ts      # UI 문자열 사전 (ko가 Messages 타입의 기준)
├── seo.ts                      # canonical·hreflang·JSON-LD 빌더
├── site.ts                     # 배포 도메인·사이트명 (언어 무관한 값만)
├── progress.ts                 # 진행도 저장소 — useProgress, 이어하기(run) 조회/저장
├── clearToken.ts               # 클리어 증표 발급/소비 (진행도 위조 방지)
└── utils.ts                    # 유틸리티 함수

data/
├── storyEpisodes.ts            # getStoryEpisodes(locale) · findStoryEpisode · storyEpisodeIds
├── deductionEpisodes.ts        # getDeductionEpisodes(locale) · findDeductionEpisode · …Ids
├── story/{ko,en,ja}/           # 언어별 스토리 20편 — ep-01.ts ~ ep-20.ts + index.ts 배럴
└── deduction/{ko,en,ja}.ts     # 언어별 추리 8편 (단일 파일, id 101~108)

scripts/                         # Replicate(FLUX) 이미지 생성 · 아이콘/OG 생성 · 리사이즈
public/images/story/             # ep-N.png(카드 16:9), N-M.png(스테이지 9:16)
public/images/deduction/         # ep-101~108.png(카드), 101-1 …(스테이지)
reference/, design-samples/, tasks/   # 원본 소스·디자인 시안·작업 문서 (앱 코드 아님)
```

### 서버 / 클라이언트 경계

"모든 페이지가 클라이언트 컴포넌트"가 **아닙니다.** 현재 경계는 다음과 같습니다.

**`app/` 아래 page.tsx는 전부 서버 컴포넌트입니다.** 상호작용은 `components/screens/`의 클라이언트 컴포넌트가 맡습니다. 아래 경로는 전부 `app/[locale]/` 기준입니다.

| 페이지 (서버) | 렌더 | 넘기는 것 | 클라이언트 컴포넌트 |
|---|---|---|---|
| `page.tsx`, `mode-select` | ● SSG | — | `LanguageSwitcher`만 |
| `story/page.tsx`, `deduction/page.tsx` | ● SSG | `EpisodeSummary[]` | `*EpisodeList` |
| `*/[episodeId]/page.tsx` | ● SSG | 에피소드 1개 전체 | `*GamePlay` |
| `*/[episodeId]/complete/page.tsx` | ● SSG | id·제목·다음 화 id | `*Complete` |
| `*/[episodeId]/gameover/page.tsx` | ● SSG | id·제목·스테이지 제목 배열 | `*GameOver` |

서버 페이지는 `getMessages(locale)`로 문자열을, `getStoryEpisodes(locale)`로 데이터를 직접 읽습니다. 클라이언트 쪽은 `LocaleProvider`가 `locale` 하나만 받아 사전을 다시 조회합니다 — 사전에 함수형 템플릿이 있어 props로 직렬화할 수 없기 때문입니다.

세 가지 규칙이 있습니다.

1. **클라이언트 컴포넌트에서 `data/`를 직접 import하지 마세요.** 에피소드 배열을 import하면 본문·단서·정답이 통째로 클라이언트 번들에 실립니다(스토리 모드 약 25~30kB). 서버 페이지에서 필요한 필드만 추려 props로 넘기세요. `specs/payload.spec.ts`가 이를 검증합니다.
2. **`useSearchParams`를 쓰는 클라이언트 컴포넌트는 `<Suspense>`로 감싸세요.** 감싸지 않으면 그 라우트 전체가 동적 렌더(ƒ)로 떨어집니다.
3. **`headers()`·`cookies()`를 쓰지 마세요.** 레이아웃이나 페이지에서 한 번만 불러도 그 아래 전부가 동적 렌더로 떨어져 271개 정적 페이지가 사라집니다. 언어는 URL 세그먼트(`params.locale`)에서만 읽습니다.

게임 진행 상태는 화면 컴포넌트가 아니라 `hooks/useGameState.ts`에 격리되어 있고, 클리어·게임오버는 상태 전환이 아니라 **별도 라우트로 `router.push`** 하여 처리합니다.

### 게임 상태 훅 (hooks/useGameState.ts)

두 훅 모두 내부 state를 스프레드해서 반환합니다.

```typescript
// 스토리 모드
const {
  currentStageIndex, pin, turnsUsed, hintUsed, isWrong, isComplete, isGameOver, stars,
  currentStage, pinLength, remainingTurns,
  handlePinInput, handlePinDelete, handlePinClear, handleSubmit, handleUseHint, startFrom,
} = useStoryGameState(episode.stages);

// 추리 모드
const {
  currentStageIndex, pin, turnsUsed, revealedClues, isWrong, isComplete, isGameOver,
  currentStage, pinLength, stars, turnsSpent, remainingTurns,
  handlePinInput, handlePinDelete, handlePinClear, handleSubmit, initializeStage, startFrom,
} = useDeductionGameState(episode.stages);
```

- 스테이지 이동은 훅 내부(`handleSubmit`)에서 자동 처리됩니다. 외부에 `nextStage`는 없습니다.
- `isComplete`/`isGameOver`가 되면 화면 컴포넌트의 `useEffect`가 결과 라우트로 이동시킵니다.
- 재시작은 라우트 재진입으로 처리합니다. 훅에 리셋 액션은 없습니다.

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
  synopsis?: string;       // 목록엔 미노출, generateMetadata의 설명으로 쓰임
  epilogue?: string;       // 마지막 자물쇠를 연 뒤의 이야기 — 완료 화면에 노출
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
}
```

### 게임 메커니즘

**스토리 모드** (`turnsUsed`는 0에서 시작)
1. `story` + `\n\n🔍 ` + `clue`를 하나의 문자열로 합쳐 타이핑 효과 재생 (탭하면 스킵). 타이핑이 끝나야 "PIN 입력" 버튼이 나타납니다.

   > **본문과 단서는 처음부터 통째로 DOM에 있습니다.** 타이핑은 글자를 만들어내는 게 아니라 "어디까지 보이는가"만 정하고, 아직 닿지 않은 뒷부분은 `invisible`(visibility:hidden)로 자리만 차지합니다. **`text-transparent`로 바꾸지 마세요** — 경계가 앞으로 밀릴 때마다 그 span의 rect가 움직여 CLS가 0.01에서 1.0까지 뜁니다(글자는 실제로 안 움직이지만 Layout Instability API가 그렇게 셉니다). visibility:hidden은 시각적 표현이 없어 계산에서 빠집니다. 커서(`Caret`)도 같은 이유로 흐름 밖에 띄웁니다. 예전처럼 `displayedText`(빈 문자열에서 자라나는 값)를 그대로 그리면 **서버 HTML에 본문이 없어** 에피소드 페이지의 크롤 가능한 텍스트가 120자로 떨어집니다 — 사이트에서 검색에 걸릴 글이 있는 곳은 여기뿐입니다. 되돌리지 마세요. `specs/crawlable-content.spec.ts`가 JS를 끄고 검사합니다.
2. PIN 입력 후 `stage.answers.includes(pin)`으로 판정.
3. 정답 → 다음 스테이지(턴·힌트 초기화) 또는 에피소드 완료.
4. 오답 → `turnsUsed++`, shake 애니메이션. `turnsUsed >= maxTurns`면 게임오버 (즉 시도 기회 = `maxTurns`회).
5. 마지막 스테이지를 풀면 완료 화면에서 `epilogue`가 열린다. **본문(`story`)은 항상 "이제 이것만 풀면…"으로 끝나므로, 닫는 이야기는 에필로그에만 있다.** 빠뜨리면 가장 어려운 마지막 문제의 대가가 "사건 해결" 다섯 글자뿐이 된다 (`specs/episode-parity.spec.ts`가 세 언어 모두 검사).
6. 힌트 → `hintUsed = true`, `stars`가 1 감소(최소 1). 스테이지가 넘어가면 다시 사용 가능하지만 `stars`는 복구되지 않습니다.
7. 별점은 힌트 사용 여부만 반영하며, 오답 횟수는 별점에 영향을 주지 않습니다.

**추리 모드** (`turnsUsed`는 **1**에서 시작)
1. 상황 설명 + 현재까지 공개된 단서 목록 표시. **첫 단서(`turn: 1`)는 훅의 초기 상태에서 채웁니다** — effect에서 채우면 서버 HTML에서 빠져 크롤러가 못 봅니다.
2. PIN 입력 후 `pin === stage.answer`로 판정.
3. 정답 → 다음 스테이지(턴 1로 초기화, 해당 스테이지 초기 단서 세팅) 또는 완료.
4. 오답 → `turnsUsed++` 후 **새 `turnsUsed`와 `turn` 값이 같은 단서**를 추가 공개. `turnsUsed > maxTurns`면 게임오버 (시도 기회 = `maxTurns`회).
5. 별점: `turnsUsed <= 2` → 3, `<= 4` → 2, 그 외 1. (`lib/utils.ts`의 `calculateDeductionStars`)
6. 화면의 `Turns` 표시는 두 모드 모두 **사용한 시도 횟수**입니다. 추리 모드의 `turnsUsed`는 1부터 시작하므로 표시에는 `turnsSpent`(= `turnsUsed - 1`)를 쓰세요.

> **단서 공개 순서.** 공개 순서는 `turn` **오름차순**입니다 — `turn: 1`이 시작 시점에 공개되고, 오답할 때마다 2, 3, … 순으로 열립니다. 데이터도 이에 맞춰 **배열 순서 = 공개 순서**로 정렬되어 있습니다(위에서 아래로 포괄적 → 구체적, 마지막 단서는 사실상 정답 확인). 단서를 추가·수정할 때 이 규칙을 유지하세요. `turn`이 `maxTurns`를 넘으면 그 단서는 게임오버 전에 공개되지 않습니다.

### 진행 상황 저장

저장소 접근은 **반드시 `lib/progress.ts`를 거칩니다.** 페이지마다 `GameProgress`를 다시 선언하거나 `useLocalStorage`를 직접 부르지 마세요.

```typescript
const { progress, recordClear, isInitialized, totalStars } = useProgress();
readRun(mode, episodeId) / saveRun(mode, episodeId, { stageIndex, stars }) / clearRun(mode, episodeId)
readAllRuns(mode)   // 에피소드 선택 화면의 "진행 중" 배지용
```

두 종류를 분리해 둡니다.

| 키 | 내용 | 수명 |
|---|---|---|
| `story-hacker-progress` | 에피소드별 최고 기록(별점·완료) | 영구 (하향되지 않음) |
| `story-hacker-run` | 진행 중인 판의 이어하기 지점 | 완료·게임오버 시 삭제 |

**이어하기**: 스테이지를 하나 넘길 때마다 `saveRun`이 호출되어 `{ stageIndex, stars }`가 저장됩니다. 에피소드에 다시 들어오면 `ResumePrompt`가 떠서 "이어서 시작 / 처음부터"를 묻고, 이어서 시작하면 훅의 `startFrom`이 해당 스테이지로 상태를 되돌립니다. **게임오버는 이어하기를 남기지 않습니다** — 처음부터 다시 하는 것이 기존 난이도입니다.

- localStorage 키: `'story-hacker-progress'` (스토리·추리 모드 공용, 에피소드 ID로 구분)
- 저장 시점: **complete 페이지의 `useEffect`** (`isInitialized` 가드 뒤). 게임플레이 중에는 저장하지 않습니다.
- 기존 기록보다 별점이 높을 때만 갱신됩니다(하향 방지).
- **클리어 증표가 있어야 저장됩니다.** 게임 화면이 완료 직전 `issueClearToken(mode, episodeId, stars)`으로 sessionStorage에 1회용 토큰을 넣고, complete 페이지가 `consumeClearToken`으로 소비합니다. 토큰이 없으면(= URL로 직접 진입, 북마크, 뒤로가기 재방문) 화면은 보이되 **기록하지 않습니다.** 저장에 쓰는 별점도 쿼리스트링이 아니라 토큰 값입니다 — `?stars=`는 표시용입니다.
- 완료 화면으로 가는 경로를 새로 만들면 `issueClearToken` 호출을 빠뜨리지 마세요. 빠뜨리면 정상 플레이인데도 기록이 남지 않습니다. `specs/progress-guard.spec.ts`가 양쪽(정상 플레이는 기록, 직접 진입은 미기록)을 검증합니다.
- `app/layout.tsx`의 `STORAGE_VERSION` 상수 + 인라인 `<script>`가 하이드레이션 전에 동기 실행되어, 값이 바뀐 클라이언트에서 최초 1회 `localStorage.clear()`를 수행합니다. 데이터 구조나 정답을 대규모로 바꿨을 때 이 값을 올리세요. 버전은 `'story-hacker-version'` 키에 저장됩니다.

## 다국어 (ko · en · ja)

### 라우팅

**모든 언어에 접두사가 붙습니다** — `/ko/story/1`, `/en/story/1`, `/ja/story/1`. 한국어만 접두사 없이 두면 `/` 아래에 라우트 트리를 두 벌 유지해야 하고 hreflang이 비대칭이 되어 색인 사고가 나기 쉽습니다.

접두사 없는 옛 주소는 `next.config.js`의 **영구 리다이렉트(308)** 가 `/ko/...`로 넘깁니다. 다국어 도입 전에 공유·색인된 링크가 깨지지 않게 하는 유일한 장치이므로 지우지 마세요. 루트 `/`는 `/ko`로 307(임시)입니다 — 나중에 `Accept-Language` 기반 언어 감지를 붙일 여지를 남긴 것입니다.

### 루트 레이아웃이 두 개인 이유

```
app/layout.tsx           children를 그대로 반환 (html 없음)
app/[locale]/layout.tsx  실제 셸 — <html lang>, 메타데이터, LocaleProvider
```

`<html lang>`이 언어를 따라가야 하는데 `app/layout.tsx`는 params를 받지 못합니다. 그래서 셸을 `[locale]` 안으로 내렸습니다.

**그런데도 `app/layout.tsx`를 지우면 안 됩니다.** `app/not-found.tsx`는 루트 레이아웃 없이는 빌드 자체가 실패합니다(`not-found.tsx doesn't have a root layout`). 이 통과 레이아웃이 없으면 브랜드 404가 사라지고 잘못된 URL이 전부 Next 기본 404로 떨어집니다.

또한 **404 화면은 `app/not-found.tsx` 하나뿐입니다.** 루트 레이아웃이 동적 세그먼트 안에 있으면 Next는 `notFound()`를 `app/[locale]/not-found.tsx`로 보내지 못하고 전역 not-found로 떨어뜨립니다. 세그먼트별 not-found를 만들어도 쓰이지 않으니 만들지 마세요.

> **이 파일은 `<html>`과 `<body>`를 직접 그려야 합니다.** 통과 레이아웃 아래에서 셸을 아무도 그리지 않으면 Next가 SSR에서 임의로 끼워 넣는데, 클라이언트가 하이드레이션할 트리에는 없는 요소가 DOM에는 있어 트리가 어긋나고 **React가 전체를 버려 화면이 통째로 빕니다.** 실제로 그렇게 배포된 적이 있습니다 — 원본 HTML에는 문구가 있는데 브라우저에서는 새까만 화면이 나오는 증상입니다.

루트 레이아웃 바깥이라 레이아웃의 스타일·폰트가 오지 않으므로 `globals.css`와 폰트 링크도 이 파일이 직접 겁니다. 언어는 `usePathname()`으로 경로에서 읽습니다.

`app/[locale]/layout.tsx`에는 `dynamicParams = false`가 걸려 있어 `/fr/...` 같은 미등록 언어는 404입니다. 다만 **에피소드 세그먼트에는 `dynamicParams = true`를 다시 열어 두었습니다** — 그러지 않으면 없는 에피소드 id가 라우팅 단계에서 잘려 `notFound()`가 실행되지 않고 Next 기본 404가 뜹니다.

### UI 문자열

`lib/messages/{ko,en,ja}.ts`에 있고 `ko.ts`가 `Messages` 타입의 기준입니다. **`ko.ts`에 키를 추가하면 en·ja가 타입 오류로 즉시 잡힙니다** — 이게 번역 누락을 막는 장치이므로 `Messages`를 느슨하게 만들지 마세요.

- 서버 컴포넌트: `getMessages(locale)`를 직접 호출
- 클라이언트 컴포넌트: `useI18n()` → `{ locale, t, href }`

사전에 함수형 템플릿(`t.share.story(...)` 등)이 있어 서버→클라이언트로 props에 실어 보낼 수 없습니다. 그래서 `LocaleProvider`는 `locale` 문자열만 받고 사전은 클라이언트에서 다시 조회합니다.

**내부 링크는 반드시 `href()`를 거치세요.** `href('/story/1')` → `/en/story/1`. 하드코딩하면 영어판에서 한국어판으로 튕깁니다.

> **NOCTURNE의 대문자 모노 라벨은 번역하지 않습니다.** `Story Mode`, `Access Granted`, `Turns 0 / 3`, `Next Episode` 등은 언어가 아니라 디자인 요소입니다. 세 언어 모두 영문 그대로 둡니다.

### 에피소드 데이터

`data/story/{ko,en,ja}/ep-NN.ts`, `data/deduction/{ko,en,ja}.ts`. 서버 페이지는 `getStoryEpisodes(locale)` / `findStoryEpisode(locale, id)`로 접근합니다.

> **언어판은 글만 다르고 판은 같아야 합니다.** `id` · `difficulty` · `lockType` · `answers`/`answer` · `maxTurns` · 단서 `turn`이 세 언어에서 전부 동일해야 합니다. 진행도·이어하기·클리어 증표가 전부 에피소드 id에 묶여 있고 EP.11–20은 앞 화의 정답을 다음 화의 재료로 쓰기 때문에, 한 언어에서 정답이 어긋나면 언어를 바꾼 순간 기록이 뒤섞이거나 풀 수 없는 스테이지가 생깁니다. `specs/episode-parity.spec.ts`가 이를 전수 검사합니다.

**한글에 묶인 퍼즐은 정답을 바꾸지 말고 장치를 바꾸세요.** EP.13 스테이지 2가 유일한 사례입니다 — 한국어판은 '쉐도우넷'을 뒤집어 초성 ㄴㅇㄷㅅ을 뽑고, 번역판은 `SHADOWNET`을 뒤집은 `TENWODAHS`에서 1·3·5·7번째 글자 T·N·O·A를 뽑습니다. 대응표(T=8, N=0, O=3, A=4)까지 맞춰 **양쪽 모두 8034**가 나옵니다. 나머지 퍼즐은 전부 라틴 알파벳·숫자 기반이라 그대로 번역됩니다.

### 폰트

로드하는 웹폰트는 한국어 기준(Song Myung · Nanum Myeongjo)입니다. 영어는 Nanum Myeongjo에 라틴 글리프가 있어 그대로 쓰이고, **일본어는 시스템 명조로 폴백**합니다(macOS 히라기노 명조 등). 일본어 웹폰트를 추가하면 한글 self-host와 같은 수 MB 비용이 드니, 폴백이 실제로 문제가 된 뒤에 검토하세요.

### 언어를 하나 추가하려면

1. `lib/i18n.ts`의 `locales`와 `localeMeta`에 추가
2. `lib/messages/<code>.ts` 작성 (`Messages` 타입을 만족해야 함) 후 `lib/messages/index.ts`에 등록
3. `data/story/<code>/` 20편 + `data/deduction/<code>.ts` 작성 후 각 배럴에 등록
4. 끝. 사이트맵·hreflang·정적 생성은 `locales`를 읽으므로 자동으로 따라옵니다.

## SEO

`specs/i18n.spec.ts`와 `specs/metadata.spec.ts`가 아래를 고정합니다.

- **모든 페이지가 자기 canonical과 3개 언어 alternate + `x-default`를 냅니다** (`lib/seo.ts`의 `alternatesFor`). 한쪽만 빠지면 검색엔진이 언어판을 중복 문서로 보고 하나만 색인합니다. `x-default`는 기본 언어(한국어)를 가리킵니다.
- **사이트맵은 경로 하나당 언어 수만큼 항목을 냅니다.** 각 항목이 `alternates.languages`로 나머지 언어판을 가리킵니다 — hreflang은 상호 참조되어야 합니다.
- **구조화 데이터(JSON-LD).** 홈에 `WebSite` + `VideoGame` 그래프, 목록에 `CollectionPage` + `ItemList`, 에피소드에 `VideoGame` + `BreadcrumbList`. 삽입은 `components/seo/JsonLd.tsx`.
- **결과 화면은 `robots: { index: false }`** 입니다. robots.txt로도 막지만, 외부에서 링크되는 경우까지 덮으려면 메타가 필요합니다.
- **각 페이지에 h1이 하나 있습니다.** 목록 화면의 제목이 h1, 에피소드 카드가 h2입니다. 예전에는 목록에 h1이 없어 검색엔진이 페이지 주제를 잡을 근거가 없었습니다.
- **본문이 서버 HTML에 실려야 합니다.** 색인될 만한 글은 에피소드 페이지에만 있는데, 클라이언트에서 글자를 만들어내는 연출(타이핑)이나 effect에서 채우는 상태(추리 모드 첫 단서)를 쓰면 크롤러에게는 빈 페이지가 됩니다. 위 "게임 메커니즘"의 두 경고를 보세요.
- **소유권 확인 토큰은 `lib/site.ts`에 있습니다.** 구글은 값이 들어 있고, 네이버(`NAVER_SITE_VERIFICATION`)는 빈 문자열이라 태그가 나가지 않습니다 — 서치어드바이저에서 받은 값을 넣으면 그때부터 렌더됩니다. **확인이 끝난 뒤에도 지우지 마세요.** 태그가 사라지면 소유권을 잃습니다.
- 배포 도메인은 여전히 `lib/site.ts`의 `SITE_URL` 한 곳입니다.

### 성능 (실측)

빈 캐시·모바일(Pixel 7) 기준으로 잰 값입니다. 손댈 곳이 있다고 넘겨짚기 전에 먼저 재세요.

| | 목록 `/ko/story` | 에피소드 `/ko/story/1` |
|---|---|---|
| FCP | 568ms | 484ms |
| LCP | 636ms | 484ms |
| CLS | 0 | 0.011 |

- **이미지는 이미 최적화되어 있습니다.** `next/image`가 WebP로 변환해 1.6~5.8KB로 내보냅니다. `public/images/story/ep-1.png`의 456KB는 원본일 뿐 브라우저에 전달되지 않습니다 — 이 숫자를 보고 최적화가 필요하다고 판단하지 마세요.
- 콜드 로드에 폰트 파일 20~23개(약 250~300KB)를 받습니다. 한글 웹폰트가 유니코드 범위별로 쪼개져 있어서인데, 필요한 서브셋만 받는 구조라 이미 효율적인 쪽입니다. `display=swap`이라 텍스트는 폴백으로 즉시 그려집니다.

## 스타일링 (NOCTURNE)

### 팔레트

색은 **두 곳에 정의**되어 있습니다. `tailwind.config.ts`의 `colors`(유틸리티 클래스용)와 `app/globals.css`의 `:root` CSS 변수입니다. 색을 바꿀 때는 양쪽을 함께 수정하세요.

| 토큰 | 값 | 용도 |
|---|---|---|
| `noct-black` | `#100f0d` | 기본 배경 |
| `noct-black-2` | `#15130f` | 카드·키패드 표면 |
| `noct-page` | `#0a0908` | body 배경 · 추리 모드 표면 |
| `noct-ink` | `#cfc7b8` | 본문 텍스트 |
| `noct-ink-dim` | `#a49f93` | 보조 텍스트 |
| `noct-ink-faint` | `#867c6b` | 라벨·비활성 |
| `noct-gold` | `#c9a86a` | 강조·별점·확인 버튼 |
| `noct-gold-dim` | `#907b4e` | 은은한 강조·보더 |

> 새 색을 추가할 때 한쪽만 정의하면 클래스가 조용히 생성되지 않습니다(`bg-*`가 아무 배경도 칠하지 않음). 반드시 양쪽에 함께 넣으세요. `specs/typing-skip.spec.ts`에 이를 잡는 회귀 테스트가 있습니다.

### 폰트

- `font-display` — Song Myung (타이틀, PIN 숫자)
- `font-serif` — Nanum Myeongjo (본문·단서, body 기본값)
- `font-mono` — Space Mono (대문자 트래킹 라벨)

`app/[locale]/layout.tsx`의 `<head>`에서 preconnect 2개 + Google Fonts `<link>`로 불러옵니다. `globals.css`에서 `@import` 하면 CSS를 받아 파싱한 뒤에야 폰트 CSS를 요청하게 되어 한 단계 더 직렬화되므로 그렇게 하지 마세요.

**`next/font`는 쓰지 않습니다.** `Song_Myung`은 `korean` 서브셋을 아예 지원하지 않고(타입 오류), 한글 폰트를 self-host하면 유니코드 범위별로 쪼개진 파일이 370개·5.2MB까지 늘어납니다. 이 결정을 되돌리려면 먼저 그 비용부터 확인하세요.

로드하는 폰트는 한국어 기준입니다. 영어는 Nanum Myeongjo의 라틴 글리프를 쓰고, **일본어는 시스템 명조로 폴백**합니다 — 자세한 내용은 위 "다국어 › 폰트"를 보세요.

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

생성 이미지는 `.noct-img` 필터(`brightness(0.6) sepia(0.16) saturate(0.84) contrast(1.03)`)로 톤을 통일합니다. 

### 레이아웃 (모바일 우선 + 데스크톱 확장)

**`app/layout.tsx`의 `<main>`은 폭을 캡하지 않습니다.** 폭은 각 화면이 직접 정합니다. **새 화면을 만들면 `mx-auto max-w-md`를 직접 넣으세요.** 빠뜨리면 모바일에서 전체 폭으로 퍼집니다.

고정 헤더(`Header`)는 `width` prop으로 본문 폭을 따라갑니다. **한쪽만 바꾸면 데스크톱에서 헤더와 본문의 좌측이 어긋납니다.**

| | 모바일 | ≥`lg`(1024px) | Header |
|---|---|---|---|
| 목록 · 홈 · 모드선택 | `max-w-md` | `max-w-6xl` | `width="wide"` (기본) |
| 게임 화면 | `max-w-md` | `max-w-2xl` (읽기 폭) | `width="narrow"` |
| 결과 · 오류 · 이어하기 | `max-w-xs` | `lg:max-w-sm` | — |

목록은 데스크톱에서 그리드로 펼칩니다(스토리 2→3열, 추리 2열). `space-y-*`와 함께 쓰므로 `lg:space-y-0`을 빠뜨리지 마세요.

### PIN 입력 레이어 (`components/ui/LockModal.tsx`)

**입력은 모바일·데스크톱 모두 레이어(모달)로 뜹니다.** 하단 고정 키패드도, 데스크톱 2단 그리드도 없습니다 — 본문이 화면을 온전히 쓰고, 입력은 별도의 행동이 됩니다.

- 진입 버튼은 **글이 다 노출된 뒤에야** 나타납니다(`useTypingEffect`의 `isComplete`). 탭해서 스킵하면 즉시 나타납니다. 추리 모드는 타이핑이 없어 항상 보입니다.
- **레이어는 본문을 덮으므로 단서를 함께 담습니다.** 스토리는 `stage.clue`와 힌트를, 추리는 공개된 단서 목록을 넣습니다. 이걸 빼면 자릿수를 누르다 단서를 보려고 여닫기를 반복하게 됩니다.
- 숫자 키를 누르면 닫혀 있던 레이어가 열립니다(`usePinKeyboard`의 `onActivate`).
- **`Escape`는 "전체 지움"이 아니라 "레이어 닫기"입니다.** 다이얼로그 관례를 따릅니다. 훅의 `onEscape`로 넘기며, 지정하지 않으면 종전대로 `onClear`가 됩니다. 전체 삭제는 키패드 위 "전체 지움" 버튼입니다.
- 키보드 처리는 `usePinKeyboard` 한 곳에만 둡니다. `LockModal`이 `Escape`를 따로 듣지 않는 이유입니다 — 두 곳에서 들으면 같은 키에 두 동작이 걸립니다.

**`main` 랜드마크는 `app/layout.tsx`에 하나만 둡니다.** 게임 화면의 본문은 `<div>`입니다 — 중첩되면 스크린리더가 본문을 두 개로 읽습니다.

턴 상태 한 줄은 `components/ui/StageStatus.tsx`로 분리해 히어로 위와 레이어 안에 각각 렌더합니다.

## 접근성

`specs/a11y.spec.ts`가 아래 항목을 고정합니다. 되돌리지 마세요.

- **핀치 줌을 막지 않습니다.** `viewport`에 `maximumScale`/`userScalable`을 넣으면 WCAG 1.4.4 위반입니다. 본문이 15px 명조라 확대가 필요한 사용자가 있습니다.
- **`prefers-reduced-motion: reduce`를 존중합니다.** `globals.css`의 미디어 쿼리가 모든 애니메이션·트랜지션을 무력화하고, `useTypingEffect`는 타이머 기반이라 훅 안에서 따로 판별해 전문을 즉시 보여줍니다. **CSS가 아닌 모션을 새로 만들면 훅처럼 직접 처리해야 합니다.**
- **키보드 포커스가 보입니다.** `globals.css`의 `:where(a, button, [tabindex]):focus-visible`이 골드 아웃라인을 그립니다. `:where()`로 특이도가 0이라 컴포넌트 스타일을 덮지 않습니다.
- **오버레이는 다이얼로그로 노출합니다.** `ResumePrompt`는 `role="dialog"` + `aria-modal` + `aria-labelledby`를 갖고, 열릴 때 기본 동작에 포커스를 줍니다.
- **오답·성공 안내는 `role="status"`** 로 스크린리더에 전달됩니다.

- **색 대비.** 전경 토큰 5개가 배경 3종 위에서 모두 AA 본문 기준(4.5:1)을 넘습니다. `specs/contrast.spec.ts`가 CSS 변수를 읽어 15개 조합을 전수 검사합니다.

> **팔레트 값을 낮추지 마세요.** 잉크 3단계는 대비를 지키면서 서로 구분되도록 다시 잡은 눈금입니다(`noct-black-2` 기준 11.06 / 7.03 / 4.51). 특히 `noct-ink-faint`는 10px 라벨("미해결", "Turns 0/3", "Story Mode" 등)에 쓰여서, 여기서 한 단계만 어두워져도 그 라벨들이 읽히지 않습니다.

## 유틸리티 함수 (lib/utils.ts)

```typescript
getDifficultyInfo(difficulty)      // { text: 'EASY'|'NORMAL'|'HARD', color, stars } — 에피소드 목록에서 사용
getPinLength(lockType)             // 'pin4' → 4 — useGameState에서 사용
cn(...classes)                     // 조건부 클래스 결합 — PinDisplay/InputArea에서 사용
calculateDeductionStars(turnsUsed) // 추리 모드 별점 — useDeductionGameState가 사용
```

## 라우팅 구조

`{locale}`은 `ko` · `en` · `ja` 중 하나입니다.

```
/                                          → /ko (307)
/{locale}                                  홈
├── /{locale}/mode-select                  스토리 / 추리 선택
├── /{locale}/story                        에피소드 선택 (난이도 필터)
│   └── /{locale}/story/[episodeId]        게임 플레이
│       ├── /complete?stars=N              클리어 — 진행도 저장, SNS 공유
│       └── /gameover?stage=N              게임오버 — 해당 스테이지 정답 공개
└── /{locale}/deduction                    에피소드 선택
    └── /{locale}/deduction/[episodeId]    게임 플레이
        ├── /complete?stars=N&turns=M
        └── /gameover?stage=N

/story/*, /deduction/*, /mode-select       → /ko/... (308, 옛 주소 호환)
```

`stage` 쿼리는 스테이지 **인덱스**(0부터)입니다.
빌드 시 271개 페이지가 전부 정적 생성됩니다(3개 언어 × 라우트).

## 이미지 파이프라인

에피소드 이미지는 Replicate(FLUX Schnell)로 생성합니다. 자세한 절차는 `REPLICATE.md`를 참고하세요.

```
scripts/lib/replicate.js   # API 호출·폴링·다운로드
scripts/lib/prompt.js      # 공통 스타일 프롬프트
scripts/gen-epN-replicate.js       # 스토리 에피소드별 프롬프트 (N=1~20)
scripts/gen-deduction-replicate.js # 추리 8편 전체 (--only=101로 부분 재생성)
scripts/resize-images.js, gen-icons.js, gen-og-image.js
```

- 파일 규칙: 카드 배경 `public/images/story/ep-N.png`(16:9), 스테이지 배경 `public/images/story/N-M.png`(9:16)
- API 키는 `.env.local` (`.env.local.example` 참고)
- 프롬프트에 `glowing`·`neon` 같은 표현을 쓰면 발광하는 추상 화면이 나와 기존 이미지와 톤이 어긋납니다. **어둡게 조명된 실제 장면**으로 묘사하세요(단일 광원, 깊은 그림자). 공통 스타일 접미사가 색 그레이딩을 담당합니다.

## 테스트

설정은 `playwright.config.ts`, 테스트 파일은 `specs/`에 둡니다. `npm test`가 개발 서버를 자동으로 띄우고, 모바일 뷰포트(Pixel 7)를 기본 프로젝트로 사용합니다.

```
specs/
├── helpers.ts             # 하이드레이션 대기, PIN 자리수 카운트
├── seed.spec.ts           # MCP generator용 시드 (비어 있음, 지우지 말 것)
├── typing-skip.spec.ts    # 타이핑 스킵 · noct-page 토큰
├── pin-input.spec.ts      # 키패드 삭제 · 물리 키보드 · 입력 레이어 여닫기
├── progress-guard.spec.ts # 클리어 증표 기반 진행도 기록 가드
├── payload.spec.ts        # 에피소드 데이터가 클라이언트로 새지 않는지
├── a11y.spec.ts           # 줌 허용 · 모션 감소 · 포커스 표시 · 다이얼로그
├── contrast.spec.ts       # 팔레트 명암비 AA 기준
├── metadata.spec.ts       # 에피소드별 OG · robots · sitemap · 404
├── resume.spec.ts         # 이어하기 · 게임오버 정답 비노출
├── responsive.spec.ts     # 데스크톱 단일 컬럼 · 레이어 · 목록 그리드 · 가로 스크롤
├── i18n.spec.ts           # 언어 라우팅 · 옛 주소 리다이렉트 · hreflang · JSON-LD
├── crawlable-content.spec.ts # JS 없이도 본문·단서가 HTML에 있는지 (SEO 핵심)
└── episode-parity.spec.ts # 세 언어의 정답·구조 일치 (브라우저를 쓰지 않는 데이터 검사)
```

스펙의 경로에는 **언어 접두사를 직접 붙이세요**(`page.goto('/ko/story/1')`). 리다이렉트에 기대면 무엇을 테스트하는지 흐려집니다 — 리다이렉트 자체는 `i18n.spec.ts`가 따로 검증합니다.

프로젝트가 둘입니다. `chromium`(Pixel 7)이 `responsive.spec.ts`를 제외한 전부를, `desktop`(1440×900)이 `responsive.spec.ts`만 돌립니다. **모바일 스펙이 기존 동작을 고정해주므로 `lg:` 레이어는 추가분이고 회귀 위험이 낮습니다.** 반대로 데스크톱은 `responsive.spec.ts`가 유일한 방어선이라, 2단 구조를 건드리면 여기부터 확인하세요.

> **이 스펙들은 `npm run dev`를 상대로 돕니다.** 그래서 프로덕션 빌드에서만 드러나는 문제(특히 하이드레이션 불일치)는 통과해버릴 수 있습니다. 위 404 화면이 실제 사례입니다 — dev에서는 멀쩡히 렌더돼 테스트가 통과했지만 배포된 프로덕션 빌드에서는 빈 화면이었습니다. **레이아웃·셸 구조를 건드렸다면 `npm run build && npm start`로 한 번 직접 열어보세요.**

`npm run build` 직후 `npm test`를 돌리면 `.next`가 프로덕션 산출물로 덮여 있어 dev 서버가 라우트를 전부 다시 컴파일합니다. 워커 여러 개가 동시에 서로 다른 라우트를 요청하면 기본 5초 타임아웃으로는 부족해서 대량 실패가 납니다 — `playwright.config.ts`에서 `timeout`/`expect.timeout`을 늘려둔 이유입니다. 줄이지 마세요.

키보드로 입력하는 테스트는 **하이드레이션 이후**에 눌러야 합니다(`waitForStoryReady` — 본문에 글자가 찍혔는지로 판별). 그 전에 누른 키는 리스너가 붙기 전이라 사라집니다. 키패드를 클릭해야 하면 `openLock(page)`로 타이핑을 스킵하고 레이어를 여세요 — 그냥 기다리면 스테이지마다 5초씩 걸립니다. PIN 자리수는 키패드 숫자 버튼과 섞이지 않도록 `[data-testid="pin-display"]` 안에서만 셉니다.

Playwright MCP agents도 같은 설정을 사용합니다 (`.mcp.json`의 `playwright-test` 서버).
- **playwright-test-planner**: 테스트 계획 작성 → `specs/`
- **playwright-test-generator**: 테스트 코드 생성
- **playwright-test-healer**: 실패한 테스트 디버깅 및 수정

브라우저가 없다는 오류가 나면 `npx playwright install chromium`을 먼저 실행하세요.

## 콘텐츠 추가 가이드

### 난이도 기준

`difficulty`는 감이 아니라 아래 점수로 정합니다. 스테이지마다 "정답에 닿기까지 필요한 생각의 단계"를 세고, 에피소드 점수는 그 평균입니다.

| 항목 | 점수 |
|---|---|
| 변환·연산 1회당 | +1 (그대로 옮겨 적기는 0) |
| 외부 지식 필요 (폴더폰 자판, 광복절, 알파벳 순서, 피보나치, 최소공배수 …) | +1 |
| 앞선 스테이지·에피소드의 정답을 재료로 사용 | +1 |
| 자릿수 맞추기(제로패딩)가 필요 | +1 |

스토리 20편을 이 점수로 줄 세워 **EASY 7 · NORMAL 7 · HARD 6** 으로 배분되어 있습니다(대략 2.0 미만 / 2.0–2.9 / 3.0 이상). 새 에피소드는 같은 방식으로 점수를 내서 끼워 넣으세요.

> 추리 모드는 단서가 마지막에 사실상 정답을 알려주는 구조라 난이도 상한이 낮습니다. 순수 논리(101, 105)가 EASY, 외부 지식이 많이 필요한 쪽(107, 108)이 HARD로 이미 정렬되어 있어 같은 점수표를 적용하지 않습니다.

### 퍼즐 유형 분포

유형이 한쪽으로 쏠리지 않게 확인하세요. 현재 스토리 75개 스테이지 기준으로 **알파벳→숫자 변환 9개, 날짜→PIN 변환 9개**가 가장 많습니다. 같은 메커니즘을 세 번 이상 쓰지 말고, 쓸 거라면 서사적 이유(인물 이름·조직명이 열쇠인 경우)가 있어야 합니다.

이미 쓰인 메커니즘: 자판 매핑 · 자릿수 역순 · 날짜 변환 · 사칙연산 · 제로패딩 · 알파벳 순번(합/이어붙이기/필터) · 수열 · 최소공배수 · 제곱근 · 나머지 · 절댓값 · 로마 숫자 · 크기순 정렬 · 비트열(상태→0/1) · 소수 판별 · 피보나치 · 초성 매핑

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
  epilogue: `마지막 자물쇠를 연 뒤의 이야기.`,   // 필수 — 없으면 결말이 사라진다
} satisfies StoryEpisode;        // as const 불필요

export default episode;
```

   경로는 `data/story/ko/ep-NN.ts`입니다. **같은 파일을 `en/`·`ja/`에도 만들어야 합니다** — 글만 번역하고 `id`·`lockType`·`answers`·`maxTurns`는 그대로 둡니다(`specs/episode-parity.spec.ts`가 검사).
2. `data/story/{ko,en,ja}/index.ts` 배럴 **세 개 모두**에 `import`와 배열 등록 추가.
3. 이미지 생성 후 `components/illustrations/StoryIllustrations.tsx`에 `"에피소드ID-스테이지ID"` 키로 매핑 추가 (이미지는 언어 공용).

### 새 추리 에피소드 추가

`data/deduction/{ko,en,ja}.ts` **세 파일 모두**의 배열에 추가합니다 (ID는 101부터, 스토리와 구분). 정답·단서 `turn`은 세 언어가 같아야 합니다.

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
- PIN은 숫자 전용입니다. 키패드는 숫자 · 한 자리 삭제(⌫) · 확인으로 구성되고, 전체 삭제는 키패드 위 "전체 지움" 텍스트 버튼입니다(입력이 없으면 숨김). 물리 키보드는 `usePinKeyboard`가 처리합니다 — 숫자 입력, `Backspace` 한 자리 삭제, `Escape` 전체 삭제, `Enter` 제출.
- 키패드는 `LockModal` 안에 있고 레이어는 `max-w-sm`입니다. 키패드에 행을 추가하면 모바일 세로 높이를 확인하세요 — 레이어가 뷰포트를 넘으면 내부 스크롤이 생깁니다.
- 내부 링크는 `useI18n()`의 `href()` 또는 `localePath(locale, path)`를 거칩니다. 하드코딩하면 영어·일본어판에서 한국어판으로 튕깁니다.
- 새 화면에 사용자에게 읽히는 문장을 넣을 때는 `lib/messages/ko.ts`에 키를 먼저 만드세요. en·ja를 빠뜨리면 타입 오류가 납니다.
- 배포 도메인은 `lib/site.ts`의 `SITE_URL` 한 곳에만 둡니다. 루트 메타데이터·에피소드별 OG·사이트맵·SNS 공유 버튼이 모두 이 값을 씁니다 — 하드코딩하면 한쪽만 낡아 어긋납니다(실제로 `layout.tsx`가 옛 vercel.app 주소로 남아 있었습니다).
- 에피소드 페이지는 `generateMetadata`로 제목·설명·OG 이미지를 따로 냅니다. 스토리는 `synopsis`를 설명으로, `ep-{id}.png`(1344×768)를 OG 이미지로 씁니다. 루트 레이아웃의 `title.template`이 뒤에 사이트명을 붙입니다.
- `next.config.js`는 사실상 비어 있습니다. `output: 'export'`는 주석 처리된 상태입니다.
- `reference/`, `design-samples/`, `tasks/`는 앱 번들에 포함되지 않는 참고 자료입니다. **현재 상태의 기준은 이 문서(CLAUDE.md)이고, `tasks/`는 "그때 무엇을 하려 했는가"의 기록입니다.** `tasks/README.md`에 문서별 상태(완료·폐기·진행 중)가 정리되어 있으며, 살아 있는 백로그는 `tasks/004-features-and-fixes.md` 하나뿐입니다. 001·003은 구 디자인 기준이라 그대로 따르면 안 됩니다.
