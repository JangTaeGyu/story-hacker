import { deductionEpisodes } from '@/data/deductionEpisodes';
import DeductionEpisodeList from '@/components/screens/DeductionEpisodeList';
import type { EpisodeSummary } from '@/lib/types';

// 서버에서 요약만 추려 넘긴다. 클라이언트 컴포넌트가 배열을 직접 import하면
// 상황 설명·단서·정답까지 전부 번들에 실린다.
const summaries: EpisodeSummary[] = deductionEpisodes.map((episode) => ({
  id: episode.id,
  title: episode.title,
  difficulty: episode.difficulty,
  stageCount: episode.stages.length,
}));

export default function DeductionEpisodeSelectPage() {
  return <DeductionEpisodeList episodes={summaries} />;
}
