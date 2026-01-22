const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SVG_PATH = "app/icon.svg";
const OUTPUT_DIR = "public/icons";

const sizes = [192, 512];

async function generateIcons() {
  console.log("PWA 아이콘 생성 중...\n");

  const svgBuffer = fs.readFileSync(SVG_PATH);

  for (const size of sizes) {
    const outputPath = path.join(OUTPUT_DIR, `icon-${size}.png`);

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    const fileSize = fs.statSync(outputPath).size;
    console.log(`✅ icon-${size}.png (${(fileSize / 1024).toFixed(1)}KB)`);
  }

  console.log("\n완료!");
}

generateIcons();
