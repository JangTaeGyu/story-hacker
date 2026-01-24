const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-4",
    prompt: "Dark mysterious illustration of a noir detective office at night, cluttered desk with case files and magnifying glass, venetian blinds casting green-tinted shadows, smoke trails in the air, investigation board with pinned photos and string connections on the wall, cyberpunk hacker aesthetic",
  },
  {
    id: "4-1",
    prompt: "a smartphone left on a detective desk next to a business card, the phone screen showing a lock icon with green glow, scattered papers and coffee cup nearby, dim office lamp lighting, noir detective atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "4-2",
    prompt: "a glowing digital folder icon labeled with a lock symbol on a computer screen, confidential stamp effect, date numbers floating faintly around the screen, dark detective office background with dim monitors, cyberpunk hacker aesthetic",
  },
  {
    id: "4-3",
    prompt: "three suspect profile cards pinned to a dark investigation board, each card showing a silhouette figure with question marks, red string connecting the cards, dim spotlight on the board, noir detective aesthetic, cyberpunk hacker aesthetic",
  },
  {
    id: "4-4",
    prompt: "a final evidence folder opening with golden light bursting out, alphabet letters floating in the air transforming into numbers, dramatic reveal moment, dark detective office setting, spotlight effect, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.4 '탐정 사무소'" });
