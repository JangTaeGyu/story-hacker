import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 4,
  title: "The Detective Agency",
  subtitle: "The Client Who Vanished",
  difficulty: 2,
  mode: "story",
  synopsis: "A woman held out her request form with shaking hands, said she was going to the toilet, and walked out of the office. She never came back. Only her phone is left on the desk.",
  stages: [
    {
      id: 1,
      title: "The Phone She Left",
      story: `The client could not stay in the chair five minutes. She introduced herself as Kim Sa-wol and said someone had been following her. Then she said the details could wait until next time, and asked where the toilet was.

That was forty minutes ago. The one at the end of the corridor was empty, and the ground floor CCTV shows her walking into the building and never walking out.

Her phone is still sitting on my desk. Three unread messages on the screen. I have to unlock it to learn who was after her.

Fortunately, in one corner of the request form she left behind, there is a small note in her own hand.`,
      clue: `A note in the corner of the form:
"Phone code - the usual one.
 Born in April, so 'Sa-wol' — April.
 My birthday is my name, so I never forget."`,
      hint: "She said her name is her birthday. 'Sa-wol' means April, and she was born in it. Write the month and the day, two digits each.",
      lockType: "pin4",
      answers: ["0404"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Classified Folder",
      story: `The phone opened. All three messages came from the same number, and they grew uglier as they went. "Final warning." "Don't act like you've forgotten that day." "This gets settled today."

That day. Hunting for anything that would tell me what it meant, I went through the gallery and the notes, and found a locked folder named 'CLASSIFIED'. Six digits.

The folder's creation date sits in its properties. And in her notes app she had written a hint that only she was ever meant to read.`,
      clue: `Notes app - untitled entry:
"Classified folder = the day it happened.
 17 May 2023.
 Last two digits of the year, then the month, then the day."`,
      hint: "Move the date of the incident into six boxes. The last two digits of 2023, then the month and the day, two digits each, in order.",
      lockType: "pin6",
      answers: ["230517"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "Three Suspects",
      story: `Inside the classified folder were photographs and a transcript. An accident at a company dinner, two years ago. Kim Sa-wol had been the only witness.

She had narrowed it to three people who might be threatening her, and made a separate file for them. The names were blacked out, but she had noted each of their ages. That file was locked too.

The threatening texts came before dawn. There is no time. Her own note tells me how to open it.`,
      clue: `Lock note on the suspect file:
"Code = all three ages added together.
 A is 34, B is 29, C is 28."`,
      hint: "Add the ages of all three suspects. If the total is two digits, pad the front with zeros to fill four boxes.",
      lockType: "pin4",
      answers: ["0091"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "The Culprit's Initials",
      story: `When the suspect file opened, one of the three was marked in red. She had already known who was threatening her.

The marked person's name was erased, but beside it were three initials and a rule she had invented herself. The password to the last file — the one holding the culprit's details and current location.

Six digits, and I will know where she was taken.`,
      clue: `Lock note on the culprit file:
"This person's initials are L.E.E.
 Turn letters into their place in the alphabet.
 A is 01, B is 02, ... join all three as two digits each."`,
      hint: "Convert L, E and E into their alphabet positions. Write each as two digits and run the three together.",
      lockType: "pin6",
      answers: ["120505"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
