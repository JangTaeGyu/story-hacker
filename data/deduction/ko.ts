import type { DeductionEpisode } from '@/lib/types';

/**
 * 추리 모드 — 단서가 후보를 실제로 좁혀 나가야 한다.
 *
 * 예전에는 마지막 단서가 정답을 그대로 인쇄했다("R=255, G=0, B=0 → 255000").
 * 21스테이지 중 14곳이 그랬고, 결과적으로 다섯 번 틀리면 답을 알려주는
 * 인내심 게임이었다. 지금은 **모든 단서가 제약 조건**이며, 마지막 단서까지
 * 써야 후보가 하나로 좁혀진다.
 *
 * 상식을 쓰는 편(107·108)도 지식을 출발점으로만 두고, 자릿수 제약으로
 * 답에 닿을 수 있게 했다. 몰라도 추론으로 풀린다.
 *
 * 새 스테이지를 넣거나 단서를 고칠 때는 `specs/deduction-logic.spec.ts`가
 * "모든 단서가 정답에 대해 참이고, 전부 적용하면 후보가 하나"임을 검사한다.
 */
const episodes: DeductionEpisode[] = [
  {
    id: 101, title: "숫자 추리", difficulty: 2, mode: "deduction",
    epilogue: `세 개의 자물쇠가 차례로 풀렸다. 책상 위의 다이얼, 패널, 그리고 여섯 자리 입력창.

마지막 화면이 꺼지기 전에 한 줄이 떠올랐다. — "조건만으로 답에 닿을 수 있다면, 당신은 이미 준비된 사람이다."

숫자는 거짓말을 하지 않는다. 다만 전부 말해주지 않을 뿐이다.`,
    stages: [
      { id: 1, title: "기초 추리", situation: "책상 위에 네 자리 다이얼 자물쇠가 놓여 있다. 열쇠는 없고, 조건만 적힌 쪽지 한 장이 함께 있다.", lockType: "pin4", answer: "3726", maxTurns: 6,
        clues: [
          { turn: 1, text: "네 숫자는 서로 다릅니다." },
          { turn: 2, text: "첫 번째 숫자는 홀수입니다." },
          { turn: 3, text: "네 숫자를 모두 더하면 18입니다." },
          { turn: 4, text: "두 번째 숫자는 7입니다." },
          { turn: 5, text: "마지막 숫자는 첫 번째 숫자의 두 배입니다." },
          { turn: 6, text: "세 번째 숫자가 네 숫자 중 가장 작습니다." },
        ],
      },
      { id: 2, title: "패턴 분석", situation: "패널에는 '수 세 개를 순서대로 이어 붙인 코드'라는 안내만 떠 있다.", lockType: "pin4", answer: "4816", maxTurns: 5,
        clues: [
          { turn: 1, text: "이 코드는 수 세 개를 순서대로 이어 붙인 것입니다." },
          { turn: 2, text: "첫 번째 수는 4입니다." },
          { turn: 3, text: "각 수는 바로 앞 수의 두 배입니다." },
          { turn: 4, text: "세 수 중 마지막 하나만 두 자리입니다." },
          { turn: 5, text: "세 수를 모두 더하면 28입니다." },
        ],
      },
      { id: 3, title: "암호 해독", situation: "여섯 자리 입력창. 화면 아래로 조건이 한 줄씩 흘러내린다.", lockType: "pin6", answer: "159357", maxTurns: 6,
        clues: [
          { turn: 1, text: "여섯 자리는 세 자리씩 두 덩어리로 나뉩니다." },
          { turn: 2, text: "모든 숫자가 홀수입니다." },
          { turn: 3, text: "각 덩어리 안에서 숫자는 일정한 간격으로 커집니다." },
          { turn: 4, text: "앞 덩어리는 1로 시작합니다." },
          { turn: 5, text: "두 덩어리의 가운데 숫자는 서로 같습니다." },
          { turn: 6, text: "앞 덩어리의 간격은 뒤 덩어리 간격의 두 배입니다." },
        ],
      },
    ],
  },
  {
    id: 102, title: "논리 퍼즐", difficulty: 2, mode: "deduction",
    epilogue: `생일로 잠긴 상자, 여섯 자리 금고, 그리고 마지막 관문. 셋 다 열렸다.

상자 안에는 아무것도 없었다. 금고도 마찬가지였다. 마지막 문 너머에는 빈 방이 하나 있었고, 벽에 이렇게 적혀 있었다. — "무엇이 들었는지 묻지 않고도 여는 법을 배웠다면, 그걸로 충분하다."

경보는 끝내 울리지 않았다.`,
    stages: [
      { id: 1, title: "생일 추리", situation: "친구의 생일로 잠긴 상자. 정작 그 친구는 생일을 알려준 적이 없다. (MMDD)", lockType: "pin4", answer: "0314", maxTurns: 5,
        clues: [
          { turn: 1, text: "3월에 태어났습니다." },
          { turn: 2, text: "일(日)은 10보다 큽니다." },
          { turn: 3, text: "일(日)은 짝수입니다." },
          { turn: 4, text: "일(日)의 두 숫자를 곱하면 4입니다." },
          { turn: 5, text: "네 자리를 모두 더하면 8입니다." },
        ],
      },
      { id: 2, title: "금고 털이", situation: "금고 문에 여섯 자리 다이얼. 안에 무엇이 들었는지는 아무도 말해주지 않았다.", lockType: "pin6", answer: "246810", maxTurns: 6,
        clues: [
          { turn: 1, text: "이 코드는 수 여러 개를 순서대로 이어 붙인 것입니다." },
          { turn: 2, text: "첫 번째 수는 2입니다." },
          { turn: 3, text: "각 수는 바로 앞 수보다 2 큽니다." },
          { turn: 4, text: "마지막 수만 두 자리입니다." },
          { turn: 5, text: "수는 모두 짝수입니다." },
          { turn: 6, text: "수는 모두 다섯 개입니다." },
        ],
      },
      { id: 3, title: "최종 시험", situation: "마지막 관문이다. 네 자리를 넣으면 문이 열리거나, 경보가 울린다.", lockType: "pin4", answer: "1379", maxTurns: 5,
        clues: [
          { turn: 1, text: "네 숫자는 모두 홀수입니다." },
          { turn: 2, text: "왼쪽에서 오른쪽으로 갈수록 커집니다." },
          { turn: 3, text: "연속된 홀수 네 개는 아닙니다." },
          { turn: 4, text: "첫 숫자와 마지막 숫자를 더하면 10입니다." },
          { turn: 5, text: "가운데 두 숫자를 더해도 10입니다." },
        ],
      },
    ],
  },
  {
    id: 103, title: "수학 챌린지", difficulty: 2, mode: "deduction",
    epilogue: `곱셈, 나눗셈, 그리고 나선.

세 자물쇠는 서로 다른 얼굴을 하고 있었지만 요구하는 건 같았다. 눈앞의 수를 믿지 말고, 수와 수 사이의 관계를 보라는 것.

마지막 나선 무늬가 천천히 회전을 멈췄다.`,
    stages: [
      { id: 1, title: "곱셈 퍼즐", situation: "종이에는 곱셈 조건만 적혀 있다. 네 자리를 찾아라.", lockType: "pin4", answer: "2436", maxTurns: 5,
        clues: [
          { turn: 1, text: "네 숫자는 모두 6 이하이고, 서로 다릅니다." },
          { turn: 2, text: "첫째와 셋째를 곱하면 6입니다." },
          { turn: 3, text: "둘째와 넷째를 곱하면 24입니다." },
          { turn: 4, text: "넷째는 둘째보다 큽니다." },
          { turn: 5, text: "첫째는 셋째보다 작습니다." },
        ],
      },
      { id: 2, title: "나눗셈 미스터리", situation: "숫자가 반으로 접히며 줄어드는 코드다.", lockType: "pin4", answer: "8421", maxTurns: 5,
        clues: [
          { turn: 1, text: "왼쪽에서 오른쪽으로 갈수록 작아집니다." },
          { turn: 2, text: "네 숫자를 모두 더하면 15입니다." },
          { turn: 3, text: "가장 작은 숫자는 1입니다." },
          { turn: 4, text: "각 숫자는 바로 앞 숫자의 절반입니다." },
          { turn: 5, text: "첫 번째 숫자는 마지막 숫자의 여덟 배입니다." },
        ],
      },
      { id: 3, title: "피보나치 코드", situation: "여섯 자리 입력창 위에 나선 무늬가 새겨져 있다.", lockType: "pin6", answer: "112358", maxTurns: 6,
        clues: [
          { turn: 1, text: "피보나치 수열과 관련 있습니다." },
          { turn: 2, text: "앞의 두 숫자는 서로 같습니다." },
          { turn: 3, text: "세 번째부터는 앞의 두 숫자를 더한 값입니다." },
          { turn: 4, text: "첫 번째 숫자는 1입니다." },
          { turn: 5, text: "여섯 숫자를 모두 더하면 20입니다." },
          { turn: 6, text: "마지막 숫자는 한 자리 짝수 중 가장 큽니다." },
        ],
      },
    ],
  },
  {
    id: 104, title: "시간 퍼즐", difficulty: 1, mode: "deduction",
    epilogue: `멈춘 시계, 4년에 한 번 오는 날, 1시간에 1초 모자라는 타이머.

셋 다 시간을 다루지만 가리키는 곳이 달랐다. 하나는 멈춘 순간을, 하나는 좀처럼 오지 않는 날을, 하나는 끝나기 직전을 가리켰다.

문이 열리자 복도의 시계가 다시 초를 세기 시작했다.`,
    stages: [
      { id: 1, title: "시계 암호", situation: "멈춘 시계가 가리키는 시각이 곧 코드다.", lockType: "pin4", answer: "1230", maxTurns: 5,
        clues: [
          { turn: 1, text: "24시간 표기의 HHMM 형식입니다." },
          { turn: 2, text: "오전이 아닙니다." },
          { turn: 3, text: "네 숫자를 모두 더하면 6입니다." },
          { turn: 4, text: "0은 맨 뒤에 한 번만 나옵니다." },
          { turn: 5, text: "정오에서 30분이 지난 시각입니다." },
        ],
      },
      { id: 2, title: "날짜 계산", situation: "달력에 동그라미가 하나. 4년에 한 번만 오는 날이다. (YYMMDD)", lockType: "pin6", answer: "240229", maxTurns: 6,
        clues: [
          { turn: 1, text: "YYMMDD 형식입니다." },
          { turn: 2, text: "2024년의 날짜입니다." },
          { turn: 3, text: "2월의 날짜입니다." },
          { turn: 4, text: "4년에 한 번만 존재하는 날입니다." },
          { turn: 5, text: "그 달의 마지막 날입니다." },
          { turn: 6, text: "마지막 두 자리를 더하면 11입니다." },
        ],
      },
      { id: 3, title: "타이머 설정", situation: "타이머를 최대치로 맞춰야 문이 열린다.", lockType: "pin4", answer: "5959", maxTurns: 5,
        clues: [
          { turn: 1, text: "MMSS(분:초) 형식입니다." },
          { turn: 2, text: "분과 초가 같은 값입니다." },
          { turn: 3, text: "네 숫자를 모두 더하면 28입니다." },
          { turn: 4, text: "같은 숫자가 두 개씩만 나옵니다." },
          { turn: 5, text: "1시간에서 1초가 모자라는 시간입니다." },
        ],
      },
    ],
  },
  {
    id: 105, title: "색깔 코드", difficulty: 1, mode: "deduction",
    epilogue: `일곱 색의 띠, 그리고 한 가지 색으로 가득 찬 화면.

색에는 이름이 있고, 순서가 있고, 값이 있다. 셋이 같은 것을 가리킨다는 걸 알면 어느 쪽으로 물어도 답할 수 있다.

마지막 화면의 붉은색이 서서히 검게 가라앉았다.`,
    stages: [
      { id: 1, title: "무지개 순서", situation: "일곱 색 띠 아래에 네 칸짜리 입력창이 있다.", lockType: "pin4", answer: "1234", maxTurns: 5,
        clues: [
          { turn: 1, text: "무지개 색에 순서대로 번호를 매깁니다 — 빨=1, 주=2, 노=3, 초=4, 파=5…" },
          { turn: 2, text: "코드는 네 가지 색의 번호를 이어 붙인 것입니다." },
          { turn: 3, text: "네 색은 무지개에서 서로 이웃합니다." },
          { turn: 4, text: "빨강이 들어 있습니다." },
          { turn: 5, text: "네 숫자를 모두 더하면 10입니다." },
        ],
      },
      { id: 2, title: "RGB 코드", situation: "화면이 한 가지 색으로만 가득 차 있다. 그 색의 값이 코드다.", lockType: "pin6", answer: "255000", maxTurns: 5,
        clues: [
          { turn: 1, text: "R·G·B 값을 각각 세 자리로 적어 이어 붙인 여섯 자리입니다." },
          { turn: 2, text: "세 값 중 둘은 0입니다." },
          { turn: 3, text: "0이 아닌 값은 맨 앞에 옵니다." },
          { turn: 4, text: "그 값은 8비트로 나타낼 수 있는 가장 큰 수입니다." },
          { turn: 5, text: "화면을 채운 색은 순수한 빨강입니다." },
        ],
      },
    ],
  },
  {
    id: 106, title: "음악 퍼즐", difficulty: 2, mode: "deduction",
    epilogue: `눌린 자국이 남은 건반과 소리굽쇠 하나.

음은 높낮이이면서 동시에 숫자다. 도미솔도가 1351이 되고, 조율의 기준이 440이 된다. 그 사이를 오갈 수 있으면 이 방의 자물쇠는 전부 열린다.

소리굽쇠의 떨림이 잦아들고, 방이 조용해졌다.`,
    stages: [
      { id: 1, title: "계이름 코드", situation: "건반 위에 네 음이 눌린 자국이 남아 있다.", lockType: "pin4", answer: "1351", maxTurns: 5,
        clues: [
          { turn: 1, text: "계이름에 번호를 매깁니다 — 도=1, 레=2, 미=3, 파=4, 솔=5, 라=6, 시=7" },
          { turn: 2, text: "네 음으로 이루어진 화음입니다." },
          { turn: 3, text: "첫 음과 마지막 음이 같습니다." },
          { turn: 4, text: "앞의 세 음은 같은 간격으로 올라갑니다." },
          { turn: 5, text: "네 숫자를 모두 더하면 10입니다." },
        ],
      },
      { id: 2, title: "주파수", situation: "조율용 소리굽쇠가 하나 놓여 있다. 그 진동수가 코드다.", lockType: "pin4", answer: "0440", maxTurns: 5,
        clues: [
          { turn: 1, text: "네 자리에 맞추려고 맨 앞을 0으로 채웠습니다." },
          { turn: 2, text: "주파수는 400과 450 사이입니다." },
          { turn: 3, text: "10으로 나누어떨어집니다." },
          { turn: 4, text: "오케스트라가 조율할 때 기준으로 삼는 음입니다." },
          { turn: 5, text: "주파수 세 자리를 모두 더하면 8입니다." },
        ],
      },
    ],
  },
  {
    id: 107, title: "지리 퀴즈", difficulty: 3, mode: "deduction",
    epilogue: `지도 위의 핀 하나, 그리고 통계 화면 하나.

도와 분, 만과 백만. 같은 것을 가리키면서도 단위가 다르면 다른 숫자가 된다. 이 방이 물은 건 지식이 아니라 그 차이였다.

핀이 뽑히고, 지도가 접혔다.`,
    stages: [
      { id: 1, title: "좌표 찾기", situation: "지도 위 서울에 핀이 꽂혀 있다. 위도를 도와 분으로 읽어 네 자리로 적어라.", lockType: "pin4", answer: "3733", maxTurns: 5,
        clues: [
          { turn: 1, text: "앞 두 자리는 도(°), 뒤 두 자리는 분(′)입니다." },
          { turn: 2, text: "서울은 북위 37도대에 있습니다." },
          { turn: 3, text: "분은 30분과 40분 사이입니다." },
          { turn: 4, text: "분은 3의 배수입니다." },
          { turn: 5, text: "분을 이루는 두 숫자는 서로 같습니다." },
        ],
      },
      { id: 2, title: "인구 통계", situation: "인구 통계 화면. 만 명 단위 네 자리가 코드다.", lockType: "pin4", answer: "5100", maxTurns: 5,
        clues: [
          { turn: 1, text: "한국 인구는 5천만 명이 넘습니다." },
          { turn: 2, text: "6천만 명에는 못 미칩니다." },
          { turn: 3, text: "만 명 단위로 적으면 네 자리가 됩니다." },
          { turn: 4, text: "십의 자리와 일의 자리는 둘 다 0입니다." },
          { turn: 5, text: "네 숫자를 모두 더하면 6입니다." },
        ],
      },
    ],
  },
  {
    id: 108, title: "과학 상식", difficulty: 3, mode: "deduction",
    epilogue: `주기율표의 금, 빛이 1초에 가는 거리, 끓고 있는 주전자.

셋 다 누구나 아는 이야기처럼 시작했지만, 답에 닿게 해준 건 지식이 아니라 자릿수였다. 몰라도 좁혀 갈 수 있다 — 그게 이 방의 규칙이었다.

주전자의 김이 잦아들며, 마지막 자물쇠가 풀렸다.`,
    stages: [
      { id: 1, title: "원소 번호", situation: "주기율표에서 금(Au)만 홀로 빛나고 있다.", lockType: "pin4", answer: "0079", maxTurns: 5,
        clues: [
          { turn: 1, text: "금(Au)의 원자번호를 네 자리로 적은 코드입니다." },
          { turn: 2, text: "원자번호는 두 자리이고, 앞의 두 칸은 0으로 채웠습니다." },
          { turn: 3, text: "원자번호는 70대입니다." },
          { turn: 4, text: "두 자리를 더하면 16입니다." },
          { turn: 5, text: "뒤 자리가 앞 자리보다 큽니다." },
        ],
      },
      { id: 2, title: "빛의 속도", situation: "빛이 1초에 나아가는 거리(km). 반올림한 값이 코드다.", lockType: "pin6", answer: "300000", maxTurns: 5,
        clues: [
          { turn: 1, text: "진공에서 빛이 1초에 나아가는 거리를 km로 적은 여섯 자리입니다." },
          { turn: 2, text: "십만 단위로 반올림한 값이라, 뒤의 다섯 자리는 모두 0입니다." },
          { turn: 3, text: "20만 km보다 큽니다." },
          { turn: 4, text: "40만 km보다 작습니다." },
          { turn: 5, text: "여섯 숫자를 모두 더하면 3입니다." },
        ],
      },
      { id: 3, title: "물의 끓는점", situation: "주전자가 끓고 있다. 그 온도를 절대온도로 적어라.", lockType: "pin4", answer: "0373", maxTurns: 5,
        clues: [
          { turn: 1, text: "물이 끓는 온도를 절대온도(K)로 적은 네 자리입니다." },
          { turn: 2, text: "네 자리에 맞추려고 맨 앞을 0으로 채웠습니다." },
          { turn: 3, text: "온도는 300K와 400K 사이입니다." },
          { turn: 4, text: "켈빈 = 섭씨 + 273이고, 물은 표준 기압에서 섭씨 100도에 끓습니다." },
          { turn: 5, text: "네 숫자를 모두 더하면 13입니다." },
        ],
      },
    ],
  },
];

export default episodes;
