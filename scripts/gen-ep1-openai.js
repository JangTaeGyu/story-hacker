const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

// 80년대 일본 애니 + 픽셀아트 + 다크 분위기 + 여백 없이 꽉 채움
const STYLE = "pixel art style, 8-bit retro game aesthetic, dark moody atmosphere, 1980s Japanese anime inspired, limited color palette with neon accents, CRT screen glow effect, cyberpunk noir, full bleed composition filling entire frame edge to edge, no borders no margins no empty space,";

const prompts = [
  { id: "1-1", prompt: `${STYLE} wide shot of abandoned smartphone glowing on park bench at dusk, dimly lit urban park scene fills entire image, mysterious atmosphere, heart sticker on phone case, shadowy trees background` },
  { id: "1-2", prompt: `${STYLE} wide shot of dark room with smartphone screen glowing showing cute cat photo wallpaper, locked notepad app icon visible, scene fills entire image edge to edge, moody atmosphere` },
  { id: "1-3", prompt: `${STYLE} wide shot of hands holding smartphone displaying photo gallery app with glowing lock icon, password protected folder, dark room scene fills entire image edge to edge` },
  { id: "1-4", prompt: `${STYLE} wide shot of mysterious screen showing cryptic cipher code A=1 B=2 C=3, code breaking puzzle scene fills entire image edge to edge, dark dramatic atmosphere` },
];

async function generateImage(prompt) {
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
      size: "1792x1024",
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
    console.error(".env.local에 OPENAI_API_KEY=sk-... 추가하세요");
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log("🎨 에피소드 1 '수상한 이웃' 이미지 생성 시작...\n");

  for (const { id, prompt } of prompts) {
    const outPath = path.join(OUTPUT_DIR, `${id}.png`);

    if (fs.existsSync(outPath)) {
      console.log(`⏭️  ${id}: 이미 존재, 건너뛰기`);
      continue;
    }

    console.log(`🖼️  ${id}: 생성 중...`);

    try {
      const img = await generateImage(prompt);
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
