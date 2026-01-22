'use client';

import Image from 'next/image';

// ============================================
// 스토리 모드 일러스트 컴포넌트들
// ============================================

// 에피소드 1: 수상한 이웃 (PNG 이미지) - 420x240 (1.75:1 비율)
export const Illust1_1 = () => (
  <div className="w-full aspect-[7/4] relative overflow-hidden">
    <Image src="/images/story/1-1.png" alt="떨어진 스마트폰" fill className="object-cover" />
  </div>
);

export const Illust1_2 = () => (
  <div className="w-full aspect-[7/4] relative overflow-hidden">
    <Image src="/images/story/1-2.png" alt="잠긴 메모장" fill className="object-cover" />
  </div>
);

export const Illust1_3 = () => (
  <div className="w-full aspect-[7/4] relative overflow-hidden">
    <Image src="/images/story/1-3.png" alt="비밀 갤러리" fill className="object-cover" />
  </div>
);

export const Illust1_4 = () => (
  <div className="w-full aspect-[7/4] relative overflow-hidden">
    <Image src="/images/story/1-4.png" alt="최종 단서" fill className="object-cover" />
  </div>
);

// 기존 SVG 일러스트 (에피소드 2-10)
export const IllustSmartphone = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="phoneBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      <linearGradient id="screen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#00ff88" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <rect x="60" y="10" width="80" height="140" rx="10" fill="url(#phoneBg)" stroke="#00ff88" strokeWidth="2"/>
    <rect x="68" y="25" width="64" height="100" rx="3" fill="url(#screen)"/>
    <circle cx="100" cy="135" r="8" fill="none" stroke="#00ff88" strokeWidth="1.5" opacity="0.5"/>
    <rect x="85" y="15" width="30" height="4" rx="2" fill="#00ff88" opacity="0.3"/>
    <text x="100" y="70" textAnchor="middle" fill="#00ff88" fontSize="20">🔒</text>
    <text x="100" y="95" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="monospace">LOCKED</text>
    {/* 빛나는 효과 */}
    <circle cx="100" cy="75" r="25" fill="#00ff88" opacity="0.1">
      <animate attributeName="r" values="25;30;25" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

export const IllustCat = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="catBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2d1b4e" />
        <stop offset="100%" stopColor="#1a1a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#catBg)" rx="8"/>
    {/* 고양이 얼굴 */}
    <ellipse cx="100" cy="90" rx="40" ry="35" fill="#4a4a6a"/>
    {/* 귀 */}
    <polygon points="65,55 75,85 55,75" fill="#4a4a6a"/>
    <polygon points="135,55 125,85 145,75" fill="#4a4a6a"/>
    <polygon points="68,60 75,80 60,72" fill="#ff9999"/>
    <polygon points="132,60 125,80 140,72" fill="#ff9999"/>
    {/* 눈 */}
    <ellipse cx="85" cy="85" rx="8" ry="10" fill="#00ff88"/>
    <ellipse cx="115" cy="85" rx="8" ry="10" fill="#00ff88"/>
    <ellipse cx="85" cy="85" rx="3" ry="5" fill="#000"/>
    <ellipse cx="115" cy="85" rx="3" ry="5" fill="#000"/>
    {/* 코와 입 */}
    <polygon points="100,95 95,100 105,100" fill="#ff9999"/>
    <path d="M95,105 Q100,112 105,105" fill="none" stroke="#ff9999" strokeWidth="2"/>
    {/* 수염 */}
    <line x1="70" y1="98" x2="50" y2="95" stroke="#888" strokeWidth="1"/>
    <line x1="70" y1="102" x2="50" y2="105" stroke="#888" strokeWidth="1"/>
    <line x1="130" y1="98" x2="150" y2="95" stroke="#888" strokeWidth="1"/>
    <line x1="130" y1="102" x2="150" y2="105" stroke="#888" strokeWidth="1"/>
    {/* 하트 */}
    <text x="160" y="40" fontSize="20">💕</text>
    <text x="100" y="145" textAnchor="middle" fill="#00ff88" fontSize="10" fontFamily="monospace">나비 ♥ 2017</text>
  </svg>
);

export const IllustGallery = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="galleryBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#0f3460" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#galleryBg)" rx="8"/>
    {/* 사진 프레임들 */}
    <rect x="15" y="20" width="50" height="50" rx="5" fill="#2a2a4a" stroke="#00ff88" strokeWidth="1"/>
    <rect x="75" y="20" width="50" height="50" rx="5" fill="#2a2a4a" stroke="#00ff88" strokeWidth="1"/>
    <rect x="135" y="20" width="50" height="50" rx="5" fill="#2a2a4a" stroke="#00ff88" strokeWidth="1"/>
    <rect x="15" y="85" width="50" height="50" rx="5" fill="#2a2a4a" stroke="#00ff88" strokeWidth="1"/>
    <rect x="75" y="85" width="50" height="50" rx="5" fill="#2a2a4a" stroke="#ff3366" strokeWidth="2"/>
    <rect x="135" y="85" width="50" height="50" rx="5" fill="#2a2a4a" stroke="#00ff88" strokeWidth="1"/>
    {/* 사진 아이콘 */}
    <text x="40" y="52" textAnchor="middle" fontSize="18">🌅</text>
    <text x="100" y="52" textAnchor="middle" fontSize="18">🏠</text>
    <text x="160" y="52" textAnchor="middle" fontSize="18">🌸</text>
    <text x="40" y="117" textAnchor="middle" fontSize="18">🐱</text>
    <text x="100" y="117" textAnchor="middle" fontSize="18">🔒</text>
    <text x="160" y="117" textAnchor="middle" fontSize="18">🎂</text>
    {/* 잠금 표시 */}
    <circle cx="100" cy="110" r="20" fill="#ff3366" opacity="0.2">
      <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1.5s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

export const IllustCode = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="codeBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0d1117" />
        <stop offset="100%" stopColor="#161b22" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#codeBg)" rx="8"/>
    {/* 코드 라인들 */}
    <text x="20" y="35" fill="#00ff88" fontSize="12" fontFamily="monospace">A = 1</text>
    <text x="20" y="55" fill="#00ff88" fontSize="12" fontFamily="monospace">B = 2</text>
    <text x="20" y="75" fill="#00ff88" fontSize="12" fontFamily="monospace">C = 3</text>
    <text x="20" y="95" fill="#888" fontSize="12" fontFamily="monospace">...</text>
    <text x="20" y="115" fill="#00ff88" fontSize="12" fontFamily="monospace">T = 20</text>
    {/* 변환 화살표 */}
    <text x="100" y="75" fill="#ff3366" fontSize="20">→</text>
    {/* 결과 */}
    <rect x="120" y="50" width="65" height="50" rx="5" fill="#00ff88" opacity="0.1" stroke="#00ff88" strokeWidth="1"/>
    <text x="152" y="70" textAnchor="middle" fill="#00ff88" fontSize="10" fontFamily="monospace">CAT</text>
    <text x="152" y="90" textAnchor="middle" fill="#ff3366" fontSize="14" fontFamily="monospace">3•1•20</text>
  </svg>
);

export const IllustGrandpa = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="grandpaBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2d2d44" />
        <stop offset="100%" stopColor="#1a1a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#grandpaBg)" rx="8"/>
    {/* 오래된 폰 */}
    <rect x="70" y="30" width="60" height="100" rx="8" fill="#3a3a5a" stroke="#666" strokeWidth="2"/>
    <rect x="78" y="50" width="44" height="55" rx="2" fill="#1a1a2e"/>
    {/* 버튼들 */}
    <circle cx="100" cy="120" r="8" fill="#444"/>
    <rect x="82" y="38" width="36" height="6" rx="2" fill="#444"/>
    {/* 화면 내용 */}
    <text x="100" y="75" textAnchor="middle" fill="#00ff88" fontSize="10" fontFamily="monospace">1945</text>
    <text x="100" y="90" textAnchor="middle" fill="#00ff88" fontSize="10" fontFamily="monospace">08.15</text>
    {/* 태극기 */}
    <text x="160" y="50" fontSize="24">🇰🇷</text>
    {/* 날짜 */}
    <text x="100" y="150" textAnchor="middle" fill="#888" fontSize="9" fontFamily="monospace">광복절 1945.08.15</text>
  </svg>
);

export const IllustSafe = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="safeBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#2d2d44" />
      </linearGradient>
      <linearGradient id="safeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a4a6a" />
        <stop offset="100%" stopColor="#2a2a4a" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#safeBg)" rx="8"/>
    {/* 금고 */}
    <rect x="50" y="20" width="100" height="100" rx="5" fill="url(#safeMetal)" stroke="#666" strokeWidth="3"/>
    {/* 다이얼 */}
    <circle cx="100" cy="70" r="25" fill="#2a2a4a" stroke="#00ff88" strokeWidth="2"/>
    <circle cx="100" cy="70" r="18" fill="#1a1a2e"/>
    <text x="100" y="75" textAnchor="middle" fill="#00ff88" fontSize="14" fontFamily="monospace">●●●</text>
    {/* 손잡이 */}
    <rect x="130" y="60" width="15" height="20" rx="3" fill="#666"/>
    {/* 숫자들 */}
    <text x="100" y="145" textAnchor="middle" fill="#888" fontSize="10" fontFamily="monospace">15 • 18 • 20</text>
    {/* 빛 효과 */}
    <circle cx="100" cy="70" r="30" fill="#00ff88" opacity="0.1">
      <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

export const IllustSchool = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="schoolBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e3a5f" />
        <stop offset="100%" stopColor="#1a1a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#schoolBg)" rx="8"/>
    {/* 학교 건물 */}
    <rect x="40" y="60" width="120" height="80" fill="#2a2a4a"/>
    <rect x="90" y="100" width="20" height="40" fill="#1a1a2e"/>
    {/* 창문 */}
    <rect x="50" y="70" width="15" height="20" fill="#ffd700" opacity="0.5"/>
    <rect x="75" y="70" width="15" height="20" fill="#ffd700" opacity="0.3"/>
    <rect x="110" y="70" width="15" height="20" fill="#ffd700" opacity="0.5"/>
    <rect x="135" y="70" width="15" height="20" fill="#ffd700" opacity="0.3"/>
    {/* 지붕 */}
    <polygon points="100,30 30,60 170,60" fill="#4a4a6a"/>
    {/* 시계 */}
    <circle cx="100" cy="50" r="10" fill="#fff" opacity="0.8"/>
    <line x1="100" y1="50" x2="100" y2="43" stroke="#333" strokeWidth="2"/>
    <line x1="100" y1="50" x2="105" y2="50" stroke="#333" strokeWidth="1.5"/>
    {/* 태블릿 아이콘 */}
    <text x="170" y="30" fontSize="16">📱</text>
    <text x="100" y="155" textAnchor="middle" fill="#00ff88" fontSize="9" fontFamily="monospace">28 × 3 = ?</text>
  </svg>
);

export const IllustDetective = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="detectiveBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#2d1b4e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#detectiveBg)" rx="8"/>
    {/* 돋보기 */}
    <circle cx="80" cy="70" r="30" fill="none" stroke="#00ff88" strokeWidth="4"/>
    <line x1="102" y1="92" x2="130" y2="120" stroke="#00ff88" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="80" cy="70" r="25" fill="#00ff88" opacity="0.1"/>
    {/* 물음표 */}
    <text x="80" y="80" textAnchor="middle" fill="#00ff88" fontSize="24" fontFamily="serif">?</text>
    {/* 서류 */}
    <rect x="130" y="40" width="50" height="70" fill="#f5f5dc" opacity="0.9" rx="2"/>
    <line x1="140" y1="55" x2="170" y2="55" stroke="#333" strokeWidth="1" opacity="0.5"/>
    <line x1="140" y1="65" x2="170" y2="65" stroke="#333" strokeWidth="1" opacity="0.5"/>
    <line x1="140" y1="75" x2="160" y2="75" stroke="#333" strokeWidth="1" opacity="0.5"/>
    <text x="155" y="100" textAnchor="middle" fill="#ff3366" fontSize="12">TOP SECRET</text>
  </svg>
);

export const IllustGame = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="gameBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a0a2e" />
        <stop offset="100%" stopColor="#2d1b4e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#gameBg)" rx="8"/>
    {/* 게임 컨트롤러 */}
    <ellipse cx="100" cy="90" rx="60" ry="35" fill="#2a2a4a"/>
    {/* 십자 버튼 */}
    <rect x="50" y="80" width="25" height="8" rx="2" fill="#444"/>
    <rect x="58" y="72" width="8" height="25" rx="2" fill="#444"/>
    {/* ABXY 버튼 */}
    <circle cx="135" cy="80" r="6" fill="#ff3366"/>
    <circle cx="150" cy="90" r="6" fill="#00ff88"/>
    <circle cx="135" cy="100" r="6" fill="#ffd700"/>
    <circle cx="120" cy="90" r="6" fill="#00aaff"/>
    {/* 점수 */}
    <text x="100" y="40" textAnchor="middle" fill="#ffd700" fontSize="20" fontFamily="monospace">7,777</text>
    <text x="100" y="55" textAnchor="middle" fill="#888" fontSize="10" fontFamily="monospace">HIGH SCORE</text>
    {/* 반짝임 */}
    <text x="150" y="35" fontSize="14">✨</text>
    <text x="45" y="45" fontSize="14">✨</text>
  </svg>
);

export const IllustCafe = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="cafeBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3d2314" />
        <stop offset="100%" stopColor="#1a1a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#cafeBg)" rx="8"/>
    {/* 커피 컵 */}
    <ellipse cx="100" cy="110" rx="35" ry="10" fill="#2a2a4a"/>
    <path d="M65,60 L70,110 L130,110 L135,60 Z" fill="#f5f5dc"/>
    <ellipse cx="100" cy="60" rx="35" ry="10" fill="#f5f5dc"/>
    <ellipse cx="100" cy="60" rx="28" ry="7" fill="#4a3728"/>
    {/* 손잡이 */}
    <path d="M135,70 Q155,70 155,90 Q155,105 135,105" fill="none" stroke="#f5f5dc" strokeWidth="8"/>
    {/* 증기 애니메이션 */}
    <path d="M85,40 Q80,30 85,20" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5">
      <animate attributeName="d" values="M85,40 Q80,30 85,20;M85,40 Q90,30 85,20;M85,40 Q80,30 85,20" dur="2s" repeatCount="indefinite"/>
    </path>
    <path d="M100,35 Q95,25 100,15" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5">
      <animate attributeName="d" values="M100,35 Q95,25 100,15;M100,35 Q105,25 100,15;M100,35 Q95,25 100,15" dur="2.5s" repeatCount="indefinite"/>
    </path>
    <path d="M115,40 Q110,30 115,20" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5">
      <animate attributeName="d" values="M115,40 Q110,30 115,20;M115,40 Q120,30 115,20;M115,40 Q110,30 115,20" dur="1.8s" repeatCount="indefinite"/>
    </path>
    {/* WiFi 아이콘 */}
    <text x="30" y="40" fontSize="20">📶</text>
    <text x="100" y="145" textAnchor="middle" fill="#00ff88" fontSize="10" fontFamily="monospace">CAFE 2580</text>
  </svg>
);

export const IllustHospital = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="hospitalBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a2a3a" />
        <stop offset="100%" stopColor="#1a1a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#hospitalBg)" rx="8"/>
    {/* 병원 건물 */}
    <rect x="50" y="40" width="100" height="100" fill="#3a3a5a"/>
    {/* 십자가 */}
    <rect x="90" y="50" width="20" height="40" fill="#ff3366"/>
    <rect x="80" y="60" width="40" height="20" fill="#ff3366"/>
    {/* 창문 */}
    <rect x="60" y="100" width="20" height="25" fill="#ffd700" opacity="0.4"/>
    <rect x="90" y="100" width="20" height="25" fill="#ffd700" opacity="0.6"/>
    <rect x="120" y="100" width="20" height="25" fill="#ffd700" opacity="0.3"/>
    {/* 문 */}
    <rect x="90" y="115" width="20" height="25" fill="#2a2a4a"/>
    {/* 하트 모니터 */}
    <text x="170" y="50" fontSize="16">💓</text>
    <text x="100" y="155" textAnchor="middle" fill="#00ff88" fontSize="9" fontFamily="monospace">PATIENT ID: 050815</text>
  </svg>
);

export const IllustSpace = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="spaceBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#000011" />
        <stop offset="100%" stopColor="#0a0a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#spaceBg)" rx="8"/>
    {/* 별들 */}
    <circle cx="20" cy="30" r="1" fill="#fff"/>
    <circle cx="50" cy="15" r="1.5" fill="#fff"/>
    <circle cx="80" cy="40" r="1" fill="#fff"/>
    <circle cx="120" cy="20" r="1" fill="#fff"/>
    <circle cx="150" cy="45" r="1.5" fill="#fff"/>
    <circle cx="180" cy="25" r="1" fill="#fff"/>
    <circle cx="30" cy="60" r="1" fill="#fff"/>
    <circle cx="170" cy="70" r="1" fill="#fff"/>
    {/* 지구 */}
    <circle cx="50" cy="120" r="30" fill="#1e90ff"/>
    <ellipse cx="45" cy="115" rx="15" ry="10" fill="#32cd32" opacity="0.7"/>
    <ellipse cx="60" cy="130" rx="10" ry="8" fill="#32cd32" opacity="0.7"/>
    {/* 우주 정거장 */}
    <rect x="100" y="70" width="60" height="25" rx="3" fill="#4a4a6a" stroke="#00ff88" strokeWidth="1"/>
    <rect x="85" y="75" width="15" height="15" fill="#3a3a5a"/>
    <rect x="160" y="75" width="15" height="15" fill="#3a3a5a"/>
    {/* 태양광 패널 */}
    <rect x="70" y="78" width="20" height="10" fill="#4169e1"/>
    <rect x="165" y="78" width="20" height="10" fill="#4169e1"/>
    {/* 경고등 깜박임 */}
    <circle cx="130" cy="82" r="3" fill="#ff3366">
      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
    </circle>
    <text x="130" y="60" textAnchor="middle" fill="#ff3366" fontSize="8" fontFamily="monospace">⚠ ALERT</text>
  </svg>
);

export const IllustMagicTower = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="magicBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a0a3e" />
        <stop offset="100%" stopColor="#2d1b5e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#magicBg)" rx="8"/>
    {/* 탑 */}
    <polygon points="100,10 70,50 130,50" fill="#4a4a6a"/>
    <rect x="75" y="50" width="50" height="90" fill="#3a3a5a"/>
    {/* 창문 */}
    <ellipse cx="100" cy="70" rx="10" ry="12" fill="#ffd700" opacity="0.6"/>
    <ellipse cx="100" cy="100" rx="10" ry="12" fill="#ffd700" opacity="0.4"/>
    {/* 문 */}
    <path d="M85,140 L85,115 Q100,105 115,115 L115,140 Z" fill="#2a1a4a"/>
    {/* 마법 효과 */}
    <circle cx="100" cy="70" r="15" fill="#ffd700" opacity="0.2">
      <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite"/>
    </circle>
    {/* 별 */}
    <text x="100" y="25" textAnchor="middle" fontSize="12">⭐</text>
    <text x="40" y="50" fontSize="10">✨</text>
    <text x="160" y="60" fontSize="10">✨</text>
    {/* 마법 구슬 */}
    <circle cx="160" cy="120" r="15" fill="#9966ff" opacity="0.5"/>
    <circle cx="160" cy="120" r="10" fill="#cc99ff" opacity="0.5"/>
    <text x="100" y="155" textAnchor="middle" fill="#ffd700" fontSize="9" fontFamily="monospace">🔮 MAGIC TOWER</text>
  </svg>
);

export const IllustTimeCapsule = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="timeBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2a1a0a" />
        <stop offset="100%" stopColor="#1a1a2e" />
      </linearGradient>
      <linearGradient id="capsule" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#cd853f" />
        <stop offset="100%" stopColor="#8b4513" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#timeBg)" rx="8"/>
    {/* 땅 */}
    <ellipse cx="100" cy="130" rx="70" ry="20" fill="#3d2817"/>
    {/* 캡슐 */}
    <ellipse cx="100" cy="90" rx="40" ry="25" fill="url(#capsule)" stroke="#ffd700" strokeWidth="2"/>
    <ellipse cx="100" cy="90" rx="30" ry="18" fill="#a0522d"/>
    {/* 자물쇠 */}
    <rect x="90" y="80" width="20" height="15" rx="3" fill="#ffd700"/>
    <circle cx="100" cy="75" r="8" fill="none" stroke="#ffd700" strokeWidth="3"/>
    {/* 날짜 */}
    <text x="100" y="93" textAnchor="middle" fill="#1a1a2e" fontSize="8" fontFamily="monospace">2015</text>
    {/* 화살표와 시간 */}
    <text x="40" y="50" fill="#888" fontSize="10">2015</text>
    <text x="60" y="50" fill="#00ff88" fontSize="12">→</text>
    <text x="75" y="50" fill="#00ff88" fontSize="10">2025</text>
    {/* 반짝임 */}
    <text x="150" y="70" fontSize="14">✨</text>
    <text x="100" y="155" textAnchor="middle" fill="#ffd700" fontSize="9" fontFamily="monospace">10 YEARS AGO</text>
  </svg>
);

// 스토리 일러스트 매핑
export const storyIllustrations: Record<string, React.ComponentType> = {
  // 에피소드 1: 수상한 이웃 (PNG 이미지)
  "1-1": Illust1_1,
  "1-2": Illust1_2,
  "1-3": Illust1_3,
  "1-4": Illust1_4,
  "2-1": IllustGrandpa,
  "2-2": IllustSafe,
  "3-1": IllustSchool,
  "3-2": IllustSchool,
  "3-3": IllustCode,
  "4-1": IllustDetective,
  "4-2": IllustDetective,
  "4-3": IllustDetective,
  "4-4": IllustDetective,
  "5-1": IllustGame,
  "5-2": IllustGame,
  "5-3": IllustGame,
  "5-4": IllustGame,
  "6-1": IllustCafe,
  "6-2": IllustCafe,
  "6-3": IllustSafe,
  "7-1": IllustHospital,
  "7-2": IllustHospital,
  "7-3": IllustHospital,
  "7-4": IllustHospital,
  "8-1": IllustSpace,
  "8-2": IllustSpace,
  "8-3": IllustSpace,
  "8-4": IllustSpace,
  "9-1": IllustMagicTower,
  "9-2": IllustMagicTower,
  "9-3": IllustMagicTower,
  "9-4": IllustMagicTower,
  "10-1": IllustTimeCapsule,
  "10-2": IllustTimeCapsule,
  "10-3": IllustTimeCapsule,
};
