const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

const prompts = [
  // 에피소드 카드 배경 (가로 1792x1024)
  {
    id: "ep-14",
    size: "1792x1024",
    prompt: "Dark cyberpunk illustration of a shadowy figure with two faces representing a double agent, one face lit in emerald green and the other in red, fractured mirror effect, digital glitch distortion, betrayal and deception atmosphere, neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  // 스테이지 배경 (세로 1024x1792)
  {
    id: "14-1",
    size: "1024x1792",
    prompt: "Vertical illustration, a USB drive plugged into a terminal showing encrypted member activity logs scrolling on screen, dark safe house room, a mysterious figure's shadow on the wall, tension and suspicion atmosphere, cyberpunk aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "14-2",
    size: "1024x1792",
    prompt: "Vertical illustration, multiple screens showing communication log timestamps highlighted in red, pattern analysis visualization with connecting lines, dark monitoring room, suspicious activity detection interface, cyberpunk aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "14-3",
    size: "1024x1792",
    prompt: "Vertical illustration, a computer screen revealing a decrypted secret message with payment transaction details, red warning indicators, corporate logo partially visible, evidence of betrayal concept, cyberpunk aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "14-4",
    size: "1024x1792",
    prompt: "Vertical illustration, an emergency lockdown system activation panel with flashing red and green lights, metal blast doors closing in a cyberpunk corridor, alarm sirens visual effect, urgent chase atmosphere, cyberpunk aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
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

  console.log("🎨 에피소드 14 '내부자' 이미지 생성 시작...\n");

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
