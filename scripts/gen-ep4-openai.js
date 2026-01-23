const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = "public/images/story";

const prompts = [
  // 에피소드 카드 배경 (가로 1792x1024)
  {
    id: "ep-4",
    size: "1792x1024",
    prompt: "Dark mysterious illustration of a noir detective office at night, cluttered desk with case files and magnifying glass, venetian blinds casting green-tinted shadows, smoke trails in the air, investigation board with pinned photos and string connections on the wall, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, cinematic wide composition, no text",
  },
  // 스테이지 배경 (세로 1024x1792)
  {
    id: "4-1",
    size: "1024x1792",
    prompt: "Vertical illustration, a smartphone left on a detective desk next to a business card, the phone screen showing a lock icon with green glow, scattered papers and coffee cup nearby, dim office lamp lighting, noir detective atmosphere, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "4-2",
    size: "1024x1792",
    prompt: "Vertical illustration, a glowing digital folder icon labeled with a lock symbol on a computer screen, confidential stamp effect, date numbers floating faintly around the screen, dark detective office background with dim monitors, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "4-3",
    size: "1024x1792",
    prompt: "Vertical illustration, three suspect profile cards pinned to a dark investigation board, each card showing a silhouette figure with question marks, red string connecting the cards, dim spotlight on the board, noir detective aesthetic, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
  },
  {
    id: "4-4",
    size: "1024x1792",
    prompt: "Vertical illustration, a final evidence folder opening with golden light bursting out, alphabet letters floating in the air transforming into numbers, dramatic reveal moment, dark detective office setting, spotlight effect, cyberpunk hacker aesthetic, neon emerald green and dark navy palette, dark moody atmosphere, no text, no people",
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

  console.log("🎨 에피소드 4 '탐정 사무소' 이미지 생성 시작...\n");

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
