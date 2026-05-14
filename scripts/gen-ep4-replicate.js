const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-4",
    prompt: "Dark detective office at night, an empty client chair and a lone smartphone left abandoned on a worn wooden desk, the faint silhouette of a missing woman fading away in a doorway, venetian blind shadows, swirling cigarette haze, noir investigation mood, cyberpunk hacker aesthetic",
  },
  {
    id: "4-1",
    prompt: "an abandoned smartphone resting on a cluttered detective desk, three unread message notifications glowing on its locked screen, a handwritten client request form beside it with a tiny scribbled corner note, dim desk lamp pool of light, tense quiet atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "4-2",
    prompt: "a phone screen showing a locked folder labeled top-secret with a six-digit passcode prompt, threatening text-message bubbles stacked behind it, a notes app with a date hint glowing faintly, layered digital interface, ominous mood, cyberpunk hacker aesthetic",
  },
  {
    id: "4-3",
    prompt: "an opened secret folder spilling out grainy surveillance photos and a transcript page from an old company-gathering accident, three blurred suspect profile cards each marked with an age number, another locked file overlay glowing, pre-dawn tension, cyberpunk hacker aesthetic",
  },
  {
    id: "4-4",
    prompt: "a final locked suspect file with one profile circled in dripping red ink, three initial letters L E E etched beside a handwritten cipher rule, an alphabet-to-number code chart floating faintly, dramatic reveal moment, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.4 '탐정 사무소'" });
