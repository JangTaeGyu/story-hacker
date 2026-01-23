const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

const prompts = [
  // 에피소드 카드 배경 (가로 1792x1024)
  {
    id: "ep-6",
    size: "1792x1024",
    prompt: "Dark mysterious illustration of a moody cafe at night, neon coffee cup sign glowing with emerald green light, rain-wet window reflections, empty tables with dim candles, a mysterious atmosphere suggesting hidden secrets, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  // 스테이지 배경 (세로 1024x1792)
  {
    id: "6-1",
    size: "1024x1792",
    prompt: "Vertical illustration, inside a dark atmospheric cafe, a glowing poster on the wall with WiFi symbol, coffee cups on tables, warm ambient lighting mixed with green neon accents, cozy but mysterious cafe interior, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "6-2",
    size: "1024x1792",
    prompt: "Vertical illustration, a staff-only door in a cafe hallway with a glowing digital keypad lock, dim corridor lighting, caution sign on the door, mysterious green light seeping from under the door, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "6-3",
    size: "1024x1792",
    prompt: "Vertical illustration, a small metal safe on a shelf in a cafe back room, coffee bean bags stacked nearby, the safe keypad glowing with emerald light, steam rising from a nearby coffee machine, dim storage room atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
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

  console.log("🎨 에피소드 6 '카페 미스터리' 이미지 생성 시작...\n");

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
