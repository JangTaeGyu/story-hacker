import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 결과 화면은 정답·별점이 쿼리로 붙는 일회성 페이지라 색인하지 않는다.
      disallow: ['/story/*/complete', '/story/*/gameover', '/deduction/*/complete', '/deduction/*/gameover'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
