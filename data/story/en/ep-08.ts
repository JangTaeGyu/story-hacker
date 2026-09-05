import type { StoryEpisode } from '@/lib/types';

const episode = {
  id: 8,
  title: "The Space Station",
  subtitle: "The Silence of Six",
  difficulty: 2,
  mode: "story",
  synopsis: "I wake alone on a station that has lost contact with Earth. My five crewmates are nowhere, and the system insists there are six of us. Slowly, I come to understand whose place is missing.",
  epilogue: `The pod opened. At the very bottom of the inner wall, beneath the five names, there was a sixth line. It was mine, and beside it was written:

"You were the youngest. Don't carry this."

For the first time in 312 days I cried out loud. Then I sat down at the transmitter again. This time I did not send a distress call. I sent a record — five names, and what they chose.

The reply came ninety-one hours later. "Received. All six names confirmed."`,
  stages: [
    {
      id: 1,
      title: "A Cold Waking",
      story: `The sound of my hibernation pod opening woke me. Earlier than scheduled.

The module was dead quiet. All five of my crewmates' pods stood empty, thick frost furred across their insides. As though they had been empty for a very long time.

The main console wants authentication. In one corner of the screen the final entry of the mission log is blinking. My fingers are stiff and the keys will barely take a press.

Looking at the date on that log, I knew something had gone very wrong.`,
      clue: `Last line of the mission log:
"Contact lost — mission day 312.
 Authentication code is that day count."`,
      hint: "The log gives you one number and one only: 312. To fill four boxes, put a zero in front of it.",
      lockType: "pin4",
      answers: ["0312"],
      maxTurns: 3,
    },
    {
      id: 2,
      title: "The Oxygen Log",
      story: `The console opened. The life support log unrolled at length.

The oxygen consumption graph was wrong. It fell steeply at first, at a rate for six people, then on one day early in the mission it dropped sharply to the rate for one. From that day on, always one. And that line runs unbroken all the way to today.

Five people vanished in a single hour of a single day. Or perhaps they did not vanish at all.

I have to open the reserve oxygen valve to keep breathing. An old label was wound around the valve handle.`,
      clue: `Oxygen valve label:
"Manual release code = crew capacity (6)
 minus current survivors (1),
 times digits per hibernation pod (2). Four digits."`,
      hint: "Take the capacity and subtract the number of people still alive; that gives you how many are gone. Multiply that by 2. If the result is small, pad the front with zeros to fill four boxes.",
      lockType: "pin4",
      answers: ["0010"],
      maxTurns: 3,
    },
    {
      id: 3,
      title: "The Comms Array",
      story: `Oxygen began to circulate. As my head cleared a little, I went to the communications module.

I have to send a distress signal to Earth. But beside the transmitter, a sentence somebody had begun and never sent still sat frozen on the screen. It was my handwriting. I have no memory of it, and yet my hand plainly wrote it.

"I'm sorry. There is only enough oxygen for one."

To finish the transmission I need the emergency channel code. The manual is taped to the transmitter.`,
      clue: `Emergency transmission manual:
"Channel code — write the deployment state of the 6 antennae
 into six boxes, in order from no. 1.
 Deployed antenna is 1, folded antenna is 0.
 Currently deployed: no. 1, no. 3, no. 4, no. 6."`,
      hint: "Map the six boxes one-to-one onto antennae 1 through 6. Put a 1 in every position the manual names, and a 0 in every position it does not.",
      lockType: "pin6",
      answers: ["101101"],
      maxTurns: 3,
    },
    {
      id: 4,
      title: "What the Pod Held",
      story: `I sent the signal. There was no reply. Perhaps nobody has been listening for 312 days.

Last of all I went back to my own hibernation pod. Unlike the others, mine carried no frost. On the inner wall, letters had been gouged with a fingernail, packed close together. Five names. And a date. All of them the same day.

Five people could not be kept alive on one person's oxygen. So they made a decision — and left only one. Me. On the pod's lock screen was the last note I had left for myself.

Open this door and I face what I have been living with.`,
      clue: `The note scratched into the pod wall:
"Do not forget. The day the five let go — mission day 38.
 Put that number in four boxes and it reads 0038.
 The code is that, turned back to front."`,
      hint: "Take the whole four-digit number in the note and flip it left to right. There is nothing new to compute — only the order of the places changes.",
      lockType: "pin4",
      answers: ["8300"],
      maxTurns: 3,
    },
  ],
} satisfies StoryEpisode;

export default episode;
