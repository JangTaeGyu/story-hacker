import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 9,
  title: "The Wizard's Tower",
  subtitle: "My Master's Last Seal",
  difficulty: 1,
  mode: "story",
  synopsis: "The archmage was found dead at the top of his own tower. They call it an accident. But I was his last apprentice, and I have to know why he set fresh seals throughout the tower before he died.",
  stages: [
    {
      id: 1,
      title: "The Tower Door",
      story: `My master is dead. Found in the workshop at the top of the tower, a cold cup of potion still in his hand. The village calls it an old wizard's accident.

But I know better. Three days before he died, he set every lock in the tower anew. The way a man does when he is afraid of someone coming in.

Even the magic lock at the tower entrance had been sealed again. The inscription cut into the door is in his hand — the first test, one any apprentice could pass and no outsider would know.`,
      clue: `Inscription at the entrance:
"Add the element of fire to the element of water.
 Fire is 9, water is 4.
 Carve the sum into four spaces."`,
      hint: "Add the numbers of the two elements, fire and water. If the sum falls short of four digits, pad the front with zeros.",
      lockType: "pin4",
      answers: ["0013"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Riddle on the Spiral Stair",
      story: `The door opened. The tower was cold, and nearly all the mage-lamps had gone out. Which means my master had not lit them as he always did.

At the top of the spiral stair to the second floor, another sealed door. He had hung a number riddle on this one. His constant teaching — "Magic is rule. Fail to read the rule and magic will not read you."

A sequence hangs on the door in glowing letters.`,
      clue: `The sequence on the second floor door:
"Find the rule and fill the blank.
 1, 3, 9, 27, ?
 Answer in four digits."`,
      hint: "The same multiplier takes you from each number to the next. Work out the next number by that rule, and pad the front with zeros for any spare boxes.",
      lockType: "pin4",
      answers: ["0081"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Golem in the Library",
      story: `The second floor was an enormous library. Between the shelves stood the librarian golem my master built, gone still. A faint light leaks from its chest — it is still working.

The golem opened its mouth slowly. "You would go to the forbidden shelves. Speak the passage code my master left last."

The last book he opened before he died had fallen at the golem's feet. Slipped between its pages was a note explaining how to build the passage code.`,
      clue: `The note between the pages:
"Passage code for the forbidden shelves.
 Multiply my wizard rank (rank 9) by the volume of the open book (8).
 Enter the product as four digits."`,
      hint: "Multiply the two numbers, wizard rank and volume number. If the product is two digits, pad the front with zeros to make four.",
      lockType: "pin4",
      answers: ["0072"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "The Hidden Room",
      story: `Behind the forbidden shelves a hidden wall split apart and revealed a small room. My master's true workshop. His diary lay open on the desk.

The last page read: "An old fellow student came to me. He wants the forbidden magic. If I refuse, he will silence me." Not an accident.

The box holding the truth sits beneath the desk. The final seal. A crystal orb recites the last riddle in my master's voice.`,
      clue: `The message in the crystal orb:
"Only one who runs against time reaches the truth.
 The year of my birth: 1234.
 Carve those four numbers backwards."`,
      hint: "Read the four digits of your master's birth year from the end backwards and enter them exactly.",
      lockType: "pin4",
      answers: ["4321"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
