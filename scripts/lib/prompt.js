// 공통 스타일 프리픽스/서픽스
const STYLE = {
  card: {
    suffix: ", neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  stage: {
    prefix: "Vertical illustration, ",
    suffix: ", neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
};

/**
 * 프롬프트 배열을 빌드합니다.
 * 각 항목에 공통 스타일을 자동으로 붙여줍니다.
 *
 * @param {Array<{id: string, prompt: string}>} items
 *   - id가 "ep-N"이면 카드(16:9), 그 외는 스테이지(9:16)
 * @returns {Array<{id: string, aspect_ratio: string, prompt: string}>}
 */
function buildPrompts(items) {
  return items.map(({ id, prompt }) => {
    const isCard = id.startsWith("ep-");
    const aspect_ratio = isCard ? "16:9" : "9:16";
    const fullPrompt = isCard
      ? prompt + STYLE.card.suffix
      : STYLE.stage.prefix + prompt + STYLE.stage.suffix;
    return { id, aspect_ratio, prompt: fullPrompt };
  });
}

module.exports = { buildPrompts, STYLE };