import type { Metadata } from 'next';
import { getDeductionEpisodes } from '@/data/deductionEpisodes';
import DeductionEpisodeList from '@/components/screens/DeductionEpisodeList';
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
  const count = getDeductionEpisodes(locale).length;
  const description = t.meta.deductionList.description(count);

  return {
    title: t.meta.deductionList.title,
    description,
    alternates: alternatesFor(locale, '/deduction'),
    openGraph: {
      ...openGraphLocale(locale),
      title: t.meta.deductionList.title,
      description,
    },
  };
}

export default async function DeductionEpisodeSelectPage({ params }: PageProps) {
  const locale = toLocale((await params).locale);
  const t = getMessages(locale);
  const episodes = getDeductionEpisodes(locale);

  // 서버에서 요약만 추려 넘긴다. 클라이언트 컴포넌트가 배열을 직접 import하면
  // 상황 설명·단서·정답까지 전부 번들에 실린다.
  const summaries: EpisodeSummary[] = episodes.map((episode) => ({
    id: episode.id,
    title: episode.title,
    difficulty: episode.difficulty,
    stageCount: episode.stages.length,
  }));

  return (
    <>
      <JsonLd
        data={episodeListJsonLd(
          locale,
          t.meta.deductionList.title,
          t.meta.deductionList.description(episodes.length),
          episodes.map((episode) => ({
            id: episode.id,
            title: `EP.${episode.id - 100} ${episode.title}`,
            path: `/deduction/${episode.id}`,
          }))
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: 'Story Hacker', path: '' },
          { name: t.meta.modeSelect.title, path: '/mode-select' },
          { name: t.meta.deductionList.title, path: '/deduction' },
        ])}
      />
      <DeductionEpisodeList episodes={summaries} />
    </>
  );
}
