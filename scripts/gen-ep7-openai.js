const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

const prompts = [
  // 에피소드 카드 배경 (가로 1792x1024)
  {
    id: "ep-7",
    size: "1792x1024",
    prompt: "Dark mysterious illustration of a hospital corridor during a blackout, emergency red lights casting eerie shadows, wheelchair abandoned in the hallway, exit sign glowing faintly at the end, escape tension atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  // 스테이지 배경 (세로 1024x1792)
  {
    id: "7-1",
    size: "1024x1792",
    prompt: "Vertical illustration, a hospital bed with a tablet device on the bedside table, the tablet screen glowing with a patient authentication lock screen, IV drip stand nearby, dim hospital room at night, window showing city lights outside, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "7-2",
    size: "1024x1792",
    prompt: "Vertical illustration, a doctor's laptop open on an office desk, screen showing a password prompt with green glow, medical charts and stethoscope nearby, dim desk lamp lighting, hospital office at night, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "7-3",
    size: "1024x1792",
    prompt: "Vertical illustration, a medicine storage cabinet with a glowing digital keypad lock, glass doors showing bottles and medical supplies inside, clinical white and green lighting, hospital storage room, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "7-4",
    size: "1024x1792",
    prompt: "Vertical illustration, an emergency exit door in a dark hospital corridor during a power outage, a glowing green code panel next to the door, emergency lights casting red glow, dramatic escape atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
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

  console.log("🎨 에피소드 7 '병원 탈출' 이미지 생성 시작...\n");

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
