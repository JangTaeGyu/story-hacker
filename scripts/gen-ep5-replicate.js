const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-5",
    prompt: "Dark mysterious illustration of a fantasy video game world with a hidden dungeon entrance glowing with emerald light, pixel art elements mixed with realistic dark atmosphere, game controller silhouette in the foreground, secret gaming world concept, cyberpunk hacker aesthetic",
  },
  {
    id: "5-1",
    prompt: "a game login screen on a large monitor, high score number 7777 glowing brightly, retro arcade game interface aesthetic, joystick and keyboard on desk, dark gaming room with LED lights, cyberpunk hacker aesthetic",
  },
  {
    id: "5-2",
    prompt: "a fantasy guild vault door with ornate medieval metalwork, glowing keypad in the center, treasure coins visible through cracks, torch lights on stone walls, RPG game dungeon aesthetic, cyberpunk hacker aesthetic",
  },
  {
    id: "5-3",
    prompt: "a mysterious dungeon entrance gate with a glowing 6-digit code panel, ancient stone archway with magical runes, dark stairway descending behind the gate, fantasy RPG atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "5-4",
    prompt: "a legendary treasure chest glowing with golden and emerald light at the end of a dark dungeon, HP and MP bar gauges floating above the chest, epic loot reveal moment, fantasy RPG game aesthetic, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.5 '게이머의 비밀'" });
