import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 6,
  title: "The Café Mystery",
  subtitle: "After Closing Time",
  difficulty: 1,
  mode: "story",
  synopsis: "The barista at my regular café stopped coming in one day. The owner says he simply quit — but under the seat where he always sat, I find the note he left behind.",
  stages: [
    {
      id: 1,
      title: "Beyond the Wi-Fi",
      story: `I come here every day. Do-yun the barista always knew my order by heart. And now, for a week, he has not been here.

I asked the owner. "He quit, suddenly" — that was all. He said it too fast. The way a person speaks when they are covering something.

I sat in my usual seat by the window and opened my laptop. The Wi-Fi had dropped. I need to enter the password again, and the posters around the café will tell me what it is.`,
      clue: `Poster beside the counter:
"Our café Wi-Fi = the number in our name!
 Shop name: CAFE 2580
 Just the four digits, exactly as written~"`,
      hint: "Copy the number in the shop's name exactly. Discard the letters and keep the four digits.",
      lockType: "pin4",
      answers: ["2580"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Staff Only Door",
      story: `Once I was on the Wi-Fi, the notes on the shared account Do-yun used synced through. The last one was short. "That thing in the staff room — I hope the owner never finds it."

On the way to the toilet there is a door marked STAFF ONLY. Whatever Do-yun meant is behind it.

There is a keypad on the door, and beside it a note the staff put up so nobody would forget. Know the opening hours and you can open this lock.`,
      clue: `Note beside the door:
"Staff door code = opening time and closing time, joined as four digits.
 Hours: 09:00 ~ 22:00"`,
      hint: "Read the opening hour and the closing hour as two digits each, and set them side by side in that order. No arithmetic — exactly as they are.",
      lockType: "pin4",
      answers: ["0922"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Safe Behind the Coffee Sacks",
      story: `The staff room was narrow and dim. In the corner behind stacked sacks of beans sat the thing Do-yun meant — a small safe. And on top of it, his last note.

"The owner is forging the import papers for the beans. The real ledger is in here. If I disappear, I hope somebody looks at this."

The safe takes six digits. Below the note, Do-yun wrote out how to build the code himself. It uses the bean deliveries he counted every month.`,
      clue: `Lower down the note:
"The safe code is this month's intake.
 Ethiopia 47kg, Colombia 12kg, Guatemala 85kg.
 The origins don't matter —
 write them two digits each, smallest amount to largest."`,
      hint: "Line the three numbers up again by size — not the order on the note, but from the smallest amount upward. Two digits each, joined together, fills six boxes.",
      lockType: "pin6",
      answers: ["124785"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
