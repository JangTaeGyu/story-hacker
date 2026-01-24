const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-1",
    prompt: "Dark mysterious illustration of a shadowy suspicious neighbor figure peeking through apartment window blinds at night, silhouette only, ominous green glow from behind, urban apartment building setting, voyeuristic tension, cyberpunk hacker aesthetic",
  },
  {
    id: "1-1",
    prompt: "a dropped smartphone lying on a park bench, screen cracked slightly with green glow leaking out, night time park setting, empty bench under dim streetlight, cyberpunk hacker aesthetic",
  },
  {
    id: "1-2",
    prompt: "a digital notepad app with a large glowing padlock in center, a cute cat silhouette faintly visible behind the lock screen, smartphone interface aesthetic, layered digital screens, cyberpunk hacker aesthetic",
  },
  {
    id: "1-3",
    prompt: "a hidden photo gallery with rows of blurred secret photos, a large 6-digit PIN lock overlay glowing in the center, mysterious forbidden folder concept, layered digital interface, cyberpunk hacker aesthetic",
  },
  {
    id: "1-4",
    prompt: "a final locked folder with evidence photos peeking out, dramatic reveal moment, golden light breaking through digital cracks, alphabet cipher symbols floating faintly around (A=1 B=2 style), cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.1 '수상한 이웃'" });
