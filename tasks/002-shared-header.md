# 002: 공용 헤더 컴포넌트 정의

## 개요

메인 페이지(`/`)를 제외한 모든 페이지에서 사용할 공용 헤더 컴포넌트를 생성합니다.

## 현재 상태

현재 각 페이지에서 개별적으로 back/exit 헤더를 구현하고 있습니다.

### 헤더 유형 A: 단순 BACK 버튼
| 페이지 | 파일 | 링크 대상 | 색상 |
|--------|------|-----------|------|
| 모드 선택 | `app/mode-select/page.tsx` | `/` | emerald |
| 스토리 에피소드 목록 | `app/story/page.tsx` | `/mode-select` | emerald |
| 추론 에피소드 목록 | `app/deduction/page.tsx` | `/mode-select` | cyan |

### 헤더 유형 B: EXIT + 진행 정보 + 별점
| 페이지 | 파일 | 링크 대상 | 색상 | 추가 정보 |
|--------|------|-----------|------|-----------|
| 스토리 게임 플레이 | `components/screens/StoryGamePlay.tsx` | `/story` | emerald | EP/STAGE, 별점 |
| 추론 게임 플레이 | `components/screens/DeductionGamePlay.tsx` | `/deduction` | cyan | EP/STAGE, 별점 |

## 작업 항목

- [x] 1. `components/ui/Header.tsx` 공용 헤더 컴포넌트 생성
  - Props 설계:
    - `backHref: string` - 뒤로가기 링크
    - `backText?: string` - 버튼 텍스트 (기본값: "BACK")
    - `accentColor?: 'emerald' | 'cyan'` - 테마 색상
    - `center?: React.ReactNode` - 중앙 영역 (진행 정보 등)
    - `right?: React.ReactNode` - 우측 영역 (별점 등)
  - 추가: `fixed top-0 z-40 bg-hacker-dark/95 backdrop-blur` 적용

- [x] 2. `app/mode-select/page.tsx` 헤더 교체

- [x] 3. `app/story/page.tsx` 헤더 교체

- [x] 4. `app/deduction/page.tsx` 헤더 교체

- [x] 5. `components/screens/StoryGamePlay.tsx` 헤더 교체

- [x] 6. `components/screens/DeductionGamePlay.tsx` 헤더 교체

- [x] 7. 동작 확인 및 테스트

## 네비게이션 플로우

```
/ (홈)
└── /mode-select (< BACK → /)
    ├── /story (< BACK → /mode-select)
    │   └── /story/[id] (< EXIT → /story) [EP.X - STAGE Y/Z] [★★☆]
    │       ├── /complete → 액션 버튼으로 이동
    │       └── /gameover → 액션 버튼으로 이동
    └── /deduction (< BACK → /mode-select)
        └── /deduction/[id] (< EXIT → /deduction) [EP.X - STAGE Y/Z] [★★☆]
            ├── /complete → 액션 버튼으로 이동
            └── /gameover → 액션 버튼으로 이동
```

## 참고

- complete/gameover 페이지는 헤더 없음 (액션 버튼으로 네비게이션)
- 메인 페이지(`/`)는 헤더 없음
 