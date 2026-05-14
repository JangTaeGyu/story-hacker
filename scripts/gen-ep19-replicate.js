const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-19",
    prompt: "Two lone figures facing each other in silhouette across a darkened underground server hall lit only by red emergency lights, a dead core server towering between them, one holding an emergency stop device, charged final-confrontation tension between hero and traitor, cyberpunk noir aesthetic",
  },
  {
    id: "19-1",
    prompt: "an underground server room plunged into blackout, every monitor dead and dark, only dim red emergency lights flickering on, a sinister handheld emergency stop device glowing on the floor, the shutdown blocked, a sudden chilling stillness, cyberpunk hacker aesthetic",
  },
  {
    id: "19-2",
    prompt: "the emergency stop device held up in red emergency light, its small screen showing a case file number '82-7-15-A', faded fragments of an old hospital incident report and a torn family photograph drifting in the gloom, heavy weight of a painful past, cyberpunk hacker aesthetic",
  },
  {
    id: "19-3",
    prompt: "a glaring red countdown timer reading '02:00' burning on a dark wall above the core server, the emergency stop device displaying a final lock puzzle, sparks and warning glyphs flickering, frantic last-chance pressure, cyberpunk hacker aesthetic",
  },
  {
    id: "19-4",
    prompt: "the emergency stop device finally unlocked and powering down on the floor, three distant server towers going silent at once, a terminal displaying 'PROJECT-X DEACTIVATED' and an epilogue file icon, soft relief light cutting through the red gloom, exhausted hard-won calm, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.19 '팬텀의 역습'" });
