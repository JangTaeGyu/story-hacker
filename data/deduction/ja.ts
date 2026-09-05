import type { DeductionEpisode } from '@/lib/types';

// 단서 논리는 ko.ts와 동일해야 한다 — specs/deduction-logic.spec.ts가 정답·유일성을 검사한다.
const episodes: DeductionEpisode[] = [
  {
    id: 101, title: "数字の推理", difficulty: 2, mode: "deduction",
    epilogue: `三つの錠が順に外れた。机の上のダイヤル、パネル、そして六桁の入力欄。

最後の画面が消える前に、一行だけ浮かんだ。——「条件だけで答えに届くなら、あなたはもう準備ができている。」

数字は嘘をつかない。ただ、全部を話してくれないだけだ。`,
    stages: [
      { id: 1, title: "基礎推理", situation: "机の上に四桁のダイヤル錠。鍵はなく、条件だけを書いたメモが一枚添えてある。", lockType: "pin4", answer: "3726", maxTurns: 6,
        clues: [
          { turn: 1, text: "四つの数字はすべて異なります。" },
          { turn: 2, text: "一つ目の数字は奇数です。" },
          { turn: 3, text: "四つの数字を全部足すと18です。" },
          { turn: 4, text: "二つ目の数字は7です。" },
          { turn: 5, text: "最後の数字は一つ目の数字の二倍です。" },
          { turn: 6, text: "三つ目の数字が四つの中でいちばん小さいです。" },
        ],
      },
      { id: 2, title: "パターン分析", situation: "パネルには「数を三つ順に並べたコード」という案内だけが出ている。", lockType: "pin4", answer: "4816", maxTurns: 5,
        clues: [
          { turn: 1, text: "このコードは数を三つ、順につないだものです。" },
          { turn: 2, text: "一つ目の数は4です。" },
          { turn: 3, text: "各数は直前の数の二倍です。" },
          { turn: 4, text: "三つのうち最後の一つだけが二桁です。" },
          { turn: 5, text: "三つの数を全部足すと28です。" },
        ],
      },
      { id: 3, title: "暗号解読", situation: "六桁の入力欄。画面の下へ条件が一行ずつ流れていく。", lockType: "pin6", answer: "159357", maxTurns: 6,
        clues: [
          { turn: 1, text: "六桁は三桁ずつ二つの塊に分かれます。" },
          { turn: 2, text: "すべての数字が奇数です。" },
          { turn: 3, text: "各塊の中で数字は一定の間隔で大きくなります。" },
          { turn: 4, text: "前の塊は1から始まります。" },
          { turn: 5, text: "二つの塊の真ん中の数字は同じです。" },
          { turn: 6, text: "前の塊の間隔は後ろの塊の間隔の二倍です。" },
        ],
      },
    ],
  },
  {
    id: 102, title: "論理パズル", difficulty: 2, mode: "deduction",
    epilogue: `誕生日で施錠された箱、六桁の金庫、そして最後の関門。三つとも開いた。

箱の中には何もなかった。金庫も同じだった。最後の扉の向こうには空の部屋がひとつあり、壁にこう書かれていた。——「中に何があるかを訊かずに開ける術を学んだなら、それで十分だ。」

警報は、とうとう鳴らなかった。`,
    stages: [
      { id: 1, title: "誕生日の推理", situation: "友人の誕生日で施錠された箱。その友人は誕生日を口にしたことがない。(MMDD)", lockType: "pin4", answer: "0314", maxTurns: 5,
        clues: [
          { turn: 1, text: "3月生まれです。" },
          { turn: 2, text: "日は10より大きいです。" },
          { turn: 3, text: "日は偶数です。" },
          { turn: 4, text: "日を作る二つの数字を掛けると4です。" },
          { turn: 5, text: "四桁を全部足すと8です。" },
        ],
      },
      { id: 2, title: "金庫破り", situation: "金庫の扉に六桁のダイヤル。中に何があるかは誰も言わなかった。", lockType: "pin6", answer: "246810", maxTurns: 6,
        clues: [
          { turn: 1, text: "このコードは数をいくつか、順につないだものです。" },
          { turn: 2, text: "一つ目の数は2です。" },
          { turn: 3, text: "各数は直前の数より2大きいです。" },
          { turn: 4, text: "最後の数だけが二桁です。" },
          { turn: 5, text: "数はすべて偶数です。" },
          { turn: 6, text: "数は全部で五つです。" },
        ],
      },
      { id: 3, title: "最終試験", situation: "最後の関門だ。四桁を入れれば扉が開くか、警報が鳴るかのどちらかだ。", lockType: "pin4", answer: "1379", maxTurns: 5,
        clues: [
          { turn: 1, text: "四つの数字はすべて奇数です。" },
          { turn: 2, text: "左から右へ行くほど大きくなります。" },
          { turn: 3, text: "連続した四つの奇数ではありません。" },
          { turn: 4, text: "最初と最後の数字を足すと10です。" },
          { turn: 5, text: "真ん中の二つの数字を足しても10です。" },
        ],
      },
    ],
  },
  {
    id: 103, title: "数学チャレンジ", difficulty: 2, mode: "deduction",
    epilogue: `掛け算、割り算、そして螺旋。

三つの錠は違う顔をしていたが、求めるものは同じだった。目の前の数を信じるな、数と数のあいだを見ろ、ということ。

最後の螺旋模様が、ゆっくりと回転を止めた。`,
    stages: [
      { id: 1, title: "掛け算パズル", situation: "紙には掛け算の条件だけが書かれている。四桁を見つけろ。", lockType: "pin4", answer: "2436", maxTurns: 5,
        clues: [
          { turn: 1, text: "四つの数字はすべて6以下で、互いに異なります。" },
          { turn: 2, text: "一つ目と三つ目を掛けると6です。" },
          { turn: 3, text: "二つ目と四つ目を掛けると24です。" },
          { turn: 4, text: "四つ目は二つ目より大きいです。" },
          { turn: 5, text: "一つ目は三つ目より小さいです。" },
        ],
      },
      { id: 2, title: "割り算のミステリー", situation: "進むごとに半分に折れていくコードだ。", lockType: "pin4", answer: "8421", maxTurns: 5,
        clues: [
          { turn: 1, text: "左から右へ行くほど小さくなります。" },
          { turn: 2, text: "四つの数字を全部足すと15です。" },
          { turn: 3, text: "いちばん小さい数字は1です。" },
          { turn: 4, text: "各数字は直前の数字の半分です。" },
          { turn: 5, text: "一つ目の数字は最後の数字の八倍です。" },
        ],
      },
      { id: 3, title: "フィボナッチコード", situation: "六桁の入力欄の上に螺旋の模様が刻まれている。", lockType: "pin6", answer: "112358", maxTurns: 6,
        clues: [
          { turn: 1, text: "フィボナッチ数列と関係があります。" },
          { turn: 2, text: "前の二つの数字は同じです。" },
          { turn: 3, text: "三つ目からは、前の二つの数字を足した値です。" },
          { turn: 4, text: "一つ目の数字は1です。" },
          { turn: 5, text: "六つの数字を全部足すと20です。" },
          { turn: 6, text: "最後の数字は一桁の偶数の中でいちばん大きいです。" },
        ],
      },
    ],
  },
  {
    id: 104, title: "時間パズル", difficulty: 1, mode: "deduction",
    epilogue: `止まった時計、4年に一度来る日、1時間に1秒足りないタイマー。

三つとも時間を扱うが、指す場所が違った。ひとつは止まった瞬間を、ひとつはめったに来ない日を、ひとつは終わる直前を指していた。

扉が開くと、廊下の時計がまた秒を数えはじめた。`,
    stages: [
      { id: 1, title: "時計の暗号", situation: "止まった時計が指している時刻が、そのままコードだ。", lockType: "pin4", answer: "1230", maxTurns: 5,
        clues: [
          { turn: 1, text: "24時間表記のHHMM形式です。" },
          { turn: 2, text: "午前ではありません。" },
          { turn: 3, text: "四つの数字を全部足すと6です。" },
          { turn: 4, text: "0はちょうど一度だけ、いちばん後ろに出ます。" },
          { turn: 5, text: "正午から30分過ぎた時刻です。" },
        ],
      },
      { id: 2, title: "日付の計算", situation: "カレンダーに丸がひとつ。4年に一度しか来ない日だ。(YYMMDD)", lockType: "pin6", answer: "240229", maxTurns: 6,
        clues: [
          { turn: 1, text: "YYMMDD形式です。" },
          { turn: 2, text: "2024年の日付です。" },
          { turn: 3, text: "2月の日付です。" },
          { turn: 4, text: "4年に一度しか存在しない日です。" },
          { turn: 5, text: "その月の最後の日です。" },
          { turn: 6, text: "最後の二桁を足すと11です。" },
        ],
      },
      { id: 3, title: "タイマー設定", situation: "タイマーを最大値に合わせなければ扉は開かない。", lockType: "pin4", answer: "5959", maxTurns: 5,
        clues: [
          { turn: 1, text: "MMSS(分:秒)形式です。" },
          { turn: 2, text: "分と秒が同じ値です。" },
          { turn: 3, text: "四つの数字を全部足すと28です。" },
          { turn: 4, text: "出てくる数字はどれもちょうど二回ずつです。" },
          { turn: 5, text: "1時間に1秒足りない時間です。" },
        ],
      },
    ],
  },
  {
    id: 105, title: "色のコード", difficulty: 1, mode: "deduction",
    epilogue: `七色の帯と、ひとつの色だけで埋まった画面。

色には名前があり、順番があり、値がある。三つが同じものを指していると分かれば、どちらから訊かれても答えられる。

最後の画面の赤が、ゆっくりと黒に沈んでいった。`,
    stages: [
      { id: 1, title: "虹の順番", situation: "七色の帯の下に四マスの入力欄がある。", lockType: "pin4", answer: "1234", maxTurns: 5,
        clues: [
          { turn: 1, text: "虹の色に順番どおり番号を振ります —— 赤=1、橙=2、黄=3、緑=4、青=5…" },
          { turn: 2, text: "コードは四つの色の番号をつないだものです。" },
          { turn: 3, text: "四つの色は虹の中で互いに隣り合っています。" },
          { turn: 4, text: "赤が含まれています。" },
          { turn: 5, text: "四つの数字を全部足すと10です。" },
        ],
      },
      { id: 2, title: "RGBコード", situation: "画面がひとつの色だけで埋まっている。その色の値がコードだ。", lockType: "pin6", answer: "255000", maxTurns: 5,
        clues: [
          { turn: 1, text: "R・G・Bの値をそれぞれ三桁で書いてつないだ六桁です。" },
          { turn: 2, text: "三つの値のうち二つは0です。" },
          { turn: 3, text: "0でない値がいちばん前に来ます。" },
          { turn: 4, text: "その値は8ビットで表せる最大の数です。" },
          { turn: 5, text: "画面を埋めているのは純粋な赤です。" },
        ],
      },
    ],
  },
  {
    id: 106, title: "音楽パズル", difficulty: 2, mode: "deduction",
    epilogue: `押した跡の残る鍵盤と、音叉がひとつ。

音は高さであると同時に数字だ。ドミソドが1351になり、調律の基準が440になる。そのあいだを行き来できれば、この部屋の錠はすべて開く。

音叉の震えが収まり、部屋が静かになった。`,
    stages: [
      { id: 1, title: "階名のコード", situation: "鍵盤の上に、四つの音を押した跡が残っている。", lockType: "pin4", answer: "1351", maxTurns: 5,
        clues: [
          { turn: 1, text: "階名に番号を振ります —— ド=1、レ=2、ミ=3、ファ=4、ソ=5、ラ=6、シ=7" },
          { turn: 2, text: "四つの音でできた和音です。" },
          { turn: 3, text: "最初の音と最後の音が同じです。" },
          { turn: 4, text: "前の三つの音は同じ間隔で上がります。" },
          { turn: 5, text: "四つの数字を全部足すと10です。" },
        ],
      },
      { id: 2, title: "周波数", situation: "調律用の音叉がひとつ置かれている。その振動数がコードだ。", lockType: "pin4", answer: "0440", maxTurns: 5,
        clues: [
          { turn: 1, text: "四桁に合わせるため、先頭を0で埋めています。" },
          { turn: 2, text: "周波数は400と450のあいだです。" },
          { turn: 3, text: "10で割り切れます。" },
          { turn: 4, text: "オーケストラが調律の基準にする音です。" },
          { turn: 5, text: "周波数の三桁を全部足すと8です。" },
        ],
      },
    ],
  },
  {
    id: 107, title: "地理クイズ", difficulty: 3, mode: "deduction",
    epilogue: `地図の上のピンひとつと、統計画面がひとつ。

度と分、万と百万。同じものを指していても、単位が違えば違う数字になる。この部屋が問うたのは知識ではなく、その差だった。

ピンが抜かれ、地図が畳まれた。`,
    stages: [
      { id: 1, title: "座標を探す", situation: "地図の上、ソウルにピンが刺さっている。緯度を度と分で読み、四桁で書け。", lockType: "pin4", answer: "3733", maxTurns: 5,
        clues: [
          { turn: 1, text: "前の二桁は度(°)、後ろの二桁は分(′)です。" },
          { turn: 2, text: "ソウルは北緯37度台にあります。" },
          { turn: 3, text: "分は30分と40分のあいだです。" },
          { turn: 4, text: "分は3の倍数です。" },
          { turn: 5, text: "分を作る二つの数字は同じです。" },
        ],
      },
      { id: 2, title: "人口統計", situation: "人口統計の画面。万人単位の四桁がコードだ。", lockType: "pin4", answer: "5100", maxTurns: 5,
        clues: [
          { turn: 1, text: "韓国の人口は5千万人を超えます。" },
          { turn: 2, text: "6千万人には届きません。" },
          { turn: 3, text: "万人単位で書くと四桁になります。" },
          { turn: 4, text: "十の位と一の位はどちらも0です。" },
          { turn: 5, text: "四つの数字を全部足すと6です。" },
        ],
      },
    ],
  },
  {
    id: 108, title: "科学の常識", difficulty: 3, mode: "deduction",
    epilogue: `周期表の金、光が1秒に進む距離、沸いているやかん。

三つとも誰もが知る話のように始まったが、答えに届かせたのは知識ではなく桁だった。知らなくても絞っていける——それがこの部屋の規則だった。

やかんの湯気が薄れ、最後の錠が外れた。`,
    stages: [
      { id: 1, title: "元素番号", situation: "周期表の中で、金(Au)だけがひとり光っている。", lockType: "pin4", answer: "0079", maxTurns: 5,
        clues: [
          { turn: 1, text: "金(Au)の原子番号を四桁で書いたコードです。" },
          { turn: 2, text: "原子番号は二桁で、前の二マスは0で埋めています。" },
          { turn: 3, text: "原子番号は70台です。" },
          { turn: 4, text: "その二桁を足すと16です。" },
          { turn: 5, text: "後ろの桁が前の桁より大きいです。" },
        ],
      },
      { id: 2, title: "光の速さ", situation: "光が1秒に進む距離(km)。四捨五入した値がコードだ。", lockType: "pin6", answer: "300000", maxTurns: 5,
        clues: [
          { turn: 1, text: "真空で光が1秒に進む距離をkmで書いた六桁です。" },
          { turn: 2, text: "十万単位で四捨五入した値なので、後ろの五桁はすべて0です。" },
          { turn: 3, text: "20万kmより大きいです。" },
          { turn: 4, text: "40万kmより小さいです。" },
          { turn: 5, text: "六つの数字を全部足すと3です。" },
        ],
      },
      { id: 3, title: "水の沸点", situation: "やかんが沸いている。その温度を絶対温度で書け。", lockType: "pin4", answer: "0373", maxTurns: 5,
        clues: [
          { turn: 1, text: "水が沸く温度を絶対温度(K)で書いた四桁です。" },
          { turn: 2, text: "四桁に合わせるため、先頭を0で埋めています。" },
          { turn: 3, text: "温度は300Kと400Kのあいだです。" },
          { turn: 4, text: "ケルビン = 摂氏 + 273 で、水は標準気圧で摂氏100度に沸きます。" },
          { turn: 5, text: "四つの数字を全部足すと13です。" },
        ],
      },
    ],
  },
];

export default episodes;
