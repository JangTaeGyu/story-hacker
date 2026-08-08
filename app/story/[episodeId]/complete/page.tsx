import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { storyEpisodes } from '@/data/storyEpisodes';
import StoryComplete from '@/components/screens/StoryComplete';

interface PageProps {
  params: Promise<{ episodeId: string }>;
}

export function generateStaticParams() {
  return storyEpisodes.map((episode) => ({
    episodeId: episode.id.toString(),
  }));
}

export default async function StoryCompletePage({ params }: PageProps) {
  const { episodeId } = await params;
  const id = parseInt(episodeId, 10);
  const episode = storyEpisodes.find((ep) => ep.id === id);

  if (!episode) {
    notFound();
  }

  const nextEpisode = storyEpisodes.find((ep) => ep.id === id + 1);

  return (
    // useSearchParams를 쓰는 클라이언트 컴포넌트라 Suspense가 필요하다.
    // 감싸지 않으면 이 라우트 전체가 동적 렌더로 떨어진다.
    <Suspense>
      <StoryComplete
        episodeId={episode.id}
        episodeTitle={episode.title}
        nextEpisodeId={nextEpisode?.id ?? null}
      />
    </Suspense>
  );
}
