import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 3,
  title: "The School Mystery",
  subtitle: "A Light in the Staff Room",
  difficulty: 1,
  mode: "story",
  synopsis: "The exam is tomorrow, and someone has spread word that the whole paper has leaked. I go into the empty staff room to find out — and meet a secret far warmer than the rumour.",
  stages: [
    {
      id: 1,
      title: "The Teacher's Tablet",
      story: `After class, the school was unnaturally quiet.

A single fluorescent tube flickered in the corridor, and my trainers squeaked far too loudly. "The whole exam paper leaked." The rumour from lunchtime would not leave my head. If it were true, pretending not to know felt like the greater unfairness.

The staff room door was unlocked. On Mr Kim's desk a tablet lay with its screen still lit. Behind that lock screen there might really be exam material.

Stuck to one side of the desk was a sticky note, apparently in his own hand. A reminder so he would not forget his own password.`,
      clue: `The sticky note on the desk:
"Students in my class: 28
 Subjects I teach: 3
 Password is these two multiplied!
 (Enter as four digits)"`,
      hint: "Multiply the number of students by the number of subjects. If the result is shorter than four digits, pad the front with zeros.",
      lockType: "pin4",
      answers: ["0084"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Club Room Padlock",
      story: `There was nothing on the tablet that looked like a leaked paper.

Instead, a folder called 'Art Club — Graduation Works' sat open. A note inside read: "Original files backed up in the club room locker." Not exam papers. Paintings by the leaving seniors.

I went to the art room. A faded founding poster hung beside the door, and the locker was shut with a dial padlock. Someone had left a small hint next to it.

The rumour was turning into a different shape entirely. I put my hand on the dial.`,
      clue: `A handwritten hint beside the locker:
"Art Club founded in 2019.
 The padlock number is the founding year
 turned back to front!"`,
      hint: "Read the four digits of the founding year from the last one backwards. Nothing to add or calculate — only the order changes.",
      lockType: "pin4",
      answers: ["9102"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "What Was on the USB",
      story: `There were no exam papers in the locker. No answer key either.

An old USB stick lay wrapped in a handkerchief. A small sticker was stuck to its side, and when I plugged it in, a password box appeared. The sticker was the hint.

Past the password, a folder of videos opened. Messages from the graduating art club members, one for each of the juniors they were leaving behind. The rumour about the leaked exam had been a lie, told by someone afraid this surprise would be found out.

On screen, a senior waved and grinned. I sat in the art room chair for a long time.`,
      clue: `The sticker on the USB:
"Graduation work no. — MCMXCIV
 M=1000, D=500, C=100, L=50, X=10, V=5, I=1
 A smaller numeral before a larger one means subtract!
 Enter it as four Arabic digits"`,
      hint: "Read it left to right in chunks. MCM is 1000 plus 900, and XC is 100 minus 10, which is 90. Read the final IV by the same rule.",
      lockType: "pin4",
      answers: ["1994"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
