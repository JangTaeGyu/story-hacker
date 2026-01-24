const fs = require("fs");
const path = require("path");

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const MODEL = "black-forest-labs/flux-schnell";
const OUTPUT_DIR = path.resolve(__dirname, "../../public/images/story");
const RATE_LIMIT_DELAY = 12000; // 12초 (크레딧 $5 미만 시 rate limit 방지)

async function createPrediction(prompt, aspect_ratio) {
  const res = await fetch(
    `https://api.replicate.com/v1/models/${MODEL}/predictions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        input: {
          prompt,
          aspect_ratio,
          output_format: "png",
          num_outputs: 1,
        },
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error: ${error}`);
  }

  return await res.json();
}

async function waitForPrediction(predictionId) {
  for (let i = 0; i < 120; i++) {
    const res = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      { headers: { Authorization: `Bearer ${REPLICATE_API_TOKEN}` } }
    );
    const prediction = await res.json();

    if (prediction.status === "succeeded") {
      return Array.isArray(prediction.output)
        ? prediction.output[0]
        : prediction.output;
    }
    if (prediction.status === "failed" || prediction.status === "canceled") {
      throw new Error(prediction.error || "Prediction failed");
    }

    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error("Timeout: 240초 내에 완료되지 않음");
}

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * 프롬프트 배열로 이미지를 생성합니다.
 * @param {Array<{id: string, aspect_ratio: string, prompt: string}>} prompts
 * @param {object} options
 * @param {string} [options.outputDir] - 출력 디렉토리 (기본: public/images/story)
 * @param {string} [options.label] - 로그에 표시할 라벨
 */
async function generateImages(prompts, options = {}) {
  const outputDir = options.outputDir || OUTPUT_DIR;
  const label = options.label || "이미지";

  if (!REPLICATE_API_TOKEN) {
    console.error("REPLICATE_API_TOKEN 환경변수가 필요합니다");
    console.error(".env.local에 REPLICATE_API_TOKEN=r8_... 추가하세요");
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n🎨 ${label} 생성 시작 (FLUX Schnell)...\n`);

  let generated = 0;
  let skipped = 0;

  for (let i = 0; i < prompts.length; i++) {
    const { id, aspect_ratio, prompt } = prompts[i];
    const outPath = path.join(outputDir, `${id}.png`);

    if (fs.existsSync(outPath)) {
      console.log(`⏭️  ${id}: 이미 존재, 건너뛰기`);
      skipped++;
      continue;
    }

    console.log(`🖼️  ${id} (${aspect_ratio}): 생성 중...`);

    try {
      const prediction = await createPrediction(prompt, aspect_ratio);
      console.log(`   ⏳ 대기 중 (${prediction.id})...`);

      const imageUrl = await waitForPrediction(prediction.id);
      const img = await downloadImage(imageUrl);
      fs.writeFileSync(outPath, img);

      console.log(`✅ ${id}: 완료 (${(img.length / 1024).toFixed(1)}KB)`);
      generated++;
    } catch (err) {
      console.error(`❌ ${id}: ${err.message}`);
    }

    // 마지막이 아니면 rate limit 대기
    if (i < prompts.length - 1) {
      await new Promise((r) => setTimeout(r, RATE_LIMIT_DELAY));
    }
  }

  console.log(`\n🏁 완료! (생성: ${generated}, 건너뜀: ${skipped})`);
}

module.exports = { generateImages };