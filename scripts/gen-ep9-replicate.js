const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-9",
    prompt: "A towering ancient wizard's tower at night, arcane seals glowing across its walls, the faint silhouette of a lone apprentice climbing the spiral, a cold potion goblet abandoned at the summit window, ominous magical mystery, cyberpunk hacker aesthetic",
  },
  {
    id: "9-1",
    prompt: "an ancient tower entrance with a glowing magical lock, an inscription carved in the master's handwriting referencing fire and water elements, flickering runes, cold night air, first-trial tension, cyberpunk hacker aesthetic",
  },
  {
    id: "9-2",
    prompt: "a dark spiral staircase inside a wizard's tower with mostly dead magic lamps, a sealed door at the top glowing with a hovering number-sequence riddle, cold stone walls, eerie quiet, cyberpunk hacker aesthetic",
  },
  {
    id: "9-3",
    prompt: "a vast dim magical library with towering bookshelves, a stalled librarian golem standing between the rows with faint light leaking from its chest, an open book fallen at its feet with a slip of paper tucked inside, mysterious arcane glow, cyberpunk hacker aesthetic",
  },
  {
    id: "9-4",
    prompt: "a hidden secret chamber revealed behind a cracked wall, the master's true study with an open diary on the desk, a locked truth box underneath, a glowing crystal orb hovering nearby reciting a final riddle, dramatic revelation mood, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.9 '마법사의 탑'" });
