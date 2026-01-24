const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-13",
    prompt: "Dark cyberpunk illustration of a figure running through rain-soaked neon city streets at night, digital surveillance drones with red lights chasing from behind, reflections on wet pavement, urgent escape atmosphere, motion blur effect",
  },
  {
    id: "13-1",
    prompt: "a terminal screen showing urgent log deletion interface with red warning indicators, progress bars and scrolling data, emergency alert icons flashing, dark room with only screen light, cyberpunk aesthetic",
  },
  {
    id: "13-2",
    prompt: "a hidden safe house door in a dark cyberpunk alley, a high-tech digital door lock glowing green, graffiti on surrounding walls, dim emergency lighting, pipes and cables overhead, secretive hideout atmosphere",
  },
  {
    id: "13-3",
    prompt: "a military-style supply crate with a padlock and a handwritten memo attached, inside a dimly lit safe house room, emergency supplies visible nearby, single hanging light bulb, cyberpunk hideout aesthetic",
  },
]);

generateImages(prompts, { label: "EP.13 '추적자'" });
