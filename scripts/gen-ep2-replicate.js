const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-2",
    prompt: "Dark mysterious illustration of an ancient treasure chest half-buried in shadows, golden coins and jewels faintly glowing, a ghostly trail of footprints leading away into darkness, lost treasure concept, cyberpunk hacker aesthetic",
  },
  {
    id: "2-1",
    prompt: "an old vintage smartphone lying on a dusty wooden desk, faded family photos scattered around, warm amber glow from the phone screen, nostalgic grandfather's study room setting, old books and reading glasses nearby, cyberpunk hacker aesthetic",
  },
  {
    id: "2-2",
    prompt: "a heavy iron safe with a glowing 6-digit keypad, hidden in a dark basement corner, golden light leaking from the safe door cracks, treasure map fragments scattered on the floor, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.2 '사라진 보물'" });
