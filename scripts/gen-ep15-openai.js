const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

const prompts = [
  // 에피소드 카드 배경 (가로 1792x1024)
  {
    id: "ep-15",
    size: "1792x1024",
    prompt: "Dark cyberpunk illustration of a massive futuristic corporate skyscraper with glowing green circuit patterns on its surface like a beating heart, a tiny silhouette figure rappelling down the side of the building, spotlight beams sweeping the night sky, infiltration and heist atmosphere, neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  // 스테이지 배경 (세로 1024x1792)
  {
    id: "15-1",
    size: "1024x1792",
    prompt: "Vertical illustration, a holographic blueprint of a 52-floor corporate building floating above a dark table, floor plans and security patrol routes highlighted in green, night shift schedule data on side screens, mission planning war room atmosphere, cyberpunk aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "15-2",
    size: "1024x1792",
    prompt: "Vertical illustration, a high-tech ID card fabrication machine with a half-finished fake employee badge under a scanning laser, holographic barcode being generated, cleaning uniform hanging nearby, counterfeiting workshop setup, cyberpunk aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "15-3",
    size: "1024x1792",
    prompt: "Vertical illustration, a large industrial cargo elevator with heavy metal doors and a glowing green security keypad panel, underground parking garage visible through gaps, dim emergency lighting, industrial pipes and cables on walls, cyberpunk basement aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "15-4",
    size: "1024x1792",
    prompt: "Vertical illustration, a massive server room door with a biometric scanner glowing red, override keypad panel beside it, rows of blinking server racks visible through reinforced glass window, cold blue fog from cooling system, underground bunker aesthetic, cyberpunk aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "15-5",
    size: "1024x1792",
    prompt: "Vertical illustration, a main server terminal displaying PROJECT-X files with AES-256 encryption unlock animation, cascading green data streams, multiple holographic screens showing decoded classified documents, revelation and discovery atmosphere, cyberpunk aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
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

  console.log("🎨 에피소드 15 '옴니코프의 심장' 이미지 생성 시작...\n");

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
