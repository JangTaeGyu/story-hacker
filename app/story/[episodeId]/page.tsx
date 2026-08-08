import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { storyEpisodes } from '@/data/storyEpisodes';
import StoryGamePlay from '@/components/screens/StoryGamePlay';
import { SITE_DESCRIPTION } from '@/lib/site';

interface PageProps {
  params: Promise<{ episodeId: string }>;
}

export function generateStaticParams() {
  return storyEpisodes.map((episode) => ({
    episodeId: episode.id.toString(),
  }));
}

// 에피소드마다 제목·설명·OG 이미지를 따로 준다.
// 이게 없으면 어떤 에피소드를 공유해도 전부 같은 카드로 보인다.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { episodeId } = await params;
  const episode = storyEpisodes.find((ep) => ep.id === parseInt(episodeId, 10));
  if (!episode) return {};

  const title = episode.subtitle
    ? `EP.${episode.id} ${episode.title} — ${episode.subtitle}`
    : `EP.${episode.id} ${episode.title}`;
  const description = episode.synopsis ?? SITE_DESCRIPTION;
  const image = `/images/story/ep-${episode.id}.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1344, height: 768, alt: episode.title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function StoryGamePlayPage({ params }: PageProps) {
  const { episodeId } = await params;
  const episode = storyEpisodes.find((ep) => ep.id === parseInt(episodeId, 10));

  if (!episode) {
    notFound();
  }

  return <StoryGamePlay episode={episode} />;
}
