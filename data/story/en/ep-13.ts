import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 13,
  title: "The Pursuer",
  subtitle: "Chapter 3: Footprints in the Shadow",
  difficulty: 2,
  mode: "story",
  previousEpisode: 12,
  synopsis: "OmniCorp has noticed the intrusion. A back-trace begins, and Zero runs into the dark, erasing his own footprints as he goes. Waiting at the safe house is one small box left by Neon.",
  epilogue: `The box held compressed rations, a first-aid kit, and one spare comms chip.

Under the chip was a second note. "This one's on my frequency. If anything happens, call me on it. Nobody else can hear."

I put the chip in my pocket and sat by the window. Twice the red dot of a tracking drone crossed the rain. The third time, it did not come.

I slept a little before dawn. It was my first night on the run, and somehow I did not feel alone.`,
  stages: [
    {
      id: 1,
      title: "The Warning",
      story: `Before dawn the next day, the comms chip vibrated like something possessed.

[PHANTOM]: Emergency. OmniCorp detected last night's intrusion. The short sentence saying the back-trace had already begun flashed like a blade in the dark.

My stomach dropped. The footprints I left become my location. With shaking hands I opened the log deletion terminal.

To confirm the wipe I needed a verification code. Phantom had leaked the direction in the last line — take today's date and grow it threefold.`,
      clue: `[Log Deletion Terminal]
"Deletion confirmation code required.
Read today's date (16 January) as one lump, like '116',
then multiply that number by 3. That value is the confirmation code."`,
      hint: "Join today's month and day into a single number on one line, then think of stacking that number three times over — multiplication is only repetition of the same number.",
      lockType: "pin3",
      answers: ["348"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Safe House",
      story: `The logs were gone, but the pursuers' signal kept closing. Even the shadows in the alley seemed to be chasing me.

[NEON]: Zero, get to the safe house. The address she sent was a number in Sector D of Neo City. I ran through the rain to reach it.

I stood at the door lock. Neon had not simply told me the code. She had written our organisation's name backwards, she said, and told me to pull letters out of it.

She had left our private rule as well. T is 8, N is 0, O is 3, A is 4. I wiped the rain from my eyes and pressed the keypad.`,
      clue: `[NEON] Door lock note
"SHADOWNET read backwards is TENWODAHS.
Pull out the 1st, 3rd, 5th and 7th letters in order — T, N, O, A.
Our rule: T=8, N=0, O=3, A=4. Fill the four boxes exactly."`,
      hint: "Write the name out backwards first, then count off letters one, three, five and seven. Copy Neon's letter-to-number table across one box at a time — there is nothing to calculate.",
      lockType: "pin4",
      answers: ["8034"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Hidden Clue",
      story: `Once the safe house door shut, I could finally breathe. In a corner of the narrow room sat the emergency supply box Neon had brought ahead of me.

A small padlock was fastened to it, with a handwritten note stuck on top. Her particular crooked lettering.

The note took me back to the day we met. The convenience store camera code I solved that night — 4272. Neon wanted those four digits added one by one.

Tired as I was, a faint smile came. This was less a password than a greeting only the two of us knew.`,
      clue: `[NEON] Supply box note
"To Zero.
The password is in the convenience store code 4272 you solved
the day we first met.
Break those four digits apart and add 4 and 2 and 7 and 2 together.
- Neon"`,
      hint: "Separate that old four-digit code into single digits. After that it is only stacking them up — forget place value and look at the digits themselves.",
      lockType: "pin2",
      answers: ["15"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
