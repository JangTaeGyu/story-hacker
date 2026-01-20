import { notFound } from 'next/navigation';
import { storyEpisodes } from '@/data/storyEpisodes';
import StoryGamePlay from '@/components/screens/StoryGamePlay';

interface PageProps {
  params: Promise<{ episodeId: string }>;
}

export function generateStaticParams() {
  return storyEpisodes.map((episode) => ({
    episodeId: episode.id.toString(),
  }));
}

export default async function StoryGamePlayPage({ params }: PageProps) {
  const { episodeId } = await params;
  const episode = storyEpisodes.find((ep) => ep.id === parseInt(episodeId, 10));

  if (!episode) {
    notFound();
  }

  return <StoryGamePlay episode={episode} />;
}
