const sharp = require("sharp");
const fs = require("fs");

const OUTPUT_PATH = "public/og-image.png";
const WIDTH = 1200;
const HEIGHT = 630;

// OG 이미지용 SVG — NOCTURNE: 다크 문학 미스터리 톤
const svgContent = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#16140f"/>
      <stop offset="55%" style="stop-color:#100f0d"/>
      <stop offset="100%" style="stop-color:#0a0908"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="40%" r="78%">
      <stop offset="52%" style="stop-color:#000000" stop-opacity="0"/>
      <stop offset="100%" style="stop-color:#000000" stop-opacity="0.55"/>
    </radialGradient>
  </defs>

  <!-- 배경 -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- 마크 뒤 은은한 골드 글로우 -->
  <circle cx="600" cy="210" r="240" fill="#c9a86a" opacity="0.05"/>

  <!-- 자물쇠 아이콘 (골드 아웃라인) -->
  <g transform="translate(540, 118)">
    <rect x="0" y="42" width="120" height="98" rx="16" fill="none" stroke="#c9a86a" stroke-width="5"/>
    <path d="M25 42V26a35 35 0 0 1 70 0v16" fill="none" stroke="#c9a86a" stroke-width="5" stroke-linecap="round"/>
    <circle cx="60" cy="86" r="11" fill="#c9a86a"/>
    <rect x="53.5" y="86" width="13" height="30" rx="5" fill="#c9a86a"/>
  </g>

  <!-- 타이틀 -->
  <text x="600" y="352" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="86" fill="#cfc7b8" letter-spacing="5">STORY HACKER</text>

  <!-- 서브타이틀 -->
  <text x="600" y="412" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="29" fill="#837c6e">어둠 속 단서로 잠긴 비밀번호를 풀어내는 추리 미스터리</text>

  <!-- 하단 장식 — 텍스트 양옆을 비켜선 헤어라인 -->
  <line x1="250" y1="481" x2="385" y2="481" stroke="#8f7a4e" stroke-width="1.5" opacity="0.65"/>
  <line x1="815" y1="481" x2="950" y2="481" stroke="#8f7a4e" stroke-width="1.5" opacity="0.65"/>
  <text x="600" y="487" text-anchor="middle" font-family="monospace" font-size="17" fill="#c9a86a" letter-spacing="5" opacity="0.9">A MYSTERY IN TWENTY ACTS</text>

  <!-- 비네팅 -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>
</svg>
`;

async function generateOgImage() {
  console.log("OG 이미지 생성 중...\n");

  await sharp(Buffer.from(svgContent))
    .png()
    .toFile(OUTPUT_PATH);

  const fileSize = fs.statSync(OUTPUT_PATH).size;
  console.log(`✅ og-image.png (${(fileSize / 1024).toFixed(1)}KB)`);
  console.log(`   ${WIDTH}x${HEIGHT}`);
  console.log("\n완료!");
}

generateOgImage();
