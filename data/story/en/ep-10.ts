import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 10,
  title: "The Time Capsule",
  subtitle: "To the Us of Ten Years Ago",
  difficulty: 1,
  mode: "story",
  synopsis: "One New Year's Day the winter before graduation, we buried a time capsule under the maple in the schoolyard. Ten years on I dig it up again, and undo one by one the three locks our younger selves left behind.",
  epilogue: `In the video the three of us are holding the camera far too close, so all our faces are warped.

"In ten years we all meet here and watch this!" my twelve-year-old self shouts. Ji-u laughs somewhere behind, and Han-byeol covers the lens with a finger.

I called them both that evening. Ji-u answered in three hours. Han-byeol took three days.

That winter the three of us stood under the maple again. We did not bury anything this time. We just stood there a long while.`,
  stages: [
    {
      id: 1,
      title: "Ten Years Buried",
      story: `The schoolyard looked smaller than I remembered.

The maple was unchanged. I dug beneath it, and a rusted steel capsule shrugged off the soil. Ten years ago, on New Year's Day before graduation, the three of us buried it here.

A dial padlock was fastened to it. Back then we deliberately wrote the number down and laughed — "obviously we'll remember in ten years." And now the digits would not come.

Luckily a note in marker pen still survived on the side of the capsule, the childish letters blurred by rainwater.`,
      clue: `Note on the side of the capsule:
"The day we buried this: 1 January 2015.
 Password is the month and day we buried it, four digits!
 - from us, on New Year's Day"`,
      hint: "Take the date the capsule went into the ground and drop the year. Two digits for the month, two for the day, into four boxes.",
      lockType: "pin4",
      answers: ["0101"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Sealed Envelope",
      story: `The padlock gave, and the lid creaked open.

Inside were a few faded photographs, a dried four-leaf clover, and one tightly sealed envelope. Across the front, in my own hand: 'To me, ten years from now'.

Over the seal hung another small number lock. My younger self clearly had a taste for mischief. The solution was written on the back of the envelope.

Working out how old I had been made my nose sting.`,
      clue: `Written on the back of the envelope:
"You opening this are definitely a grown-up now.
 Password is 'my age then + 10'.
 PS. In 2015 I was 12.
 (Enter as four digits!)"`,
      hint: "Add 10 to the age you were the year the capsule was buried. If the result falls short of four digits, pad the front with zeros.",
      lockType: "pin4",
      answers: ["0022"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Three of Us on a USB",
      story: `By the time I finished the letter my hands were shaking.

There was more than paper in that envelope. A palm-sized USB stick had been tucked in with it, a small note stuck to the side. When I put it into my laptop, a video folder asked for a password.

The note explained that this was the last video the three of us filmed the day we buried the capsule. The password was the number that ties the three of us together.

Once the screen opens, twelve-year-old versions of us will wave again. I pressed the digits slowly.`,
      clue: `The note stuck to the USB:
"This video belongs to the three of us.
 Password is the last two digits of our birth years,
 written in our number order.
 No.1 me 2003, No.2 Ji-u 2002, No.3 Han-byeol 2003."`,
      hint: "Drop the leading '20' from each birth year and keep the last two digits. Do not add them — just join them in order, one to three, and you have six digits.",
      lockType: "pin6",
      answers: ["030203"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
