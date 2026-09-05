/** 배포 도메인. 메타데이터·OG·사이트맵·공유 링크가 공유한다. */
export const SITE_URL = 'https://story-hacker.jubrolab.dev';

/** 브랜드명 — 번역하지 않는다. */
export const SITE_NAME = 'Story Hacker';

/**
 * Google Search Console 소유권 확인 토큰.
 *
 * `app/[locale]/layout.tsx`의 `metadata.verification.google`이 읽어
 * `<meta name="google-site-verification">`으로 렌더한다. HTML에 그대로
 * 노출되는 공개 값이라 비밀이 아니다 — 다만 **확인이 끝난 뒤에도 지우지 마세요.**
 * 태그가 사라지면 Search Console이 소유권을 잃고 데이터 수집이 끊긴다.
 */
export const GOOGLE_SITE_VERIFICATION =
  'EohLIsv996hipvC-zZPba5ClWreNM6yKZDXtRCkpWP8';


/**
 * 네이버 서치어드바이저 소유권 확인 토큰.
 *
 * 한국어 유입은 네이버 비중이 크지만, 네이버는 구글과 별개로 등록·사이트맵
 * 제출·소유권 확인을 따로 요구한다. searchadvisor.naver.com에서 사이트를
 * 등록하면 주는 값을 여기에 넣으면 `<meta name="naver-site-verification">`이
 * 렌더된다. **빈 문자열이면 태그 자체를 내보내지 않는다** — 빈 값으로 태그만
 * 나가면 확인이 실패한다.
 */
export const NAVER_SITE_VERIFICATION = '';

// 태그라인·설명은 언어마다 다르므로 lib/messages/{ko,en,ja}.ts의 `site`에 있다.
