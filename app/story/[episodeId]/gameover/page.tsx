import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { storyEpisodes } from '@/data/storyEpisodes';
import StoryGameOver from '@/components/screens/StoryGameOver';

interface PageProps {
  params: Promise<{ episodeId: string }>;
}

export function generateStaticParams() {
  return storyEpisodes.map((episode) => ({
    episodeId: episode.id.toString(),
  }));
}

export default async function StoryGameOverPage({ params }: PageProps) {
  const { episodeId } = await params;
  const episode = storyEpisodes.find((ep) => ep.id === parseInt(episodeId, 10));

  if (!episode) {
    notFound();
  }

  return (
    // useSearchParams를 쓰는 클라이언트 컴포넌트라 Suspense가 필요하다.
    <Suspense>
      <StoryGameOver
        episodeId={episode.id}
        episodeTitle={episode.title}
        stageTitles={episode.stages.map((stage) => stage.title)}
      />
    </Suspense>
  );
}
