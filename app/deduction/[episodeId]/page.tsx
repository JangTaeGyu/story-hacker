import type { Metadata } from 'next';
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

// 추리 모드는 synopsis 필드가 없어 스테이지 수로 설명을 만든다.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { episodeId } = await params;
  const episode = deductionEpisodes.find((ep) => ep.id === parseInt(episodeId, 10));
  if (!episode) return {};

  const title = `추리 EP.${episode.id - 100} ${episode.title}`;
  const description = `단서 ${episode.stages.reduce(
    (sum, stage) => sum + stage.clues.length,
    0
  )}개, ${episode.stages.length}개 스테이지. 틀릴 때마다 새 단서가 열립니다.`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function DeductionGamePlayPage({ params }: PageProps) {
  const { episodeId } = await params;
  const episode = deductionEpisodes.find((ep) => ep.id === parseInt(episodeId, 10));

  if (!episode) {
    notFound();
  }

  return <DeductionGamePlay episode={episode} />;
}
