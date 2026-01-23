const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

const prompts = [
  // 에피소드 카드 배경 (가로 1792x1024)
  {
    id: "ep-9",
    size: "1792x1024",
    prompt: "Dark mysterious illustration of a tall ancient wizard tower rising into a stormy night sky, glowing emerald magical runes spiraling around the tower, lightning in the background, dark enchanted forest at the base, fantasy magic atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  // 스테이지 배경 (세로 1024x1792)
  {
    id: "9-1",
    size: "1024x1792",
    prompt: "Vertical illustration, a massive stone tower entrance door with a glowing magical lock in the center, fire and water elemental symbols carved on either side, ancient stone archway with mystical vines, dark enchanted forest behind, fantasy magic atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "9-2",
    size: "1024x1792",
    prompt: "Vertical illustration, a ornate medieval door inside a tower stairwell, glowing riddle inscriptions carved into the stone frame, magical numbers floating in the air around the door, torchlight flickering on stone walls, spiral staircase visible, fantasy magic atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "9-3",
    size: "1024x1792",
    prompt: "Vertical illustration, a vast magical library inside a tower with towering bookshelves reaching to the ceiling, floating books with glowing pages, a stone golem guardian standing near a restricted section gate, magical particles in the air, fantasy magic atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "9-4",
    size: "1024x1792",
    prompt: "Vertical illustration, a wizard's secret chamber at the top of a tower, a large glowing crystal ball on a pedestal in the center, mystical symbols and star charts on the walls, ancient scrolls and potions on shelves, ethereal green and purple light emanating from the crystal, fantasy magic atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
];

async function generateImage(prompt, size) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: size,
      response_format: "b64_json",
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("API Error:", error);
    return null;
  }

  const data = await res.json();
  if (data.data?.[0]?.b64_json) {
    return Buffer.from(data.data[0].b64_json, "base64");
  }
  return null;
}

async function main() {
  if (!OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY 환경변수가 필요합니다");
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log("🎨 에피소드 9 '마법사의 탑' 이미지 생성 시작...\n");

  for (const { id, size, prompt } of prompts) {
    const outPath = path.join(OUTPUT_DIR, `${id}.png`);

    if (fs.existsSync(outPath)) {
      console.log(`⏭️  ${id}: 이미 존재, 건너뛰기`);
      continue;
    }

    console.log(`🖼️  ${id} (${size}): 생성 중...`);

    try {
      const img = await generateImage(prompt, size);
      if (img) {
        fs.writeFileSync(outPath, img);
        console.log(`✅ ${id}: 완료 (${(img.length / 1024).toFixed(1)}KB)`);
      } else {
        console.log(`❌ ${id}: 실패`);
      }
    } catch (err) {
      console.error(`❌ ${id}: 오류 -`, err.message);
    }

    // API 속도 제한 방지 (2초 대기)
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\n🏁 완료!");
}

main();
