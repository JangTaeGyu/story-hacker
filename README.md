# Story Hacker

어둠 속 단서를 읽고, 잠긴 비밀번호를 풀어내는 추리 미스터리 퍼즐 게임

## 게임 소개

Story Hacker는 이야기 속 단서 또는 논리적 추론을 통해 PIN 코드를 해독하는 웹 게임입니다. **NOCTURNE** — 검정과 빛바랜 금색, 명조 활자로 구성된 문학 미스터리 톤의 모바일 우선 디자인을 사용합니다.

서버나 데이터베이스 없이 전부 클라이언트 사이드로 동작하며, 진행 상황은 브라우저 localStorage에 저장됩니다.

## 게임 모드

### 스토리 모드 — 에피소드 20개

이야기 속에 흩어진 단서를 읽어 숨겨진 PIN 코드를 추리합니다.

- **스토리 기반**: 에피소드마다 일러스트와 함께 사건이 전개
- **타이핑 효과**: 본문과 단서가 타자 효과로 표시 (화면을 탭하면 스킵)
- **힌트 시스템**: 스테이지마다 힌트 1회 사용 가능 (별점 1점 소모)
- **다중 정답**: 표기 방식이 여러 가지인 퍼즐은 복수 정답을 허용
- **시도 제한**: 스테이지별 시도 횟수를 모두 소진하면 게임오버

### 추리 모드 — 에피소드 8개

주어진 상황과 논리적 단서만으로 PIN 코드를 추론합니다.

- **순수 논리**: 스토리 없이 숫자의 위치·크기·관계만으로 추론
- **점진적 단서**: 틀릴 때마다 새로운 단서가 공개
- **속도 보상**: 적은 시도로 맞출수록 높은 별점

## 게임플레이

1. 모드 선택 (스토리 / 추리)
2. 에피소드 선택 — 난이도 필터(ALL / EASY / NORMAL / HARD) 제공
3. 단서를 읽고 하단 키패드로 PIN 입력 (스테이지마다 1~6자리, 4자리가 가장 많음)
4. 정답이면 다음 스테이지로, 모든 스테이지를 클리어하면 에피소드 완료
5. 오답이면 남은 시도가 줄어듭니다 — 추리 모드에서는 동시에 새 단서가 열립니다
6. 완료 시 별점이 기록되고(기존 기록보다 높을 때만 갱신) SNS 공유가 가능합니다

### 별점 시스템

**스토리 모드** — 기본 3점, 힌트를 사용하면 1점 감소 (최소 1점). 오답 횟수는 별점에 영향을 주지 않습니다.

**추리 모드** — 정답까지 걸린 턴 기준
- 2턴 이내: ★★★
- 4턴 이내: ★★
- 그 외: ★

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 14.2 | React 프레임워크 (App Router) |
| React | 18.2 | UI 라이브러리 |
| TypeScript | 5.3 | 타입 안전성 |
| Tailwind CSS | 3.4 | 유틸리티 기반 스타일링 |
| Vercel Analytics | 1.6 | 방문 분석 |
| sharp | 0.34 | 이미지 리사이즈 (스크립트) |

## 시작하기

### 요구사항

- Node.js 18.0 이상
- npm

### 설치

```bash
git clone https://github.com/your-username/story-hacker.git
cd story-hacker
npm install
npm run dev
```

http://localhost:3000 에서 플레이할 수 있습니다.

### 스크립트

```bash
npm run dev     # 개발 서버 실행 (localhost:3000)
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버 실행
npm run lint    # ESLint 코드 검사
npm test        # Playwright E2E 실행 (개발 서버 자동 기동)
npm run test:ui # Playwright UI 모드
```

## 프로젝트 구조

```
story-hacker/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (메타데이터, 스토리지 버전 스크립트)
│   ├── template.tsx             # 라우트 전환 페이드
│   ├── page.tsx                 # 홈
│   ├── globals.css              # CSS 변수, 폰트, 애니메이션
│   ├── mode-select/             # 모드 선택
│   ├── story/                   # 스토리 모드
│   │   ├── page.tsx            # 에피소드 선택
│   │   └── [episodeId]/        # 게임 플레이 + complete / gameover
│   └── deduction/               # 추리 모드 (구조 동일)
│
├── components/
│   ├── screens/                 # StoryGamePlay / DeductionGamePlay
│   ├── ui/                      # Header, PinDisplay, InputArea, HeartsDisplay, SolvedStamp
│   └── illustrations/           # 에피소드-스테이지별 배경 이미지 매핑
│
├── hooks/                       # useGameState, useLocalStorage, useTypingEffect
├── lib/                         # types.ts, utils.ts
├── data/
│   ├── story/ep-01.ts ~ ep-20.ts    # 스토리 에피소드 (1파일 1에피소드)
│   ├── storyEpisodes.ts             # 위 파일들을 모으는 배럴
│   └── deductionEpisodes.ts         # 추리 에피소드 8개
│
├── scripts/                     # Replicate 이미지 생성, 아이콘/OG 생성, 리사이즈
├── public/images/story/         # 에피소드 카드 · 스테이지 배경 PNG
└── specs/                       # E2E 테스트 계획
```

게임 플레이 라우트(`app/*/[episodeId]/page.tsx`)는 서버 컴포넌트이며, 실제 상태와 상호작용은 `components/screens/*GamePlay.tsx`(클라이언트)에서 처리합니다.

## 디자인 시스템

### 컬러 팔레트 (NOCTURNE)

| 토큰 | 코드 | 용도 |
|------|------|------|
| `noct-black` | `#100f0d` | 기본 배경 |
| `noct-black-2` | `#15130f` | 카드·키패드 표면 |
| `noct-page` | `#0a0908` | body 배경 |
| `noct-ink` | `#cfc7b8` | 본문 텍스트 |
| `noct-ink-dim` | `#837c6e` | 보조 텍스트 |
| `noct-ink-faint` | `#565045` | 라벨·비활성 |
| `noct-gold` | `#c9a86a` | 강조·별점 |
| `noct-gold-dim` | `#8f7a4e` | 은은한 강조·보더 |

### 타이포그래피

- **Song Myung** — 타이틀, PIN 숫자
- **Nanum Myeongjo** — 본문·단서 (기본 서체)
- **Space Mono** — 대문자 트래킹 라벨

### 모션

절제된 페이드 위주로 구성되어 있습니다.

- **FadeIn / FadeInUp** — 화면·스테이지 등장
- **Shake** — 오답 피드백
- **ScaleIn** — 잠금 해제 오버레이
- **SlideIn** — 새 단서 공개
- **Typing** — 스토리 텍스트 타이핑

생성 이미지는 `.noct-img` 필터(어둡게 + 세피아)로 톤을 통일합니다.

## 콘텐츠

### 스토리 모드

EP.11~20은 "네오 시티의 그림자" 연작으로, 정답이 에피소드 간 상호 참조됩니다.

| # | 제목 | 부제 | 난이도 | 스테이지 |
|---|------|------|--------|----------|
| 1 | 수상한 이웃 | 어느 새벽의 미행 | ★ | 4 |
| 2 | 사라진 보물 | 할아버지가 남긴 마지막 수수께끼 | ★ | 2 |
| 3 | 학교의 미스터리 | 방과 후 교무실의 불빛 | ★ | 3 |
| 4 | 탐정 사무소 | 사라진 의뢰인 | ★★ | 4 |
| 5 | 게이머의 비밀 | 로그아웃하지 않은 친구 | ★★ | 4 |
| 6 | 카페 미스터리 | 마감 후의 카페 | ★★ | 3 |
| 7 | 병원 탈출 | 703호의 빈 침대 | ★★★ | 4 |
| 8 | 우주 정거장 | 여섯 명의 침묵 | ★★★ | 4 |
| 9 | 마법사의 탑 | 스승의 마지막 봉인 | ★★ | 4 |
| 10 | 타임캡슐 | 10년 전의 우리에게 | ★ | 3 |
| 11 | 첫 번째 임무 | Chapter 1: 해커의 탄생 | ★ | 3 |
| 12 | 기업 정찰 | Chapter 2: 첫 번째 타겟 | ★ | 4 |
| 13 | 추적자 | Chapter 3: 그림자의 발자국 | ★ | 3 |
| 14 | 내부자 | Chapter 4: 이중 스파이 | ★★ | 4 |
| 15 | 옴니코프의 심장 | Chapter 5: 본사 침투 | ★★ | 5 |
| 16 | 진실의 무게 | Chapter 6: 배신의 연쇄 | ★★ | 4 |
| 17 | 저항군 | Chapter 7: 연합의 시작 | ★★★ | 4 |
| 18 | 삼중 공격 | Chapter 8: 동시 침투 | ★★★ | 5 |
| 19 | 팬텀의 역습 | Chapter 9: 최후의 대결 | ★★★ | 4 |
| 20 | 새로운 여명 | Epilogue: 피닉스의 비상 | ★★★ | 4 |

### 추리 모드

내부 에피소드 ID는 101부터 시작하며, 화면에는 EP.1~8로 표시됩니다.

| # | 제목 | 난이도 | 스테이지 |
|---|------|--------|----------|
| 1 | 숫자 추리 | ★ | 3 |
| 2 | 논리 퍼즐 | ★★ | 3 |
| 3 | 수학 챌린지 | ★★ | 3 |
| 4 | 시간 퍼즐 | ★★ | 3 |
| 5 | 색깔 코드 | ★ | 2 |
| 6 | 음악 퍼즐 | ★★ | 2 |
| 7 | 지리 퀴즈 | ★★★ | 2 |
| 8 | 과학 상식 | ★★★ | 3 |

## 에피소드 이미지 생성

에피소드 이미지는 Replicate(FLUX Schnell)로 생성합니다. 자세한 절차는 [REPLICATE.md](./REPLICATE.md)를 참고하세요.

```bash
cp .env.local.example .env.local   # REPLICATE_API_TOKEN 설정

# 스크립트는 .env.local을 자동으로 읽지 않으므로 환경변수를 내보낸 뒤 실행
source <(grep REPLICATE_API_TOKEN .env.local | sed 's/^/export /')
node scripts/gen-ep1-replicate.js  # 에피소드별 이미지 생성
node scripts/resize-images.js      # public/images/story/original → 가로 420px 리사이즈
```

추리 모드는 아직 전용 이미지가 없으며, 이미지가 없을 때는 그라데이션으로 폴백합니다.

## 진행 상황 저장

- localStorage 키: `story-hacker-progress` (스토리·추리 공용)
- 별점은 기존 기록보다 높을 때만 갱신됩니다
- `app/layout.tsx`의 `STORAGE_VERSION`을 올리면 클라이언트에서 최초 1회 저장 데이터가 초기화됩니다

## 테스트

E2E 테스트는 Playwright로 실행합니다. 설정은 `playwright.config.ts`, 테스트 파일은 `specs/`에 있으며, `npm test`가 개발 서버를 자동으로 띄웁니다. 모바일 우선 레이아웃이라 기본 뷰포트는 Pixel 7입니다.

```bash
npx playwright install chromium   # 최초 1회 브라우저 설치
npm test
```

테스트 계획 작성·코드 생성·디버깅에는 Playwright MCP agents(`.mcp.json`의 `playwright-test` 서버)를 사용합니다.

## 기여하기

1. 이 저장소를 포크합니다
2. 새 브랜치를 생성합니다 (`git checkout -b feature/new-episode`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add new episode'`)
4. 브랜치에 푸시합니다 (`git push origin feature/new-episode`)
5. Pull Request를 생성합니다

에피소드 추가 방법과 데이터 규칙은 [CLAUDE.md](./CLAUDE.md)의 "콘텐츠 추가 가이드"를 참고하세요.

## 라이선스

MIT License
