# Story Hacker

추리와 논리로 비밀번호를 해독하는 해커 테마 퍼즐 게임

## 게임 소개

Story Hacker는 스토리 기반 추리와 논리적 추론을 통해 PIN 코드를 해독하는 웹 기반 퍼즐 게임입니다. 사이버펑크 해커 테마의 시각적 디자인과 몰입감 있는 게임플레이를 제공합니다.

## 게임 모드

### 스토리 모드 (Story Mode)

이야기 속 단서를 읽고 숨겨진 PIN 코드를 추리합니다.

- **스토리 기반**: 각 에피소드마다 흥미로운 이야기와 단서 제공
- **힌트 시스템**: 막히면 힌트를 사용할 수 있음 (별점 1점 감소)
- **다중 정답**: 일부 퍼즐은 여러 정답을 허용
- **타이핑 효과**: 스토리가 타자 효과로 표시되어 몰입감 증가
- **10개 에피소드**: 난이도별로 다양한 스토리 퍼즐 제공

### 추론 모드 (Deduction Mode)

주어진 상황과 논리적 단서로 PIN 코드를 추론합니다.

- **단서 기반 추론**: 숫자의 위치, 크기, 관계 등을 추론
- **점진적 힌트**: 틀릴 때마다 새로운 단서가 공개
- **속도 보상**: 적은 시도로 맞출수록 높은 별점
- **순수 논리**: 스토리 없이 오직 논리적 추론만 사용
- **8개 에피소드**: 다양한 논리 퍼즐 제공

## 게임플레이

### 진행 방식

1. 게임 모드 선택 (스토리/추론)
2. 에피소드 선택 (난이도: ★~★★★)
3. 단서를 읽고 PIN 코드 입력 (4자리 또는 6자리)
4. 정답 시 다음 스테이지로 진행
5. 오답 시 하트 감소 (스토리) 또는 새 단서 공개 (추론)
6. 모든 스테이지 클리어 시 에피소드 완료

### 별점 시스템

**스토리 모드**
- 기본 3점, 힌트 사용 시 1점 감소

**추론 모드**
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

## 시작하기

### 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/story-hacker.git
cd story-hacker

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

http://localhost:3000 에서 게임을 플레이할 수 있습니다.

## 스크립트

```bash
npm run dev     # 개발 서버 실행 (localhost:3000)
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버 실행
npm run lint    # ESLint 코드 검사
```

## 프로젝트 구조

```
story-hacker/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 홈 페이지
│   ├── globals.css              # 전역 스타일
│   ├── mode-select/             # 모드 선택 페이지
│   ├── story/                   # 스토리 모드
│   │   ├── page.tsx            # 에피소드 선택
│   │   └── [episodeId]/        # 동적 라우트
│   │       ├── page.tsx        # 게임 플레이
│   │       ├── complete/       # 클리어 화면
│   │       └── gameover/       # 게임오버 화면
│   └── deduction/               # 추론 모드 (구조 동일)
│
├── components/
│   ├── screens/                 # 게임 화면 컴포넌트
│   │   ├── StoryGamePlay.tsx   # 스토리 모드 게임 로직
│   │   └── DeductionGamePlay.tsx
│   ├── ui/                      # 재사용 UI 컴포넌트
│   │   ├── PinDisplay.tsx      # PIN 입력 디스플레이
│   │   ├── InputArea.tsx       # 숫자 키패드
│   │   └── HeartsDisplay.tsx   # 남은 턴 표시
│   └── illustrations/           # SVG 일러스트레이션
│
├── hooks/                       # 커스텀 훅
│   ├── useGameState.ts         # 게임 상태 관리
│   ├── useLocalStorage.ts      # 로컬스토리지 연동
│   └── useTypingEffect.ts      # 타이핑 애니메이션
│
├── lib/                         # 유틸리티
│   ├── types.ts                # 타입 정의
│   └── utils.ts                # 헬퍼 함수
│
├── data/                        # 게임 콘텐츠
│   ├── storyEpisodes.ts        # 스토리 에피소드 (10개)
│   └── deductionEpisodes.ts    # 추론 에피소드 (8개)
│
└── specs/                       # E2E 테스트
```

## 디자인 시스템

### 컬러 팔레트

| 컬러 | 코드 | 용도 |
|------|------|------|
| Hacker Emerald | `#00FF88` | 스토리 모드 메인 컬러 |
| Hacker Cyan | `#22d3ee` | 추론 모드 메인 컬러 |
| Hacker Rose | `#FF3366` | 경고, 하트 표시 |
| Hacker Gold | `#ffd700` | 별점, 성공 표시 |
| Hacker Dark | `#0D1117` | 배경색 |

### 애니메이션

- **Glitch**: 홈 화면 텍스트 효과
- **Shake**: 오답 시 흔들림 효과
- **Scanline**: CRT 모니터 스캔라인 효과
- **Typing**: 스토리 텍스트 타이핑 효과
- **Pulse Glow**: 배경 글로우 효과

## 콘텐츠

### 스토리 모드 에피소드

1. **수상한 이웃** (★) - 2 스테이지
2. **할아버지의 유산** (★) - 2 스테이지
3. **미스터리 카페** (★★) - 2 스테이지
4. **학교 괴담** (★★) - 3 스테이지
5. **갤러리 도난 사건** (★★) - 3 스테이지
6. **병원의 비밀** (★★★) - 3 스테이지
7. **우주 정거장** (★★★) - 3 스테이지
8. **마법의 탑** (★★★) - 4 스테이지
9. **타임캡슐** (★★★) - 4 스테이지
10. **해커의 도전** (★★★) - 4 스테이지

### 추론 모드 에피소드

- 101~108번: 기초부터 고급 논리 퍼즐까지

## 테스트

E2E 테스트는 Playwright MCP agents를 사용합니다.

```bash
# 테스트 실행 (Playwright MCP 사용)
# specs/ 디렉토리에 테스트 파일 위치
```

## 기여하기

1. 이 저장소를 포크합니다
2. 새 브랜치를 생성합니다 (`git checkout -b feature/new-episode`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add new episode'`)
4. 브랜치에 푸시합니다 (`git push origin feature/new-episode`)
5. Pull Request를 생성합니다

## 라이선스

MIT License