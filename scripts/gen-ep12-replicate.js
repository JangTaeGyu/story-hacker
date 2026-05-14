const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-12",
    prompt: "A towering glass corporate skyscraper of megacorp OmniCorp piercing the neon haze of a 2087 cityscape, a small hooded silhouette gazing up at it from the rain-slicked street far below, holographic corporate logos drifting through the air, sense of a rookie infiltrating a giant's territory, cyberpunk noir, cyberpunk hacker aesthetic",
  },
  {
    id: "12-1",
    prompt: "a vast cold corporate lobby with a glowing blue OmniCorp logo on a marble wall, holographic visitor wifi panel hovering near a sleek reception desk, exposed-pipe rebel hideout reflected faintly in the polished floor, a tablet resting on a bench showing a connection prompt, sterile neon-blue lighting, cyberpunk noir",
  },
  {
    id: "12-2",
    prompt: "a dusty old visitor terminal tucked in a corner of a corporate lobby, cracked screen displaying an employee authentication challenge with a glowing 'code of the day' formula, frost creeping on a nearby window showing a freezing city skyline outside, dim blue ambient light, tense quiet atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "12-3",
    prompt: "a terminal screen showing a public file directory, one ominous encrypted file labeled with a lock icon glowing among ordinary folders, faint metadata note hovering as a hologram beside it, the OmniCorp name spelled out in floating letters being decoded into numbers, suspenseful blue-lit close-up, cyberpunk noir",
  },
  {
    id: "12-4",
    prompt: "an opened classified report on a glowing screen, most of the text blacked out with heavy redaction bars, the words 'PROJECT-X' surviving in stark light, a digital-clock-style code readout at the bottom edge pointing to a hidden server room location, cold dread in the air, dim corporate office at night, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.12 '기업 정찰'" });
