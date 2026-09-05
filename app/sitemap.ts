import type { MetadataRoute } from 'next';
import { storyEpisodeIds } from '@/data/storyEpisodes';
import { deductionEpisodeIds } from '@/data/deductionEpisodes';
import { defaultLocale, localeMeta, localePath, locales } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

/**
 * 색인 대상은 진입 화면과 에피소드 페이지까지다.
 * complete/gameover는 플레이 결과 화면이라 제외한다.
 *
 * 경로 하나가 언어 수만큼 항목이 되고, 각 항목은 `alternates.languages`로
 * 나머지 언어판을 가리킨다. hreflang은 **상호 참조되어야** 하므로 여기서
 * 빠뜨리면 검색엔진이 언어판을 서로 연결하지 못한다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, changeFrequency: 'monthly' },
    { path: '/mode-select', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/story', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/deduction', priority: 0.9, changeFrequency: 'monthly' },
    ...storyEpisodeIds.map((id) => ({
      path: `/story/${id}`,
      priority: 0.7,
      changeFrequency: 'yearly' as const,
    })),
    ...deductionEpisodeIds.map((id) => ({
      path: `/deduction/${id}`,
      priority: 0.7,
      changeFrequency: 'yearly' as const,
    })),
  ];

  return paths.flatMap(({ path, priority, changeFrequency }) => {
    const languages: Record<string, string> = {};
    for (const code of locales) {
      languages[localeMeta[code].hreflang] = `${SITE_URL}${localePath(code, path)}`;
    }
    languages['x-default'] = `${SITE_URL}${localePath(defaultLocale, path)}`;

    return locales.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
