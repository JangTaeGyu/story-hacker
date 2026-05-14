const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-20",
    prompt: "A lone hooded figure in silhouette standing on a rooftop watching the first dawn break over a changed cyberpunk megacity, the dark corporate tower's lights gone cold, a glowing phoenix declaration spreading across distant city screens, hopeful yet unresolved new beginning, cyberpunk noir aesthetic",
  },
  {
    id: "20-1",
    prompt: "a quiet factory headquarters in pale morning light two weeks after victory, a distant corporate skyscraper with its windows gone dark, disconnected medical chips and faded mission boards, a final farewell file glowing on a screen, bittersweet stillness of a hard-won peace, cyberpunk hacker aesthetic",
  },
  {
    id: "20-2",
    prompt: "a wide screen filled with a map of secret corporate slush-fund accounts, a transfer interface showing the figure 8,888,888,888 credits, a single authentication field awaiting input, the glow of a city's reconstruction fund, weighty turning-point atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "20-3",
    prompt: "the factory headquarters with the resistance phoenix emblem projected large on the wall, a circle of empty chairs around a terminal encrypting a new manifesto, the words 'WE ARE PHOENIX' half-rendered on screen, resolve and renewal in the air, cyberpunk hacker aesthetic",
  },
  {
    id: "20-4",
    prompt: "city-wide screens across a reborn cyberpunk metropolis glowing with a phoenix manifesto at night, a single monitor in a quiet room showing an anonymous incoming message from sender '???' and a blinking final code, the words 'TO BE CONTINUED' implied by the ominous calm, a new threat looming, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.20 '새로운 여명'" });
