import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 14,
  title: "The Insider",
  subtitle: "Chapter 4: Double Agent",
  difficulty: 3,
  mode: "story",
  previousEpisode: 13,
  synopsis: "Someone inside ShadowNet is on OmniCorp's string. On Phantom's orders, Zero begins an investigation that means suspecting his own.",
  epilogue: `Every exit sealed. Viper put a third-floor window out and dropped through it, and was gone.

Phantom looked out at the street for a long time, then said: "Well done, Zero. The inside is clean now."

After the other five scattered I went through the logs once more. Viper always connected at 02:13. And at that hour, one other person in the organisation had been awake.

I did not know what that meant yet. I closed the window and turned off the light.`,
  stages: [
    {
      id: 1,
      title: "Where Doubt Begins",
      story: `Four days in the safe house were long and quiet. Outside the window Neo City's neon ran down like rain, and watching it I kept thinking about how we are always one step late.

The door opened and Phantom himself walked in. I had never seen him move in person. "Zero, we have a problem." His voice was low. "OmniCorp reads our movements too precisely. That isn't chance. There's a spy inside."

He set a USB stick on the table. Activity logs for every member, he said. My fingertips went cold. Suspecting your own is far heavier work than hacking an enemy.

"Work out the decryption key yourself. The rule for building it is written inside."`,
      clue: `[USB note / decrypt.key]
"Key = ShadowNet member count (7) multiplied by your first mission code (103).
 Take that value and append the single-digit remainder when it is divided by 3."`,
      hint: "First multiply the two numbers to get a three-digit result. What is left over when that number is divided by 3 decides the final box. Leave the product as it is and hang the remainder on the end like a tag.",
      lockType: "pin4",
      answers: ["7211"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "Suspicious Traffic",
      story: `My hand stopped as I read down the logs line by line. The comms record of a member called 'Viper'.

[VIPER COMMS LOG]
01/10 - 02:13 AM - external connection (encrypted)
01/12 - 02:13 AM - external connection (encrypted)
01/14 - 02:13 AM - external connection (encrypted)

All three at 2:13 in the morning. Not a second's variance. Not a pattern a person makes by accident. It meant he was connecting at an agreed hour, on an agreed channel, with someone.

Viper's personal server PIN was hidden in the pattern itself. I had to weave the time and the dates together.`,
      clue: `[Decryption note]
"Drop the leading zero from the connection time 02:13 and write it as 213.
 Append the sum of the 'day' of all three connection dates (10, 12, 14)."`,
      hint: "Build two chunks. The front is the small-hours time read as hour then minute with the leading zero stripped; the back is the sum of the days of the three dates. Unlike every other lock here, this one drops a zero instead of padding one.",
      lockType: "pin5",
      answers: ["21336"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "Securing the Evidence",
      story: `Viper's server opened. And I wished it had not.

[ENCRYPTED MESSAGE]
RECIPIENT: OMN-SECURITY
STATUS: AWAITING PAYMENT
AMOUNT: ███ CREDITS

OmniCorp security. Awaiting payment. Viper was selling us. My colleague's face rose up behind the screen and turned my stomach.

Decrypting the message body needed one more key. Viper had hidden it in his own name, 'VIPER'. Arrogance, perhaps — or he never imagined being caught.`,
      clue: `[Key generation note / VIPER]
"My name, VIPER. Add up where each of the five letters falls in the alphabet, and that's the key.
 V, I, P, E, R."`,
      hint: "Turn the five letters into their alphabet positions. A is 1, Z is 26. Add all five without missing one and you get a two-digit number. Front to back or back to front, the sum is the same.",
      lockType: "pin2",
      answers: ["70"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "The Confrontation",
      story: `Phantom summoned every member. Seven of us stood in the cramped safe house, and the air was drawn tight as a wire.

Phantom laid the evidence on the table. Every eye went to Viper. In that instant Viper kicked his chair back and bolted for the door.

"Stop him! Enter the lockdown code!" Neon shouted. The panel of the containment system flashed red. Enter the code and every exit seals. My hands shook, but I could not stop.

[EMERGENCY LOCKDOWN SYSTEM]
The rule for the code was on the panel.`,
      clue: `[Lockdown panel notice]
"Code = (days elapsed from Viper's first connection on 10 January
 to today, 20 January)
 × (current member count excluding Viper)"`,
      hint: "Start by counting how many days lie between the two dates, 10 January to 20 January. There were seven members, but the traitor is no longer one of ours. Multiply that day count by the remaining head count.",
      lockType: "pin2",
      answers: ["60"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
