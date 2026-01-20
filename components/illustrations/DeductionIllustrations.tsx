'use client';

// ============================================
// 추리 모드 SVG 일러스트 컴포넌트들
// ============================================

export const IllustNumbers = () => (
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

export const IllustLogic = () => (
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

export const IllustMath = () => (
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

export const IllustClock = () => (
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
    {/* 시침 회전 애니메이션 */}
    <line x1="100" y1="80" x2="100" y2="50" stroke="#00ff88" strokeWidth="4" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 100 80" to="360 100 80" dur="60s" repeatCount="indefinite"/>
    </line>
    {/* 분침 회전 애니메이션 */}
    <line x1="100" y1="80" x2="130" y2="80" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 100 80" to="360 100 80" dur="5s" repeatCount="indefinite"/>
    </line>
    {/* 중심 */}
    <circle cx="100" cy="80" r="4" fill="#ff3366"/>
    <text x="100" y="150" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace">TIME PUZZLE</text>
  </svg>
);

export const IllustColor = () => (
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

export const IllustMusic = () => (
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

export const IllustGeo = () => (
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
    {/* 마커 깜박임 */}
    <circle cx="90" cy="65" r="5" fill="#ff3366">
      <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite"/>
    </circle>
    <text x="100" y="150" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace">LAT: 37.33°N</text>
  </svg>
);

export const IllustScience = () => (
  <svg viewBox="0 0 200 160" className="w-full h-32">
    <defs>
      <linearGradient id="sciBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a2a3a" />
        <stop offset="100%" stopColor="#0a1a2e" />
      </linearGradient>
    </defs>
    <rect width="200" height="160" fill="url(#sciBg)" rx="8"/>
    {/* 원자 핵 */}
    <circle cx="100" cy="80" r="10" fill="#ffd700"/>
    {/* 전자 궤도 회전 애니메이션 */}
    <ellipse cx="100" cy="80" rx="45" ry="20" fill="none" stroke="#22d3ee" strokeWidth="1.5">
      <animateTransform attributeName="transform" type="rotate" from="0 100 80" to="360 100 80" dur="3s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="100" cy="80" rx="45" ry="20" fill="none" stroke="#00ff88" strokeWidth="1.5" transform="rotate(60 100 80)">
      <animateTransform attributeName="transform" type="rotate" from="60 100 80" to="420 100 80" dur="4s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="100" cy="80" rx="45" ry="20" fill="none" stroke="#ff3366" strokeWidth="1.5" transform="rotate(120 100 80)">
      <animateTransform attributeName="transform" type="rotate" from="120 100 80" to="480 100 80" dur="5s" repeatCount="indefinite"/>
    </ellipse>
    {/* 원소 기호 */}
    <text x="100" y="85" textAnchor="middle" fill="#1a1a2e" fontSize="12" fontFamily="serif" fontWeight="bold">Au</text>
    <text x="100" y="150" textAnchor="middle" fill="#ffd700" fontSize="10" fontFamily="monospace">GOLD • 79</text>
  </svg>
);

// 추리 일러스트 매핑
export const deductionIllustrations: Record<string, React.ComponentType> = {
  "101": IllustNumbers,
  "102": IllustLogic,
  "103": IllustMath,
  "104": IllustClock,
  "105": IllustColor,
  "106": IllustMusic,
  "107": IllustGeo,
  "108": IllustScience,
};
