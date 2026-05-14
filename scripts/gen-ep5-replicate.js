const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-5",
    prompt: "A lone fantasy MMO warrior avatar standing frozen in a dark dungeon, never logged out, the faint silhouette of a worried gamer reflected in the monitor glass, scattered glowing UI panels and chat windows, eerie game-world stillness, cyberpunk hacker aesthetic",
  },
  {
    id: "5-1",
    prompt: "a retro game high-score screen displaying a glowing four-digit record number, an old guild chat log scrolling behind it, a cluttered gaming desk lit only by monitor glow, late-night vigil mood, cyberpunk hacker aesthetic",
  },
  {
    id: "5-2",
    prompt: "an ornate fantasy guild vault door with a number keypad, a mailbox overflowing with trade-alert notifications glowing nearby, a pinned guild notice board showing a founding date, treasure-room interface, tense atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "5-3",
    prompt: "a forbidden sealed dungeon entrance carved into stone, glowing six-digit coordinate runes hovering at the gate, a torn vault memo pinned beside it warning not to enter, cold blue mist seeping out, foreboding mood, cyberpunk hacker aesthetic",
  },
  {
    id: "5-4",
    prompt: "a locked iron chest at the deepest point of a dark dungeon, a frozen warrior avatar standing motionless behind it, a flickering system memo window with shaky handwriting hovering above, two engraved numbers and a short riddle on the chest lid, final showdown tension, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.5 '게이머의 비밀'" });
