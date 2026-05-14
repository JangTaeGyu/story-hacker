const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-13",
    prompt: "A hooded silhouette running through a rain-drenched neon alley at dawn, long pursuing searchlight beams and red tracking signals slicing through the mist behind, the glowing OmniCorp tower looming in the distance, sense of being hunted while erasing one's own footprints, cyberpunk noir chase, cyberpunk hacker aesthetic",
  },
  {
    id: "13-1",
    prompt: "a cramped hideout desk in the blue pre-dawn dark, a communication chip vibrating and glowing red with an emergency alert, a log-deletion terminal screen open beside it demanding a confirmation code, holographic warning glyphs flickering, panic and urgency in the air, cyberpunk hacker aesthetic",
  },
  {
    id: "13-2",
    prompt: "a safehouse door in a rain-soaked back alley of a neon district, a digital keypad doorlock glowing faintly above a wet doorstep, drifting fog and distant tracker signal lights creeping between buildings, a small handwritten note stuck to the lock panel, tense fugitive atmosphere, cyberpunk noir",
  },
  {
    id: "13-3",
    prompt: "a small emergency supply crate sitting in the corner of a narrow dim safehouse room, a tiny padlock on its lid with a crooked handwritten note taped above it, faint neon light leaking through a boarded window, a quiet calm after the chase, warm relief breaking the gloom, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.13 '추적자'" });
