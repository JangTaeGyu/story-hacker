import { useState, useEffect } from 'react';

// ============================================
// SVG 일러스트 컴포넌트들
// ============================================

const IllustSmartphone = () => (
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

const IllustCat = () => (
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

const IllustGallery = () => (
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

const IllustCode = () => (
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

const IllustGrandpa = () => (
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

const IllustSafe = () => (
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

const IllustSchool = () => (
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

const IllustDetective = () => (
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

const IllustGame = () => (
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

const IllustCafe = () => (
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
    {/* 증기 */}
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

const IllustHospital = () => (
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

const IllustSpace = () => (
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
    {/* 경고등 */}
    <circle cx="130" cy="82" r="3" fill="#ff3366">
      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
    </circle>
    <text x="130" y="60" textAnchor="middle" fill="#ff3366" fontSize="8" fontFamily="monospace">⚠ ALERT</text>
  </svg>
);

const IllustMagicTower = () => (
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

const IllustTimeCapsule = () => (
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

// 추리 모드용 일러스트
const IllustNumbers = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="numBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0a1628" />
        <stop offset="100%" stopColor="#1a2a4e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#numBg)" rx="8"/>
    {/* 숫자들 */}
    <text x="40" y="60" fill="#00ff88" fontSize="28" fontFamily="monospace" opacity="0.8">1</text>
    <text x="80" y="80" fill="#22d3ee" fontSize="32" fontFamily="monospace">?</text>
    <text x="120" y="55" fill="#00ff88" fontSize="24" fontFamily="monospace" opacity="0.6">7</text>
    <text x="150" y="90" fill="#00ff88" fontSize="20" fontFamily="monospace" opacity="0.4">3</text>
    <text x="60" y="110" fill="#00ff88" fontSize="22" fontFamily="monospace" opacity="0.5">9</text>
    <text x="130" y="120" fill="#00ff88" fontSize="26" fontFamily="monospace" opacity="0.7">2</text>
    {/* PIN 박스 */}
    <rect x="50" y="130" width="100" height="20" rx="3" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="25,5"/>
    {/* 물음표 빛 */}
    <circle cx="95" cy="70" r="25" fill="#22d3ee" opacity="0.1">
      <animate attributeName="r" values="25;30;25" dur="2s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

const IllustLogic = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="logicBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0a2818" />
        <stop offset="100%" stopColor="#1a3a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#logicBg)" rx="8"/>
    {/* 논리 게이트 모양 */}
    <path d="M30,50 L60,50 L80,70 L60,90 L30,90 Z" fill="none" stroke="#22d3ee" strokeWidth="2"/>
    <path d="M100,50 Q130,70 100,90" fill="none" stroke="#22d3ee" strokeWidth="2"/>
    <line x1="80" y1="70" x2="100" y2="70" stroke="#22d3ee" strokeWidth="2"/>
    <line x1="130" y1="70" x2="150" y2="70" stroke="#22d3ee" strokeWidth="2"/>
    {/* 입력/출력 */}
    <circle cx="25" cy="55" r="4" fill="#00ff88"/>
    <circle cx="25" cy="85" r="4" fill="#00ff88"/>
    <circle cx="155" cy="70" r="4" fill="#ff3366"/>
    {/* 물음표 */}
    <text x="170" y="80" fill="#22d3ee" fontSize="24" fontFamily="monospace">?</text>
    {/* 이진수 */}
    <text x="40" y="130" fill="#00ff88" fontSize="12" fontFamily="monospace" opacity="0.7">1 0 1 1</text>
    <text x="100" y="130" fill="#22d3ee" fontSize="12" fontFamily="monospace">→</text>
    <text x="120" y="130" fill="#ff3366" fontSize="12" fontFamily="monospace" opacity="0.7">? ? ? ?</text>
  </svg>
);

const IllustMath = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="mathBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1a3e" />
        <stop offset="100%" stopColor="#2a1a4e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#mathBg)" rx="8"/>
    {/* 수학 기호들 */}
    <text x="30" y="50" fill="#22d3ee" fontSize="24" fontFamily="serif">∑</text>
    <text x="70" y="60" fill="#00ff88" fontSize="20" fontFamily="serif">π</text>
    <text x="110" y="45" fill="#ffd700" fontSize="18" fontFamily="serif">∞</text>
    <text x="150" y="55" fill="#ff3366" fontSize="22" fontFamily="serif">√</text>
    {/* 피보나치 */}
    <text x="100" y="95" textAnchor="middle" fill="#22d3ee" fontSize="14" fontFamily="monospace">1,1,2,3,5,8...</text>
    {/* 계산 */}
    <rect x="40" y="110" width="120" height="30" rx="5" fill="#1a1a2e" stroke="#22d3ee" strokeWidth="1"/>
    <text x="100" y="130" textAnchor="middle" fill="#00ff88" fontSize="12" fontFamily="monospace">F(n) = F(n-1) + F(n-2)</text>
  </svg>
);

const IllustClock = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="clockBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a2a3a" />
        <stop offset="100%" stopColor="#0a1a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#clockBg)" rx="8"/>
    {/* 시계 */}
    <circle cx="100" cy="80" r="50" fill="#1a1a2e" stroke="#22d3ee" strokeWidth="3"/>
    <circle cx="100" cy="80" r="45" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.3"/>
    {/* 눈금 */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
      <line 
        key={i}
        x1={100 + 38 * Math.cos((angle - 90) * Math.PI / 180)}
        y1={80 + 38 * Math.sin((angle - 90) * Math.PI / 180)}
        x2={100 + 45 * Math.cos((angle - 90) * Math.PI / 180)}
        y2={80 + 45 * Math.sin((angle - 90) * Math.PI / 180)}
        stroke="#22d3ee"
        strokeWidth={angle % 90 === 0 ? 3 : 1}
      />
    ))}
    {/* 시침 */}
    <line x1="100" y1="80" x2="100" y2="50" stroke="#00ff88" strokeWidth="4" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 100 80" to="360 100 80" dur="60s" repeatCount="indefinite"/>
    </line>
    {/* 분침 */}
    <line x1="100" y1="80" x2="130" y2="80" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 100 80" to="360 100 80" dur="5s" repeatCount="indefinite"/>
    </line>
    {/* 중심 */}
    <circle cx="100" cy="80" r="4" fill="#ff3366"/>
    <text x="100" y="150" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace">TIME PUZZLE</text>
  </svg>
);

const IllustColor = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="colorBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#2a2a4e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#colorBg)" rx="8"/>
    {/* 무지개 원 */}
    <circle cx="100" cy="80" r="50" fill="none" stroke="#ff0000" strokeWidth="8"/>
    <circle cx="100" cy="80" r="42" fill="none" stroke="#ff7f00" strokeWidth="8"/>
    <circle cx="100" cy="80" r="34" fill="none" stroke="#ffff00" strokeWidth="8"/>
    <circle cx="100" cy="80" r="26" fill="none" stroke="#00ff00" strokeWidth="8"/>
    <circle cx="100" cy="80" r="18" fill="none" stroke="#0000ff" strokeWidth="8"/>
    <circle cx="100" cy="80" r="10" fill="#8b00ff"/>
    {/* 숫자 */}
    <text x="100" y="85" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">RGB</text>
    <text x="100" y="150" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace">255 • 000 • 000</text>
  </svg>
);

const IllustMusic = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="musicBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2a1a3e" />
        <stop offset="100%" stopColor="#1a1a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#musicBg)" rx="8"/>
    {/* 오선지 */}
    {[50,65,80,95,110].map((y, i) => (
      <line key={i} x1="20" y1={y} x2="180" y2={y} stroke="#444" strokeWidth="1"/>
    ))}
    {/* 음표들 */}
    <ellipse cx="50" cy="95" rx="8" ry="6" fill="#22d3ee"/>
    <line x1="58" y1="95" x2="58" y2="55" stroke="#22d3ee" strokeWidth="2"/>
    <ellipse cx="90" cy="80" rx="8" ry="6" fill="#00ff88"/>
    <line x1="98" y1="80" x2="98" y2="40" stroke="#00ff88" strokeWidth="2"/>
    <ellipse cx="130" cy="65" rx="8" ry="6" fill="#ffd700"/>
    <line x1="138" y1="65" x2="138" y2="25" stroke="#ffd700" strokeWidth="2"/>
    <ellipse cx="160" cy="95" rx="8" ry="6" fill="#ff3366"/>
    <line x1="168" y1="95" x2="168" y2="55" stroke="#ff3366" strokeWidth="2"/>
    {/* 높은음자리표 */}
    <text x="25" y="90" fill="#22d3ee" fontSize="30" fontFamily="serif">𝄞</text>
    <text x="100" y="145" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace">♪ DO RE MI ♪</text>
  </svg>
);

const IllustGeo = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="geoBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0a2a1a" />
        <stop offset="100%" stopColor="#1a3a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#geoBg)" rx="8"/>
    {/* 지구 */}
    <circle cx="100" cy="80" r="50" fill="#1e4d8c"/>
    <ellipse cx="85" cy="60" rx="20" ry="15" fill="#2e8b57" opacity="0.8"/>
    <ellipse cx="115" cy="90" rx="25" ry="18" fill="#2e8b57" opacity="0.8"/>
    <ellipse cx="80" cy="100" rx="15" ry="10" fill="#2e8b57" opacity="0.8"/>
    {/* 위도/경도 */}
    <ellipse cx="100" cy="80" rx="50" ry="20" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5"/>
    <ellipse cx="100" cy="80" rx="50" ry="35" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5"/>
    <line x1="100" y1="30" x2="100" y2="130" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5"/>
    {/* 마커 */}
    <circle cx="90" cy="65" r="5" fill="#ff3366">
      <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite"/>
    </circle>
    <text x="100" y="150" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace">LAT: 37.33°N</text>
  </svg>
);

const IllustScience = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="sciBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a2a3a" />
        <stop offset="100%" stopColor="#0a1a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#sciBg)" rx="8"/>
    {/* 원자 */}
    <circle cx="100" cy="80" r="10" fill="#ffd700"/>
    {/* 전자 궤도 */}
    <ellipse cx="100" cy="80" rx="45" ry="20" fill="none" stroke="#22d3ee" strokeWidth="1.5">
      <animateTransform attributeName="transform" type="rotate" from="0 100 80" to="360 100 80" dur="3s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="100" cy="80" rx="45" ry="20" fill="none" stroke="#00ff88" strokeWidth="1.5" transform="rotate(60 100 80)">
      <animateTransform attributeName="transform" type="rotate" from="60 100 80" to="420 100 80" dur="4s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="100" cy="80" rx="45" ry="20" fill="none" stroke="#ff3366" strokeWidth="1.5" transform="rotate(120 100 80)">
      <animateTransform attributeName="transform" type="rotate" from="120 100 80" to="480 100 80" dur="5s" repeatCount="indefinite"/>
    </ellipse>
    {/* 전자 */}
    <circle cx="145" cy="80" r="4" fill="#22d3ee">
      <animateMotion dur="3s" repeatCount="indefinite" path="M0,0 A45,20 0 1,1 0,0.1"/>
    </circle>
    {/* 원소 기호 */}
    <text x="100" y="85" textAnchor="middle" fill="#1a1a2e" fontSize="12" fontFamily="serif" fontWeight="bold">Au</text>
    <text x="100" y="150" textAnchor="middle" fill="#ffd700" fontSize="10" fontFamily="monospace">GOLD • 79</text>
  </svg>
);

// 일러스트 매핑
const storyIllustrations = {
  "1-1": IllustSmartphone,
  "1-2": IllustCat,
  "1-3": IllustGallery,
  "1-4": IllustCode,
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

const deductionIllustrations = {
  "101": IllustNumbers,
  "102": IllustLogic,
  "103": IllustMath,
  "104": IllustClock,
  "105": IllustColor,
  "106": IllustMusic,
  "107": IllustGeo,
  "108": IllustScience,
};

// ============================================
// 에피소드 데이터
// ============================================
const storyEpisodes = [
  {
    id: 1,
    title: "수상한 이웃",
    difficulty: 1,
    mode: "story",
    stages: [
      {
        id: 1, title: "떨어진 스마트폰",
        story: `공원 벤치에서 스마트폰을 발견했다.\n주인에게 돌려주려면 연락처를 찾아야 한다.`,
        clue: `📎 폰 뒷면 스티커:\n"우리 첫 만남 💕 2019.07.23"`,
        hint: "특별한 날짜의 월과 일을 생각해보세요.",
        lockType: "pin4", answers: ["0723", "7232"], maxTurns: 5,
      },
      {
        id: 2, title: "잠긴 메모장",
        story: `폰은 열렸지만 메모장 앱에 또 비밀번호가!\n배경화면에 귀여운 고양이 사진이 보인다.`,
        clue: `🐱 이름표: "나비 ♥ 2017년생"\n📱 SNS 상태: "나비는 내 행운의 숫자 7을 좋아해"`,
        hint: "고양이 태어난 해를 입력해보세요.",
        lockType: "pin4", answers: ["2017", "7777"], maxTurns: 5,
      },
      {
        id: 3, title: "비밀 갤러리",
        story: `메모장에서 비밀 갤러리 앱을 발견했다.\n6자리 비밀번호가 필요하다.`,
        clue: `📝 메모장 내용:\n"내 생일 0315 + 나비 입양일 12월"\n"절대 잊으면 안 돼!"`,
        hint: "생일 4자리와 입양 월 2자리를 연결해보세요.",
        lockType: "pin6", answers: ["031512"], maxTurns: 4,
      },
      {
        id: 4, title: "최종 단서",
        story: `갤러리에서 수상한 사진을 발견했다.\n마지막 잠금 폴더에 증거가 있을 것 같다.`,
        clue: `🖼️ 사진 속 메모:\n"A=1, B=2, C=3..."\n"비밀번호는 CAT"`,
        hint: "C=3, A=1, T=20 → 3120",
        lockType: "pin4", answers: ["3120"], maxTurns: 4,
      },
    ],
  },
  {
    id: 2,
    title: "사라진 보물",
    difficulty: 1,
    mode: "story",
    stages: [
      {
        id: 1, title: "할아버지의 유품",
        story: `돌아가신 할아버지의 오래된 스마트폰.\n유언장이 이 안에 있다고 한다.`,
        clue: `👴 할아버지 정보:\n• 1945년 8월 15일생\n• "광복절에 태어난 게 내 자랑이지"`,
        hint: "할아버지가 자랑스러워하던 그 날짜입니다.",
        lockType: "pin4", answers: ["0815", "1945"], maxTurns: 5,
      },
      {
        id: 2, title: "금고 번호",
        story: `스마트폰 메모에서 금고 위치를 찾았다!\n하지만 6자리 금고 비밀번호가 필요하다.`,
        clue: `🔐 메모 내용:\n"금고 번호: 손자들 생년 앞 2자리씩"\n"민수 2015, 영희 2018, 철수 2020"`,
        hint: "15 + 18 + 20 = 151820",
        lockType: "pin6", answers: ["151820"], maxTurns: 4,
      },
    ],
  },
  {
    id: 3,
    title: "학교의 미스터리",
    difficulty: 1,
    mode: "story",
    stages: [
      {
        id: 1, title: "선생님의 태블릿",
        story: `방과 후 교무실에서 선생님의 태블릿을 발견했다.\n내일 시험 범위가 저장되어 있다는 소문이...`,
        clue: `📋 책상 위 메모:\n"우리 반 학생 수: 28명"\n"내 담당 과목 수: 3개"\n"비번은 둘을 곱한 숫자!"`,
        hint: "28 × 3 = ?",
        lockType: "pin4", answers: ["0084", "84"], maxTurns: 5,
      },
      {
        id: 2, title: "동아리 방 자물쇠",
        story: `시험 범위 파일이 동아리 방 사물함에 백업되어 있다!\n자물쇠 비밀번호를 알아내야 한다.`,
        clue: `🎨 동아리 방 포스터:\n"미술부 창립 2019년"\n"사물함 번호는 창립연도 뒤집기!"`,
        hint: "2019를 거꾸로 하면?",
        lockType: "pin4", answers: ["9102"], maxTurns: 5,
      },
      {
        id: 3, title: "USB 암호",
        story: `사물함 안에서 USB를 찾았다!\n하지만 암호가 걸려있다.`,
        clue: `💾 USB에 붙은 스티커:\n"MATH = 13+1+20+8"\n"이게 비밀번호야 ㅋㅋ"`,
        hint: "M=13, A=1, T=20, H=8을 더하세요.",
        lockType: "pin4", answers: ["0042", "42"], maxTurns: 4,
      },
    ],
  },
  {
    id: 4,
    title: "탐정 사무소",
    difficulty: 2,
    mode: "story",
    stages: [
      {
        id: 1, title: "의뢰인의 폰",
        story: `의뢰인이 폰을 두고 갔다.\n급한 연락처를 찾아야 하는데 잠겨있다.`,
        clue: `🕵️ 명함 정보:\n이름: 김사월\n"4월에 태어나서 사월이에요"\n"생일이랑 이름이랑 똑같죠?"`,
        hint: "4월 4일 = 0404",
        lockType: "pin4", answers: ["0404"], maxTurns: 5,
      },
      {
        id: 2, title: "사건 파일",
        story: `폰 안에 '극비 사건'이라는 폴더가 있다.\n6자리 암호가 필요하다.`,
        clue: `📁 폴더 설명:\n"2023년 5월 17일 사건"\n"날짜 전체가 비밀번호"`,
        hint: "연도 뒤 2자리 + 월 + 일",
        lockType: "pin6", answers: ["230517"], maxTurns: 4,
      },
      {
        id: 3, title: "용의자 명단",
        story: `사건 파일 안에 용의자 명단이 있다.\n하지만 또 암호가...`,
        clue: `📋 메모:\n"용의자 3명의 나이 합"\n"• 김씨: 32세\n• 이씨: 27세\n• 박씨: 25세"`,
        hint: "32 + 27 + 25 = ?",
        lockType: "pin4", answers: ["0084", "84"], maxTurns: 4,
      },
      {
        id: 4, title: "최종 증거",
        story: `진범의 정보가 담긴 최종 파일!\n마지막 관문이다.`,
        clue: `🔍 암호 힌트:\n"진범의 이니셜은 L.E.E"\n"알파벳 순서로 변환하면..."\n(A=01, B=02, C=03...)`,
        hint: "L=12, E=05, E=05",
        lockType: "pin6", answers: ["120505"], maxTurns: 4,
      },
    ],
  },
  {
    id: 5,
    title: "게이머의 비밀",
    difficulty: 2,
    mode: "story",
    stages: [
      {
        id: 1, title: "게임 계정",
        story: `친구가 게임 계정 비밀번호를 까먹었다.\n힌트를 보고 찾아달라고 한다.`,
        clue: `🎮 친구의 힌트:\n"내 최고 점수랑 같아"\n게임 화면에 보이는 점수: 7,777점`,
        hint: "최고 점수 그대로!",
        lockType: "pin4", answers: ["7777"], maxTurns: 5,
      },
      {
        id: 2, title: "길드 금고",
        story: `계정에 들어왔는데 길드 금고 비밀번호가 필요하다.`,
        clue: `⚔️ 길드 공지사항:\n"금고 비번: 길드 창설일"\n"2022년 12월 25일 창설"\n"연도 빼고 월일만!"`,
        hint: "12월 25일 = 1225",
        lockType: "pin4", answers: ["1225"], maxTurns: 5,
      },
      {
        id: 3, title: "비밀 던전",
        story: `금고 안에 비밀 던전 입장 코드가 있다!`,
        clue: `🏰 던전 입구 안내:\n"입장 코드는 6자리"\n"길드원 수(15) × 던전 층수(42)"\n"결과값이 코드!"`,
        hint: "15 × 42 = 630, 6자리로 만들면?",
        lockType: "pin6", answers: ["000630", "630"], maxTurns: 4,
      },
      {
        id: 4, title: "전설의 아이템",
        story: `비밀 던전 끝에 전설 아이템 상자가!\n최종 암호를 입력해야 한다.`,
        clue: `📦 상자에 적힌 글:\n"용사의 숫자를 입력하라"\n"HP: 999, MP: 777"\n"두 수의 차이가 열쇠"`,
        hint: "999 - 777 = ?",
        lockType: "pin4", answers: ["0222", "222"], maxTurns: 4,
      },
    ],
  },
  {
    id: 6,
    title: "카페 미스터리",
    difficulty: 2,
    mode: "story",
    stages: [
      {
        id: 1, title: "와이파이 비밀번호",
        story: `처음 온 카페인데 와이파이 비밀번호를 모른다.\n힌트가 적힌 포스터가 보인다.`,
        clue: `☕ 카페 포스터:\n"비밀번호는 우리 카페 이름에!"\n카페 이름: "CAFE 2580"\n"숫자만 입력하세요~"`,
        hint: "카페 이름에 있는 숫자!",
        lockType: "pin4", answers: ["2580"], maxTurns: 5,
      },
      {
        id: 2, title: "직원 전용 문",
        story: `화장실을 찾다가 '직원 전용' 문을 발견했다.\n문 옆에 힌트가 적혀있다.`,
        clue: `🚪 문 옆 메모:\n"오늘의 비번: 오픈 시간 + 마감 시간"\n영업시간: 09:00 ~ 22:00`,
        hint: "09 + 22 = 31? 아니면 0922?",
        lockType: "pin4", answers: ["0922", "0031", "31"], maxTurns: 5,
      },
      {
        id: 3, title: "금고 발견",
        story: `직원 전용 공간에서 작은 금고를 발견했다!\n6자리 비밀번호가 필요하다.`,
        clue: `🔐 금고 위 메모:\n"커피 원두 주문 코드"\n"에티오피아(ETH) 원두"\n"E=5, T=20, H=8"`,
        hint: "05 + 20 + 08 = 052008",
        lockType: "pin6", answers: ["052008"], maxTurns: 4,
      },
    ],
  },
  {
    id: 7,
    title: "병원 탈출",
    difficulty: 3,
    mode: "story",
    stages: [
      {
        id: 1, title: "병실 태블릿",
        story: `입원 중인데 너무 심심하다.\n침대 옆 태블릿으로 영화라도 보고 싶은데...`,
        clue: `🏥 태블릿 화면:\n"환자 인증 필요"\n"생년월일 뒤 4자리를 입력하세요"\n내 주민번호: 050815-3xxxxxx`,
        hint: "생년월일 뒤 4자리 = 월일",
        lockType: "pin4", answers: ["0815"], maxTurns: 5,
      },
      {
        id: 2, title: "의사 노트북",
        story: `의사 선생님이 노트북을 열어두고 잠깐 나갔다.\n내 검사 결과가 궁금한데...`,
        clue: `💻 책상 위 힌트:\n"비번 까먹을까봐 적어둠"\n"내 사번 앞 4자리: 2019"\n"의사 면허 번호 끝 2자리: 77"`,
        hint: "사번 + 면허번호 = 201977",
        lockType: "pin6", answers: ["201977"], maxTurns: 4,
      },
      {
        id: 3, title: "약품 보관함",
        story: `복도를 걷다가 약품 보관함을 발견했다.\n호기심에 비밀번호를 추리해본다.`,
        clue: `💊 보관함 라벨:\n"관리 코드: MED-0925"\n"숫자만 입력"`,
        hint: "MED-0925에서 숫자만!",
        lockType: "pin4", answers: ["0925"], maxTurns: 4,
      },
      {
        id: 4, title: "비상구 코드",
        story: `갑자기 정전이 됐다!\n비상구로 나가려면 코드가 필요하다.`,
        clue: `🚨 비상구 안내판:\n"화재 시 탈출 코드"\n"119 + 병원 설립연도(1995)"\n"앞 3자리 + 뒤 3자리"`,
        hint: "119995 또는 연도만",
        lockType: "pin6", answers: ["119995", "199511"], maxTurns: 4,
      },
    ],
  },
  {
    id: 8,
    title: "우주 정거장",
    difficulty: 3,
    mode: "story",
    stages: [
      {
        id: 1, title: "탈출 포드",
        story: `우주 정거장에 사고가 발생했다!\n탈출 포드를 활성화해야 한다.`,
        clue: `🚀 포드 콘솔 화면:\n"인증 코드 입력"\n"코드: 지구까지 거리(km)의 앞 4자리"\n현재 고도: 408km (ISS 궤도)`,
        hint: "408km → 0408",
        lockType: "pin4", answers: ["0408"], maxTurns: 5,
      },
      {
        id: 2, title: "산소 공급 장치",
        story: `산소가 부족하다!\n예비 산소 탱크의 잠금을 해제해야 한다.`,
        clue: `💨 탱크 라벨:\n"O2 탱크 #21"\n"잠금 해제: 산소 원자번호 × 탱크번호"\n산소(O) 원자번호: 8`,
        hint: "8 × 21 = ?",
        lockType: "pin4", answers: ["0168", "168"], maxTurns: 4,
      },
      {
        id: 3, title: "통신 장비",
        story: `지구와 통신해서 구조 요청을 해야 한다!\n통신 장비 암호가 필요하다.`,
        clue: `📡 통신기 매뉴얼:\n"비상 통신 코드"\n"SOS를 숫자로: S=19, O=15, S=19"\n"연속으로 입력"`,
        hint: "19 + 15 + 19 = 191519",
        lockType: "pin6", answers: ["191519"], maxTurns: 4,
      },
      {
        id: 4, title: "자동 항법",
        story: `구조대가 온다!\n자동 항법 장치로 안전한 궤도로 이동해야 한다.`,
        clue: `🛸 항법 컴퓨터:\n"목표 궤도 코드 입력"\n"안전 궤도: 지구 둘레의 1/10000"\n지구 둘레: 약 40,075km`,
        hint: "40075 ÷ 10000 ≈ 4.0 → 4007?",
        lockType: "pin4", answers: ["4007", "4008", "0400"], maxTurns: 4,
      },
    ],
  },
  {
    id: 9,
    title: "마법사의 탑",
    difficulty: 2,
    mode: "story",
    stages: [
      {
        id: 1, title: "탑 입구",
        story: `전설의 마법사의 탑을 찾았다!\n입구에 마법 자물쇠가 있다.`,
        clue: `🏰 입구의 비문:\n"불의 원소 + 물의 원소 = ?"\n🔥 불 = 7\n💧 물 = 3`,
        hint: "7 + 3 = 10? 아니면 73?",
        lockType: "pin4", answers: ["0010", "10", "0073", "73"], maxTurns: 5,
      },
      {
        id: 2, title: "2층 문",
        story: `1층을 지나 2층으로 가는 문 앞에 섰다.`,
        clue: `✨ 문에 새겨진 수수께끼:\n"마법의 숫자 셋을 나열하라"\n"3, 7, 그리고 7과 3의 곱"`,
        hint: "3, 7, 21 → 0721? 또는 3721?",
        lockType: "pin4", answers: ["0721", "3721", "3737"], maxTurns: 5,
      },
      {
        id: 3, title: "마법 도서관",
        story: `2층은 거대한 마법 도서관이다.\n금지된 마법서 구역으로 가려면...`,
        clue: `📚 사서 골렘의 말:\n"통행 코드를 대라"\n"마법사 등급 × 마법서 권수"\n등급: 9급, 권수: 108권`,
        hint: "9 × 108 = ?",
        lockType: "pin4", answers: ["0972", "972"], maxTurns: 4,
      },
      {
        id: 4, title: "비밀의 방",
        story: `마침내 마법사의 비밀의 방에 도착했다!\n최후의 수수께끼가 기다린다.`,
        clue: `🔮 수정 구슬의 메시지:\n"시간을 거스르는 자여"\n"마법사가 태어난 해: 1234년"\n"거꾸로 입력하라"`,
        hint: "1234를 거꾸로 → 4321",
        lockType: "pin4", answers: ["4321"], maxTurns: 4,
      },
    ],
  },
  {
    id: 10,
    title: "타임캡슐",
    difficulty: 1,
    mode: "story",
    stages: [
      {
        id: 1, title: "10년 전 타임캡슐",
        story: `10년 전에 묻어둔 타임캡슐을 찾았다!\n자물쇠 비밀번호가 기억나지 않는다.`,
        clue: `📦 캡슐에 붙은 메모:\n"2015년 1월 1일에 묻음"\n"비번은 묻은 날짜!"`,
        hint: "2015년 1월 1일 → 0101",
        lockType: "pin4", answers: ["0101", "2015"], maxTurns: 5,
      },
      {
        id: 2, title: "편지 봉투",
        story: `캡슐 안에서 봉인된 편지를 발견했다.\n봉인에 또 자물쇠가?!`,
        clue: `💌 봉투에 적힌 글:\n"10년 후의 나에게"\n"내 나이 + 10 = 비밀번호"\n"PS. 2015년에 난 12살"`,
        hint: "12 + 10 = 22",
        lockType: "pin4", answers: ["0022", "22", "2215"], maxTurns: 5,
      },
      {
        id: 3, title: "USB 속 영상",
        story: `캡슐 안에서 오래된 USB도 발견!\n암호화된 영상 파일이 있다.`,
        clue: `💾 파일 이름:\n"memories_123456.mp4.locked"\n"암호: 파일명의 숫자"`,
        hint: "파일명에 있는 숫자 그대로!",
        lockType: "pin6", answers: ["123456"], maxTurns: 4,
      },
    ],
  },
];

const deductionEpisodes = [
  {
    id: 101, title: "숫자 추리", difficulty: 1, mode: "deduction",
    stages: [
      { id: 1, title: "기초 추리", situation: "4자리 비밀번호를 추리하세요.", lockType: "pin4", answer: "3726", maxTurns: 6,
        clues: [
          { turn: 6, text: "모든 숫자는 서로 다릅니다." },
          { turn: 5, text: "첫 번째 숫자는 홀수입니다." },
          { turn: 4, text: "네 숫자의 합은 18입니다." },
          { turn: 3, text: "두 번째 숫자는 7입니다." },
          { turn: 2, text: "마지막 숫자는 첫 번째 숫자의 2배입니다." },
          { turn: 1, text: "세 번째 숫자는 2입니다." },
        ],
      },
      { id: 2, title: "패턴 분석", situation: "규칙을 찾아 비밀번호를 맞추세요.", lockType: "pin4", answer: "4816", maxTurns: 5,
        clues: [
          { turn: 5, text: "숫자들은 특정 규칙을 따릅니다." },
          { turn: 4, text: "첫 번째 숫자는 4입니다." },
          { turn: 3, text: "각 숫자는 이전 숫자의 2배입니다." },
          { turn: 2, text: "하지만 마지막은 규칙을 벗어납니다." },
          { turn: 1, text: "마지막 숫자는 세 번째의 절반입니다." },
        ],
      },
      { id: 3, title: "암호 해독", situation: "6자리 코드를 해독하세요.", lockType: "pin6", answer: "159357", maxTurns: 6,
        clues: [
          { turn: 6, text: "홀수 위치(1,3,5번째)에는 홀수만 있습니다." },
          { turn: 5, text: "짝수 위치(2,4,6번째)의 숫자는 모두 같습니다." },
          { turn: 4, text: "짝수 위치의 숫자는 5입니다." },
          { turn: 3, text: "첫 번째 숫자는 1입니다." },
          { turn: 2, text: "홀수 위치 숫자는 4씩 증가합니다." },
          { turn: 1, text: "1, 5, 9 그리고 3, 5, 7" },
        ],
      },
    ],
  },
  {
    id: 102, title: "논리 퍼즐", difficulty: 2, mode: "deduction",
    stages: [
      { id: 1, title: "생일 추리", situation: "친구의 생일 4자리를 맞추세요. (MMDD)", lockType: "pin4", answer: "0314", maxTurns: 5,
        clues: [
          { turn: 5, text: "3월에 태어났습니다." },
          { turn: 4, text: "일(日)은 짝수입니다." },
          { turn: 3, text: "월과 일의 숫자 합은 8입니다." },
          { turn: 2, text: "일(日)은 10보다 큽니다." },
          { turn: 1, text: "원주율(π)과 관련있습니다." },
        ],
      },
      { id: 2, title: "금고 털이", situation: "금고의 6자리 비밀번호를 추리하세요.", lockType: "pin6", answer: "246810", maxTurns: 6,
        clues: [
          { turn: 6, text: "모든 숫자는 짝수입니다." },
          { turn: 5, text: "숫자들은 규칙적으로 증가합니다." },
          { turn: 4, text: "첫 번째 숫자는 2입니다." },
          { turn: 3, text: "증가폭은 항상 2입니다." },
          { turn: 2, text: "다섯 번째 숫자는 한 자리입니다." },
          { turn: 1, text: "마지막 두 자리는 '10'입니다." },
        ],
      },
      { id: 3, title: "최종 시험", situation: "마지막 관문입니다. 4자리 코드를 찾으세요.", lockType: "pin4", answer: "1379", maxTurns: 5,
        clues: [
          { turn: 5, text: "모든 숫자는 홀수입니다." },
          { turn: 4, text: "숫자는 오름차순입니다." },
          { turn: 3, text: "연속된 홀수는 아닙니다." },
          { turn: 2, text: "첫 숫자와 마지막 숫자의 합은 10입니다." },
          { turn: 1, text: "가운데 두 숫자의 합도 10입니다." },
        ],
      },
    ],
  },
  {
    id: 103, title: "수학 챌린지", difficulty: 2, mode: "deduction",
    stages: [
      { id: 1, title: "곱셈 퍼즐", situation: "4자리 숫자를 찾으세요.", lockType: "pin4", answer: "2436", maxTurns: 5,
        clues: [
          { turn: 5, text: "모든 숫자는 6 이하입니다." },
          { turn: 4, text: "첫째와 셋째 숫자의 곱은 6입니다." },
          { turn: 3, text: "둘째와 넷째 숫자의 곱은 24입니다." },
          { turn: 2, text: "첫 번째 숫자는 2입니다." },
          { turn: 1, text: "네 번째 숫자는 두 번째의 1.5배입니다." },
        ],
      },
      { id: 2, title: "나눗셈 미스터리", situation: "비밀 코드 4자리를 해독하세요.", lockType: "pin4", answer: "8421", maxTurns: 5,
        clues: [
          { turn: 5, text: "각 숫자는 이전 숫자의 절반입니다." },
          { turn: 4, text: "첫 번째 숫자는 8입니다." },
          { turn: 3, text: "모든 숫자의 합은 15입니다." },
          { turn: 2, text: "가장 작은 숫자는 1입니다." },
          { turn: 1, text: "8, 4, 2, 1 순서입니다." },
        ],
      },
      { id: 3, title: "피보나치 코드", situation: "6자리 피보나치 코드를 입력하세요.", lockType: "pin6", answer: "112358", maxTurns: 6,
        clues: [
          { turn: 6, text: "피보나치 수열과 관련있습니다." },
          { turn: 5, text: "첫 두 숫자는 1입니다." },
          { turn: 4, text: "각 숫자는 앞 두 숫자의 합입니다." },
          { turn: 3, text: "세 번째 숫자는 2입니다." },
          { turn: 2, text: "네 번째 숫자는 3입니다." },
          { turn: 1, text: "1, 1, 2, 3, 5, 8" },
        ],
      },
    ],
  },
  {
    id: 104, title: "시간 퍼즐", difficulty: 2, mode: "deduction",
    stages: [
      { id: 1, title: "시계 암호", situation: "시계가 가리키는 4자리 코드는?", lockType: "pin4", answer: "1230", maxTurns: 5,
        clues: [
          { turn: 5, text: "시간을 HHMM 형식으로 나타냅니다." },
          { turn: 4, text: "정오에서 30분 지났습니다." },
          { turn: 3, text: "오전이 아닙니다." },
          { turn: 2, text: "시침은 12와 1 사이에 있습니다." },
          { turn: 1, text: "12시 30분입니다." },
        ],
      },
      { id: 2, title: "날짜 계산", situation: "특별한 날짜 6자리를 찾으세요. (YYMMDD)", lockType: "pin6", answer: "240229", maxTurns: 6,
        clues: [
          { turn: 6, text: "2024년의 어떤 날짜입니다." },
          { turn: 5, text: "2월의 날짜입니다." },
          { turn: 4, text: "4년에 한 번만 존재하는 날입니다." },
          { turn: 3, text: "윤년과 관련있습니다." },
          { turn: 2, text: "2월의 마지막 날입니다 (윤년 기준)." },
          { turn: 1, text: "2024년 2월 29일입니다." },
        ],
      },
      { id: 3, title: "타이머 설정", situation: "타이머 코드 4자리를 설정하세요.", lockType: "pin4", answer: "5959", maxTurns: 5,
        clues: [
          { turn: 5, text: "분:초 형식입니다 (MMSS)." },
          { turn: 4, text: "1시간 미만의 최대 시간입니다." },
          { turn: 3, text: "분과 초가 같은 값입니다." },
          { turn: 2, text: "59분 ??초입니다." },
          { turn: 1, text: "59분 59초입니다." },
        ],
      },
    ],
  },
  {
    id: 105, title: "색깔 코드", difficulty: 1, mode: "deduction",
    stages: [
      { id: 1, title: "무지개 순서", situation: "무지개 색 순서로 4자리 코드를 만드세요.", lockType: "pin4", answer: "1234", maxTurns: 5,
        clues: [
          { turn: 5, text: "빨=1, 주=2, 노=3, 초=4, 파=5..." },
          { turn: 4, text: "코드는 무지개의 처음 4색입니다." },
          { turn: 3, text: "빨강으로 시작합니다." },
          { turn: 2, text: "노랑은 세 번째입니다." },
          { turn: 1, text: "빨, 주, 노, 초 = 1, 2, 3, 4" },
        ],
      },
      { id: 2, title: "RGB 코드", situation: "특정 색상의 RGB 코드 6자리를 찾으세요.", lockType: "pin6", answer: "255000", maxTurns: 5,
        clues: [
          { turn: 5, text: "순수한 빨간색의 RGB 값입니다." },
          { turn: 4, text: "R(빨강) 값이 최대입니다." },
          { turn: 3, text: "G(초록)와 B(파랑)은 0입니다." },
          { turn: 2, text: "R의 최대값은 255입니다." },
          { turn: 1, text: "R=255, G=0, B=0 → 255000" },
        ],
      },
    ],
  },
  {
    id: 106, title: "음악 퍼즐", difficulty: 2, mode: "deduction",
    stages: [
      { id: 1, title: "계이름 코드", situation: "계이름을 숫자로 바꿔 4자리 코드를 만드세요.", lockType: "pin4", answer: "1351", maxTurns: 5,
        clues: [
          { turn: 5, text: "도=1, 레=2, 미=3, 파=4, 솔=5, 라=6, 시=7" },
          { turn: 4, text: "화음 '도미솔도'를 코드로 바꾸세요." },
          { turn: 3, text: "첫 음은 도(1)입니다." },
          { turn: 2, text: "마지막 음도 도(1)입니다." },
          { turn: 1, text: "도(1), 미(3), 솔(5), 도(1)" },
        ],
      },
      { id: 2, title: "주파수", situation: "라(A) 음의 표준 주파수 4자리는?", lockType: "pin4", answer: "0440", maxTurns: 5,
        clues: [
          { turn: 5, text: "오케스트라 조율 기준음입니다." },
          { turn: 4, text: "400~450 Hz 사이입니다." },
          { turn: 3, text: "정확히 440 Hz입니다." },
          { turn: 2, text: "국제 표준 음높이입니다." },
          { turn: 1, text: "A4 = 440 Hz → 0440" },
        ],
      },
    ],
  },
  {
    id: 107, title: "지리 퀴즈", difficulty: 3, mode: "deduction",
    stages: [
      { id: 1, title: "좌표 찾기", situation: "서울의 위도(정수)로 4자리 코드를 만드세요.", lockType: "pin4", answer: "3733", maxTurns: 5,
        clues: [
          { turn: 5, text: "북위 30도에서 40도 사이입니다." },
          { turn: 4, text: "정확한 위도는 약 37.33도입니다." },
          { turn: 3, text: "소수점 포함 4자리입니다." },
          { turn: 2, text: "37도 33분 근처입니다." },
          { turn: 1, text: "3733 (37.33도)" },
        ],
      },
      { id: 2, title: "인구 통계", situation: "한국 인구(백만 단위) 4자리를 입력하세요.", lockType: "pin4", answer: "5100", maxTurns: 5,
        clues: [
          { turn: 5, text: "5천만 명 이상입니다." },
          { turn: 4, text: "5천만~6천만 명 사이입니다." },
          { turn: 3, text: "약 5100만 명입니다." },
          { turn: 2, text: "백만 단위로 51입니다." },
          { turn: 1, text: "5100만 명 → 5100" },
        ],
      },
    ],
  },
  {
    id: 108, title: "과학 상식", difficulty: 3, mode: "deduction",
    stages: [
      { id: 1, title: "원소 번호", situation: "금(Gold)의 원자번호로 4자리 코드를 만드세요.", lockType: "pin4", answer: "0079", maxTurns: 5,
        clues: [
          { turn: 5, text: "금의 원소 기호는 Au입니다." },
          { turn: 4, text: "원자번호는 70~80 사이입니다." },
          { turn: 3, text: "백금(78)보다 1 큽니다." },
          { turn: 2, text: "원자번호는 79입니다." },
          { turn: 1, text: "79 → 0079" },
        ],
      },
      { id: 2, title: "빛의 속도", situation: "빛의 속도(천 km/s) 6자리를 입력하세요.", lockType: "pin6", answer: "300000", maxTurns: 5,
        clues: [
          { turn: 5, text: "초당 약 30만 km입니다." },
          { turn: 4, text: "정확히는 299,792 km/s입니다." },
          { turn: 3, text: "반올림하면 300,000 km/s입니다." },
          { turn: 2, text: "6자리 숫자입니다." },
          { turn: 1, text: "300000" },
        ],
      },
      { id: 3, title: "물의 끓는점", situation: "물의 끓는점(절대온도 K) 4자리는?", lockType: "pin4", answer: "0373", maxTurns: 5,
        clues: [
          { turn: 5, text: "섭씨 100도를 켈빈으로 바꾸세요." },
          { turn: 4, text: "켈빈 = 섭씨 + 273" },
          { turn: 3, text: "100 + 273 = 373K" },
          { turn: 2, text: "373을 4자리로 만드세요." },
          { turn: 1, text: "373K → 0373" },
        ],
      },
    ],
  },
];

// ============================================
// 메인 컴포넌트
// ============================================
export default function StoryHacker() {
  const [gameState, setGameState] = useState('menu');
  const [gameMode, setGameMode] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [input, setInput] = useState('');
  const [turnsLeft, setTurnsLeft] = useState(5);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [stars, setStars] = useState(3);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);
  const [revealedClues, setRevealedClues] = useState([]);
  const [initialTurns, setInitialTurns] = useState(5);
  const [completedEpisodes, setCompletedEpisodes] = useState({});

  const currentStage = currentEpisode?.stages[currentStageIndex];
  const pinLength = currentStage?.lockType === 'pin6' ? 6 : 4;

  // 현재 스테이지의 일러스트 가져오기
  const getCurrentIllustration = () => {
    if (!currentEpisode || !currentStage) return null;
    
    if (gameMode === 'story') {
      const key = `${currentEpisode.id}-${currentStage.id}`;
      const Illust = storyIllustrations[key];
      return Illust ? <Illust /> : <IllustSmartphone />;
    } else {
      const Illust = deductionIllustrations[currentEpisode.id];
      return Illust ? <Illust /> : <IllustNumbers />;
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && currentStage && gameMode === 'story') {
      const fullText = `${currentStage.story}\n\n${currentStage.clue}`;
      setTypedText('');
      setIsTyping(true);
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 25);
      return () => clearInterval(timer);
    }
  }, [gameState, currentStageIndex, currentEpisode, gameMode]);

  useEffect(() => {
    if (gameState === 'playing' && currentStage && gameMode === 'deduction') {
      const initialClue = currentStage.clues.find(c => c.turn === currentStage.maxTurns);
      if (initialClue) {
        setRevealedClues([initialClue]);
      }
    }
  }, [gameState, currentStageIndex, currentEpisode, gameMode]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.97) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 80);
      }
    }, 400);
    return () => clearInterval(glitchInterval);
  }, []);

  const startEpisode = (episode) => {
    setCurrentEpisode(episode);
    setGameMode(episode.mode);
    setCurrentStageIndex(0);
    setInput('');
    setTurnsLeft(episode.stages[0].maxTurns);
    setInitialTurns(episode.stages[0].maxTurns);
    setStars(3);
    setShowHint(false);
    setRevealedClues([]);
    setGameState('playing');
  };

  const handleKeyPress = (key) => {
    if (key === 'backspace') {
      setInput(prev => prev.slice(0, -1));
    } else if (key === 'enter') {
      checkAnswer();
    } else if (input.length < pinLength) {
      setInput(prev => prev + key);
    }
  };

  const checkAnswer = () => {
    if (input.length !== pinLength) return;
    
    const isCorrect = gameMode === 'story' 
      ? currentStage.answers.includes(input)
      : input === currentStage.answer;
    
    if (isCorrect) {
      if (gameMode === 'deduction') {
        const turnsUsed = initialTurns - turnsLeft + 1;
        if (turnsUsed <= 2) setStars(3);
        else if (turnsUsed <= 4) setStars(2);
        else setStars(1);
      }
      
      setSuccessAnim(true);
      setTimeout(() => {
        setSuccessAnim(false);
        if (currentStageIndex < currentEpisode.stages.length - 1) {
          const nextStage = currentEpisode.stages[currentStageIndex + 1];
          setCurrentStageIndex(prev => prev + 1);
          setInput('');
          setTurnsLeft(nextStage.maxTurns);
          setInitialTurns(nextStage.maxTurns);
          setStars(3);
          setShowHint(false);
          setRevealedClues([]);
        } else {
          setCompletedEpisodes(prev => ({ ...prev, [currentEpisode.id]: true }));
          setGameState('success');
        }
      }, 1200);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      const newTurns = turnsLeft - 1;
      setTurnsLeft(newTurns);
      setInput('');
      
      if (gameMode === 'deduction' && newTurns > 0) {
        const newClue = currentStage.clues.find(c => c.turn === newTurns);
        if (newClue) setRevealedClues(prev => [...prev, newClue]);
      }
      
      if (newTurns <= 0) setGameState('gameover');
    }
  };

  const useHint = () => {
    if (!showHint && stars > 1) {
      setShowHint(true);
      setStars(prev => prev - 1);
    }
  };

  const revealNextClue = () => {
    if (turnsLeft > 1) {
      const newTurns = turnsLeft - 1;
      setTurnsLeft(newTurns);
      const newClue = currentStage.clues.find(c => c.turn === newTurns);
      if (newClue) setRevealedClues(prev => [...prev, newClue]);
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setGameMode(null);
    setCurrentEpisode(null);
    setCurrentStageIndex(0);
    setInput('');
    setRevealedClues([]);
  };

  const getDifficultyStars = (diff) => '★'.repeat(diff) + '☆'.repeat(3 - diff);
  const getDifficultyLabel = (diff) => {
    if (diff === 1) return { text: 'EASY', color: 'text-green-400' };
    if (diff === 2) return { text: 'NORMAL', color: 'text-yellow-400' };
    return { text: 'HARD', color: 'text-red-400' };
  };

  // ============================================
  // UI 컴포넌트들
  // ============================================
  
  const MainMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className={`mb-8 transition-transform ${glitch ? 'translate-x-0.5' : ''}`}>
        <h1 className="text-4xl sm:text-5xl font-bold mb-1 tracking-widest text-emerald-400"
            style={{ fontFamily: 'monospace', textShadow: '0 0 10px #00FF88, 0 0 20px #00FF88' }}>
          STORY
        </h1>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-widest text-rose-400"
            style={{ fontFamily: 'monospace', textShadow: '0 0 10px #FF3366, 0 0 20px #FF3366' }}>
          HACKER
        </h1>
      </div>
      <p className="text-gray-500 mb-10 font-mono text-xs sm:text-sm tracking-wide">
        [ 단서를 읽고, 추리하고, 잠금을 해제하라 ]
      </p>
      <div className="space-y-3 w-full max-w-xs">
        <button onClick={() => setGameState('modeSelect')}
          className="w-full py-4 px-6 bg-emerald-400/10 border-2 border-emerald-400 text-emerald-400 font-mono text-base tracking-wider hover:bg-emerald-400 hover:text-gray-900 transition-all duration-300 active:scale-95">
          {'>'} START GAME
        </button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-800/50 p-3 rounded-lg">
          <p className="text-emerald-400 font-mono text-2xl font-bold">{storyEpisodes.length}</p>
          <p className="text-gray-500 font-mono text-xs">STORY</p>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg">
          <p className="text-cyan-400 font-mono text-2xl font-bold">{deductionEpisodes.length}</p>
          <p className="text-gray-500 font-mono text-xs">DEDUCTION</p>
        </div>
      </div>
      <div className="mt-12 font-mono text-xs text-gray-700"><p>v2.1.0 // WITH ILLUSTRATIONS</p></div>
    </div>
  );

  const ModeSelect = () => (
    <div className="min-h-screen p-4 sm:p-6">
      <button onClick={() => setGameState('menu')} className="text-emerald-400 font-mono mb-6 hover:text-emerald-300 text-sm">{'<'} BACK</button>
      <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mb-6 tracking-wider">SELECT MODE</h2>
      <div className="space-y-4">
        <button onClick={() => setGameState('storyEpisodeSelect')}
          className="w-full p-5 bg-gray-800/50 border border-emerald-500/50 text-left hover:border-emerald-400 hover:bg-gray-800 transition-all duration-200 active:scale-[0.98] group rounded-lg">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📖</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-emerald-400 font-bold text-lg">스토리 모드</h3>
                <span className="text-xs bg-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded">{storyEpisodes.length} EP</span>
              </div>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">스토리 속 단서를 파악하여 비밀번호를 추리</p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs bg-emerald-400/20 text-emerald-400 px-2 py-1 rounded">독해력</span>
                <span className="text-xs bg-emerald-400/20 text-emerald-400 px-2 py-1 rounded">추론</span>
              </div>
            </div>
            <span className="text-emerald-400 text-xl opacity-0 group-hover:opacity-100 transition-opacity">›</span>
          </div>
        </button>
        <button onClick={() => setGameState('deductionEpisodeSelect')}
          className="w-full p-5 bg-gray-800/50 border border-cyan-500/50 text-left hover:border-cyan-400 hover:bg-gray-800 transition-all duration-200 active:scale-[0.98] group rounded-lg">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔍</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-cyan-400 font-bold text-lg">추리 모드</h3>
                <span className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-0.5 rounded">{deductionEpisodes.length} EP</span>
              </div>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">턴마다 공개되는 단서를 종합하여 비밀번호 해독</p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded">논리</span>
                <span className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded">수학</span>
              </div>
            </div>
            <span className="text-cyan-400 text-xl opacity-0 group-hover:opacity-100 transition-opacity">›</span>
          </div>
        </button>
      </div>
      <div className="mt-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
        <h4 className="text-gray-400 font-mono text-xs mb-3">💡 MODE DIFFERENCE</h4>
        <div className="space-y-2 text-xs text-gray-500">
          <p><span className="text-emerald-400">스토리:</span> 일러스트와 함께 몰입감 있는 추리</p>
          <p><span className="text-cyan-400">추리:</span> 틀릴 때마다 새 단서 공개 (빨리 맞출수록 고득점!)</p>
        </div>
      </div>
    </div>
  );

  const EpisodeSelect = ({ episodes, modeName, modeColor, backState }) => (
    <div className="min-h-screen p-4 sm:p-6 pb-20">
      <button onClick={() => setGameState(backState)}
        className={`${modeColor === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'} font-mono mb-6 hover:opacity-80 text-sm`}>
        {'<'} BACK
      </button>
      <h2 className={`text-xl sm:text-2xl font-bold ${modeColor === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'} font-mono mb-2 tracking-wider`}>
        {modeName}
      </h2>
      <p className="text-gray-500 font-mono text-xs mb-4">{episodes.length} EPISODES AVAILABLE</p>
      <div className="space-y-3">
        {episodes.map((episode) => {
          const diffLabel = getDifficultyLabel(episode.difficulty);
          const isCompleted = completedEpisodes[episode.id];
          return (
            <button key={episode.id} onClick={() => startEpisode(episode)}
              className={`w-full p-4 bg-gray-800/50 border text-left transition-all duration-200 active:scale-[0.98] group rounded ${
                isCompleted ? 'border-yellow-500/50' : 'border-gray-700'
              } hover:border-${modeColor}-400 hover:bg-gray-800`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`${modeColor === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'} font-mono text-xs`}>
                      EP.{episode.id > 100 ? episode.id - 100 : episode.id}
                    </span>
                    <span className={`text-xs ${diffLabel.color}`}>{diffLabel.text}</span>
                    {isCompleted && <span className="text-yellow-400 text-xs">✓ CLEAR</span>}
                  </div>
                  <h3 className="text-white font-bold text-base">{episode.title}</h3>
                  <p className="text-gray-500 text-xs font-mono mt-1">
                    {episode.stages.length} STAGES • {getDifficultyStars(episode.difficulty)}
                  </p>
                </div>
                <span className={`${modeColor === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'} text-xl opacity-0 group-hover:opacity-100 transition-opacity`}>›</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const StoryGamePlay = () => (
    <div className="min-h-screen flex flex-col relative">
      {successAnim && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/90">
          <div className="text-center animate-pulse">
            <div className="text-6xl mb-4">🔓</div>
            <p className="text-emerald-400 font-mono text-xl font-bold" style={{ textShadow: '0 0 20px #00FF88' }}>ACCESS GRANTED</p>
          </div>
        </div>
      )}
      <div className="p-3 sm:p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/80">
        <button onClick={resetGame} className="text-gray-400 hover:text-white font-mono text-xs sm:text-sm">{'<'} EXIT</button>
        <div className="text-center">
          <span className="text-emerald-400 font-mono text-xs">STAGE {currentStageIndex + 1}/{currentEpisode?.stages?.length}</span>
        </div>
        <div className="text-yellow-400 font-mono text-sm">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {/* 일러스트 영역 */}
        <div className="mb-4 rounded-lg overflow-hidden border border-gray-700">
          {getCurrentIllustration()}
        </div>
        <div className="bg-gray-800/60 border border-gray-700 p-4 rounded-lg mb-4">
          <h3 className="text-emerald-400 font-mono text-xs sm:text-sm mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            {currentStage?.title?.toUpperCase()}
          </h3>
          <div className="text-gray-300 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
            {typedText}
            {isTyping && <span className="text-emerald-400 animate-pulse">▌</span>}
          </div>
        </div>
        {showHint && (
          <div className="bg-yellow-900/30 border border-yellow-600/50 p-3 rounded-lg mb-4">
            <p className="text-yellow-400 font-mono text-xs">💡 HINT: {currentStage?.hint}</p>
          </div>
        )}
      </div>
      <InputArea />
    </div>
  );

  const DeductionGamePlay = () => (
    <div className="min-h-screen flex flex-col relative">
      {successAnim && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/90">
          <div className="text-center animate-pulse">
            <div className="text-6xl mb-4">🔓</div>
            <p className="text-cyan-400 font-mono text-xl font-bold" style={{ textShadow: '0 0 20px #00FFFF' }}>CRACKED!</p>
            <p className="text-gray-400 font-mono text-sm mt-2">{initialTurns - turnsLeft + 1}번째 시도에 성공</p>
          </div>
        </div>
      )}
      <div className="p-3 sm:p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/80">
        <button onClick={resetGame} className="text-gray-400 hover:text-white font-mono text-xs sm:text-sm">{'<'} EXIT</button>
        <div className="text-center">
          <span className="text-cyan-400 font-mono text-xs">STAGE {currentStageIndex + 1}/{currentEpisode?.stages?.length}</span>
        </div>
        <div className="text-yellow-400 font-mono text-sm">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {/* 일러스트 영역 */}
        <div className="mb-4 rounded-lg overflow-hidden border border-cyan-500/30">
          {getCurrentIllustration()}
        </div>
        <div className="bg-gray-800/60 border border-cyan-500/30 p-4 rounded-lg mb-4">
          <h3 className="text-cyan-400 font-mono text-xs sm:text-sm mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            {currentStage?.title?.toUpperCase()}
          </h3>
          <p className="text-gray-300 font-mono text-sm mb-4">{currentStage?.situation}</p>
        </div>
        <div className="space-y-2 mb-4">
          <h4 className="text-cyan-400 font-mono text-xs flex items-center gap-2">
            🔍 공개된 단서 ({revealedClues.length}/{currentStage?.clues?.length})
          </h4>
          {revealedClues.map((clue, idx) => (
            <div key={idx} className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded-lg" style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <p className="text-cyan-100 font-mono text-xs sm:text-sm">
                <span className="text-cyan-400 mr-2">#{idx + 1}</span>{clue.text}
              </p>
            </div>
          ))}
        </div>
        {turnsLeft > 1 && revealedClues.length < currentStage?.clues?.length && (
          <button onClick={revealNextClue}
            className="w-full py-3 border border-cyan-500/50 text-cyan-400 font-mono text-sm rounded-lg hover:bg-cyan-500/10 transition-all active:scale-[0.98]">
            🔎 단서 더 보기 (턴 1 소모)
          </button>
        )}
      </div>
      <InputArea isDeduction />
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );

  const InputArea = ({ isDeduction = false }) => {
    const accentColor = isDeduction ? '#22d3ee' : '#34d399';
    return (
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className={`flex justify-center gap-2 mb-4 transition-transform ${shake ? 'animate-shake' : ''}`}>
          {Array(pinLength).fill(0).map((_, i) => (
            <div key={i} className="w-10 h-12 sm:w-12 sm:h-14 border-2 flex items-center justify-center text-xl sm:text-2xl font-mono transition-all duration-150"
              style={{ borderColor: input[i] ? accentColor : '#4b5563', color: input[i] ? accentColor : '#4b5563', backgroundColor: input[i] ? `${accentColor}15` : 'transparent' }}>
              {input[i] ? '●' : '·'}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1 mb-4">
          {Array(initialTurns).fill(0).map((_, i) => (
            <span key={i} className={`text-base sm:text-lg transition-all ${i < turnsLeft ? 'text-rose-500 scale-100' : 'text-gray-700 scale-75'}`}>♥</span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <button key={num} onClick={() => handleKeyPress(String(num))}
              className="h-12 sm:h-14 bg-gray-800 border border-gray-700 text-white font-mono text-lg sm:text-xl rounded hover:bg-gray-700 transition-all duration-100 active:scale-95"
              onMouseEnter={(e) => e.target.style.borderColor = accentColor}
              onMouseLeave={(e) => e.target.style.borderColor = '#374151'}>
              {num}
            </button>
          ))}
          <button onClick={() => handleKeyPress('backspace')}
            className="h-12 sm:h-14 bg-gray-800 border border-gray-700 text-rose-400 font-mono text-sm rounded hover:bg-gray-700 hover:border-rose-400 transition-all duration-100 active:scale-95">
            DEL
          </button>
          <button onClick={() => handleKeyPress('0')}
            className="h-12 sm:h-14 bg-gray-800 border border-gray-700 text-white font-mono text-lg sm:text-xl rounded hover:bg-gray-700 transition-all duration-100 active:scale-95"
            onMouseEnter={(e) => e.target.style.borderColor = accentColor}
            onMouseLeave={(e) => e.target.style.borderColor = '#374151'}>
            0
          </button>
          <button onClick={checkAnswer} disabled={input.length !== pinLength}
            className="h-12 sm:h-14 font-mono text-sm rounded transition-all duration-100 active:scale-95"
            style={{ backgroundColor: input.length === pinLength ? accentColor : '#1f2937', color: input.length === pinLength ? '#111827' : '#4b5563',
              fontWeight: input.length === pinLength ? 'bold' : 'normal', cursor: input.length === pinLength ? 'pointer' : 'not-allowed',
              border: input.length === pinLength ? 'none' : '1px solid #374151' }}>
            OK
          </button>
        </div>
        {!isDeduction && !showHint && stars > 1 && (
          <button onClick={useHint}
            className="w-full mt-4 py-2.5 text-yellow-400 font-mono text-xs sm:text-sm border border-yellow-400/40 rounded hover:bg-yellow-400/10 transition-all active:scale-[0.98]">
            💡 USE HINT (−1 ★)
          </button>
        )}
        <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } } .animate-shake { animation: shake 0.3s ease-in-out; }`}</style>
      </div>
    );
  };

  const EpisodeComplete = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-7xl mb-6 animate-bounce">🏆</div>
      <h2 className={`text-2xl sm:text-3xl font-bold ${gameMode === 'deduction' ? 'text-cyan-400' : 'text-emerald-400'} font-mono mb-3`}
        style={{ textShadow: gameMode === 'deduction' ? '0 0 20px #22d3ee' : '0 0 20px #00FF88' }}>
        EPISODE CLEAR!
      </h2>
      <p className="text-gray-300 font-mono mb-1">"{currentEpisode?.title}"</p>
      <p className="text-gray-500 font-mono text-xs sm:text-sm mb-10">
        {gameMode === 'deduction' ? '모든 코드를 해독했습니다!' : '모든 스테이지를 해킹했습니다!'}
      </p>
      <div className="space-y-3 w-full max-w-xs">
        <button onClick={() => setGameState('modeSelect')}
          className="w-full py-3.5 font-mono font-bold rounded transition-all active:scale-95"
          style={{ backgroundColor: gameMode === 'deduction' ? '#22d3ee' : '#34d399', color: '#111827' }}>
          CONTINUE
        </button>
        <button onClick={resetGame}
          className="w-full py-3 border border-gray-600 text-gray-400 font-mono rounded hover:border-white hover:text-white transition-all active:scale-95">
          MAIN MENU
        </button>
      </div>
    </div>
  );

  const GameOver = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-7xl mb-6">🔒</div>
      <h2 className="text-2xl sm:text-3xl font-bold text-rose-500 font-mono mb-3" style={{ textShadow: '0 0 20px #FF3366' }}>
        {gameMode === 'deduction' ? 'DECODE FAILED' : 'ACCESS DENIED'}
      </h2>
      <p className="text-gray-400 font-mono text-sm mb-2">시도 횟수를 모두 소진했습니다</p>
      <p className="text-gray-600 font-mono text-xs mb-10">
        정답: <span style={{ color: gameMode === 'deduction' ? '#22d3ee' : '#34d399' }}>
          {gameMode === 'deduction' ? currentStage?.answer : currentStage?.answers[0]}
        </span>
      </p>
      <div className="space-y-3 w-full max-w-xs">
        <button onClick={() => {
          setInput(''); setTurnsLeft(currentStage?.maxTurns || 5); setInitialTurns(currentStage?.maxTurns || 5);
          setStars(3); setShowHint(false); setRevealedClues([]); setGameState('playing');
        }} className="w-full py-3.5 bg-rose-500 text-white font-mono font-bold rounded hover:bg-rose-400 transition-all active:scale-95">
          RETRY
        </button>
        <button onClick={() => setGameState('modeSelect')}
          className="w-full py-3 border border-gray-600 text-gray-400 font-mono rounded hover:border-white hover:text-white transition-all active:scale-95">
          SELECT MODE
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white relative overflow-hidden"
      style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace",
        background: 'linear-gradient(180deg, #0D1117 0%, #161B22 50%, #0D1117 100%)' }}>
      <div className="pointer-events-none fixed inset-0 z-40 opacity-30"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)', backgroundSize: '100% 4px' }} />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-rose-500/8 rounded-full blur-3xl"></div>
        {gameMode === 'deduction' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>}
      </div>
      <div className={`relative z-10 max-w-md mx-auto min-h-screen transition-transform duration-75 ${glitch ? 'translate-x-px skew-x-1' : ''}`}>
        {gameState === 'menu' && <MainMenu />}
        {gameState === 'modeSelect' && <ModeSelect />}
        {gameState === 'storyEpisodeSelect' && <EpisodeSelect episodes={storyEpisodes} modeName="STORY MODE" modeColor="emerald" backState="modeSelect" />}
        {gameState === 'deductionEpisodeSelect' && <EpisodeSelect episodes={deductionEpisodes} modeName="DEDUCTION MODE" modeColor="cyan" backState="modeSelect" />}
        {gameState === 'playing' && gameMode === 'story' && <StoryGamePlay />}
        {gameState === 'playing' && gameMode === 'deduction' && <DeductionGamePlay />}
        {gameState === 'success' && <EpisodeComplete />}
        {gameState === 'gameover' && <GameOver />}
      </div>
    </div>
  );
}
