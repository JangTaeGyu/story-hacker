import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 17,
  title: "The Resistance",
  subtitle: "Chapter 7: An Alliance Begins",
  difficulty: 3,
  mode: "story",
  previousEpisode: 16,
  synopsis: "ShadowNet has fallen and Phantom is gone. Out of the ashes, the survivors gather again. This time under nobody's orders but our own will.",
  epilogue: `Three sets of coordinates came up on the screen.

Ghost whistled low. "HQ floor 52, the northern data centre, the lab on basement five. All three at once?"

"Eleven days to D-Day," said Byte. "And there are five of us."

Spark spoke for the first time. "Then someone goes alone." Nobody answered, and he shrugged. "I'll go. I work alone anyway."

Neon looked at me. I nodded. That night, for the first time, Phoenix did not sleep.`,
  stages: [
    {
      id: 1,
      title: "Regrouping",
      story: `Two days since the night of the betrayal. I stood on the cold concrete of a shut-down factory at the edge of Neo City. Grey light fell through broken skylights, and footsteps gathered one by one between the rusting machines.

Neon was there first. Then unfamiliar faces — Ghost, who moves through anything; Byte, who is said to chew through ciphers; Spark, who brings circuits back to life with a fingertip. We looked into each other's eyes for a long time. The silence only survivors know.

"We need a name," said Ghost. "A bird that rises again out of ash. PHOENIX."

Byte tapped at a terminal. "Then we take the org code from it too. Count the seven letters of PHOENIX in order, and lay a Fibonacci number on each position. First letter gets the first Fibonacci, second letter the second... then add all seven."`,
      clue: `[Byte's note]
"Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21 …
 PHOENIX is seven letters.
 Sum the Fibonacci numbers corresponding
 to letter positions 1 through 7."`,
      hint: "Forget the letters themselves. What matters is position. Seven letters, so take only the first seven numbers of the Fibonacci sequence and add them all together.",
      lockType: "pin2",
      answers: ["33"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The New Headquarters",
      story: `Phoenix was born that way. With one name we became an organisation again.

Spark brought a generator back to life, and Byte started laying the new headquarters security into an office deep inside the factory. Monitor light washed his face blue.

"We need a master key," Byte said. "Simple gets broken. I'm going to weave every number we own into it."

He turned the generator screen toward me. "The numbers we have are five people, and the one thing we tore out of the last job. The rest is in this city's name."

The formula sat on the screen.`,
      clue: `[Master key generator]
"KEY = (member count^2 + project code) × city code
 member count = 5
 project code = 198
 city code = NEO → N(14)+E(5)+O(15)"`,
      hint: "Finish inside the brackets first. Square the member count and add the project code; work out the city code by summing the alphabet positions of the three letters NEO, and multiply at the end.",
      lockType: "pin4",
      answers: ["7582"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The OmniCorp Insider",
      story: `Just as the headquarters was settling, an unexpected signal came in. Beyond an encrypted channel, a shaking voice.

"I'm an OmniCorp researcher. I can't take part in Project X any longer. I want to help."

It could be a trap. Byte started a trace immediately and I demanded identification. Anyone reaching a hand out of the enemy's arms has to prove themselves.

Instead of an answer they sent an employee number and the internal conversion table. "Verify me with this. It is all I have to give you."

Byte glanced at the screen and said, low: "That's a genuine OmniCorp internal document. A forgery would have been made better than this."`,
      clue: `[Anonymous channel]
"Employee number A7K9 — apply the internal conversion table.
 A=10, 7=7, K=11, 9=9.
 Add the four values,
 then round the square root of that sum to a whole number.
 Enter as two digits — pad the front with zero."`,
      hint: "First convert the four characters to numbers and add them for a small two-digit total. Think about which whole number squared sits closest to it. If the result is one digit, put a zero in front to fill two boxes.",
      lockType: "pin2",
      answers: ["06"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "Decisive Intelligence",
      story: `The insider called themselves 'Delta'. The night their identity checked out, a file from Delta froze the air in the headquarters.

"Full activation of Project X is confirmed for 3 February 2087. That is 11 days to D-Day."

Eleven days. That was the time left before an entire city's brainwaves passed into OmniCorp's hands. Neon's hand stopped over her terminal, and Ghost said nothing at all.

"To stop it you must disable three servers simultaneously. Location file attached." Delta's message continued. "I built the password from numbers you already know. I only added one of my own."

The generation rule was attached to the file's lock screen exactly as written.`,
      clue: `[Delta's attached file]
"Lock = D-Day × server count × team size + Delta code
 D-Day = 11 days, servers = 3, team size = 5
 Delta code = 37"`,
      hint: "Handle all the multiplication first and add the Delta code last. Multiply the three numbers through in turn, then lay 37 on top.",
      lockType: "pin3",
      answers: ["202"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
