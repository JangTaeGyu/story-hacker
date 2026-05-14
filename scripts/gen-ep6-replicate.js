const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-6",
    prompt: "A dim cozy cafe after closing hours, chairs stacked on tables, one window seat still lit, a barista's hidden note tucked under the counter, the faint silhouette of a missing barista lingering by the espresso machine, quiet unease, cyberpunk hacker aesthetic",
  },
  {
    id: "6-1",
    prompt: "a window-side cafe table with an open laptop showing a disconnected wifi prompt, a wall poster nearby displaying the cafe name with numbers, warm dim cafe lighting after hours, empty quiet seats, cyberpunk hacker aesthetic",
  },
  {
    id: "6-2",
    prompt: "a staff-only door at the end of a narrow cafe hallway, a glowing number keypad mounted beside it, a small taped instruction note showing business hours, shadowy corridor, secretive tense mood, cyberpunk hacker aesthetic",
  },
  {
    id: "6-3",
    prompt: "a cramped dark staff storage room, stacked coffee bean sacks in the corner, a small locked six-digit safe resting on top with a handwritten note left beside it, faint light leaking through, forbidden discovery atmosphere, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.6 '카페 미스터리'" });
