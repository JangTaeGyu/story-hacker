# 에피소드 이미지 생성 가이드 (Replicate)

## 구조

```
scripts/
├── lib/
│   ├── replicate.js   # API 호출, 폴링, 다운로드 (FLUX Schnell)
│   └── prompt.js      # 공통 스타일 (색상, 구도, no text 등)
└── gen-epN-replicate.js  # 에피소드별 프롬프트 정의
```

## 새 에피소드 이미지 생성 절차

### 1. 스크립트 파일 생성

`scripts/gen-ep{N}-replicate.js` 파일을 생성합니다.

```javascript
const {generateImages} = require("./replicate");
const {buildPrompts} = require("./prompt");

const prompts = buildPrompts([
    {
        id: "ep-{N}",        // 카드 배경 → 자동으로 16:9
        prompt: "고유한 프롬프트 내용",
    },
    {
        id: "{N}-1",          // 스테이지 배경 → 자동으로 9:16
        prompt: "고유한 프롬프트 내용",
    },
    {
        id: "{N}-2",
        prompt: "고유한 프롬프트 내용",
    },
    // ... 스테이지 수만큼 추가
]);

generateImages(prompts, {label: "EP.{N} '에피소드 제목'"});
```

### 2. 프롬프트 작성 규칙

각 프롬프트에는 **고유한 장면 묘사만** 작성합니다. 아래 공통 스타일은 `lib/prompt.js`가 자동으로 추가합니다:

| 타입 | 자동 추가 내용 |
|------|---------------|
| 카드 (`ep-N`) | 뒤: `, neon emerald green and dark navy palette, cinematic wide composition, no text` |
| 스테이지 | 앞: `Vertical illustration, ` / 뒤: `, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people` |

**프롬프트 팁:**
- 장면의 핵심 오브젝트와 분위기를 구체적으로 묘사
- `cyberpunk aesthetic`, `cyberpunk hacker aesthetic` 등 스타일 키워드 포함
- 색상 팔레트, 구도, no text/no people은 적지 않아도 됨

### 3. 실행

```bash
# 환경변수 로드 후 실행
source <(grep REPLICATE_API_TOKEN .env.local | sed 's/^/export /') && node scripts/gen-ep{N}-replicate.js
```

### 4. 출력

- 생성된 이미지: `public/images/story/{id}.png`
- 이미 존재하는 파일은 자동 건너뜀 (재생성하려면 기존 파일 삭제)

## 참고사항

- **모델**: FLUX Schnell (~$0.003/장)
- **해상도**: 카드 1344x768 (16:9), 스테이지 768x1344 (9:16)
- **Rate Limit**: 요청 간 12초 대기 (크레딧 $5 미만 시 필요)
- **비용 예시**: 에피소드 1개(5장) ≈ $0.015
- **환경변수**: `.env.local`에 `REPLICATE_API_TOKEN` 필요

## 공통 스타일 변경

전체 이미지의 색상/분위기를 바꾸려면 `scripts/lib/prompt.js`의 `STYLE` 객체를 수정합니다.
