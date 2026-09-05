import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { deductionEpisodeIds, findDeductionEpisode } from '@/data/deductionEpisodes';
import DeductionGamePlay from '@/components/screens/DeductionGamePlay';
import { toLocale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { alternatesFor, breadcrumbJsonLd, episodeJsonLd, openGraphLocale } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{ locale: string; episodeId: string }>;
}

export function generateStaticParams() {
  return deductionEpisodeIds.map((id) => ({ episodeId: id.toString() }));
}

// 부모 [locale]의 dynamicParams=false가 여기까지 내려오면, 없는 에피소드 id는
// 라우팅 단계에서 잘려 이 파일의 notFound()가 실행되지 않는다 — 상태는 404지만
// 화면은 Next 기본 404가 된다. 에피소드 세그먼트에서만 다시 열어, 잘못된 id도
// 우리 not-found 화면(app/[locale]/not-found.tsx)을 거치게 한다.
export const dynamicParams = true;

// 추리 모드는 synopsis 필드가 없어 스테이지·단서 수로 설명을 만든다.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, episodeId } = await params;
  const locale = toLocale(raw);
  const episode = findDeductionEpisode(locale, parseInt(episodeId, 10));
  if (!episode) return {};

  const t = getMessages(locale);
  const title = t.meta.deductionEpisode.title(episode.id - 100, episode.title);
  const description = t.meta.deductionEpisode.description(
    episode.stages.reduce((sum, stage) => sum + stage.clues.length, 0),
    episode.stages.length
  );
  const image = `/images/deduction/ep-${episode.id}.png`;

  return {
    title,
    description,
    alternates: alternatesFor(locale, `/deduction/${episode.id}`),
    openGraph: {
      ...openGraphLocale(locale),
      title,
      description,
      images: [{ url: image, width: 1344, height: 768, alt: episode.title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function DeductionGamePlayPage({ params }: PageProps) {
  const { locale: raw, episodeId } = await params;
  const locale = toLocale(raw);
  const episode = findDeductionEpisode(locale, parseInt(episodeId, 10));

  if (!episode) {
    notFound();
  }

  const t = getMessages(locale);
  const name = t.meta.deductionEpisode.title(episode.id - 100, episode.title);
  const description = t.meta.deductionEpisode.description(
    episode.stages.reduce((sum, stage) => sum + stage.clues.length, 0),
    episode.stages.length
  );

  return (
    <>
      <JsonLd
        data={episodeJsonLd(locale, {
          name,
          description,
          path: `/deduction/${episode.id}`,
          image: `/images/deduction/ep-${episode.id}.png`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: 'Story Hacker', path: '' },
          { name: t.meta.deductionList.title, path: '/deduction' },
          { name, path: `/deduction/${episode.id}` },
        ])}
      />
      <DeductionGamePlay episode={episode} />
    </>
  );
}
