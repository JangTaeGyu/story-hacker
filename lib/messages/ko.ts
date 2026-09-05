/**
 * 한국어 UI 문자열. 다른 언어 사전(en/ja)은 이 파일의 `Messages` 타입을 만족해야 한다.
 *
 * NOCTURNE의 대문자 모노 라벨("Story Mode", "Access Granted", "Turns 0 / 3" 등)은
 * 언어가 아니라 **디자인 요소**다. 세 언어 모두 영문 그대로 두고, 여기서는
 * 실제로 읽히는 문장만 번역한다.
 */

const ko = {
  site: {
    tagline: 'Story Hacker — 추리 미스터리 퍼즐',
    description:
      '어둠 속 단서를 읽고, 잠긴 비밀번호를 풀어내는 추리 미스터리 게임. 스토리 20편과 추리 8편을 무료로 플레이하세요.',
    shortDescription: '어둠 속 단서를 읽고, 잠긴 비밀번호를 풀어내는 추리 미스터리 게임',
    keywords: [
      '추리 게임',
      '미스터리 게임',
      '퍼즐 게임',
      '방탈출 게임',
      '암호 해독',
      '비밀번호 추리',
      '두뇌 게임',
      '무료 웹게임',
      '스토리 게임',
      '추리 소설 게임',
    ],
  },

  common: {
    back: 'BACK',
    exit: 'EXIT',
    home: '처음으로',
    tryAgain: 'Try Again',
    episodeSelect: 'Episode Select',
    replay: 'Replay',
    nextEpisode: 'Next Episode',
    close: '닫기',
    solvedStamp: '해결',
    solvedStampAria: '해결 · 사건 종결',
    languageLabel: '언어',
  },

  home: {
    eyebrow: 'A Mystery In Twenty Acts',
    tagline: '새벽 3시, 풀리지 않은 사건 하나가 당신을 기다린다.',
    cta: '사건 파일 열기',
  },

  modeSelect: {
    eyebrow: 'Choose Your Approach',
    title: '수사 방식',
    enter: '들어가기',
    differenceTitle: 'Mode Difference',
    story: {
      name: '스토리 모드',
      description: '이야기 속에 흩어진 단서를 읽어 비밀번호를 추리한다.',
      tags: ['독해', '추론'],
      difference: '일러스트와 함께 사건에 몰입하며 추리한다.',
      shortName: '스토리',
    },
    deduction: {
      name: '추리 모드',
      description: '턴마다 드러나는 단서를 종합해 비밀번호를 해독한다.',
      tags: ['논리', '연역'],
      difference: '틀릴 때마다 새 단서가 열린다. 빠를수록 높은 평가.',
      shortName: '추리',
    },
  },

  storyList: {
    eyebrow: 'Story Mode',
    title: '사건 기록',
  },

  deductionList: {
    eyebrow: 'Deduction Mode',
    title: '추론의 방',
  },

  episodeList: {
    episodes: (count: number) => `${count} Episodes`,
    stages: (count: number) => `${count} Stages`,
    inProgress: (stage: number) => `Stage ${stage} 진행 중`,
    unsolved: '미해결',
  },

  filters: { all: 'ALL', easy: 'EASY', normal: 'NORMAL', hard: 'HARD' },

  game: {
    unlocked: '잠금 해제',
    accessGranted: 'Access Granted',
    lockLabel: '잠금 장치',
    enterPin: 'PIN 입력',
    enterPinMono: 'Enter PIN',
    clue: '단서',
    hint: '힌트',
    showHint: '힌트 보기',
    hintCost: '별 1 소모',
    tapToSkip: '탭하여 스킵',
    wrongPin: '일치하지 않습니다 · 다시 시도하세요',
    situation: 'Situation',
    revealedClues: 'Revealed Clues',
    noClues: '아직 공개된 단서가 없습니다.',
    deductionRule:
      '오답 시 새로운 단서가 공개됩니다. 빨리 맞출수록 높은 평가를 받습니다.',
    wrongDeduction: '오답입니다. 새로운 단서가 공개되었습니다.',
  },

  input: {
    clearAll: '전체 지움',
    deleteOne: '한 자리 삭제',
    submit: '확인',
  },

  resume: {
    eyebrow: 'Resume',
    title: '이어하기',
    resume: '이어서 시작',
    restart: '처음부터',
  },

  complete: {
    share: 'Share',
    copy: '복사',
    copied: '클립보드에 복사되었습니다!',
    story: {
      eyebrow: 'Case Closed',
      title: '사건 해결',
      ranks: ['Resolved', 'Commendable', 'Flawless'],
    },
    deduction: {
      eyebrow: 'Access Granted',
      title: '잠금 해제',
      ranks: ['Deciphered', 'Astute', 'Brilliant'],
      attempt: (turn: number) => `${turn}번째 시도에 성공`,
    },
  },

  gameOver: {
    story: {
      eyebrow: 'Access Denied',
      title: '수사 실패',
      message: '시도 횟수를 모두 소진했습니다.',
      submessage: '다시 도전하거나 다른 에피소드를 선택하세요.',
    },
    deduction: {
      eyebrow: 'Decode Failed',
      title: '미해결',
      message: '모든 단서를 사용했지만 해독에 실패했습니다.',
      submessage: '다시 도전하여 더 빨리 정답을 찾아보세요.',
    },
  },

  notFound: {
    eyebrow: 'Not Found',
    title: '기록 없음',
    message: '찾으시는 사건 파일이 존재하지 않습니다.',
  },

  error: {
    eyebrow: 'Error',
    title: '수사 중단',
    message: '예기치 못한 문제가 발생했습니다.',
    retry: '다시 시도',
  },

  share: {
    story: (episodeId: number, title: string, stars: string) =>
      `Story Hacker EP.${episodeId} "${title}" 클리어! ${stars}`,
    deduction: (episodeId: number, title: string, stars: string, turn: number) =>
      `Story Hacker 추리 모드 EP.${episodeId} "${title}" 클리어! ${stars} (${turn}번째 시도)`,
  },

  meta: {
    modeSelect: {
      title: '수사 방식 선택',
      description:
        '스토리 모드와 추리 모드 중 하나를 고르세요. 스토리는 이야기 속 단서로, 추리는 논리적 단서로 비밀번호를 풀어냅니다.',
    },
    storyList: {
      title: '스토리 모드 에피소드',
      description: (count: number) =>
        `스토리 모드 에피소드 ${count}편. 이야기 속에 흩어진 단서를 읽어 잠긴 PIN 코드를 추리하세요. 난이도 EASY·NORMAL·HARD.`,
    },
    deductionList: {
      title: '추리 모드 에피소드',
      description: (count: number) =>
        `추리 모드 에피소드 ${count}편. 논리적 단서를 종합해 PIN 코드를 추론하고, 틀릴 때마다 새 단서를 얻으세요.`,
    },
    storyEpisode: {
      description: (stages: number) =>
        `스테이지 ${stages}개. 이야기 속 단서를 읽고 잠긴 PIN 코드를 추리하세요.`,
    },
    deductionEpisode: {
      title: (episodeNumber: number, title: string) =>
        `추리 EP.${episodeNumber} ${title}`,
      description: (clues: number, stages: number) =>
        `단서 ${clues}개, 스테이지 ${stages}개. 틀릴 때마다 새 단서가 열립니다.`,
    },
  },
};

export type Messages = typeof ko;

export default ko;
