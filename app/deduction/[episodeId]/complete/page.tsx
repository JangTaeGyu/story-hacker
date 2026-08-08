import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { deductionEpisodes } from '@/data/deductionEpisodes';
import DeductionComplete from '@/components/screens/DeductionComplete';

interface PageProps {
  params: Promise<{ episodeId: string }>;
}

export function generateStaticParams() {
  return deductionEpisodes.map((episode) => ({
    episodeId: episode.id.toString(),
  }));
}

export default async function DeductionCompletePage({ params }: PageProps) {
  const { episodeId } = await params;
  const id = parseInt(episodeId, 10);
  const episode = deductionEpisodes.find((ep) => ep.id === id);

  if (!episode) {
    notFound();
  }

  const nextEpisode = deductionEpisodes.find((ep) => ep.id === id + 1);

  return (
    // useSearchParams를 쓰는 클라이언트 컴포넌트라 Suspense가 필요하다.
    <Suspense>
      <DeductionComplete
        episodeId={episode.id}
        episodeTitle={episode.title}
        nextEpisodeId={nextEpisode?.id ?? null}
      />
    </Suspense>
  );
}
