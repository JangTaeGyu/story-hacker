const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-18",
    prompt: "A split triptych view of three hooded hacker silhouettes infiltrating three different targets at once, a corporate skyscraper tower, a northern data center, and an underground laboratory, all linked by glowing data streams across a rain-soaked cyberpunk megacity skyline at night, synchronized assault tension, cyberpunk noir aesthetic",
  },
  {
    id: "18-1",
    prompt: "a mission briefing room inside a factory headquarters, a large wall screen displaying three red coordinate markers labeled Server A, B, and C, scattered tactical maps and gear on a metal table, three routes traced in glowing lines, grave silent atmosphere before a dangerous operation, cyberpunk hacker aesthetic",
  },
  {
    id: "18-2",
    prompt: "the entrance to a cold server room in a northern data center, towering racks of blinking servers behind reinforced glass, a stubborn lock panel displaying a glowing fluorescent number sequence '2, 6, 14, 30, 62, ?', frost and condensation on metal surfaces, isolated and tense, cyberpunk hacker aesthetic",
  },
  {
    id: "18-3",
    prompt: "a heavily guarded corridor on the 52nd floor of a corporate skyscraper, surveillance cameras lining every wall, a control server behind a dual-lock panel with voice recognition and a PIN pad, a hastily scrawled note taped beside it, harsh fluorescent light and looming danger, cyberpunk hacker aesthetic",
  },
  {
    id: "18-4",
    prompt: "a vast cold underground laboratory five floors deep, a massive core server pulsing like a heartbeat in the darkness, freezing coolant mist rolling across the floor, an authentication terminal glowing in front of the server, the beating heart of Project X, ominous and immense, cyberpunk hacker aesthetic",
  },
  {
    id: "18-5",
    prompt: "three live communication channels open side by side on a terminal, three server status panels all reading 'READY', a final shutdown code entry field blinking, a three-second synchronization timer counting down, breath-held moment of total convergence, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.18 '삼중 공격'" });
