import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 18,
  title: "Triple Strike",
  subtitle: "Chapter 8: Simultaneous Infiltration",
  difficulty: 3,
  mode: "story",
  previousEpisode: 17,
  synopsis: "To stop Project X, three servers must die in the same instant. Phoenix begins the most dangerous operation it has ever attempted.",
  stages: [
    {
      id: 1,
      title: "Operation Briefing",
      story: `Three days out from D-Day, the final briefing opened at Phoenix headquarters. Three coordinates glowed red on the wall screen.

Server A is the control server on floor 52 of OmniCorp headquarters. Server B is the backup on the ground floor of the northern data centre. Server C is the core server in the laboratory on basement level 5. If even one survives, Project X wakes again.

The team split. Ghost and Byte to headquarters, Spark alone to the data centre, Neon and I down into the laboratory. Nobody made a joke.

"Launch code," said Byte. "Add the absolute values of the three servers' floors — 52, 1, and basement 5. Multiply by the team size, then subtract the departure hour of 21. That is the operation launch code."`,
      clue: `[Operation launch code]
"Code = (|52| + |1| + |-5|) × team size − departure hour
 team size = 5, departure hour = 21
 Negative floors are handled as absolute values."`,
      hint: "Basement floors lose their sign and count as positive. Add the absolute values of the three floors, finish the multiplication first, then take off the departure hour at the end.",
      lockType: "pin3",
      answers: ["269"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Northern Data Centre",
      story: `The comms channel crackled and carried Spark's voice. I worried about sending him alone, but he was calm, as he always is.

"I'm here. Outside the server room. The lock is... a bit nasty."

He held his display up to the camera. In cold fluorescent characters a sequence hung there — 2, 6, 14, 30, 62, and a question mark.

"It's a maths puzzle," Spark muttered. "The rule looks simple. Do something to the previous term and you get the next. 2 to 6, 6 to 14... it's doubling the previous term and adding 2. Fill in the last term and the door opens."`,
      clue: `[Data centre lock panel]
"Enter the number that belongs in the ? position.
 2, 6, 14, 30, 62, ?
 Rule: each term = previous term × 2 + 2"`,
      hint: "No new calculation is needed. Apply the same rule once more to the term right before it — double it and lay 2 on top.",
      lockType: "pin3",
      answers: ["126"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "Floor 52",
      story: `The headquarters channel opened. Ghost's breathing was ragged.

"Floor 52. Security's heavy. There are eyes in every corridor."

Then Byte's whisper. "Found the control server. But... it's double-locked, voice recognition and a PIN."

While Byte routed around the voice check, someone had to break the PIN. A hurriedly scrawled note was stuck beside the panel.

"The PIN is — this floor number, 52, and the guard count currently deployed, 8. Work out the lowest common multiple of the two, then add up the digits of the result," Byte read down.`,
      clue: `[Note beside the control server panel]
"PIN = digit sum of LCM(floor number, guard count)
 floor number = 52, guards = 8.
 Find the lowest common multiple of the two first.
 Enter the digit sum as two digits — pad the front with zero."`,
      hint: "First find the smallest number that both 52 and 8 divide into. Once you have that three-digit number, add its digits one by one down to a single digit. To fit it in two boxes, put a zero in front.",
      lockType: "pin2",
      answers: ["05"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "The Underground Laboratory",
      story: `Neon and I went down to basement level 5. When the lift opened, cold coolant air hit my face.

An enormous core server pulsed with light in the darkness. The heart of Project X.

"This is it, Zero." Neon's voice trembled. "Shut this down and it's all over."

The terminal in front of the server demanded authentication. The instructions on screen were long and awkward. "Administrator code — multiply the letter count of the word PROJECT by version X, then divide by the server depth. Add the 'day' of today's date at the end. PROJECT is seven letters, X is the 24th letter, the depth is the absolute value of basement 5, and today is 31 January 2087."`,
      clue: `[Core server authentication system]
"Code = (letter count × version) ÷ depth + today's day
 PROJECT = 7 letters, version X = 24
 depth = 5, today = 2087.01.31
 Round the division result to a whole number."`,
      hint: "Multiplying the letter count by the version and dividing by the depth does not come out clean — round to the nearest whole number. Then just add the day of today's date.",
      lockType: "pin2",
      answers: ["65"],
      maxTurns: 3,
    },
    {
      id: 5,
      title: "Simultaneous Shutdown",
      story: `Three channels came alive at once.

"HQ server, ready." Ghost.
"Data centre, ready." Spark.
"We're set too." Neon nodded beside me.

Now one single entry. Three places had to hammer in the same code within three seconds. One beat out of step and the whole operation collapses.

"Final shutdown code." Byte's voice cracked with tension. "We weave together the security codes each site pulled — take the 5 from headquarters, multiply by the data centre's 126, and add the laboratory's 65. The first four digits of the result are the code."`,
      clue: `[Final shutdown code]
"Code = HQ × data centre + laboratory
 HQ = 5, data centre = 126, laboratory = 65
 Enter the first four digits of the result.
 If it is short, pad the front with zeros."`,
      hint: "Multiplication first, addition second. If the resulting value falls short of four digits, pad the front with zeros to fill four boxes.",
      lockType: "pin4",
      answers: ["0695"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
