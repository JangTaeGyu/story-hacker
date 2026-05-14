const { generateImages } = require("./lib/replicate");
const { buildPrompts } = require("./lib/prompt");

const prompts = buildPrompts([
  {
    id: "ep-3",
    prompt: "An empty school after hours with one flickering fluorescent light in a long corridor, a teachers' office door ajar with a glowing tablet on a desk inside, hushed suspenseful mood that hides a warm secret, cyberpunk hacker aesthetic",
  },
  {
    id: "3-1",
    prompt: "a teacher's tablet left powered on a cluttered office desk showing a lock screen, a handwritten sticky note stuck beside it, dim after-hours light from a flickering hallway lamp, quiet empty staff room, cyberpunk hacker aesthetic",
  },
  {
    id: "3-2",
    prompt: "an art club room door with a faded founding poster beside it, a metal locker secured with a dial combination padlock, a small handwritten hint note taped next to the lock, dim corridor light, dusty creative atmosphere, cyberpunk hacker aesthetic",
  },
  {
    id: "3-3",
    prompt: "an old USB drive wrapped in a handkerchief inside an opened locker, a small sticker on its side, a laptop nearby showing a password prompt for a video folder, warm hidden-gift mood, soft glow in a dim art room, cyberpunk hacker aesthetic",
  },
]);

generateImages(prompts, { label: "EP.3 '학교의 미스터리'" });
