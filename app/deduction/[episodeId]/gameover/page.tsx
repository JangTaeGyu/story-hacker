import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { deductionEpisodes } from '@/data/deductionEpisodes';
import DeductionGameOver from '@/components/screens/DeductionGameOver';

interface PageProps {
  params: Promise<{ episodeId: string }>;
}

export function generateStaticParams() {
  return deductionEpisodes.map((episode) => ({
    episodeId: episode.id.toString(),
  }));
}

export default async function DeductionGameOverPage({ params }: PageProps) {
  const { episodeId } = await params;
  const episode = deductionEpisodes.find((ep) => ep.id === parseInt(episodeId, 10));

  if (!episode) {
    notFound();
  }

  return (
    // useSearchParams를 쓰는 클라이언트 컴포넌트라 Suspense가 필요하다.
    <Suspense>
      <DeductionGameOver
        episodeId={episode.id}
        episodeTitle={episode.title}
        stageTitles={episode.stages.map((stage) => stage.title)}
      />
    </Suspense>
  );
}
