import type { Metadata } from 'next';
import { getStoryEpisodes } from '@/data/storyEpisodes';
import StoryEpisodeList from '@/components/screens/StoryEpisodeList';
import type { EpisodeSummary } from '@/lib/types';
import { toLocale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { alternatesFor, breadcrumbJsonLd, episodeListJsonLd, openGraphLocale } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getMessages(locale);
  const count = getStoryEpisodes(locale).length;
  const description = t.meta.storyList.description(count);

  return {
    title: t.meta.storyList.title,
    description,
    alternates: alternatesFor(locale, '/story'),
    openGraph: {
      ...openGraphLocale(locale),
      title: t.meta.storyList.title,
      description,
    },
  };
}

export default async function StoryEpisodeSelectPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getMessages(locale);
  const episodes = getStoryEpisodes(locale);

  // 서버에서 요약만 추려 넘긴다. 클라이언트 컴포넌트가 배열을 직접 import하면
  // 본문·단서·정답까지 전부 번들에 실린다.
  const summaries: EpisodeSummary[] = episodes.map((episode) => ({
    id: episode.id,
    title: episode.title,
    subtitle: episode.subtitle,
    difficulty: episode.difficulty,
    stageCount: episode.stages.length,
  }));

  return (
    <>
      <JsonLd
        data={episodeListJsonLd(
          locale,
          t.meta.storyList.title,
          t.meta.storyList.description(episodes.length),
          episodes.map((episode) => ({
            id: episode.id,
            title: `EP.${episode.id} ${episode.title}`,
            path: `/story/${episode.id}`,
          }))
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: 'Story Hacker', path: '' },
          { name: t.meta.modeSelect.title, path: '/mode-select' },
          { name: t.meta.storyList.title, path: '/story' },
        ])}
      />
      <StoryEpisodeList episodes={summaries} />
    </>
  );
}
