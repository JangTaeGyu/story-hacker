/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 내보내기 (선택사항)
  // output: 'export',   // 아래 redirects()는 export 모드에서 동작하지 않는다.

  async redirects() {
    return [
      // 루트 → 기본 언어. hreflang의 x-default도 /ko를 가리킨다.
      { source: '/', destination: '/ko', permanent: false },

      // 언어 접두사가 없던 옛 주소를 한국어판으로 넘긴다.
      // 다국어 도입 전에 공유·색인된 링크가 깨지지 않게 하는 유일한 장치다.
      { source: '/mode-select', destination: '/ko/mode-select', permanent: true },
      { source: '/story', destination: '/ko/story', permanent: true },
      { source: '/story/:path*', destination: '/ko/story/:path*', permanent: true },
      { source: '/deduction', destination: '/ko/deduction', permanent: true },
      { source: '/deduction/:path*', destination: '/ko/deduction/:path*', permanent: true },
    ];
  },
};

module.exports = nextConfig;
