# 003 - 배경 일러스트 (대체됨)

> **생성 절차는 루트 [REPLICATE.md](../REPLICATE.md)를 보세요.**
> 이 문서는 DALL-E 3로 이미지를 만들고 `opacity-10 / opacity-15` 오버레이로
> 깔던 시절의 계획입니다. 실제 구현은 그 뒤로 두 번 바뀌었습니다.

*원본 작성일: 2025-01 / 대체 표시: 2026-08*

---

## 계획과 실제의 차이

| 항목 | 이 문서의 계획 | 실제 구현 |
|---|---|---|
| 생성 도구 | DALL-E 3 (1792×1024 / 1024×1792) | Replicate **FLUX Schnell** (16:9 / 9:16) |
| 실행 방법 | 수동 생성 후 배치 | `scripts/gen-epN-replicate.js`, `scripts/gen-deduction-replicate.js` |
| 표현 방식 | `opacity-10` / `opacity-15` 오버레이 | `.noct-img` 필터 + 그라데이션 페이드 |
| 렌더링 | `<img>` | `next/image` (`fill` + `sizes`) |
| 스테이지 이미지 | 96개 예정 | 실제 96개 (스토리 75 + 추리 21) |
| 추리 모드 | 프롬프트 키워드만 있고 미생성 | 29장 생성 완료 |

에피소드 제목도 상당수 달라졌습니다(예: 이 문서의 "EP.2 할아버지의 금고" → 실제 "사라진 보물"). 파일명 규칙만 그대로입니다.

---

## 현재 자산

```
public/images/story/       ep-1 ~ ep-20.png (카드 16:9)
                           1-1 … 20-4.png  (스테이지 9:16, 75장)
public/images/deduction/   ep-101 ~ ep-108.png (카드)
                           101-1 … 108-3.png  (스테이지, 21장)
```

매핑은 `components/illustrations/StoryIllustrations.tsx`, `DeductionIllustrations.tsx`의 `"에피소드ID-스테이지ID"` 키입니다.

---

## 새 이미지를 만들 때

1. [REPLICATE.md](../REPLICATE.md)의 절차를 따릅니다.
2. 프롬프트에 `glowing`·`neon` 같은 표현을 쓰지 마세요. 발광하는 추상 화면이 나와 기존 이미지와 톤이 어긋납니다. **어둡게 조명된 실제 장면**(단일 광원, 깊은 그림자)으로 묘사하고, 색 그레이딩은 `scripts/lib/prompt.js`의 공통 접미사에 맡깁니다.
3. 생성 후 일러스트 매핑에 키를 추가합니다.
