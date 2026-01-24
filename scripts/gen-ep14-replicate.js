const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-14",
    prompt: "Dark cyberpunk illustration of a shadowy figure with two faces representing a double agent, one face lit in emerald green and the other in red, fractured mirror effect, digital glitch distortion, betrayal and deception atmosphere",
  },
  {
    id: "14-1",
    prompt: "a USB drive plugged into a terminal showing encrypted member activity logs scrolling on screen, dark safe house room, a mysterious figure's shadow on the wall, tension and suspicion atmosphere, cyberpunk aesthetic",
  },
  {
    id: "14-2",
    prompt: "multiple screens showing communication log timestamps highlighted in red, pattern analysis visualization with connecting lines, dark monitoring room, suspicious activity detection interface, cyberpunk aesthetic",
  },
  {
    id: "14-3",
    prompt: "a computer screen revealing a decrypted secret message with payment transaction details, red warning indicators, corporate logo partially visible, evidence of betrayal concept, cyberpunk aesthetic",
  },
  {
    id: "14-4",
    prompt: "an emergency lockdown system activation panel with flashing red and green lights, metal blast doors closing in a cyberpunk corridor, alarm sirens visual effect, urgent chase atmosphere, cyberpunk aesthetic",
  },
]);

generateImages(prompts, { label: "EP.14 '내부자'" });
