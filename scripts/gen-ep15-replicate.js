const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-15",
    prompt: "Dark cyberpunk illustration of a massive futuristic corporate skyscraper with glowing green circuit patterns on its surface like a beating heart, a tiny silhouette figure rappelling down the side of the building, spotlight beams sweeping the night sky, infiltration and heist atmosphere",
  },
  {
    id: "15-1",
    prompt: "a holographic blueprint of a 52-floor corporate building floating above a dark table, floor plans and security patrol routes highlighted in green, night shift schedule data on side screens, mission planning war room atmosphere, cyberpunk aesthetic",
  },
  {
    id: "15-2",
    prompt: "a high-tech ID card fabrication machine with a half-finished fake employee badge under a scanning laser, holographic barcode being generated, cleaning uniform hanging nearby, counterfeiting workshop setup, cyberpunk aesthetic",
  },
  {
    id: "15-3",
    prompt: "a large industrial cargo elevator with heavy metal doors and a glowing green security keypad panel, underground parking garage visible through gaps, dim emergency lighting, industrial pipes and cables on walls, cyberpunk basement aesthetic",
  },
  {
    id: "15-4",
    prompt: "a massive server room door with a biometric scanner glowing red, override keypad panel beside it, rows of blinking server racks visible through reinforced glass window, cold blue fog from cooling system, underground bunker aesthetic, cyberpunk aesthetic",
  },
  {
    id: "15-5",
    prompt: "a main server terminal displaying PROJECT-X files with AES-256 encryption unlock animation, cascading green data streams, multiple holographic screens showing decoded classified documents, revelation and discovery atmosphere, cyberpunk aesthetic",
  },
]);

generateImages(prompts, { label: "EP.15 '옴니코프의 심장'" });
