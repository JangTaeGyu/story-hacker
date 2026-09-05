import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 5,
  title: "The Gamer's Secret",
  subtitle: "The Friend Who Never Logged Out",
  difficulty: 1,
  mode: "story",
  synopsis: "Han-byeol, my guildmate of three years, has not logged in for three days. The last message was a single line — 'I think I'm in real trouble.' The answer is inside his account.",
  stages: [
    {
      id: 1,
      title: "Last Seen Online",
      story: `Han-byeol and I have never met face to face, but we spent three years in the same guild. He logged in every single night, and now there has been nothing for three days.

His last message was one line. "I think I'm in real trouble. If anything happens to me, look after my account." Nothing since.

I have no phone number, no address. All I have is his game account. He once let slip a hint about his password while drinking — and pinned it in the guild chat, no less.

I scroll back through that log.`,
      clue: `What Han-byeol posted in guild chat:
"My account password? My all-time high score.
 7777 points. Nobody's beaten it yet.
 I just use the four digits burned into that screen."`,
      hint: "Copy the high score he bragged about in the chat exactly. Nothing to add or subtract — the four digits as they appear on screen.",
      lockType: "pin4",
      answers: ["7777"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Guild Vault",
      story: `I am inside the account. His mailbox is stacked with trade alerts. Right before he disappeared, Han-byeol was dumping every item he owned at a fraction of its worth. Like a man being chased.

To find out who the last buyer was, I need the guild vault records. Only Han-byeol, as vice-leader, could open that vault.

The vault code is written into the guild notice. It was a date we all knew, so nobody bothered to hide it.`,
      clue: `Pinned guild notice:
"Guild founding date = vault code.
 Founded 3 November 2022.
 Drop the year — month and day, four digits."`,
      hint: "Take the founding date and throw away the year. Two digits for the month, two for the day, filling four boxes.",
      lockType: "pin4",
      answers: ["1103"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "Coordinates of the Hidden Dungeon",
      story: `The vault log held something strange. Over his last few days, Han-byeol had been going alone into a place called the Sealed Dungeon, without telling a single guild member.

He saw something there. A vault memo says: "I wasn't supposed to go in here."

The entrance coordinates are a six-digit code. Han-byeol wrote down how to build it at the bottom of the vault memo — in case he forgot it himself.`,
      clue: `The bottom line of the vault memo:
"Dungeon coordinates, 6 digits.
 Guild members (15) times dungeon floor (42).
 Put the product in six boxes, zeros in front if it is short."`,
      hint: "Multiply the member count by the floor number. The product is only three digits, so pad the front with zeros to fill six boxes.",
      lockType: "pin6",
      answers: ["000630"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "The Sealed Chest",
      story: `At the deepest point of the Sealed Dungeon, Han-byeol's character was standing still. He had not even managed to log out. In front of him sat a locked steel chest.

Beside it hovered the last system memo he left. The letters are a mess, as if his hands had been shaking. "Everything you need is in this chest. One of the operators is behind it. If you can't open it, just forget it."

Two numbers and a short sentence are engraved on the chest. The lock he set with the last of his strength.`,
      clue: `Engraved on the chest:
"The hero's two numbers — their difference is the key.
 HP is 999, MP is 777.
 Subtract the smaller from the larger. Four digits."`,
      hint: "Find the difference between the two numbers. 999 minus 777 gives three digits, so pad the front with a zero to fill four boxes.",
      lockType: "pin4",
      answers: ["0222"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
