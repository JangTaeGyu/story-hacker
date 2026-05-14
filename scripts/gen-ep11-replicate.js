const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-11",
    prompt: "A lone hooded silhouette sitting before an old monitor in a cramped apartment, framed by a rain-streaked window glowing with the neon signs of a sprawling 2087 megacity, holographic glyphs cascading down the screen, sense of a rookie hacker being recruited into the shadows, cyberpunk noir cityscape, cyberpunk hacker aesthetic",
  },
  {
    id: "11-1",
    prompt: "an old worn CRT monitor on a battered desk displaying slow-scrolling green code from an anonymous sender, tangled cables and salvaged electronics around it, a rain-soaked window behind reflecting a flickering neon sign that reads as a convenience store marquee, dim humming glow filling a tiny slum apartment, cyberpunk hacker aesthetic",
  },
  {
    id: "11-2",
    prompt: "a convenience store back door in a narrow neon-lit cyberpunk alley, an aging electronic keypad lock buzzing faintly on the rusted metal door, a small holographic date readout glowing in a corner, scattered crates cables and steam rising from a grate, wet pavement reflecting overhead neon, tense midnight stillness, cyberpunk noir",
  },
  {
    id: "11-3",
    prompt: "an open back doorway with cold mist drifting in, a small encrypted communication microchip resting on a gloved palm catching a faint glow, holographic letters hovering above it as if being converted into numbers, dim alley neon spilling across the threshold, atmosphere of a first ally and a secret handoff, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.11 '첫 번째 임무'" });
