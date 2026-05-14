const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-7",
    prompt: "A lone hospital-gowned figure in silhouette standing in a pitch-black hospital corridor at dawn, only red emergency lights pulsing along the ceiling, rows of locked patient room doors stretching into darkness, an empty wheeled bed abandoned mid-hallway, distant approaching footsteps implied, claustrophobic dread of being trapped and erased, cyberpunk hacker aesthetic",
  },
  {
    id: "7-1",
    prompt: "a glowing medical tablet propped on a bedside table demanding patient authentication, beside it a metal headboard nameplate scratched and gouged with the faint engraved outline of four digits still visible, a blank patient wristband discarded on the sheets, red emergency light flickering across a dark hospital room, cyberpunk hacker aesthetic",
  },
  {
    id: "7-2",
    prompt: "a doctor's chart terminal pulled close through a door gap, its lock screen lit cold blue showing a near-empty patient chart with a single death-date line, a yellow post-it note stuck to its back, a corridor cabinet and a locked-from-outside hospital room door beyond, tense oppressive shadows, cyberpunk hacker aesthetic",
  },
  {
    id: "7-3",
    prompt: "a half-open medication storage cabinet beside a dim nurse station, a syringe tray with a printed patient label waiting inside, sterile vials and ampoules glinting in faint light, a deserted hospital corridor stretching away, the cold horror of a prepared lethal dose, cyberpunk hacker aesthetic",
  },
  {
    id: "7-4",
    prompt: "an emergency exit door at the end of a hospital corridor with a glowing blue numeric lock panel, a hospital safety-rules notice posted beside it, a doctor's open work notebook on the floor listing room numbers in a column, far-off siren glow and looming shadows of approaching footsteps, last-chance escape tension, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.7 '병원 탈출'" });
