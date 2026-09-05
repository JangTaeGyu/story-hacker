import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 15,
  title: "The Heart of OmniCorp",
  subtitle: "Chapter 5: Infiltrating Headquarters",
  difficulty: 2,
  mode: "story",
  previousEpisode: 14,
  synopsis: "From the server Viper abandoned, a hole in OmniCorp headquarters security comes to light. Zero and ShadowNet begin a direct infiltration.",
  epilogue: `[PROJECT-X FINAL REPORT] opened.

Objective: manipulate citizens' brainwaves to achieve total social control
Phase 1: medical chip distribution — complete

My hand stopped on the first line. *Complete.* It was already done.

Neon read over my shoulder and said, very quietly, "My mum got that chip last year."

We copied the whole file and left the server room. Neither of us said a word the entire way up from basement three.`,
  stages: [
    {
      id: 1,
      title: "Preparing the Entry",
      story: `Viper broke the containment and vanished. But from the server he left behind, we pulled something we had not expected.

[OMNICORP HQ SECURITY ANALYSIS]
- 52-storey headquarters tower
- Main server on basement level 3
- Night guard rotation: 23:00, 03:00, 07:00

The traitor's traces were, in their way, opening the road for us. Phantom laid a finger on the analysis. "The rotation times are the key. The gaps between them are our window."

"The launch code will be those three hours all multiplied together. Memorise it."`,
      clue: `[Operation note]
"Launch code = the three night guard rotation hours (23, 03, 07) all multiplied together."`,
      hint: "Read the three times as their hour numbers alone and multiply through in turn. Multiply two first, then the remaining one into that result. Changing the order changes nothing.",
      lockType: "pin3",
      answers: ["483"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "False Identities",
      story: `Neon sat at the forgery terminal and flexed her fingers. "We go in as cleaning contractors. The least visible identity there is."

The barcode on the forged pass needed an employee code. The calculation the system demanded came up on screen.

[ID GENERATION SYSTEM]
Employee code generation rule:
1. Last two digits of the hire year 2087
2. Department code (cleaning = 05)
3. Serial number: the two values above added together

The final code was the three chunks run together in order. One digit wrong and the gate alarms, Neon added under her breath.`,
      clue: `[Generation system notice]
"Final code = [last two digits of hire year][department code][serial number, the two added]"`,
      hint: "Join the three pieces in order. The first is the last two digits of the hire year, the second the cleaning department code, the third the sum of those two. Write the sum as two digits too.",
      lockType: "pin6",
      answers: ["870592"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Freight Lift",
      story: `Dressed as cleaners we walked through the lobby. Nobody looked at us once. So this is what being invisible feels like.

We found the freight lift down to the basement. Red letters glowed on the panel. "Voice recognition disabled — backup PIN required."

A floor guide was fixed beside the lift.
- Basement 1: car park (P1)
- Basement 2: storage (S2)
- Basement 3: restricted (R3)

Below the panel, a security note scrawled by some maintenance worker gave away the rule for the PIN.`,
      clue: `[Maintenance note]
"PIN = add the numbers attached to each floor code (P1, S2, R3),
 then multiply by the total number of basement levels."`,
      hint: "Peel off just the numbers attached to the floor labels and add them — 1, 2, 3. Then count how many basement levels there are in total and multiply that by the sum.",
      lockType: "pin2",
      answers: ["18"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "Into the Server Room",
      story: `Basement level 3. The air was cold and heavy. A biometric reader glowed blue in front of the enormous server room door.

"We can't route around biometrics." Neon's voice went straight into my ear. "But there's an administrator override code. If Viper came through here, he left a clue somewhere."

I raised a light to the wall panel, and a string of numbers scrawled like graffiti appeared.
"2-4-8-16-?-64"

The number in the question mark's place was the override code. Viper was always like this — as though only those who could solve it deserved to come in.`,
      clue: `[Wall graffiti]
"2 - 4 - 8 - 16 - ? - 64
 — each step to the next box grows the same way."`,
      hint: "Watch what rule repeats as you move from one number to the next. What takes 2 to 4 is the same as what takes 4 to 8. Apply it once more to 16 and the question mark answers itself.",
      lockType: "pin2",
      answers: ["32"],
      maxTurns: 3,
    },
    {
      id: 5,
      title: "The Truth of Project X",
      story: `The biometric reader released, and the server room door opened. Hundreds of servers hummed low.

Digging through the main server, a folder called 'PROJECT-X' surfaced. My heart skipped a beat.

[PROJECT-X FINAL REPORT]
File access level: LEVEL-5
Encryption: AES-256

The administrator decryption hint was attached at the end of the report. A key built out of OmniCorp's founding date, 2045.03.15. My hands shook, but there is no stopping this far in.`,
      clue: `[Decryption key hint / administrator]
"From the founding date 2045.03.15 — the sum of the digits of the four-digit year,
 the sum of the digits of the two-digit month,
 the sum of the digits of the two-digit day. Multiply those three results together for the key."`,
      hint: "Work out the three partial sums separately first. Digit sum of the year 2045, of the month 03, of the day 15. Multiply those three numbers through in turn for the final key.",
      lockType: "pin3",
      answers: ["198"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
