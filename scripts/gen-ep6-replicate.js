const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-6",
    prompt: "Dark mysterious illustration of a moody cafe at night, neon coffee cup sign glowing with emerald green light, rain-wet window reflections, empty tables with dim candles, a mysterious atmosphere suggesting hidden secrets, cyberpunk hacker aesthetic",
  },
  {
    id: "6-1",
    prompt: "inside a dark atmospheric cafe, a glowing poster on the wall with WiFi symbol, coffee cups on tables, warm ambient lighting mixed with green neon accents, cozy but mysterious cafe interior, cyberpunk hacker aesthetic",
  },
  {
    id: "6-2",
    prompt: "a staff-only door in a cafe hallway with a glowing digital keypad lock, dim corridor lighting, caution sign on the door, mysterious green light seeping from under the door, cyberpunk hacker aesthetic",
  },
  {
    id: "6-3",
    prompt: "a small metal safe on a shelf in a cafe back room, coffee bean bags stacked nearby, the safe keypad glowing with emerald light, steam rising from a nearby coffee machine, dim storage room atmosphere, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.6 '카페 미스터리'" });
