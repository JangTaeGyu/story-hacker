import type { Messages } from './ko';

const ja: Messages = {
  site: {
    tagline: 'Story Hacker — 推理ミステリーパズル',
    description:
      '闇に潜む手がかりを読み解き、施錠された暗証番号を解き明かす推理ミステリーゲーム。ストーリー20話と推理8話をブラウザで無料プレイ。',
    shortDescription:
      '闇に潜む手がかりを読み解き、施錠された暗証番号を解き明かす推理ミステリーゲーム',
    keywords: [
      '推理ゲーム',
      'ミステリーゲーム',
      '謎解きゲーム',
      '脱出ゲーム',
      '暗号解読',
      '暗証番号 推理',
      '頭脳ゲーム',
      '無料ブラウザゲーム',
      'ストーリーゲーム',
      '探偵ゲーム',
    ],
  },

  common: {
    back: 'BACK',
    exit: 'EXIT',
    home: '最初へ',
    tryAgain: 'Try Again',
    episodeSelect: 'Episode Select',
    replay: 'Replay',
    nextEpisode: 'Next Episode',
    close: '閉じる',
    solvedStamp: '解決',
    solvedStampAria: '解決 · 事件終結',
    languageLabel: '言語',
  },

  home: {
    eyebrow: 'A Mystery In Twenty Acts',
    tagline: '午前3時。未解決の事件が、ひとつあなたを待っている。',
    cta: '事件ファイルを開く',
  },

  modeSelect: {
    eyebrow: 'Choose Your Approach',
    title: '捜査方法',
    enter: '入る',
    differenceTitle: 'Mode Difference',
    story: {
      name: 'ストーリーモード',
      description: '物語に散らばる手がかりを読み、暗証番号を推理する。',
      tags: ['読解', '推論'],
      difference: 'イラストとともに事件へ沈み込みながら推理する。',
      shortName: 'ストーリー',
    },
    deduction: {
      name: '推理モード',
      description: 'ターンごとに開く手がかりを束ねて、暗証番号を解読する。',
      tags: ['論理', '演繹'],
      difference: '間違えるたびに新しい手がかりが開く。速く解くほど高評価。',
      shortName: '推理',
    },
  },

  storyList: {
    eyebrow: 'Story Mode',
    title: '事件記録',
  },

  deductionList: {
    eyebrow: 'Deduction Mode',
    title: '推論の部屋',
  },

  episodeList: {
    episodes: (count: number) => `${count} Episodes`,
    stages: (count: number) => `${count} Stages`,
    inProgress: (stage: number) => `Stage ${stage} 進行中`,
    unsolved: '未解決',
  },

  filters: { all: 'ALL', easy: 'EASY', normal: 'NORMAL', hard: 'HARD' },

  game: {
    unlocked: 'ロック解除',
    accessGranted: 'Access Granted',
    lockLabel: '施錠装置',
    enterPin: 'PIN を入力',
    enterPinMono: 'Enter PIN',
    clue: '手がかり',
    hint: 'ヒント',
    showHint: 'ヒントを見る',
    hintCost: '星1つ消費',
    tapToSkip: 'タップでスキップ',
    wrongPin: '一致しません · もう一度',
    situation: 'Situation',
    revealedClues: 'Revealed Clues',
    noClues: 'まだ開示された手がかりはありません。',
    deductionRule:
      '誤答すると新しい手がかりが開きます。早く当てるほど高い評価になります。',
    wrongDeduction: '誤答です。新しい手がかりが開示されました。',
  },

  input: {
    clearAll: 'すべて消去',
    deleteOne: '1桁削除',
    submit: '確認',
  },

  resume: {
    eyebrow: 'Resume',
    title: '続きから',
    resume: '続きから始める',
    restart: '最初から',
  },

  complete: {
    share: 'Share',
    copy: 'コピー',
    copied: 'クリップボードにコピーしました。',
    story: {
      eyebrow: 'Case Closed',
      title: '事件解決',
      ranks: ['Resolved', 'Commendable', 'Flawless'],
    },
    deduction: {
      eyebrow: 'Access Granted',
      title: 'ロック解除',
      ranks: ['Deciphered', 'Astute', 'Brilliant'],
      attempt: (turn: number) => `${turn}回目の挑戦で成功`,
    },
  },

  gameOver: {
    story: {
      eyebrow: 'Access Denied',
      title: '捜査失敗',
      message: '挑戦できる回数を使い切りました。',
      submessage: 'もう一度挑むか、別のエピソードを選んでください。',
    },
    deduction: {
      eyebrow: 'Decode Failed',
      title: '未解決',
      message: 'すべての手がかりを使いましたが、解読できませんでした。',
      submessage: 'もう一度挑戦し、より早く答えにたどり着いてください。',
    },
  },

  notFound: {
    eyebrow: 'Not Found',
    title: '記録なし',
    message: 'お探しの事件ファイルは存在しません。',
  },

  error: {
    eyebrow: 'Error',
    title: '捜査中断',
    message: '予期せぬ問題が発生しました。',
    retry: '再試行',
  },

  share: {
    story: (episodeId: number, title: string, stars: string) =>
      `Story Hacker EP.${episodeId}「${title}」クリア！ ${stars}`,
    deduction: (episodeId: number, title: string, stars: string, turn: number) =>
      `Story Hacker 推理モード EP.${episodeId}「${title}」クリア！ ${stars}（${turn}回目の挑戦）`,
  },

  meta: {
    modeSelect: {
      title: '捜査方法を選ぶ',
      description:
        'ストーリーモードと推理モードから選んでください。ストーリーは物語の手がかりで、推理は論理的な手がかりで暗証番号を解き明かします。',
    },
    storyList: {
      title: 'ストーリーモード エピソード',
      description: (count: number) =>
        `ストーリーモード全${count}話。物語に散らばる手がかりを読み、施錠されたPINコードを推理しましょう。難易度は EASY・NORMAL・HARD。`,
    },
    deductionList: {
      title: '推理モード エピソード',
      description: (count: number) =>
        `推理モード全${count}話。論理的な手がかりを束ねてPINコードを推論し、誤答するたびに新しい手がかりを得ましょう。`,
    },
    storyEpisode: {
      description: (stages: number) =>
        `全${stages}ステージ。物語の手がかりを読み、施錠されたPINコードを推理しましょう。`,
    },
    deductionEpisode: {
      title: (episodeNumber: number, title: string) =>
        `推理 EP.${episodeNumber} ${title}`,
      description: (clues: number, stages: number) =>
        `手がかり${clues}個、全${stages}ステージ。誤答するたびに新しい手がかりが開きます。`,
    },
  },
};

export default ja;
