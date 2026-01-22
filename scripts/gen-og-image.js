const sharp = require("sharp");
const fs = require("fs");

const OUTPUT_PATH = "public/og-image.png";
const WIDTH = 1200;
const HEIGHT = 630;

// OG 이미지용 SVG 생성
const svgContent = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D1117"/>
      <stop offset="50%" style="stop-color:#161B22"/>
      <stop offset="100%" style="stop-color:#0D1117"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- 배경 -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- 배경 글로우 효과 -->
  <circle cx="200" cy="150" r="200" fill="#00FF88" opacity="0.08"/>
  <circle cx="1000" cy="500" r="250" fill="#FF3366" opacity="0.06"/>
  <circle cx="600" cy="600" r="180" fill="#22d3ee" opacity="0.05"/>

  <!-- 스캔라인 효과 -->
  <pattern id="scanlines" patternUnits="userSpaceOnUse" width="4" height="4">
    <line x1="0" y1="0" x2="4" y2="0" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  </pattern>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#scanlines)"/>

  <!-- 자물쇠 아이콘 -->
  <g transform="translate(540, 140)" filter="url(#glowStrong)">
    <rect x="0" y="40" width="120" height="100" rx="15" fill="none" stroke="#00FF88" stroke-width="6"/>
    <path d="M25 40V25a35 35 0 0 1 70 0v15" fill="none" stroke="#00FF88" stroke-width="6" stroke-linecap="round"/>
    <circle cx="60" cy="85" r="12" fill="#00FF88"/>
    <rect x="52" y="85" width="16" height="30" fill="#00FF88"/>
  </g>

  <!-- 타이틀 -->
  <text x="600" y="340" text-anchor="middle" font-family="monospace" font-size="72" font-weight="bold" fill="#00FF88" filter="url(#glow)">STORY HACKER</text>

  <!-- 서브타이틀 -->
  <text x="600" y="400" text-anchor="middle" font-family="sans-serif" font-size="32" fill="#888888">추리 퍼즐 게임</text>

  <!-- 설명 -->
  <text x="600" y="480" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#666666">스토리 속 단서를 읽고 비밀번호를 추리하세요</text>

  <!-- 하단 장식 -->
  <line x1="200" y1="540" x2="500" y2="540" stroke="#00FF88" stroke-width="2" opacity="0.5"/>
  <line x1="700" y1="540" x2="1000" y2="540" stroke="#00FF88" stroke-width="2" opacity="0.5"/>
  <text x="600" y="548" text-anchor="middle" font-family="monospace" font-size="18" fill="#00FF88" opacity="0.8">[ ACCESS GRANTED ]</text>

  <!-- 코너 장식 -->
  <path d="M30 30 L30 80 M30 30 L80 30" stroke="#00FF88" stroke-width="3" opacity="0.6"/>
  <path d="M1170 30 L1170 80 M1170 30 L1120 30" stroke="#00FF88" stroke-width="3" opacity="0.6"/>
  <path d="M30 600 L30 550 M30 600 L80 600" stroke="#00FF88" stroke-width="3" opacity="0.6"/>
  <path d="M1170 600 L1170 550 M1170 600 L1120 600" stroke="#00FF88" stroke-width="3" opacity="0.6"/>
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
