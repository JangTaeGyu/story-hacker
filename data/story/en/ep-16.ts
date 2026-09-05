import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 16,
  title: "The Weight of Truth",
  subtitle: "Chapter 6: A Chain of Betrayals",
  difficulty: 3,
  mode: "story",
  previousEpisode: 15,
  synopsis: "The moment the true shape of Project X is revealed, a deeper betrayal inside ShadowNet surfaces alongside it.",
  epilogue: `We finally stopped under an overpass at the edge of the city.

Neon pushed her wet hair back. "So what now?"

Instead of answering I took out my comms chip. Deleting Phantom's channel took three seconds. Five years of leadership, gone from a list in three seconds.

"The organisation is finished," I said. "So we build a new one."

Through the rain, floor 52 of the OmniCorp tower was still burning bright. I looked at that light for a long time.`,
  stages: [
    {
      id: 1,
      title: "A Shocking Find",
      story: `Decryption finished and the file opened. Reading down the screen, my hands shook and stopped over the keyboard.

[PROJECT-X: NEURAL CONTROL PROTOCOL]
Objective: manipulate citizens' brainwaves to achieve total social control
Phase 1: medical chip distribution - complete
Phase 2: network integration - in progress
Phase 3: full activation - D-███

A plan for OmniCorp to reach directly into the heads of an entire city. Phase 1 was already finished.

I went to send it straight to Phantom, and found one more encrypted file caught inside the folder. Its lock hint pointed at the project's own name.`,
      clue: `[Secondary file lock hint]
"Convert the letter X in the project name to its alphabet position number.
 Raise that number to the power of this project's phase count."`,
      hint: "First find where X falls in the alphabet. Then multiply that number by itself as many times as there are phases — that is, three of the same number multiplied together. Work step by step, multiplying the running result by the number again.",
      lockType: "pin5",
      answers: ["13824"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Hidden Name",
      story: `The second file came loose. And the single line of its title stopped my breath.

[INTERNAL COLLABORATOR - CONFIDENTIAL]
Codename: PHANTOM
Role: surveillance of dissident forces and provision of intelligence
Retainer: ████ CREDITS

PHANTOM. Our leader was OmniCorp's man on the inside. Viper was bait, and the real traitor had been above our heads from the very beginning.

A video was attached to the file. Playing it needed a code, and that code was locked inside the name 'PHANTOM'.`,
      clue: `[Video lock hint]
"Convert each of the seven letters of PHANTOM to its alphabet position number.
 Subtract the smallest of those numbers from the largest."`,
      hint: "Write out every letter of PHANTOM as its alphabet position. Pick only the largest value and the smallest, and subtract the small from the large. The remaining letters go unused.",
      lockType: "pin2",
      answers: ["19"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "Neon's Choice",
      story: `The video played. Phantom shaking hands with an OmniCorp executive, laughing, taking an envelope. The picture was rough, but the truth was sharp.

Behind me I heard Neon's voice. It was shaking.

"I'm sorry, Zero. I... knew as well. But I didn't want to drag you in. I wanted to protect you."

Betrayal on top of betrayal. I could not answer. This was not the moment for feelings. The emergency exit lock had to come off first. The code rule was on the panel.`,
      clue: `[Emergency Escape System]
"Code = the 'hour' and the 'minute' of the current time 03:47 multiplied together,
 plus the absolute value of the current floor B3, read as the negative number -3."`,
      hint: "First multiply the number for the hour by the number for the minutes. Then take basement level 3 as -3 and add its absolute value — its size without the sign — to that product.",
      lockType: "pin3",
      answers: ["144"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "A New Beginning",
      story: `We came out through the escape route and ran with Neon toward the edge of the city. Rain-soaked alleys fell away fast behind us.

Catching her breath, Neon spoke. "If Phantom is the traitor... what about the other ShadowNet members? Did they know too, or are they in danger as well?"

I had no answer. But at least I could send a warning. Once we had somewhere safe, we needed to fire an encrypted message to the remaining members.

[ENCRYPTED MESSENGER]
The emergency code rule came up on screen. 'TRAITOR' — that word itself was the raw material.`,
      clue: `[Emergency code generation rule]
"Pick out only the consonant letters from the word TRAITOR.
 Convert each of them to its alphabet position number and add them all."`,
      hint: "Remove the vowels (A, I, O) from TRAITOR and only the consonants are left — take care, some letters appear twice. Convert every remaining consonant to its alphabet position and add them all, once for each appearance.",
      lockType: "pin2",
      answers: ["76"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
