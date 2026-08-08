const path = require("path");
const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

/**
 * 추리 모드 에피소드 이미지 생성.
 *
 * 스토리 모드와 달리 서사가 없고 논리 퍼즐이라, 각 스테이지의 소재를 담되
 * 발광하는 기호가 아니라 '어둡게 조명된 실제 장면'으로 묘사한다.
 * (glowing/neon 같은 표현을 쓰면 스토리 모드 이미지와 톤이 어긋난다)
 * 스타일 접두/접미는 lib/prompt.js가 붙이므로 스토리 모드와 톤이 같다.
 *
 * 파일 규칙 — 카드 ep-{episodeId}.png (16:9), 스테이지 {episodeId}-{stageId}.png (9:16)
 *
 * 특정 에피소드만 다시 만들려면:  node scripts/gen-deduction-replicate.js --only=101
 */
const prompts = buildPrompts([
  // ── EP.101 숫자 추리 ──────────────────────────────
  { id: "ep-101", prompt: "a dim archive room, rows of numbered filing drawers, a single desk lamp at the far end" },
  { id: "101-1", prompt: "a worn mechanical counter with four digit wheels on a dusty workbench, low side light" },
  { id: "101-2", prompt: "a dark stairwell photographed from below, each landing smaller than the last" },
  { id: "101-3", prompt: "an old safe dial in close-up, brass worn smooth, deep shadow around it" },

  // ── EP.102 논리 퍼즐 ──────────────────────────────
  { id: "ep-102", prompt: "an empty interrogation room, a bare table under one hanging bulb, papers scattered" },
  { id: "102-1", prompt: "a torn paper calendar pinned to a damp concrete wall, corner curling" },
  { id: "102-2", prompt: "a heavy steel vault door half in shadow, lit from one side" },
  { id: "102-3", prompt: "a single exam desk in a vast empty hall, chair pushed back" },

  // ── EP.103 수학 챌린지 ────────────────────────────
  { id: "ep-103", prompt: "an abandoned lecture hall, a chalk-dusted blackboard, light through high windows" },
  { id: "103-1", prompt: "wooden counting blocks stacked on a scratched school desk, dusk light" },
  { id: "103-2", prompt: "an antique balance scale with brass weights on a dark shelf" },
  { id: "103-3", prompt: "a nautilus shell on black cloth, one shaft of light across its spiral" },

  // ── EP.104 시간 퍼즐 ──────────────────────────────
  { id: "ep-104", prompt: "a clockmaker workshop at night, dozens of wall clocks in shadow, one lamp burning" },
  { id: "104-1", prompt: "a cracked antique wall clock in close-up, dust on the glass" },
  { id: "104-2", prompt: "a desk calendar with curled February pages, faint window light" },
  { id: "104-3", prompt: "a mechanical kitchen timer on a bare counter, deep shadow behind" },

  // ── EP.105 색깔 코드 ──────────────────────────────
  { id: "ep-105", prompt: "a darkroom bench with a glass prism, one thin shaft of light entering" },
  { id: "105-1", prompt: "seven dusty pigment jars lined on a wooden shelf, dim studio light" },
  { id: "105-2", prompt: "three theatre stage lamps overlapping on a dark backdrop" },

  // ── EP.106 음악 퍼즐 ──────────────────────────────
  { id: "ep-106", prompt: "an empty concert hall at night, one stool on stage under a work light" },
  { id: "106-1", prompt: "an old upright piano keyboard in close-up, lid open, dim room" },
  { id: "106-2", prompt: "a tuning fork resting on a worn velvet case, single overhead light" },

  // ── EP.107 지리 퀴즈 ──────────────────────────────
  { id: "ep-107", prompt: "a navigator desk at night, a folded world map under a brass lamp" },
  { id: "107-1", prompt: "a brass sextant on a nautical chart, faint lamplight from the left" },
  { id: "107-2", prompt: "a city seen from a dark hillside at night, scattered window lights" },

  // ── EP.108 과학 상식 ──────────────────────────────
  { id: "ep-108", prompt: "an old laboratory at night, glassware on a bench, a periodic chart curling on the wall" },
  { id: "108-1", prompt: "a small metal ingot on a laboratory balance, dust and shadow" },
  { id: "108-2", prompt: "a long empty tunnel with a distant light at the far end" },
  { id: "108-3", prompt: "a beaker on a burner, steam curling upward in a dark lab" },
]);

// --only=101 처럼 특정 에피소드만 골라 생성
const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const selected = onlyArg
  ? prompts.filter(({ id }) => id === `ep-${onlyArg.slice(7)}` || id.startsWith(`${onlyArg.slice(7)}-`))
  : prompts;

generateImages(selected, {
  outputDir: path.resolve(__dirname, "../public/images/deduction"),
  label: onlyArg ? `추리 모드 ${onlyArg.slice(7)}` : "추리 모드 전체",
});
