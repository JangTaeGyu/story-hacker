import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 1,
  title: "The Suspicious Neighbour",
  subtitle: "A Shadow at Three in the Morning",
  difficulty: 1,
  mode: "story",
  synopsis: "The man next door leaves his flat every morning at three. A heavy bag in hand, his eyes never meeting anyone's. One day he drops a worn notebook — and it pulls me straight into his secret.",
  epilogue: `Inside the box were a letter and a bundle of hospital bills, none of them posted yet.

"Ha-eun. Your dad takes the first bus every morning so he can see you one hour longer. Let's open this box together, after you're well."

I put the notebook back where I found it and closed the door. At three the next morning I passed him on the stairs, and for the first time I spoke first. He looked startled for a second, then lifted his cap a little.`,
  stages: [
    {
      id: 1,
      title: "The Dropped Notebook",
      story: `Three in the morning. That sound woke me again.

The man in 303 is going down the stairs. The same heavy bag, the same cap pulled low. Half a year now, same hour, same shape. Every time we pass he lets his eyes drop, and something cold runs down my spine.

But tonight something is lying in the corridor. A worn notebook, small enough to hold in one palm. There is a dial lock on the cover, and in the corner, letters rubbed thin by handling — "FOR H."

Before I gave it back, I wanted to see one page. Just one.`,
      clue: `A note pressed into the inside cover:
"The password is 'HOPE'.
 Press it the way you did on an old flip phone."`,
      hint: "Before smartphones, sending a text meant hunting for letters on the number keys. Which key carried H, O, P and E?",
      lockType: "pin4",
      answers: ["4673"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "Outside Flat 303",
      story: `A photograph was tucked into the first page. A small girl smiling from a hospital bed. The sun had bleached it pale, and the corners were worn round from being looked at, over and over.

I stood outside 303 to return the notebook. The door was locked, the keypad blinking red. The corridor was silent, and my own heartbeat was the loudest thing in it.

My finger stopped short of the bell. The next page had caught my eye.

"Someone has been in my flat, I think. I should change the door code."`,
      clue: `Added below in smaller writing:
"Using the same number as the notebook is dangerous.
 So — I only reversed the order."`,
      hint: "Think of the four digits that just opened the notebook. He did not invent a new number. He turned an old one around.",
      lockType: "pin4",
      answers: ["3764"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Bag in the Living Room",
      story: `The door opened.

The flat was dark and still. Streetlight came through a gap in the curtains and lay across the floor in a long stripe. In the middle of the living room sat that heavy bag, a six-digit lock fastened through its zip.

Then I looked at the wall and forgot to breathe. Photographs, edge to edge — a park, a playground, a swing. All of them the same girl. Beside them hung a calendar drawn by hand. Almost every square was empty, and exactly one carried a red circle.

An open diary explained that circle.`,
      clue: `One line in the diary:
"Visits are one day a month. Only one.
 The next day I can hold Ha-eun again —
 Christmas, 2024."`,
      hint: "Everyone knows the date of that winter day he is counting toward. There is only one way to fit it into six boxes — the last two digits of the year, then the month and the day as they are.",
      lockType: "pin6",
      answers: ["241225"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "What the Bag Held",
      story: `The lock came free.

Inside: a teddy bear, a picture book, a pair of small trainers never once worn. Presents for someone, stacked with care. Every sheet of wrapping paper carried the mark of patient hands.

At the very bottom was a locked steel box, and on top of it a hospital wristband — "Patient: Kim Ha-eun".

Only then did I understand. He was never a man to be suspicious of. Every morning before dawn he left to catch the first bus, to buy himself one more hour of visiting time.

One box left. Open it, and I reach the end of this story.`,
      clue: `The last page of the diary:
"Ha-eun will open this box herself.
 The password is the flat we lived in together,
 the one where the sun always came in."

A few pages earlier:
"Flat 1208. Our home was always on the top floor."`,
      hint: "This is not a sum to work out in your head. The diary has already written it down. Find the place he called 'our home' again.",
      lockType: "pin4",
      answers: ["1208"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
