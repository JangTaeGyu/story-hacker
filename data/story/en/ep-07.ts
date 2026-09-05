import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 7,
  title: "Hospital Escape",
  subtitle: "The Empty Bed in Room 703",
  difficulty: 1,
  mode: "story",
  synopsis: "I wake in a blacked-out hospital before dawn. I cannot remember my room number, my name, or why I am here. Beyond the locked door, someone is trying to keep me inside.",
  stages: [
    {
      id: 1,
      title: "The Bedside Tablet",
      story: `A power cut. I woke in a room lit only by the red pulse of the emergency lamps.

My head is splitting, and even who I am comes to me blurred. The patient band on my wrist has been wiped blank. The tablet by the bed is the only light still alive.

The screen wants patient identification. I tap at the keys and nothing about myself comes back to me — but a nameplate at the head of the bed catches my eye. Someone scratched it out in a hurry, and over the scoring, the ghosts of four digits remain.

Whoever erased it wanted me not to see this.`,
      clue: `The impression left in the scratched plate:
"Admitted 03 March 17 — 0317"`,
      hint: "Move the date on the plate straight into four boxes. Two digits for the month, two for the day.",
      lockType: "pin4",
      answers: ["0317"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Doctor's Chart",
      story: `The tablet opened. But my chart was empty, holding a single line — "Patient deceased. 03/24."

My hands shook. The date of death is a week after the date of admission. And I am breathing.

The door was locked from outside. Through the gap I could see a cabinet in the corridor, and on it the doctor's chart terminal. I stretched an arm through and just managed to drag it over. Below the lock screen, a note in the doctor's own handwriting was stuck on.

This is the person who recorded me as dead.`,
      clue: `Post-it on the back of the chart terminal:
"Lock = the patient's admission date (MMDD), four digits,
 then the day of death, two digits. Six in total.
 The month of death is the same as admission, so it isn't written."`,
      hint: "You need two dates. The admission date from the first room, and the date of death you just read on the chart. Four digits of month and day, then the day of death appended.",
      lockType: "pin6",
      answers: ["031724"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Drug Cabinet",
      story: `The doctor's chart opened, and my real record was inside.

I had witnessed the side effects of a drug. Several people on the same ward had died with identical symptoms, and every one had been filed as natural causes. And the last line of the doctor's note — "Witness in 703, settle with the same prescription."

Room 703. My room.

I staggered into the corridor. Beside the nursing station the drug cabinet stood half open, and inside it a syringe tray with my name on it was waiting for me. Reading the label froze the length of my spine.`,
      clue: `Label on the drug tray:
"Cabinet code — room number for administration.
 Patient: Room 703."`,
      hint: "The room number on the label is the code. It is only three digits, so pad the front with a zero to fill four boxes.",
      lockType: "pin4",
      answers: ["0703"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "The Fire Exit Code",
      story: `At the back of the cabinet I found the doctor's working notebook. On the last page, the room numbers of three dead patients stood in a row — 211, 318, 415. And beneath them, mine. 703. One line away from being added.

At the end of the corridor, only the fire exit panel glows blue. The sirens are far off. The footsteps are not.

Beside the panel hung the hospital's safety notice. Words I would have walked straight past on any other day are now the thread my life hangs from.

Add the three numbers, it said. The door they never made it through, I have to open in their place.`,
      clue: `Notice on the fire exit panel:
"Night release code =
 the sum of the room numbers of fatalities on this ward.
 (211 + 318 + 415) — enter as six digits."`,
      hint: "Add the three room numbers from the notebook. If the total falls short of six digits, pad the front with zeros. Do not add the fourth number — that has not happened yet.",
      lockType: "pin6",
      answers: ["000944"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
