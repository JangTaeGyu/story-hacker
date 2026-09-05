import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 12,
  title: "Corporate Recon",
  subtitle: "Chapter 2: The First Target",
  difficulty: 2,
  mode: "story",
  previousEpisode: 11,
  synopsis: "ShadowNet's first official job. You put a toe inside the outer servers of OmniCorp, the giant that holds Neo City in its fist. Only reconnaissance, they say — but inside the folder you open is a name you were never meant to see.",
  epilogue: `We fixed the location of server room B and walked out through the lobby.

Outside, Neon went to light a cigarette, then stopped and looked at me. "Your hands are shaking."

"Do you know what Project X is?" I asked.

She did not answer for a long time. Then she put the lighter back in her pocket. "No. But Phantom does."

That night I read the report three more times. Those five words — *Phase 2 in progress* — stayed behind my eyes even when I shut them.`,
  stages: [
    {
      id: 1,
      title: "The OmniCorp Lobby",
      story: `ShadowNet headquarters. Under a ceiling of exposed pipes, the leader 'Phantom' began the briefing.

"OmniCorp." The air thickened when he said it. The corporation that rules Neo City. Today's work is only reconnaissance — leave one footprint on their external server.

Neon handed me a tablet. She had already dug out the visitor Wi-Fi password for the OmniCorp lobby.

"Not the number itself," she shrugged. "They twisted the founding year once. Nice warm-up for a rookie."`,
      clue: `[NEON] Recon note
"OmniCorp visitor Wi-Fi — the password hides in the founding year 2045.
Take the four digits 2, 0, 4, 5 and 'square' each one,
then add all the results together. That sum is the access key."`,
      hint: "Pull the four digits of the year apart and multiply each one by itself. Remembering that one of them is a zero makes the arithmetic lighter — then it is only a matter of gathering the four.",
      lockType: "pin2",
      answers: ["45"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Visitor Terminal",
      story: `Once the Wi-Fi connected, the tablet flooded with OmniCorp's blue logo.

In a dusty corner of the lobby I logged into a visitor terminal. It greeted me, then immediately demanded employee authentication. Helpfully, the screen displayed how to work out today's code.

Subtract the outside temperature from the number of floors, it said. It looked simple, but I read it twice. The word 'below zero' snagged on something.

Subtract a negative and the thing grows instead. That one line from school, and I never expected to use it here.`,
      clue: `[OmniCorp Visitor Terminal]
"Employee authentication required — [Today's code]
Subtract the current outside temperature (9 degrees below zero)
from the headquarters floor count (52 floors).
Note that the temperature is below zero."`,
      hint: "The formula 'subtracts' the temperature from the floor count. Only remember that the temperature is below zero — subtracting a negative flips the sign.",
      lockType: "pin2",
      answers: ["61"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Hidden File",
      story: `Terminal access granted. Skimming the public folder open to visitors, one file caught on my eye that did not belong there.

[secret_01.enc] — an encrypted file. As though someone had spilled it into the public folder by mistake. My heart went a beat faster.

A note was hidden in the file metadata. A hint that was almost a joke: unwind the company name into numbers.

Except there was one condition. Not all of them — only the primes. I traced the numbers one at a time with a finger.`,
      clue: `[secret_01.enc] metadata note
"Lock hint: this file is split into six pieces.
Of the piece numbers 15, 23, 33, 29, 8, 21,
pick only the 'primes' and add them all together."`,
      hint: "A prime divides only by 1 and itself. Test the six one by one against 2, 3 and 5, and only two survive.",
      lockType: "pin2",
      answers: ["52"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "Project X",
      story: `The file opened. Between the black redaction bars filling the screen, one word survived and stared back at me.

[PROJECT-X PROGRESS REPORT]. Budget and objective were both censored, but the words 'Phase 2 in progress' stood perfectly clear. Cold ran down my back.

At the bottom of the report was the location of the server room holding the next file. Draw the access code from the report's date, it said.

The date was 25 December. Cram that date into four boxes like a digital clock. I steadied my breath and put my hand on the keypad.`,
      clue: `[PROJECT-X PROGRESS REPORT — bottom]
"Next file: Server room B-███
Access code: take this report's date (25 December)
and join month first, day second, like the HHMM display on a digital clock."`,
      hint: "Slot the report's month and day into the hour and minute positions of a digital clock — do not add, do not twist, just fill four boxes with what you see.",
      lockType: "pin4",
      answers: ["1225"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
