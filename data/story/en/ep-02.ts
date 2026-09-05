import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 2,
  title: "The Missing Treasure",
  subtitle: "Grandfather's Last Riddle",
  difficulty: 2,
  mode: "story",
  synopsis: "Instead of a will, my grandfather left behind an old smartphone. From behind its screen, a man who loved riddles all his life speaks to his grandchild one final time.",
  epilogue: `There were no bankbooks in the safe, no deeds. Three handwritten letters, one for each grandchild.

Mine read: "If you are reading this, you solved them all. That is the whole inheritance. The rest I left with your father. I wanted to leave you something better than money — the stubbornness to finish a thing."

At the bottom of the envelope was an old key. It opened the desk drawer in the study where he sat all his life. It took me a long while to find the courage to use it.`,
  stages: [
    {
      id: 1,
      title: "What Grandfather Left",
      story: `After the funeral I sat alone in his emptied room.

My father, sorting through the last of it, handed me a small box. Inside was an old smartphone, its corners worn smooth. "They say the will is in there. But it's locked, and nobody can open it."

Grandfather always loved a riddle. He never simply handed over New Year's money — there was always something to solve first.

I pressed the power button, and a scanned handwritten note appeared on the lock screen. A greeting that was his to the very end. I couldn't help laughing.`,
      clue: `The note on the lock screen:
"My grandchild can manage this much, surely.
 The password is the day I bragged about all my life.
 'Born on Liberation Day — that's my pride.'
 Press the month and the day. Four digits."`,
      hint: "Recall which national holiday he was proud of all his life. The year is not needed. Only the month and the day, two digits each.",
      lockType: "pin4",
      answers: ["0815"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Safe",
      story: `The lock opened and the notes app came up first.

The will was not on paper. One line — "there is a small safe behind the living room bookcase" — and then another riddle. I pushed the bookcase aside and found it, exactly as promised, under a layer of dust.

The safe took six digits. The note spoke about the three grandchildren he doted on — Min-su, Yeong-hui, Cheol-su. It listed the year each was born and told me to draw something out of them.

I traced the words on the screen slowly with a fingertip. It felt like he was reading them aloud beside me.`,
      clue: `The note:
"This safe belongs to our three treasures.
 Min-su 2015, Yeong-hui 2018, Cheol-su 2020.
 Take the last two digits of each birth year
 and write them side by side, oldest first."`,
      hint: "Drop the leading '20' from each year and keep the last two digits. Do not add them — just line them up by age, oldest to youngest, and you have six digits.",
      lockType: "pin6",
      answers: ["151820"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
