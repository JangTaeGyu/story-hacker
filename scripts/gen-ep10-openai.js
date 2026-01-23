const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

const prompts = [
  // 에피소드 카드 배경 (가로 1792x1024)
  {
    id: "ep-10",
    size: "1792x1024",
    prompt: "Dark mysterious illustration of a metal time capsule partially dug out from the ground at night, warm golden light glowing from inside the capsule, childhood memorabilia scattered around like old photos and toys, nostalgic yet mysterious atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  // 스테이지 배경 (세로 1024x1792)
  {
    id: "10-1",
    size: "1024x1792",
    prompt: "Vertical illustration, a rusty metal time capsule box sitting in a freshly dug hole in the ground, a faded memo sticker attached to it, shovel nearby, nighttime garden setting with moonlight, nostalgic childhood memory atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "10-2",
    size: "1024x1792",
    prompt: "Vertical illustration, a sealed old envelope with a small decorative padlock on it, handwritten text visible on the surface, placed on a desk with the open time capsule in the background, warm amber and green lighting, nostalgic letter concept, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "10-3",
    size: "1024x1792",
    prompt: "Vertical illustration, an old USB flash drive plugged into a laptop, the screen showing a locked video file icon with a glowing padlock, childhood photos scattered around the desk, warm nostalgic glow mixed with digital green light, memory and technology concept, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
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

  console.log("🎨 에피소드 10 '타임캡슐' 이미지 생성 시작...\n");

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
