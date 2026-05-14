const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-15",
    prompt: "Dark cyberpunk noir illustration of a massive 52-floor OmniCorp corporate tower glowing with circuit patterns like a beating heart, a tiny silhouette figure infiltrating through a lower service entrance, security spotlight beams sweeping the rainy night sky, heist and infiltration tension, cyberpunk hacker aesthetic",
  },
  {
    id: "15-1",
    prompt: "a holographic blueprint of a 52-floor corporate tower floating above a dark planning table, underground server level highlighted, night guard shift schedule glowing on side screens, war room infiltration planning atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "15-2",
    prompt: "a high-tech ID forgery machine producing a fake cleaning-staff employee badge under a scanning laser, holographic barcode and employee code being generated on screen, a janitor uniform hanging beside it, counterfeiting workshop glow, cyberpunk noir aesthetic",
  },
  {
    id: "15-3",
    prompt: "a large industrial cargo elevator with heavy metal doors and a glowing security keypad panel showing voice recognition disabled, basement floor signs for P1 parking S2 warehouse R3 restricted area, a scrawled maintenance memo near the panel, dim industrial emergency lighting, cyberpunk basement aesthetic",
  },
  {
    id: "15-4",
    prompt: "a massive server room door on a cold underground floor with a biometric scanner glowing blue, an override keypad panel beside it, a scrawled numeric sequence 2-4-8-16-?-64 graffiti revealed on the wall, cold heavy fog drifting from cooling vents, cyberpunk bunker aesthetic",
  },
  {
    id: "15-5",
    prompt: "an open server room filled with hundreds of humming server racks, a main terminal displaying a PROJECT-X folder with AES-256 encryption and an administrator decryption key hint, cascading data streams, tense revelation atmosphere, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.15 '옴니코프의 심장'" });
