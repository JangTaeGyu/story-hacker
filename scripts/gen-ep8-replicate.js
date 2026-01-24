const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-8",
    prompt: "Dark mysterious illustration of a space station in crisis floating in orbit above Earth, warning lights flashing, debris floating around, dramatic view of Earth below with emerald aurora, sci-fi emergency atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "8-1",
    prompt: "an escape pod console inside a space station, glowing green holographic display showing authentication code input, cramped pod interior with buckled seats, stars visible through small window, sci-fi emergency atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "8-2",
    prompt: "oxygen supply tanks in a space station corridor, one tank highlighted with a glowing digital lock panel, warning indicators flashing, pipes and mechanical details on walls, sci-fi industrial atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "8-3",
    prompt: "a communication equipment panel inside a space station, multiple screens and radio transmitters, a main screen showing signal waves and a code input field glowing green, headset hanging nearby, sci-fi control room atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "8-4",
    prompt: "a navigation computer terminal in a space station cockpit, holographic display showing Earth orbit path and trajectory lines, code input panel glowing in the center, stars and Earth visible through the large cockpit window, sci-fi piloting atmosphere, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.8 '우주 정거장'" });
