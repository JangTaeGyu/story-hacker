# 001 - 추가 작업 및 개선 사항

> 원본 소스(`reference/StoryHackerWithIllust.jsx`)와 비교하여 발견된 미세한 차이점 및 미구현 기능 목록

---

## 1. 미세한 차이점 (Minor Differences)

원본과 기능적으로 동일하나 텍스트/아이콘이 다른 부분들입니다.

### 1.1 완료 페이지 아이콘 및 애니메이션

| 항목 | 원본 | 현재 | 파일 위치 |
|------|------|------|-----------|
| 스토리 완료 아이콘 | 🏆 (animate-bounce) | 🎉 | `app/story/[episodeId]/complete/page.tsx:63` |
| 추리 완료 아이콘 | 🏆 (animate-bounce) | 🔓 | `app/deduction/[episodeId]/complete/page.tsx:64` |

**수정 방법:**
```tsx
// 현재
<div className="text-6xl mb-4">🎉</div>

// 원본 스타일로 변경
<div className="text-6xl mb-4 animate-bounce">🏆</div>
```

### 1.2 완료 페이지 타이틀

| 항목 | 원본 | 현재 | 파일 위치 |
|------|------|------|-----------|
| 스토리 완료 | EPISODE CLEAR! | HACKING COMPLETE | `app/story/[episodeId]/complete/page.tsx:67` |
| 추리 완료 | EPISODE CLEAR! | CODE CRACKED | `app/deduction/[episodeId]/complete/page.tsx:68` |

### 1.3 완료 페이지 서브 메시지

| 항목 | 원본 | 현재 |
|------|------|------|
| 스토리 | "모든 스테이지를 해킹했습니다!" | (없음) |
| 추리 | "모든 코드를 해독했습니다!" | (없음) |

**수정 방법:**
```tsx
// app/story/[episodeId]/complete/page.tsx - 타이틀 아래에 추가
<p className="text-gray-500 font-mono text-xs mb-6">
  모든 스테이지를 해킹했습니다!
</p>

// app/deduction/[episodeId]/complete/page.tsx - 타이틀 아래에 추가
<p className="text-gray-500 font-mono text-xs mb-6">
  모든 코드를 해독했습니다!
</p>
```

### 1.4 게임오버 페이지 타이틀

| 항목 | 원본 | 현재 | 파일 위치 |
|------|------|------|-----------|
| 스토리 | ACCESS DENIED | HACKING FAILED | `app/story/[episodeId]/gameover/page.tsx:44` |
| 추리 | DECODE FAILED | DECRYPTION FAILED | `app/deduction/[episodeId]/gameover/page.tsx:44` |

### 1.5 게임오버 아이콘

| 항목 | 원본 | 현재 |
|------|------|------|
| 스토리 | 🔒 | 💀 |
| 추리 | 🔒 | 🔒 |

---

## 2. 추가 구현 권장 사항

### 2.1 추리 모드 시안 글로우 배경 (우선순위: 낮음)

원본에서는 추리 모드일 때 화면 중앙에 시안 글로우 효과가 추가됩니다.

**원본 코드 (line 1780):**
```jsx
{gameMode === 'deduction' && (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
)}
```

**구현 방법:**
추리 모드 관련 페이지들(`app/deduction/*`)에 개별적으로 시안 글로우 추가:

```tsx
// app/deduction/[episodeId]/page.tsx 또는 layout.tsx
<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
```

---

## 3. 미구현 기능 (문서상 TODO)

`reference/STORY_HACKER_PROJECT.md`의 TODO 섹션에 명시된 기능들입니다.

### 3.1 우선순위 중간

| 기능 | 설명 | 난이도 |
|------|------|--------|
| **효과음** | 성공, 실패, 키패드 클릭 사운드 | 중 |
| **튜토리얼 모드** | 첫 플레이어를 위한 가이드 | 상 |
| **에피소드 잠금 해제** | 이전 에피소드 클리어 시 다음 에피소드 해제 | 중 |
| **업적/도전과제** | 게임 진행에 따른 업적 시스템 | 상 |
| **다국어 지원** | next-intl 사용 | 중 |

### 3.2 우선순위 낮음

| 기능 | 설명 | 난이도 |
|------|------|--------|
| **패턴 잠금 UI** | 3x3 그리드 패턴 입력 | 상 |
| **알파벳 비밀번호** | 숫자 외 알파벳 지원 | 중 |
| **유저 생성 스테이지** | 사용자가 퍼즐 생성 | 상 |
| **리더보드** | 점수 순위표 | 상 |

---

## 4. 효과음 구현 가이드 (참고)

효과음 추가 시 필요한 작업:

### 4.1 사운드 파일 준비
```
public/sounds/
├── keypress.mp3    # 키패드 클릭
├── success.mp3     # 정답
├── error.mp3       # 오답
├── complete.mp3    # 에피소드 완료
└── gameover.mp3    # 게임오버
```

### 4.2 사운드 훅 생성
```typescript
// hooks/useSound.ts
'use client';

import { useCallback, useRef } from 'react';

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((soundName: string) => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(`/sounds/${soundName}.mp3`);
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return { play };
}
```

### 4.3 사용 예시
```typescript
const { play } = useSound();

// 키패드 클릭 시
const handleKeyPress = (digit: string) => {
  play('keypress');
  onInput(digit);
};

// 정답 시
if (isCorrect) {
  play('success');
}
```

---

## 5. 작업 체크리스트

### 미세 조정 (선택)
- [ ] 완료 페이지 아이콘을 🏆 + animate-bounce로 변경
- [ ] 완료 페이지 서브 메시지 추가
- [ ] 게임오버 타이틀을 원본과 동일하게 변경
- [ ] 스토리 게임오버 아이콘을 🔒로 변경
- [ ] 추리 모드 시안 글로우 배경 추가

### 새 기능 (선택)
- [ ] 효과음 시스템 구현
- [ ] 튜토리얼 모드 추가
- [ ] 에피소드 잠금 해제 시스템
- [ ] 업적 시스템

---

## 6. 결론

**핵심 기능은 모두 구현 완료**되었습니다.

위 목록의 항목들은:
1. 미세한 텍스트/아이콘 차이 → 취향에 따라 조정 가능
2. 확장 기능 → 게임 완성도 향상을 위한 추가 작업

우선순위에 따라 선택적으로 구현하시면 됩니다.

---

*작성일: 2025-01-20*
*기준 파일: reference/StoryHackerWithIllust.jsx*
