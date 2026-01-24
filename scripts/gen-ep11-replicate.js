const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-11",
    prompt: "Dark cyberpunk illustration of a neon-lit back alley in a futuristic city at night, holographic signs flickering, a shadowy figure standing at the end of the alley with green glowing eyes, recruitment and mystery atmosphere, rain-wet streets reflecting neon lights, cyberpunk hacker aesthetic",
  },
  {
    id: "11-1",
    prompt: "a dark cramped apartment room with an old CRT monitor displaying green blinking text, messy desk with cables and electronics, dim green glow illuminating the room, futuristic cyberpunk slum aesthetic, rain visible through dirty window",
  },
  {
    id: "11-2",
    prompt: "a convenience store back door in a cyberpunk alley, a glowing digital lock panel on the metal door, neon store sign partially visible above, trash and cables on the ground, dim streetlight, futuristic urban night setting",
  },
  {
    id: "11-3",
    prompt: "a mysterious hooded figure in a dark cyberpunk alley, holding a small glowing green microchip in their outstretched hand, neon reflections on wet ground, dramatic lighting from above, futuristic secret meeting atmosphere, neon emerald green and dark navy palette, dark moody atmosphere, no text",
  },
]);

generateImages(prompts, { label: "EP.11 '첫 번째 임무'" });
