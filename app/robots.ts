import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 결과 화면은 정답·별점이 쿼리로 붙는 일회성 페이지라 색인하지 않는다.
      // 언어 접두사가 붙으므로 앞에도 와일드카드를 둔다.
      disallow: [
        '/*/story/*/complete',
        '/*/story/*/gameover',
        '/*/deduction/*/complete',
        '/*/deduction/*/gameover',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
