import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 20,
  title: "A New Dawn",
  subtitle: "Epilogue: The Phoenix Rises",
  difficulty: 3,
  mode: "story",
  previousEpisode: 19,
  synopsis: "Project X was stopped. OmniCorp fell. But a city's shadows never lift all at once. This is not an ending — it is the first page of a different beginning.",
  epilogue: `Below the message from sender ???, one more set of coordinates surfaced.

Neon looked at the screen. "Are we going?"

Ghost had already picked up his jacket, and Byte was packing a terminal. Spark cut the generator.

I took one last look around the headquarters. The person who arrived in this city five years ago without a name is not here any more.

"Let's go."

The door closed, and morning came over the grey factory.

TO BE CONTINUED`,
  stages: [
    {
      id: 1,
      title: "Afterwards",
      story: `15 February 2087. Two weeks since Project X was stopped.

OmniCorp could not carry the weight of the scandal and collapsed. The lights on floor 52 went out, and the citizens' medical chips lost their connection one by one. For the first time, Neo City came to own its own brainwaves.

A strange stillness settled over Phoenix headquarters. We had won, but the list of what we lost was too long.

That day, a last file from Delta was found. "If you're reading this, you won. I'm leaving soon too. A final gift." The file password — "Take NEW ERA, the words for a new age, and pick out only the consonants. Throw away every vowel and add the alphabet positions of what's left."`,
      clue: `[Delta's legacy — file password]
"From NEW ERA extract only consonants, exclude vowels.
 → N, W, R
 Sum the alphabet positions of the remaining consonants."`,
      hint: "Leave vowels like E and A alone and delete them. Work out where the three remaining consonants fall in the alphabet and add them all together.",
      lockType: "pin2",
      answers: ["55"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "Delta's Gift",
      story: `The file opened. What filled the screen was every one of OmniCorp's secret slush accounts — a map of the money that had been crushing the city.

"Rebuild the city with these funds," Delta's message went on. "Spend it on people. Let this settle the debt I owe OmniCorp."

Neon drew a breath. 8,888,888,888 credits. Enough to raise a city back to its feet.

Completing the transfer needed one last authentication. The system explained — "Add all the digits of the transfer amount, then divide that sum by the number of digits. The amount has ten digits." I stared slowly at the row of eights on screen.`,
      clue: `[Funds Transfer System]
"Transfer amount = 8,888,888,888 credits (ten digits)
 Authentication code = (sum of all digits) ÷ (number of digits)
 number of digits = 10
 Enter as two digits — pad the front with zero."`,
      hint: "Every place holds the same digit. Think about what is left when that digit, added ten times over, is divided again by 10. Put a zero in front of the single digit you get and two boxes are filled.",
      lockType: "pin2",
      answers: ["08"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Phoenix Rises",
      story: `The transfer completed. It was almost as if I could hear the first spade going into the rubble of the city.

The Phoenix members gathered at headquarters. Neon looked at me. "So what now, Zero?"

"OmniCorp is finished," said Ghost. "But people like that turn up again. They always have."

"Which is why we keep fighting," Byte answered, and Spark nodded once. "Agreed."

I made up my mind. Phoenix continues. We decided to encrypt a new declaration — "WE ARE PHOENIX. Drop the spaces, number the letters from 1, and pick out only the odd-numbered ones. 1 is W, 3 is A, 5 is E... add the alphabet positions of everything you pull out."`,
      clue: `[Phoenix declaration cipher]
"WE ARE PHOENIX
 Number the twelve letters from 1, spaces removed,
 and extract only odd-numbered letters:
 W(1) A(3) E(5) H(7) E(9) I(11)
 Sum the alphabet positions of the extracted letters."`,
      hint: "Delete the spaces, count the letters in order, and pick out only positions 1, 3, 5, 7 and so on. Add the alphabet positions of the six letters you gather.",
      lockType: "pin2",
      answers: ["51"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "THE END...?",
      story: `The new declaration spread across screens all over Neo City.

"We are Phoenix. Those who look for light inside the dark. When the city needs us, we will always rise."

A month passed. The city slowly took its breath back, and I slept deeply for the first time in a long while.

Then one night, a message appeared on the monitor. Sender ???. "To Phoenix. A new threat is coming. Are you ready?"

At the edge of the screen, one last code blinked. "Set the starting code of this whole story, 4272, beside the ending code, 2175. Add them place by place — first against first, second against second. Join the four sums in order." TO BE CONTINUED…`,
      clue: `[Final code]
"Start code 4272 + end code 2175
 Add place against place:
 4+2, 2+1, 7+7, 2+5
 Join the four results in order.
 (If a place sum is two digits, write it out as it is)"`,
      hint: "Picture the two numbers stacked one above the other and added column by column. But do not carry — write each column's sum straight out, left to right, and join them.",
      lockType: "pin5",
      answers: ["63147"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
