import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 19,
  title: "Phantom's Counterstrike",
  subtitle: "Chapter 9: The Final Confrontation",
  difficulty: 3,
  mode: "story",
  previousEpisode: 18,
  synopsis: "An instant before the shutdown code goes in, every screen dies. And he comes back. Only one of us can end this — him, or me.",
  epilogue: `The epilogue file held one video. A recording from five years ago, the day Phantom founded ShadowNet.

A younger man smiling into the camera. "This city will sell what's inside people's heads. We stop it."

I watched it to the end. Then I helped him to his feet.

"I'm going to report you," I said.

"You should," he answered. For the first time, there was something like relief in his voice.

Outside it was dawn — the first light in Neo City I had ever seen that was not neon.`,
  stages: [
    {
      id: 1,
      title: "An Unexpected Arrival",
      story: `The moment my finger touched the last key, the world went out.

The light of the core server, the characters on the terminal, Neon's face — all swallowed by the dark. And when the emergency lamps came on, he was standing there.

"It's been a while, Zero." Phantom. "I knew you'd come this far. In fact... I waited."

An emergency stop device sat in his hand. Until that released, the shutdown was impossible.

"Let's play a fun game." Phantom smiled. "First lock. The years I led ShadowNet, the number of organisations I betrayed, and the digit count of the money I took — multiply all three together. Five years, three of them, eight digits. That's your answer."`,
      clue: `[Emergency stop device — lock 1]
"Code = years led × organisations betrayed × digit count of money taken
 years led = 5
 organisations betrayed = 3
 digit count of money taken = 8"`,
      hint: "Nothing complicated. Multiply the three small numbers in turn. Multiply two first, then bring the remaining one in.",
      lockType: "pin3",
      answers: ["120"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "Shadows of the Past",
      story: `The sound of the first lock releasing. Phantom's eyes did not waver.

"Second problem. But first, let me ask you something. Why did you become a hacker, Zero?"

I did not answer. I could not.

"I know." Phantom's voice dropped. "Your family. 2082, that OmniCorp 'medical accident'... your parents were there. You remember the case number, don't you? 82-7-15-A."

He held the device out. "Add up only the numbers in that case number. Then convert the A at the end to its alphabet position and add that too. That's the second code. You'll be entering your own past."`,
      clue: `[Emergency stop device — lock 2]
"Case number 82-7-15-A
 Add all the numeric parts together,
 and convert A to its alphabet position (A=1) to include in the sum."`,
      hint: "The first three chunks add straight in as numbers. Only the final A needs working out — find where it falls in the alphabet and add that small number on.",
      lockType: "pin3",
      answers: ["105"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Moment of Choice",
      story: `The second lock released. For the first time Phantom's face set hard.

"Last one. This will be a little harder," he said. "You can stop me, Zero. But there's a price."

A red timer appeared on the wall. 02:00. Two minutes.

"If the last code isn't in before that, Project X activates immediately." Phantom's voice sped up. "The code is — from the timer's 120 seconds, subtract the digit sum of 4272, that convenience store code that was your first key. Then work out separately the Phoenix code 33 minus our member count of 5. Multiply those two."`,
      clue: `[Emergency stop device — lock 3]
"Code = (timer seconds − digit sum of 4272) × (Phoenix code − member count)
 timer seconds = 120
 Phoenix code = 33, member count = 5
 4272 is the convenience store code that was your first key."`,
      hint: "Finish each bracket separately. The left one subtracts the sum of 4272's four digits from 120; the right one takes 5 from 33. Multiply those two results together.",
      lockType: "pin4",
      answers: ["2940"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "Release",
      story: `The device released. Phantom sank to his knees and slowly settled there.

"Well done... Zero." There was no anger in his voice and no regret. Only the breathing of a tired man. "The truth is, I'm exhausted. Maybe I wanted out of this game. Maybe... I was hoping you would end it."

Three servers fell silent at the same moment.

[SYSTEM] PROJECT-X deactivation complete.

Neon gripped my shoulder. "You did it, Zero. We did it." And in that moment, an epilogue file surfaced on the terminal. The viewing code — "Pick out only the vowels in the word FREEDOM. E, E, O. Add their alphabet positions, then multiply by 87, the year we were set free."`,
      clue: `[Epilogue file viewing code]
"Extract only the vowels of FREEDOM → E, E, O
 Sum the alphabet positions of each vowel
 then multiply by the year of liberation (87)."`,
      hint: "Throw away every consonant and keep only the three vowels. Add their alphabet positions to make a small number, then multiply by 87 once and you are done.",
      lockType: "pin4",
      answers: ["2175"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
