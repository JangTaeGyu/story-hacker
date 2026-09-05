import type { Messages } from './ko';

const en: Messages = {
  site: {
    tagline: 'Story Hacker — Mystery Puzzle Game',
    description:
      'Read the clues hidden in the dark and crack the locked PIN. A noir mystery puzzle game with 20 story episodes and 8 deduction cases — free to play in your browser.',
    shortDescription:
      'Read the clues hidden in the dark and crack the locked PIN — a noir mystery puzzle game',
    keywords: [
      'mystery game',
      'puzzle game',
      'detective game',
      'escape room game',
      'code breaking game',
      'PIN cracking puzzle',
      'brain teaser',
      'free browser game',
      'story game',
      'noir detective story',
    ],
  },

  common: {
    back: 'BACK',
    exit: 'EXIT',
    home: 'Back to Start',
    tryAgain: 'Try Again',
    episodeSelect: 'Episode Select',
    replay: 'Replay',
    nextEpisode: 'Next Episode',
    close: 'Close',
    solvedStamp: 'SOLVED',
    solvedStampAria: 'Solved · Case closed',
    languageLabel: 'Language',
  },

  home: {
    eyebrow: 'A Mystery In Twenty Acts',
    tagline: 'It is 3 a.m., and one unsolved case is waiting for you.',
    cta: 'Open the case file',
  },

  modeSelect: {
    eyebrow: 'Choose Your Approach',
    title: 'Method',
    enter: 'Enter',
    differenceTitle: 'Mode Difference',
    story: {
      name: 'Story Mode',
      description: 'Read the clues scattered through the story to deduce the PIN.',
      tags: ['Reading', 'Inference'],
      difference: 'Sink into the case alongside its illustrations.',
      shortName: 'Story',
    },
    deduction: {
      name: 'Deduction Mode',
      description: 'Piece together the clues revealed turn by turn to crack the PIN.',
      tags: ['Logic', 'Deduction'],
      difference: 'Every wrong answer opens a new clue. The faster you solve, the higher your rating.',
      shortName: 'Deduction',
    },
  },

  storyList: {
    eyebrow: 'Story Mode',
    title: 'Case Files',
  },

  deductionList: {
    eyebrow: 'Deduction Mode',
    title: 'The Deduction Room',
  },

  episodeList: {
    episodes: (count: number) => `${count} Episodes`,
    stages: (count: number) => `${count} Stages`,
    inProgress: (stage: number) => `Stage ${stage} in progress`,
    unsolved: 'Unsolved',
  },

  filters: { all: 'ALL', easy: 'EASY', normal: 'NORMAL', hard: 'HARD' },

  game: {
    unlocked: 'Unlocked',
    accessGranted: 'Access Granted',
    lockLabel: 'The Lock',
    enterPin: 'Enter PIN',
    enterPinMono: 'Enter PIN',
    clue: 'Clue',
    hint: 'Hint',
    showHint: 'Reveal hint',
    hintCost: 'Costs 1 star',
    tapToSkip: 'Tap to skip',
    wrongPin: 'No match · Try again',
    situation: 'Situation',
    revealedClues: 'Revealed Clues',
    noClues: 'No clues have been revealed yet.',
    deductionRule:
      'A wrong answer reveals a new clue. The sooner you solve it, the higher your rating.',
    wrongDeduction: 'Wrong. A new clue has been revealed.',
  },

  input: {
    clearAll: 'Clear all',
    deleteOne: 'Delete one digit',
    submit: 'Enter',
  },

  resume: {
    eyebrow: 'Resume',
    title: 'Continue',
    resume: 'Resume',
    restart: 'Start over',
  },

  complete: {
    share: 'Share',
    copy: 'Copy',
    copied: 'Copied to clipboard.',
    story: {
      eyebrow: 'Case Closed',
      title: 'Case Solved',
      ranks: ['Resolved', 'Commendable', 'Flawless'],
    },
    deduction: {
      eyebrow: 'Access Granted',
      title: 'Unlocked',
      ranks: ['Deciphered', 'Astute', 'Brilliant'],
      attempt: (turn: number) => `Solved on attempt ${turn}`,
    },
  },

  gameOver: {
    story: {
      eyebrow: 'Access Denied',
      title: 'Investigation Failed',
      message: 'You have used every attempt.',
      submessage: 'Try again, or pick a different episode.',
    },
    deduction: {
      eyebrow: 'Decode Failed',
      title: 'Unsolved',
      message: 'Every clue was spent, and the code held.',
      submessage: 'Try again and reach the answer sooner.',
    },
  },

  notFound: {
    eyebrow: 'Not Found',
    title: 'No Record',
    message: 'The case file you are looking for does not exist.',
  },

  error: {
    eyebrow: 'Error',
    title: 'Investigation Halted',
    message: 'Something went wrong.',
    retry: 'Try again',
  },

  share: {
    story: (episodeId: number, title: string, stars: string) =>
      `Cleared Story Hacker EP.${episodeId} "${title}"! ${stars}`,
    deduction: (episodeId: number, title: string, stars: string, turn: number) =>
      `Cleared Story Hacker Deduction EP.${episodeId} "${title}"! ${stars} (attempt ${turn})`,
  },

  meta: {
    modeSelect: {
      title: 'Choose Your Approach',
      description:
        'Pick Story Mode or Deduction Mode. Story hides the PIN inside a narrative; Deduction hands you logical clues one wrong answer at a time.',
    },
    storyList: {
      title: 'Story Mode Episodes',
      description: (count: number) =>
        `${count} story episodes. Read the clues scattered through each case and deduce the locked PIN. Difficulties: EASY, NORMAL, HARD.`,
    },
    deductionList: {
      title: 'Deduction Mode Episodes',
      description: (count: number) =>
        `${count} deduction episodes. Combine logical clues to infer the PIN, and earn a new clue with every wrong answer.`,
    },
    storyEpisode: {
      description: (stages: number) =>
        `${stages} stages. Read the clues hidden in the story and deduce the locked PIN.`,
    },
    deductionEpisode: {
      title: (episodeNumber: number, title: string) =>
        `Deduction EP.${episodeNumber} ${title}`,
      description: (clues: number, stages: number) =>
        `${clues} clues across ${stages} stages. Every wrong answer opens a new one.`,
    },
  },
};

export default en;
