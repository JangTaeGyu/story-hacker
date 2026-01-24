const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-10",
    prompt: "Dark mysterious illustration of a metal time capsule partially dug out from the ground at night, warm golden light glowing from inside the capsule, childhood memorabilia scattered around like old photos and toys, nostalgic yet mysterious atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "10-1",
    prompt: "a rusty metal time capsule box sitting in a freshly dug hole in the ground, a faded memo sticker attached to it, shovel nearby, nighttime garden setting with moonlight, nostalgic childhood memory atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "10-2",
    prompt: "a sealed old envelope with a small decorative padlock on it, handwritten text visible on the surface, placed on a desk with the open time capsule in the background, warm amber and green lighting, nostalgic letter concept, cyberpunk hacker aesthetic",
  },
  {
    id: "10-3",
    prompt: "an old USB flash drive plugged into a laptop, the screen showing a locked video file icon with a glowing padlock, childhood photos scattered around the desk, warm nostalgic glow mixed with digital green light, memory and technology concept, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.10 '타임캡슐'" });
