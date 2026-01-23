const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

const prompts = [
  // 에피소드 카드 배경 (가로 1792x1024)
  {
    id: "ep-12",
    size: "1792x1024",
    prompt: "Dark cyberpunk illustration of a massive corporate skyscraper at night, the building glowing with green holographic logos, a tiny silhouette figure approaching the entrance from below, corporate espionage and infiltration atmosphere, flying vehicles in the sky, neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  // 스테이지 배경 (세로 1024x1792)
  {
    id: "12-1",
    size: "1024x1792",
    prompt: "Vertical illustration, a futuristic corporate lobby with sleek holographic displays and floating information panels, marble floors reflecting green neon lights, security scanners at the entrance, empty reception desk, cyberpunk corporate aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "12-2",
    size: "1024x1792",
    prompt: "Vertical illustration, a futuristic visitor terminal screen in a corporate lobby, the screen showing an authentication code input interface with green glow, digital keyboard hologram, sleek metallic kiosk design, cyberpunk corporate aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "12-3",
    size: "1024x1792",
    prompt: "Vertical illustration, a computer screen showing a hidden encrypted file icon with a glowing lock, file directory listing visible in the background, digital data streams flowing around, dark terminal interface aesthetic, cyberpunk corporate aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "12-4",
    size: "1024x1792",
    prompt: "Vertical illustration, a classified document displayed on a screen with heavy black redaction bars covering most text, PROJECT-X header visible at the top, red classified stamps, faint data leaking through the redactions with green glow, cyberpunk corporate aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
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

  console.log("🎨 에피소드 12 '기업 정찰' 이미지 생성 시작...\n");

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
