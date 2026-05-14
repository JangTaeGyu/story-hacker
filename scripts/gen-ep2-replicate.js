const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-2",
    prompt: "An empty grandfather's room after a funeral, a small box on a desk holding a worn old smartphone glowing softly, dust drifting in a slanted light beam, faint silhouette of an elderly figure dissolving into the air, nostalgic riddle-maker mood, cyberpunk hacker aesthetic",
  },
  {
    id: "2-1",
    prompt: "an old worn-edged smartphone powered on showing a handwritten scanned memo on its lock screen, resting inside a small open box on a quiet wooden desk, warm dim lamp light, intimate keepsake atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "2-2",
    prompt: "a dusty small steel safe with a six-digit dial revealed behind a pushed-aside living room bookshelf, an old smartphone propped nearby displaying a notes app, cobwebs and settled dust, hidden inheritance mood, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.2 '사라진 보물'" });
