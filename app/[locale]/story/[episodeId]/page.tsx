import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findStoryEpisode, storyEpisodeIds } from '@/data/storyEpisodes';
import StoryGamePlay from '@/components/screens/StoryGamePlay';
import { toLocale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { alternatesFor, breadcrumbJsonLd, episodeJsonLd, openGraphLocale } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{ locale: string; episodeId: string }>;
}

// 부모 [locale] 세그먼트가 언어를 곱해준다 — 여기서는 에피소드 id만 낸다.
export function generateStaticParams() {
  return storyEpisodeIds.map((id) => ({ episodeId: id.toString() }));
}

// 부모 [locale]의 dynamicParams=false가 여기까지 내려오면, 없는 에피소드 id는
// 라우팅 단계에서 잘려 이 파일의 notFound()가 실행되지 않는다 — 상태는 404지만
// 화면은 Next 기본 404가 된다. 에피소드 세그먼트에서만 다시 열어, 잘못된 id도
// 우리 not-found 화면(app/[locale]/not-found.tsx)을 거치게 한다.
export const dynamicParams = true;

// 에피소드마다 제목·설명·OG 이미지를 따로 준다.
// 이게 없으면 어떤 에피소드를 공유해도 전부 같은 카드로 보인다.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, episodeId } = await params;
  const locale = toLocale(raw);
  const episode = findStoryEpisode(locale, parseInt(episodeId, 10));
  if (!episode) return {};

  const t = getMessages(locale);
  const title = episode.subtitle
    ? `EP.${episode.id} ${episode.title} — ${episode.subtitle}`
    : `EP.${episode.id} ${episode.title}`;
  const description = episode.synopsis ?? t.meta.storyEpisode.description(episode.stages.length);
  const image = `/images/story/ep-${episode.id}.png`;

  return {
    title,
    description,
    alternates: alternatesFor(locale, `/story/${episode.id}`),
    openGraph: {
      ...openGraphLocale(locale),
      title,
      description,
      images: [{ url: image, width: 1344, height: 768, alt: episode.title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function StoryGamePlayPage({ params }: PageProps) {
  const { locale: raw, episodeId } = await params;
  const locale = toLocale(raw);
  const episode = findStoryEpisode(locale, parseInt(episodeId, 10));

  if (!episode) {
    notFound();
  }

  const t = getMessages(locale);
  const description =
    episode.synopsis ?? t.meta.storyEpisode.description(episode.stages.length);

  return (
    <>
      <JsonLd
        data={episodeJsonLd(locale, {
          name: `EP.${episode.id} ${episode.title}`,
          description,
          path: `/story/${episode.id}`,
          image: `/images/story/ep-${episode.id}.png`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: 'Story Hacker', path: '' },
          { name: t.meta.storyList.title, path: '/story' },
          { name: `EP.${episode.id} ${episode.title}`, path: `/story/${episode.id}` },
        ])}
      />
      <StoryGamePlay episode={episode} />
    </>
  );
}
