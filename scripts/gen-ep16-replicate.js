const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-16",
    prompt: "Dark cyberpunk noir illustration of a shattered hacker crew emblem, a leader silhouette dissolving into glitching data revealing the codename PHANTOM beneath, holographic screens exposing a mind-control conspiracy file, a smaller figure fleeing through a rain-soaked neon alley toward the city outskirts, chain-of-betrayal atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "16-1",
    prompt: "a decrypted classified file glowing on a terminal screen titled PROJECT-X neural control protocol, diagrams of medical chips and brainwave manipulation across a city, a redacted activation countdown, a second locked encrypted file pulsing in the folder, horror and dread in the cold monitor light, cyberpunk noir aesthetic",
  },
  {
    id: "16-2",
    prompt: "a terminal screen displaying a classified internal collaborator file with the codename PHANTOM in bold, role and redacted contract payment listed, an attached locked video file icon, devastating reveal of the leader's true identity, cold blue screen glow in a dark room, cyberpunk hacker aesthetic",
  },
  {
    id: "16-3",
    prompt: "a grainy surveillance video paused on a holographic screen showing a handshake and an envelope exchange between figures, a glowing red emergency exit lockpanel with code rules on a basement B3 floor, betrayal upon betrayal tension, dim trembling light, cyberpunk noir aesthetic",
  },
  {
    id: "16-4",
    prompt: "a rain-soaked neon back alley on the city outskirts, a portable encrypted messenger device glowing with an urgent code-generation screen displaying the word TRAITOR, wet pavement reflecting distant megacity neon, breathless escape and uncertain new beginning, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.16 '진실의 무게'" });
