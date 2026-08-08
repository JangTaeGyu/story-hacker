import type { MetadataRoute } from 'next';
import { storyEpisodes } from '@/data/storyEpisodes';
import { deductionEpisodes } from '@/data/deductionEpisodes';
import { SITE_URL } from '@/lib/site';

/**
 * 색인 대상은 진입 화면과 에피소드 페이지까지다.
 * complete/gameover는 플레이 결과 화면이라 제외한다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/mode-select`, priority: 0.8 },
    { url: `${SITE_URL}/story`, priority: 0.8 },
    { url: `${SITE_URL}/deduction`, priority: 0.8 },
  ];

  for (const episode of storyEpisodes) {
    entries.push({ url: `${SITE_URL}/story/${episode.id}`, priority: 0.6 });
  }
  for (const episode of deductionEpisodes) {
    entries.push({ url: `${SITE_URL}/deduction/${episode.id}`, priority: 0.6 });
  }

  return entries;
}
