import type { DeductionEpisode } from '@/lib/types';

// 단서 논리는 ko.ts와 동일해야 한다 — specs/deduction-logic.spec.ts가 정답·유일성을 검사한다.
const episodes: DeductionEpisode[] = [
  {
    id: 101, title: "Number Deduction", difficulty: 2, mode: "deduction",
    epilogue: `Three locks opened in turn. The dial on the desk, the panel, and the six-digit field.

Before the last screen went dark, one line surfaced on it. — "If conditions alone can carry you to the answer, you are already ready."

Numbers do not lie. They simply do not tell you everything.`,
    stages: [
      { id: 1, title: "First Principles", situation: "A four-digit dial lock sits on the desk. No key — only a note listing conditions.", lockType: "pin4", answer: "3726", maxTurns: 6,
        clues: [
          { turn: 1, text: "The four digits are all different." },
          { turn: 2, text: "The first digit is odd." },
          { turn: 3, text: "The four digits add up to 18." },
          { turn: 4, text: "The second digit is 7." },
          { turn: 5, text: "The last digit is twice the first." },
          { turn: 6, text: "The third digit is the smallest of the four." },
        ],
      },
      { id: 2, title: "Pattern Analysis", situation: "The panel says only that the code is three numbers written one after another.", lockType: "pin4", answer: "4816", maxTurns: 5,
        clues: [
          { turn: 1, text: "This code is three numbers joined in order." },
          { turn: 2, text: "The first number is 4." },
          { turn: 3, text: "Each number is double the one before it." },
          { turn: 4, text: "Only the last of the three has two digits." },
          { turn: 5, text: "The three numbers add up to 28." },
        ],
      },
      { id: 3, title: "Cipher Break", situation: "A six-digit field. Conditions scroll down the screen one line at a time.", lockType: "pin6", answer: "159357", maxTurns: 6,
        clues: [
          { turn: 1, text: "The six digits split into two blocks of three." },
          { turn: 2, text: "Every digit is odd." },
          { turn: 3, text: "Within each block the digits rise by a fixed step." },
          { turn: 4, text: "The first block starts with 1." },
          { turn: 5, text: "The middle digit of each block is the same." },
          { turn: 6, text: "The first block's step is twice the second block's." },
        ],
      },
    ],
  },
  {
    id: 102, title: "Logic Puzzle", difficulty: 2, mode: "deduction",
    epilogue: `A box locked with a birthday, a six-digit safe, and the final gate. All three opened.

There was nothing in the box. Nothing in the safe either. Beyond the last door was an empty room, and on its wall: — "If you have learned to open a thing without asking what is inside, that is enough."

The alarm never did sound.`,
    stages: [
      { id: 1, title: "The Birthday", situation: "A box locked with a friend's birthday. That friend has never once mentioned it. (MMDD)", lockType: "pin4", answer: "0314", maxTurns: 5,
        clues: [
          { turn: 1, text: "They were born in March." },
          { turn: 2, text: "The day is greater than 10." },
          { turn: 3, text: "The day is an even number." },
          { turn: 4, text: "The two digits of the day multiply to 4." },
          { turn: 5, text: "All four digits add up to 8." },
        ],
      },
      { id: 2, title: "The Safe Job", situation: "A six-digit dial on the safe door. Nobody has said what is inside.", lockType: "pin6", answer: "246810", maxTurns: 6,
        clues: [
          { turn: 1, text: "This code is several numbers joined in order." },
          { turn: 2, text: "The first number is 2." },
          { turn: 3, text: "Each number is 2 greater than the one before it." },
          { turn: 4, text: "Only the last number has two digits." },
          { turn: 5, text: "Every number is even." },
          { turn: 6, text: "There are five numbers in all." },
        ],
      },
      { id: 3, title: "Final Test", situation: "The last gate. Four digits either open the door or set off the alarm.", lockType: "pin4", answer: "1379", maxTurns: 5,
        clues: [
          { turn: 1, text: "All four digits are odd." },
          { turn: 2, text: "They increase from left to right." },
          { turn: 3, text: "They are not four consecutive odd numbers." },
          { turn: 4, text: "The first and last digits add up to 10." },
          { turn: 5, text: "The middle two digits also add up to 10." },
        ],
      },
    ],
  },
  {
    id: 103, title: "Maths Challenge", difficulty: 2, mode: "deduction",
    epilogue: `Multiplication, division, and a spiral.

The three locks wore different faces but asked the same thing: do not trust the number in front of you — look at what sits between the numbers.

The last spiral slowed, and stopped turning.`,
    stages: [
      { id: 1, title: "Multiplication Puzzle", situation: "The paper carries nothing but multiplication conditions. Find the four digits.", lockType: "pin4", answer: "2436", maxTurns: 5,
        clues: [
          { turn: 1, text: "All four digits are 6 or less, and all different." },
          { turn: 2, text: "The first and third multiply to 6." },
          { turn: 3, text: "The second and fourth multiply to 24." },
          { turn: 4, text: "The fourth is greater than the second." },
          { turn: 5, text: "The first is smaller than the third." },
        ],
      },
      { id: 2, title: "Division Mystery", situation: "A code that folds in half as it goes.", lockType: "pin4", answer: "8421", maxTurns: 5,
        clues: [
          { turn: 1, text: "The digits get smaller from left to right." },
          { turn: 2, text: "The four digits add up to 15." },
          { turn: 3, text: "The smallest digit is 1." },
          { turn: 4, text: "Each digit is half the one before it." },
          { turn: 5, text: "The first digit is eight times the last." },
        ],
      },
      { id: 3, title: "Fibonacci Code", situation: "A spiral is engraved above the six-digit field.", lockType: "pin6", answer: "112358", maxTurns: 6,
        clues: [
          { turn: 1, text: "It has to do with the Fibonacci sequence." },
          { turn: 2, text: "The first two digits are the same." },
          { turn: 3, text: "From the third on, each digit is the sum of the two before it." },
          { turn: 4, text: "The first digit is 1." },
          { turn: 5, text: "The six digits add up to 20." },
          { turn: 6, text: "The last digit is the largest single-figure even number." },
        ],
      },
    ],
  },
  {
    id: 104, title: "Time Puzzle", difficulty: 1, mode: "deduction",
    epilogue: `A stopped clock, a day that comes once in four years, a timer one second short of an hour.

All three deal in time, but each points somewhere else. One at a halted moment, one at a day that rarely comes, one at the instant before the end.

When the door opened, the clock in the corridor began counting seconds again.`,
    stages: [
      { id: 1, title: "Clock Cipher", situation: "The time on the stopped clock is the code.", lockType: "pin4", answer: "1230", maxTurns: 5,
        clues: [
          { turn: 1, text: "It is HHMM in 24-hour notation." },
          { turn: 2, text: "It is not the morning." },
          { turn: 3, text: "The four digits add up to 6." },
          { turn: 4, text: "There is exactly one 0, and it is last." },
          { turn: 5, text: "It is thirty minutes past noon." },
        ],
      },
      { id: 2, title: "Date Calculation", situation: "One circle on the calendar. A day that comes only once every four years. (YYMMDD)", lockType: "pin6", answer: "240229", maxTurns: 6,
        clues: [
          { turn: 1, text: "It is in YYMMDD format." },
          { turn: 2, text: "It is a date in 2024." },
          { turn: 3, text: "It is a date in February." },
          { turn: 4, text: "It is a day that exists only once every four years." },
          { turn: 5, text: "It is the last day of that month." },
          { turn: 6, text: "The last two digits add up to 11." },
        ],
      },
      { id: 3, title: "Timer Setting", situation: "The door opens only if the timer is set to its maximum.", lockType: "pin4", answer: "5959", maxTurns: 5,
        clues: [
          { turn: 1, text: "It is MMSS (minutes:seconds)." },
          { turn: 2, text: "The minutes and the seconds are the same value." },
          { turn: 3, text: "The four digits add up to 28." },
          { turn: 4, text: "Each digit that appears, appears exactly twice." },
          { turn: 5, text: "It is one second short of an hour." },
        ],
      },
    ],
  },
  {
    id: 105, title: "Colour Codes", difficulty: 1, mode: "deduction",
    epilogue: `A band of seven colours, and a screen filled with only one.

A colour has a name, an order, and a value. Once you know all three point at the same thing, you can answer whichever way you are asked.

The red on the last screen sank slowly into black.`,
    stages: [
      { id: 1, title: "Rainbow Order", situation: "A four-box field sits beneath a band of seven colours.", lockType: "pin4", answer: "1234", maxTurns: 5,
        clues: [
          { turn: 1, text: "Number the rainbow colours in order — red=1, orange=2, yellow=3, green=4, blue=5…" },
          { turn: 2, text: "The code joins the numbers of four colours." },
          { turn: 3, text: "The four colours are neighbours in the rainbow." },
          { turn: 4, text: "Red is one of them." },
          { turn: 5, text: "The four digits add up to 10." },
        ],
      },
      { id: 2, title: "RGB Code", situation: "The screen is filled with a single colour. That colour's value is the code.", lockType: "pin6", answer: "255000", maxTurns: 5,
        clues: [
          { turn: 1, text: "Six digits: the R, G and B values written as three digits each." },
          { turn: 2, text: "Two of the three values are 0." },
          { turn: 3, text: "The value that is not 0 comes first." },
          { turn: 4, text: "That value is the largest number 8 bits can hold." },
          { turn: 5, text: "The colour filling the screen is pure red." },
        ],
      },
    ],
  },
  {
    id: 106, title: "Music Puzzle", difficulty: 2, mode: "deduction",
    epilogue: `A keyboard still marked where keys were pressed, and a single tuning fork.

A note is a pitch and a number at once. Do-mi-sol-do becomes 1351, and the reference for tuning becomes 440. Move between the two and every lock in this room opens.

The fork's tremor faded, and the room went quiet.`,
    stages: [
      { id: 1, title: "Solfège Code", situation: "Four keys on the keyboard still carry the mark of being pressed.", lockType: "pin4", answer: "1351", maxTurns: 5,
        clues: [
          { turn: 1, text: "Number the notes — do=1, re=2, mi=3, fa=4, sol=5, la=6, ti=7" },
          { turn: 2, text: "It is a chord of four notes." },
          { turn: 3, text: "The first note and the last note are the same." },
          { turn: 4, text: "The first three notes rise by an equal step." },
          { turn: 5, text: "The four digits add up to 10." },
        ],
      },
      { id: 2, title: "Frequency", situation: "A single tuning fork lies here. Its frequency is the code.", lockType: "pin4", answer: "0440", maxTurns: 5,
        clues: [
          { turn: 1, text: "The front was padded with a 0 to make four digits." },
          { turn: 2, text: "The frequency is between 400 and 450." },
          { turn: 3, text: "It divides evenly by 10." },
          { turn: 4, text: "It is the note an orchestra tunes to." },
          { turn: 5, text: "The three digits of the frequency add up to 8." },
        ],
      },
    ],
  },
  {
    id: 107, title: "Geography Quiz", difficulty: 3, mode: "deduction",
    epilogue: `One pin on a map, and one statistics screen.

Degrees and minutes, ten thousands and millions. Point at the same thing in different units and you get a different number. What this room asked about was not knowledge but that difference.

The pin came out, and the map was folded away.`,
    stages: [
      { id: 1, title: "Find the Coordinates", situation: "A pin marks Seoul on the map. Read its latitude in degrees and minutes as four digits.", lockType: "pin4", answer: "3733", maxTurns: 5,
        clues: [
          { turn: 1, text: "The first two digits are degrees (°), the last two are minutes (′)." },
          { turn: 2, text: "Seoul lies in the 37th degree north." },
          { turn: 3, text: "The minutes are between 30 and 40." },
          { turn: 4, text: "The minutes are a multiple of 3." },
          { turn: 5, text: "The two digits of the minutes are the same." },
        ],
      },
      { id: 2, title: "Population Figures", situation: "A population statistics screen. Four digits in units of ten thousand.", lockType: "pin4", answer: "5100", maxTurns: 5,
        clues: [
          { turn: 1, text: "South Korea's population is over 50 million." },
          { turn: 2, text: "It falls short of 60 million." },
          { turn: 3, text: "Written in units of ten thousand it takes four digits." },
          { turn: 4, text: "The tens and units digits are both 0." },
          { turn: 5, text: "The four digits add up to 6." },
        ],
      },
    ],
  },
  {
    id: 108, title: "Science Basics", difficulty: 3, mode: "deduction",
    epilogue: `Gold on the periodic table, the distance light covers in a second, a kettle coming to the boil.

All three began like things everyone knows, but what carried you to the answer was not knowledge — it was the digits. You can narrow it down without knowing. That was this room's rule.

The steam thinned, and the last lock gave way.`,
    stages: [
      { id: 1, title: "Element Number", situation: "On the periodic table, only gold (Au) is lit.", lockType: "pin4", answer: "0079", maxTurns: 5,
        clues: [
          { turn: 1, text: "The code is gold's atomic number written as four digits." },
          { turn: 2, text: "The atomic number has two digits; the first two boxes are padded with 0." },
          { turn: 3, text: "The atomic number is in the seventies." },
          { turn: 4, text: "Its two digits add up to 16." },
          { turn: 5, text: "The second of those digits is larger than the first." },
        ],
      },
      { id: 2, title: "Speed of Light", situation: "How far light travels in one second, in km. The rounded value is the code.", lockType: "pin6", answer: "300000", maxTurns: 5,
        clues: [
          { turn: 1, text: "Six digits: how far light travels in one second in a vacuum, in km." },
          { turn: 2, text: "It is rounded to the nearest hundred thousand, so the last five digits are all 0." },
          { turn: 3, text: "It is more than 200,000 km." },
          { turn: 4, text: "It is less than 400,000 km." },
          { turn: 5, text: "The six digits add up to 3." },
        ],
      },
      { id: 3, title: "Boiling Point of Water", situation: "A kettle is boiling. Write that temperature in kelvin.", lockType: "pin4", answer: "0373", maxTurns: 5,
        clues: [
          { turn: 1, text: "Four digits: the temperature at which water boils, in kelvin." },
          { turn: 2, text: "The front was padded with a 0 to make four digits." },
          { turn: 3, text: "The temperature is between 300K and 400K." },
          { turn: 4, text: "Kelvin = Celsius + 273, and water boils at 100°C at standard pressure." },
          { turn: 5, text: "The four digits add up to 13." },
        ],
      },
    ],
  },
];

export default episodes;
