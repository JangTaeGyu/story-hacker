# 004: 새 기능 및 버그 개선

## 개요

`001-remaining-tasks.md`에서 미구현된 기능과 개선 사항을 구현합니다.

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
- [ ] `lib/types.ts` — 잠금 상태 타입 추가
- [ ] `hooks/useGameProgress.ts` — 잠금 해제 로직 (or 기존 useLocalStorage 확장)
- [ ] `app/story/page.tsx` — 잠금된 에피소드 UI (자물쇠 아이콘, 클릭 불가)
- [ ] `app/deduction/page.tsx` — 잠금된 에피소드 UI
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

### 확인 필요 항목
- [x] `pin2`, `pin3` lockType에 대한 PinDisplay/InputArea 대응 확인 — 문제 없음 (pin1~pin6 모두 지원)
- [x] 모바일 키패드 레이아웃 터치 영역 최적화 — 문제 없음 (h-14=56px, 최소 48px 충족)
- [ ] 페이지 전환 시 로딩 상태 표시 — 경미 (게임오버 시 즉시 이동, 체감 이슈 적음)
- [x] 에피소드 카드 이미지 로딩 실패 시 fallback 처리 — `onError`로 이미지 숨김 처리 완료

---

## 6. 작업 우선순위

| 순위 | 기능 | 이유 |
|------|------|------|
| 1 | 버그 및 개선 (5장) | 기본 안정성 확보 |
| 2 | 에피소드 잠금 해제 | 게임 진행 흐름 개선 |
| 3 | 효과음 시스템 | 게임 몰입감 향상 |
| 4 | 튜토리얼 모드 | 신규 유저 온보딩 |
| 5 | 업적 시스템 | 리플레이 동기 부여 |

---

*작성일: 2025-01-23*
