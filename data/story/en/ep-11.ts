import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 11,
  title: "First Assignment",
  subtitle: "Chapter 1: Birth of a Hacker",
  difficulty: 2,
  mode: "story",
  synopsis: "The back alleys of Neo City, 2087. You have no name and no face, and the hacker collective 'ShadowNet' reaches out a hand. On your first night living as codename 'Zero', three tests are waiting.",
  epilogue: `The chip woke and buzzed once against my palm.

"You're one of us now," Neon said. "Got a codename?"

I thought for a moment. I could not remember the last time anyone had called me anything.

"Zero." I said the word exactly as it had appeared on my screen.

Neon nodded and pressed the chip in behind my ear. "All right, Zero. Sleep while you still can."

Outside, the neon sign blinked once more. For the first time, I felt that this city had a place in it for me.`,
  stages: [
    {
      id: 1,
      title: "The Scout",
      story: `2087, Neo City. Neon signs bleed in the rain and blink beyond the window.

I woke in front of an old monitor. Green characters trickled down a screen I do not remember switching on. However long I stared, the sender stayed anonymous to the end.

My heart was going fast, because it meant someone had been watching me for a long time. I could have run. Instead I pulled the chair in and sat down.

My fingertips shook over the keyboard. To refuse it, I was already far too alone in this city.`,
      clue: `[SYSTEM] Anonymous sender
"Welcome, Zero. We've watched you a long while.
First job is light — put the security camera in the ground floor
convenience store to sleep for a moment.
The lock code is written all over the sign. Take the branch number 27
and the trading hours 24, join them in that order, then flip the whole
thing around. That's your first key."

(The sign outside: SEVEN24 MART, Branch 27)`,
      hint: "Take the two numbers from the sign, branch and trading hours, and set them side by side in that order. What comes next is neither adding nor multiplying — only the direction you read it changes.",
      lockType: "pin4",
      answers: ["4272"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "First Hack",
      story: `The red light on the camera went out. I had actually done it.

A new message arrived on screen. The praise was brief, and the next instruction followed immediately. The line about the real test starting now lodged itself unusually deep.

The back door of the convenience store. An older electronic lock hums faintly. I stared blankly at today's date tucked into the corner of the monitor.

The sender was kind enough to leak the direction. There is always an answer hidden inside a date.`,
      clue: `[SYSTEM] Anonymous sender
"Good. Now the real thing. Open the store's back door.
Look at today's date, bottom right of your screen — 2087.01.15 MON.
Last two digits of the year, then the month, then the day.
'Add' all three pieces together and the back door opens."`,
      hint: "Today's date splits into three pieces. Just remember you take the tail two digits of the year, not the whole thing — the rest is only putting them together.",
      lockType: "pin3",
      answers: ["103"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "First Ally",
      story: `The back door opened and a girl in a black hood slid in with the cold air.

"You're Zero, then? I'm Neon." She looked hard at my face, then smiled far too easily for someone meeting a stranger. We would be on the same team at ShadowNet, she said.

Neon handed over a chip small enough to sit in a palm. An encrypted comms chip, my first piece of kit. It needed a code to activate.

"Turn my name into numbers," she said, playing. "A is 1, B is 2... you know the one. It's not hard, rookie."`,
      clue: `[NEON] Comms chip note
"The activation code is hidden in my name, 'NEON'.
Turn letters into their position number — A=1, B=2, C=3...
Add up the numbers for all four letters, N, E, O, N, and the chip wakes."`,
      hint: "Break the name into single letters and write down only where each one falls in the alphabet. Do not miss that one letter appears twice — the rest is plain addition.",
      lockType: "pin2",
      answers: ["48"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
