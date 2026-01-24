const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-9",
    prompt: "Dark mysterious illustration of a tall ancient wizard tower rising into a stormy night sky, glowing emerald magical runes spiraling around the tower, lightning in the background, dark enchanted forest at the base, fantasy magic atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "9-1",
    prompt: "a massive stone tower entrance door with a glowing magical lock in the center, fire and water elemental symbols carved on either side, ancient stone archway with mystical vines, dark enchanted forest behind, fantasy magic atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "9-2",
    prompt: "a ornate medieval door inside a tower stairwell, glowing riddle inscriptions carved into the stone frame, magical numbers floating in the air around the door, torchlight flickering on stone walls, spiral staircase visible, fantasy magic atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "9-3",
    prompt: "a vast magical library inside a tower with towering bookshelves reaching to the ceiling, floating books with glowing pages, a stone golem guardian standing near a restricted section gate, magical particles in the air, fantasy magic atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "9-4",
    prompt: "a wizard's secret chamber at the top of a tower, a large glowing crystal ball on a pedestal in the center, mystical symbols and star charts on the walls, ancient scrolls and potions on shelves, ethereal green and purple light emanating from the crystal, fantasy magic atmosphere, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.9 '마법사의 탑'" });
