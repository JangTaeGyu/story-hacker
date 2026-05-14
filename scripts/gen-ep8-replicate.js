const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-8",
    prompt: "A lone astronaut figure in silhouette drifting through the dim interior of a derelict space station, five empty hibernation capsules thick with frost lining the wall behind, one capsule open, the black void of space pressing against the viewport, crushing isolation and the slow dread of a terrible truth, cyberpunk hacker aesthetic",
  },
  {
    id: "8-1",
    prompt: "a frost-rimmed hibernation capsule with its lid just opened, a main console nearby demanding authentication, a blinking mission-log entry glowing in one corner of the screen, five other capsules behind it caked with thick ice, cold blue emergency lighting in a silent station module, cyberpunk hacker aesthetic",
  },
  {
    id: "8-2",
    prompt: "a life-support console displaying a long oxygen-consumption graph that drops sharply then flatlines low, a reserve oxygen valve with a worn faded label wrapped around its handle, frost creeping across the metal walls of a quiet station module, the chill of dwindling air, cyberpunk hacker aesthetic",
  },
  {
    id: "8-3",
    prompt: "a communications module transmitter with an unfinished distress message frozen on its screen, an emergency-channel manual taped to the casing, cables and antenna controls in dim instrument glow, the lonely hum of a station broadcasting into empty space, cyberpunk hacker aesthetic",
  },
  {
    id: "8-4",
    prompt: "the interior wall of an open hibernation capsule covered in five names and a single date scratched in with fingernails, this capsule alone free of frost while the others stay iced over, a lock screen glowing faintly with a final personal memo, the heavy quiet of an accepted sacrifice, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.8 '우주 정거장'" });
