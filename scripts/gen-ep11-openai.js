const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

const prompts = [
  // 에피소드 카드 배경 (가로 1792x1024)
  {
    id: "ep-11",
    size: "1792x1024",
    prompt: "Dark cyberpunk illustration of a neon-lit back alley in a futuristic city at night, holographic signs flickering, a shadowy figure standing at the end of the alley with green glowing eyes, recruitment and mystery atmosphere, rain-wet streets reflecting neon lights, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  // 스테이지 배경 (세로 1024x1792)
  {
    id: "11-1",
    size: "1024x1792",
    prompt: "Vertical illustration, a dark cramped apartment room with an old CRT monitor displaying green blinking text, messy desk with cables and electronics, dim green glow illuminating the room, futuristic cyberpunk slum aesthetic, rain visible through dirty window, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "11-2",
    size: "1024x1792",
    prompt: "Vertical illustration, a convenience store back door in a cyberpunk alley, a glowing digital lock panel on the metal door, neon store sign partially visible above, trash and cables on the ground, dim streetlight, futuristic urban night setting, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "11-3",
    size: "1024x1792",
    prompt: "Vertical illustration, a mysterious hooded figure in a dark cyberpunk alley, holding a small glowing green microchip in their outstretched hand, neon reflections on wet ground, dramatic lighting from above, futuristic secret meeting atmosphere, neon emerald green and dark navy palette, dark moody atmosphere, no text",
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

  console.log("🎨 에피소드 11 '첫 번째 임무' 이미지 생성 시작...\n");

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
