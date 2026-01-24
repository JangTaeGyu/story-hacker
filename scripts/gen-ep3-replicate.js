const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-3",
    prompt: "Dark mysterious illustration of an empty school hallway at night, lockers lining the walls with one slightly open emitting green glow, scattered exam papers on the floor, eerie silence and mystery atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "3-1",
    prompt: "a teacher's tablet device lying on a cluttered staff room desk, sticky notes and memos scattered around, the tablet screen glowing with a lock icon, dim desk lamp lighting, after-hours school office atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "3-2",
    prompt: "a row of school club room lockers with one locker highlighted by a glowing padlock, an art club poster on the wall nearby, paint brushes and art supplies faintly visible, cyberpunk hacker aesthetic",
  },
  {
    id: "3-3",
    prompt: "a small USB flash drive glowing with emerald green light on a dark wooden desk, digital alphabet letters A B C and numbers 1 2 3 floating gently around it, abstract dark digital background, neon emerald green and dark navy color palette, dark moody atmosphere, no text, no people",
  },
]);

generateImages(prompts, { label: "EP.3 '학교의 미스터리'" });
