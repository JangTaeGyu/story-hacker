const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const INPUT_DIR = "public/images/story";
const ORIGINAL_DIR = "public/images/story/original";
const TARGET_WIDTH = 420;

async function resizeImages() {
  const files = fs.readdirSync(ORIGINAL_DIR).filter(f => f.endsWith(".png"));

  console.log(`📐 이미지 리사이즈 (가로 ${TARGET_WIDTH}, 비율 유지)...\n`);

  for (const file of files) {
    const inputPath = path.join(ORIGINAL_DIR, file);
    const outputPath = path.join(INPUT_DIR, file);

    try {
      // 원본 이미지 정보
      const metadata = await sharp(inputPath).metadata();
      const targetHeight = Math.round(TARGET_WIDTH * metadata.height / metadata.width);
      console.log(`📷 ${file}: ${metadata.width}x${metadata.height} → ${TARGET_WIDTH}x${targetHeight}`);

      // 리사이즈 (비율 유지)
      await sharp(inputPath)
        .resize(TARGET_WIDTH, null, {
          fit: "inside"
        })
        .png({ compressionLevel: 9 })
        .toFile(outputPath + ".tmp");

      // 임시 파일을 최종 파일로 이동
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      fs.renameSync(outputPath + ".tmp", outputPath);

      const newSize = fs.statSync(outputPath).size;
      console.log(`   ✅ (${(newSize / 1024).toFixed(1)}KB)`);
    } catch (err) {
      console.error(`   ❌ ${file}: ${err.message}`);
    }
  }

  console.log("\n🏁 완료!");
}

resizeImages();
