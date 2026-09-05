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

// 태그라인·설명은 언어마다 다르므로 lib/messages/{ko,en,ja}.ts의 `site`에 있다.
