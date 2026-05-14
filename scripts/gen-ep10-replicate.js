const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-10",
    prompt: "A school playground at dusk with a lone maple tree, freshly dug earth at its base revealing a rusted metal time capsule, faint silhouettes of three children waving from a distant memory, nostalgic ten-years-later mood, cyberpunk hacker aesthetic",
  },
  {
    id: "10-1",
    prompt: "a rusted metal time capsule half unearthed from soil beneath a maple tree, a dial combination lock on its lid, a childish handwritten memo in faded marker on its side blurred by old rain, soft dusk light on a school playground, cyberpunk hacker aesthetic",
  },
  {
    id: "10-2",
    prompt: "an opened time capsule revealing faded photos, a dried four-leaf clover and a sealed letter envelope labeled for a future self, a small number padlock on the seal, handwriting on the envelope back, warm nostalgic light, cyberpunk hacker aesthetic",
  },
  {
    id: "10-3",
    prompt: "a palm-sized USB drive with a small note stuck to it lying on an opened letter beside the time capsule, a laptop nearby showing a password prompt for a video folder, dried clover and old photos scattered around, emotional reunion mood, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.10 '타임캡슐'" });
