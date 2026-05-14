const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-17",
    prompt: "A small group of hooded resistance hackers in silhouette gathered around a flickering terminal inside a derelict factory on the outskirts of a sprawling cyberpunk megacity, a glowing phoenix emblem projected onto a rusted wall, ash drifting through shafts of grey light from broken skylights, somber rebirth and quiet defiance, cyberpunk noir aesthetic",
  },
  {
    id: "17-1",
    prompt: "the cold concrete floor of an abandoned factory at dawn, rusted machinery and dead conveyor belts shrouded in dust, grey light falling through shattered ceiling windows, scattered footprints converging in the gloom, a faint phoenix symbol scrawled on a steel pillar, atmosphere of survivors regrouping, cyberpunk hacker aesthetic",
  },
  {
    id: "17-2",
    prompt: "a hidden command room deep inside a factory, walls lined with salvaged monitors booting up and tangled cables, a revived generator humming, a master security console glowing on a metal desk, blue screen light washing over rusted surfaces, a new headquarters being born from scrap, cyberpunk hacker aesthetic",
  },
  {
    id: "17-3",
    prompt: "a single encrypted communication terminal on a dark desk displaying a trembling anonymous signal waveform, a corporate employee ID badge marked 'A7K9' resting beside it, trace-program windows scanning across the screen, tense atmosphere of an uncertain contact reaching out from inside the enemy, cyberpunk hacker aesthetic",
  },
  {
    id: "17-4",
    prompt: "a classified data file unfolding across a wide screen, three glowing red server location markers pinned on a city map, a countdown reading 'D-11' burning in the corner, a stark calendar with February 1st 2087 circled in red, the headquarters air frozen with dread, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.17 '저항군'" });
