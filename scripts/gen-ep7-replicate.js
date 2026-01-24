const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-7",
    prompt: "Dark mysterious illustration of a hospital corridor during a blackout, emergency red lights casting eerie shadows, wheelchair abandoned in the hallway, exit sign glowing faintly at the end, escape tension atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "7-1",
    prompt: "a hospital bed with a tablet device on the bedside table, the tablet screen glowing with a patient authentication lock screen, IV drip stand nearby, dim hospital room at night, window showing city lights outside, cyberpunk hacker aesthetic",
  },
  {
    id: "7-2",
    prompt: "a doctor's laptop open on an office desk, screen showing a password prompt with green glow, medical charts and stethoscope nearby, dim desk lamp lighting, hospital office at night, cyberpunk hacker aesthetic",
  },
  {
    id: "7-3",
    prompt: "a medicine storage cabinet with a glowing digital keypad lock, glass doors showing bottles and medical supplies inside, clinical white and green lighting, hospital storage room, cyberpunk hacker aesthetic",
  },
  {
    id: "7-4",
    prompt: "an emergency exit door in a dark hospital corridor during a power outage, a glowing green code panel next to the door, emergency lights casting red glow, dramatic escape atmosphere, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.7 '병원 탈출'" });
