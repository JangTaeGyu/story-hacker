import { notFound } from 'next/navigation';
import { deductionEpisodes } from '@/data/deductionEpisodes';
import DeductionGamePlay from '@/components/screens/DeductionGamePlay';

interface PageProps {
  params: Promise<{ episodeId: string }>;
}

export function generateStaticParams() {
  return deductionEpisodes.map((episode) => ({
    episodeId: episode.id.toString(),
  }));
}

export default async function DeductionGamePlayPage({ params }: PageProps) {
  const { episodeId } = await params;
  const episode = deductionEpisodes.find((ep) => ep.id === parseInt(episodeId, 10));

  if (!episode) {
    notFound();
  }

  return <DeductionGamePlay episode={episode} />;
}
