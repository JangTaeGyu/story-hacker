const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-1",
    prompt: "A lone hooded figure in silhouette descending a dim apartment stairwell at 3am carrying a heavy bag, seen from above through a doorway gap, cold streetlight spilling across the corridor, quiet ominous suburban apartment block, sense of secret routine and hidden warmth, cyberpunk hacker aesthetic",
  },
  {
    id: "1-1",
    prompt: "an old worn pocket notebook with a small dial combination lock on its cover lying open on a dim apartment hallway floor, faint engraved letters 'FOR H' on the corner, single overhead corridor light, late night stillness, cyberpunk hacker aesthetic",
  },
  {
    id: "1-2",
    prompt: "a sun-faded photograph of an empty hospital bed tucked between notebook pages, resting beside a locked apartment door with a glowing red digital doorlock blinking in a silent corridor, tense midnight atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "1-3",
    prompt: "a dark living room with a heavy bag secured by a six-digit padlock sitting on the floor, a wall covered with pinned photos of playgrounds and swings, a hand-drawn calendar with a single red circled date, streetlight stretching long shadows through curtain gaps, cyberpunk hacker aesthetic",
  },
  {
    id: "1-4",
    prompt: "an opened bag revealing a teddy bear, a storybook and tiny unworn sneakers wrapped as gifts, a small locked steel box at the bottom with a hospital patient wristband resting on its lid, an open diary beside it, quiet emotional reveal, soft light breaking the gloom, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.1 '수상한 이웃'" });
