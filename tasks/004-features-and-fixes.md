# 004: 새 기능 및 버그 개선 (진행 중)

> **`tasks/` 중 유일하게 살아 있는 백로그입니다.** 001·002·003은 완료·폐기 처리됐습니다.
> 여기 적힌 것 외의 개선(접근성, 번들 축소, 이어하기, 난이도 재배치 등)은
> 이미 처리되어 `CLAUDE.md`와 git 히스토리에 반영돼 있습니다.

*원본 작성일: 2025-01-23 / 최종 갱신: 2026-08*

---

## 0. 착수 전 확인

효과음은 **음원 파일이 먼저 필요합니다.** `public/sounds/`가 비어 있는 상태에서
훅만 만들면 소리가 나지 않는 코드만 남습니다.

에피소드 잠금 해제는 **이어하기와 상호작용**합니다. 진행도 저장소는
`lib/progress.ts`로 통합되어 있으니(`useProgress`, `readRun`/`saveRun`)
`useLocalStorage`를 새로 부르지 말고 그쪽을 확장하세요.

---

## 1. 효과음 시스템

### 목표
키패드 클릭, 정답, 오답, 에피소드 완료, 게임오버 시 효과음 재생

### 작업 항목
- [ ] 효과음 파일 준비 (`public/sounds/`)
- [ ] `hooks/useSound.ts` 훅 생성
- [ ] `components/ui/InputArea.tsx` — 키패드 클릭음 연동
- [ ] `components/screens/StoryGamePlay.tsx` — 정답/오답 효과음 연동
- [ ] `components/screens/DeductionGamePlay.tsx` — 정답/오답 효과음 연동
- [ ] `app/story/[episodeId]/complete/page.tsx` — 완료 효과음
- [ ] `app/deduction/[episodeId]/complete/page.tsx` — 완료 효과음
- [ ] `app/story/[episodeId]/gameover/page.tsx` — 게임오버 효과음
- [ ] `app/deduction/[episodeId]/gameover/page.tsx` — 게임오버 효과음
- [ ] 음소거 토글 기능 (로컬스토리지 저장)

### 사운드 파일 목록
```
public/sounds/
├── keypress.mp3    # 키패드 클릭
├── success.mp3     # 정답
├── error.mp3       # 오답
├── complete.mp3    # 에피소드 완료
└── gameover.mp3    # 게임오버
```

### 훅 인터페이스
```typescript
// hooks/useSound.ts
export function useSound(): {
  play: (soundName: string) => void;
  muted: boolean;
  toggleMute: () => void;
}
```

---

## 2. 에피소드 잠금 해제 시스템

### 목표
이전 에피소드를 클리어해야 다음 에피소드가 해제되는 순차 해제 구조

### 작업 항목
- [ ] `lib/progress.ts` — 잠금 해제 판정 추가 (`useProgress` 확장)
- [ ] `components/screens/StoryEpisodeList.tsx` — 잠긴 에피소드 UI (클릭 불가)
- [ ] `components/screens/DeductionEpisodeList.tsx` — 잠긴 에피소드 UI
- [ ] 잠긴 에피소드는 `.noct-img-locked` 같은 별도 톤이 필요할 수 있음 (현재 미정의)
- [ ] 첫 번째 에피소드는 기본 해제
- [ ] 챕터 간 전환도 고려 (EP.10 클리어 → EP.11 해제 등)

### 잠금 해제 규칙
| 조건 | 해제 대상 |
|------|-----------|
| 기본 | 각 모드 첫 에피소드 (스토리 EP.1, 추론 EP.101) |
| EP.N 클리어 | EP.N+1 해제 |
| 별 3개 클리어 | 보너스 없음 (향후 확장 가능) |

---

## 3. 튜토리얼 모드

### 목표
첫 플레이어를 위한 게임 조작 가이드

### 작업 항목
- [ ] 튜토리얼 표시 여부 로컬스토리지 관리 (`tutorial-completed`)
- [ ] 튜토리얼 오버레이 컴포넌트 생성
- [ ] 스토리 모드 첫 플레이 시 튜토리얼 표시
- [ ] 추론 모드 첫 플레이 시 튜토리얼 표시
- [ ] "다시 보지 않기" 옵션

### 튜토리얼 단계 (안)
1. "스토리를 읽고 단서를 찾으세요" (스토리/상황 영역 하이라이트)
2. "PIN 코드를 입력하세요" (키패드 영역 하이라이트)
3. "제출 버튼을 누르세요" (제출 버튼 하이라이트)
4. "힌트가 필요하면 힌트 버튼을 누르세요" (힌트 버튼 하이라이트)

---

## 4. 업적 시스템

### 목표
게임 진행에 따른 업적/도전과제 달성

### 작업 항목
- [ ] `lib/types.ts` — 업적 타입 정의
- [ ] `data/achievements.ts` — 업적 목록 데이터
- [ ] `hooks/useAchievements.ts` — 업적 달성 로직 + 로컬스토리지
- [ ] 업적 달성 시 토스트/팝업 알림 컴포넌트
- [ ] 업적 목록 확인 페이지 (`app/achievements/page.tsx`)
- [ ] 모드 선택 페이지에서 업적 페이지 진입점 추가

### 업적 목록 (안)
| ID | 이름 | 조건 |
|----|------|------|
| first-clear | 첫 해킹 | 아무 에피소드 1개 클리어 |
| perfect-star | 완벽한 해커 | 별 3개로 에피소드 클리어 |
| no-hint | 직감의 달인 | 힌트 없이 에피소드 클리어 |
| story-master | 스토리 마스터 | 스토리 모드 전체 클리어 |
| deduction-master | 추론 마스터 | 추론 모드 전체 클리어 |
| speed-run | 스피드 러너 | 2턴 이내에 스테이지 클리어 |
| all-stars | 올스타 | 총 별 50개 달성 |

---

## 5. 버그 및 개선

### 버그 (수정 필요)
- [x] **[Critical] 에피소드 클리어 진행 데이터 덮어쓰기 버그**
  - 증상: 2개 이상 에피소드 클리어 시 마지막 클리어만 표시됨
  - 원인: `complete/page.tsx`의 저장 useEffect가 localStorage 초기화 이전에 실행되어 `completedEpisodes: {}`로 기존 데이터 덮어씀
  - 영향 파일:
    - `app/story/[episodeId]/complete/page.tsx:28-40`
    - `app/deduction/[episodeId]/complete/page.tsx:29-41`
  - 해결: `useLocalStorage`가 `isInitialized`를 반환하도록 변경.
    이후 저장 로직은 `lib/progress.ts`의 `useProgress().recordClear`로 옮겨졌고,
    URL 직접 진입으로 기록이 남지 않도록 `lib/clearToken.ts` 증표 검사가 추가됨

### 확인 완료 항목
- [x] `pin2`, `pin3` lockType에 대한 PinDisplay/InputArea 대응 확인 — pin1~pin6 모두 지원
- [x] 모바일 키패드 터치 영역 — `h-16`(64px)으로 최소 48px 충족
- [ ] 페이지 전환 시 로딩 상태 표시 — 경미 (게임오버 시 즉시 이동, 체감 이슈 적음)
- [x] 에피소드 카드 이미지 fallback — 전 에피소드 이미지가 채워져 `onError` 처리 불필요해짐.
      `next/image` 전환과 함께 제거됨
- [x] 한 자리 PIN 스테이지의 찍기 취약점 (3회 시도로 30%) — pin2 + 제로패딩으로 전환

---

## 6. 작업 우선순위

| 순위 | 기능 | 상태 | 이유 |
|------|------|------|------|
| — | 클리어 진행 데이터 버그 수정 | **완료** | 핵심 기능 장애였음 |
| 1 | 효과음 시스템 | 대기 | 음원 파일 확보 후 착수 |
| 2 | 에피소드 잠금 해제 | 미착수 | 게임 진행 흐름 개선 |
| 3 | 튜토리얼 모드 | 미착수 | 신규 유저 온보딩 |
| 4 | 업적 시스템 | 미착수 | 리플레이 동기 부여 |

## 7. 장기 아이디어 (001에서 이관)

다국어 지원(next-intl) · 패턴 잠금 UI · 알파벳 비밀번호 · 유저 생성 스테이지 · 리더보드

